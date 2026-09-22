import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSessionDialog } from './open-session-dialog';

describe('OpenSessionDialog', () => {
  let component: OpenSessionDialog;
  let fixture: ComponentFixture<OpenSessionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenSessionDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenSessionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
