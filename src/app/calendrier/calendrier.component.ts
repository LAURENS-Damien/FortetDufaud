import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef  } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarDateFormatter,  CalendarEventAction, DAYS_OF_WEEK } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { addDays, differenceInDays, startOfDay, endOfDay, subDays, endOfMonth, addHours, isSameMonth, isSameDay } from 'date-fns';
import { colors } from './demo-utils/colors';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendrier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendrierComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  ngOnInit() {
  }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  view: string = 'month';

  viewDate: Date = new Date();

  locale: string = 'fr';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  externalEvents: CalendarEvent[] = [
    {
      title: 'MILDIOU',
      color: colors.yellow,
      start: new Date(),
      draggable: true
    },
    {
      title: 'OÏDIUM',
      color: colors.blue,
      start: new Date(),
      draggable: true
    },
    {
      title: 'INSECTICITE',
      color: colors.red,
      start: new Date(),
      draggable: true
    },
    {
      title: 'BOTRYTIS',
      color: colors.green,
      start: new Date(),
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  refresh: Subject<any> = new Subject();

  actions: CalendarEventAction[] = [
    {
      label: '&nbsp;<span class="oi oi-pencil"></span>&nbsp;',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<span class="oi oi-circle-x"></span>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'INSECTICIDE',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date()),
      title: 'MILDIOU',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'OÏDIUM',
      color: colors.blue,
      actions: this.actions
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'BOTRYTIS',
      color: colors.green,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      actions: this.actions
    }
  ];

  eventDropped({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    const externalIndex: number = this.externalEvents.indexOf(event);
    if (externalIndex > -1) {
      this.externalEvents.splice(externalIndex, 1);
      this.events.push(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    this.viewDate = newStart;
    this.activeDayIsOpen = true;
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'Nouvel évènement',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

}
