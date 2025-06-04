import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { Route } from '../../models/route.model';
import { RouteService } from '../../services/route';

@Component({
  selector: 'app-route-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule
  ],
  templateUrl: './route-table.html',
  styleUrls: ['./route-table.css']
})
export class RouteTableComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['address', 'gateway', 'interface'];
  dataSource: MatTableDataSource<Route> = new MatTableDataSource<Route>([]);
  @ViewChild(MatSort) matSort!: MatSort;
  private dataSubscription!: Subscription;
  currentSort: Sort = { active: '', direction: '' };
  isLoading = true;

  constructor(private routeService: RouteService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.dataSubscription = this.routeService.routes$.subscribe(routes => {
      this.dataSource.data = routes;
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort;
  }

  onSortChange(sortState: Sort): void {
    this.currentSort = sortState;
    if (!sortState.active || sortState.direction === '') {
      this.routeService.resetRoutes();
      return;
    }
    this.routeService.sortRoutes(sortState.active as keyof Omit<Route, 'uuid' | 'mask'>);
    if (sortState.direction === 'desc') {
      const temp = [...this.dataSource.data].reverse();
      this.dataSource.data = temp;
      this.routeService['routesSubject'].next(temp);
    }
  }

  hasNoData(): boolean {
    return !this.isLoading && this.dataSource.data.length === 0;
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}

