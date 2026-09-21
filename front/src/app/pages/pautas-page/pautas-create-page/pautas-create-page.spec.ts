import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PautasCreatePage } from './pautas-create-page';

describe('PautasCreatePage', () => {
  let component: PautasCreatePage;
  let fixture: ComponentFixture<PautasCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PautasCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PautasCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
