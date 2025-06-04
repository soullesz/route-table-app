import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page8 } from './page8';

describe('Page8', () => {
  let component: Page8;
  let fixture: ComponentFixture<Page8>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page8]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page8);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
