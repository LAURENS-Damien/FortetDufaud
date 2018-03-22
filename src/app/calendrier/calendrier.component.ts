import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarDateFormatter,  DAYS_OF_WEEK } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { addDays, differenceInDays, startOfDay } from 'date-fns';
import { colors } from './demo-utils/colors';
import { CustomDateFormatter } from './custom-date-formatter.provider';

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

  constructor() { }

  ngOnInit() {
  }

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

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  refresh: Subject<any> = new Subject();

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

}
