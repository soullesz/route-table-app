
import { Component } from '@angular/core';
import { RouteTableComponent } from './components/route-table/route-table';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouteTableComponent,
    RouterOutlet,        
    RouterLink,          
    RouterLinkActive     
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
