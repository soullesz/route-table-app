import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Route } from '../models/route.model';
import { ROUTES_DATA } from '../data/routes-data';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private _routes$ = new BehaviorSubject<Route[]>([...ROUTES_DATA]);

  get routes$(): Observable<Route[]> {
    return this._routes$.asObservable();
  }

  sortRoutes(field: keyof Omit<Route, 'uuid' | 'mask'>): void {
    const currentRoutes = [...this._routes$.getValue()];

    if (field === 'address') {
      currentRoutes.sort((a, b) => this.compareIPAndMask(
        `${a.address}/${a.mask}`, `${b.address}/${b.mask}`));
    } else if (field === 'gateway') {
      currentRoutes.sort((a, b) => this.compareIPs(a.gateway, b.gateway));
    } else if (field === 'interface') {
      currentRoutes.sort((a, b) => a.interface.localeCompare(b.interface));
    }

    this._routes$.next(currentRoutes);
  }

  resetRoutes(): void {
    this._routes$.next([...ROUTES_DATA]);
  }

  private compareIPAndMask(a: string, b: string): number {
    const [ipA, maskA] = a.split('/');
    const [ipB, maskB] = b.split('/');
    const ipCompare = this.compareIPs(ipA, ipB);
    if (ipCompare !== 0) {
      return ipCompare;
    }
    return Number(maskA) - Number(maskB);
  }

  private compareIPs(ip1: string, ip2: string): number {
    const aOctets = ip1.split('.').map(x => Number(x));
    const bOctets = ip2.split('.').map(x => Number(x));
    for (let i = 0; i < 4; i++) {
      if (aOctets[i] < bOctets[i]) {
        return -1;
      }
      if (aOctets[i] > bOctets[i]) {
        return 1;
      }
    }
    return 0;
  }
}
