import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPanel } from './content-panel';

describe('ContentPanel', () => {
  let component: ContentPanel;
  let fixture: ComponentFixture<ContentPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
