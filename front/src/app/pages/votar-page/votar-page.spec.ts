import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotarPage } from './votar-page';

describe('VotarPage', () => {
  let component: VotarPage;
  let fixture: ComponentFixture<VotarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotarPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
