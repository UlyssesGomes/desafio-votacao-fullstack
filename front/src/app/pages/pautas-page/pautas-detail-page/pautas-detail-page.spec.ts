import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PautasDetailPage } from './pautas-detail-page';

describe('PautasDetailPage', () => {
  let component: PautasDetailPage;
  let fixture: ComponentFixture<PautasDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PautasDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PautasDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
