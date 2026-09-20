import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PautasPage } from './pautas-page';

describe('PautasPage', () => {
  let component: PautasPage;
  let fixture: ComponentFixture<PautasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PautasPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PautasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
