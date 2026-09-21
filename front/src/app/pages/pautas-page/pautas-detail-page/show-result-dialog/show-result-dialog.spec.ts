import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResultDialog } from './show-result-dialog';

describe('ShowResultDialog', () => {
  let component: ShowResultDialog;
  let fixture: ComponentFixture<ShowResultDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowResultDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowResultDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
