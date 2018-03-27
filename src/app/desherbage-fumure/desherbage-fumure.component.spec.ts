import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesherbageFumureComponent } from './desherbage-fumure.component';

describe('DesherbageFumureComponent', () => {
  let component: DesherbageFumureComponent;
  let fixture: ComponentFixture<DesherbageFumureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesherbageFumureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesherbageFumureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
