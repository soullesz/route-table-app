import { Component } from '@angular/core';
import { RouteTableComponent } from './components/route-table/route-table';

@Component({
  selector: 'app',
  standalone: true,
  imports: [RouteTableComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
