

import type { Routes } from '@angular/router';
import { RouteTableComponent } from './components/route-table/route-table';


import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';
import { Page3 } from './pages/page3/page3';
import { Page4 } from './pages/page4/page4';
import { Page5 } from './pages/page5/page5';
import { Page6 } from './pages/page6/page6';
import { Page7 } from './pages/page7/page7';
import { Page8 } from './pages/page8/page8';

export const appRoutes: Routes = [
  {
    path: '',
    component: RouteTableComponent
  },
  {
    path: 'page1',
    component: Page1
  },
  {
    path: 'page2',
    component: Page2
  },
  {
    path: 'page3',
    component: Page3
  },
  {
    path: 'page4',
    component: Page4
  },
  {
    path: 'page5',
    component: Page5
  },
  {
    path: 'page6',
    component: Page6
  },
  {
    path: 'page7',
    component: Page7
  },
  {
    path: 'page8',
    component: Page8
  },
  
  {
    path: '**',
    redirectTo: ''
  }
];

