import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { RouteTableComponent } from './route-table';
import { RouteService } from '../../services/route';
import { Route } from '../../models/route.model';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

describe('RouteTableComponent', () => {
  let component: RouteTableComponent;
  let fixture: ComponentFixture<RouteTableComponent>;
  let mockService: jasmine.SpyObj<RouteService>;
  let routesSubject: Subject<Route[]>;

  const testData: Route[] = [
    { uuid: '1', address: '10.0.0.5', mask: '24', gateway: '0.0.0.0', interface: 'Office' },
    { uuid: '2', address: 'abc.def', mask: '24', gateway: '0.0.0.0', interface: 'Invalid' }
  ];

  beforeEach(async () => {
    routesSubject = new Subject<Route[]>();
    mockService = jasmine.createSpyObj('RouteService', ['sortRoutes', 'resetRoutes'], { routes$: routesSubject.asObservable() });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      declarations: [RouteTableComponent],
      providers: [{ provide: RouteService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteTableComponent);
    component = fixture.componentInstance;
  });

  it('should show loading initially and then display table', () => {
    fixture.detectChanges();
    expect(component.isLoading).toBeTrue();

    routesSubject.next(testData);
    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.dataSource.data.length).toBe(2);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading')).toBeNull();
    expect(compiled.querySelector('.no-data')).toBeNull();
    expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('should display "Нет данных" when data is empty', () => {
    fixture.detectChanges();
    expect(component.isLoading).toBeTrue();

    routesSubject.next([]);
    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.no-data')?.textContent).toContain('Нет данных для отображения');
    expect(compiled.querySelector('table')).toBeNull();
  });
});


