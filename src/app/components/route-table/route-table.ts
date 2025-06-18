import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { MatSort, Sort, MatSortModule }  from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule }                 from '@angular/material/icon';
import { MatProgressSpinnerModule }      from '@angular/material/progress-spinner';
import { RouteService }                  from '../../services/route';
import { Route }                         from '../../models/route.model';

@Component({
  selector:    'app-route-table',
  standalone:  true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './route-table.html',
  styleUrls:   ['./route-table.css']
})
export class RouteTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Route>([]);
  displayedColumns = ['address','gateway','interface'];
  currentSort: Sort = { active:'', direction:'' };
  isLoading = true;

  constructor(private svc: RouteService) {}

  ngOnInit(): void {
    this.svc.routes$.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  onSortChange(sort: Sort): void {
    this.currentSort = sort;
    if (!sort.active || !sort.direction) {
      this.isLoading = true;
      this.svc.resetRoutes();
    } else {
      this.isLoading = true;
      this.svc.sortRoutes(sort.active as any, sort.direction);
    }
  }
}


