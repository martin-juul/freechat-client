import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChannelsComponent } from './admin-channels.component';

describe('ChannelsComponent', () => {
  let component: AdminChannelsComponent;
  let fixture: ComponentFixture<AdminChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
