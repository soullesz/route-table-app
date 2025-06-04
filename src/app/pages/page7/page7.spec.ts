import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page7 } from './page7';

describe('Page7', () => {
  let component: Page7;
  let fixture: ComponentFixture<Page7>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page7]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page7);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
