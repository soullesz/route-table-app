import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { RouteService } from '../../services/route';
import { RouteTableComponent } from './route-table';

describe('RouteTableComponent', () => {
  let component: RouteTableComponent;
  let fixture: ComponentFixture<RouteTableComponent>;
  let service: RouteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteTableComponent, BrowserAnimationsModule, MatTableModule, MatSortModule, MatIconModule],
      providers: [RouteService]
    }).compileComponents();

    service = TestBed.inject(RouteService);
    fixture = TestBed.createComponent(RouteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial data length equal to ROUTES_DATA', () => {
    service.routes$.subscribe(routes => {
      expect(component.dataSource.data.length).toBe(routes.length);
    });
  });

  it('should reset to initial order when sort field is empty', () => {
    const original = [...component.dataSource.data];
    component.onSortChange({ active: '', direction: '' });
    service.routes$.subscribe(routes => {
      expect(routes).toEqual(original);
    });
  });
});

