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

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {
    this.dataSubscription = this.routeService.routes$.subscribe(routes => {
      this.dataSource.data = routes;
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

    const field = sortState.active as keyof Omit<Route, 'uuid' | 'mask'>;

    if (sortState.direction === 'asc') {
      this.routeService.sortRoutes(field);
    } else {
      this.routeService.sortRoutes(field);
      const tmp = [...this.dataSource.data].reverse();
      this.dataSource.data = tmp;
      this.routeService['_routes$'].next(tmp);
    }
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
