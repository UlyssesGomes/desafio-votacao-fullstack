import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSidebar } from './simple-sidebar';

describe('SimpleSidebar', () => {
  let component: SimpleSidebar;
  let fixture: ComponentFixture<SimpleSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
