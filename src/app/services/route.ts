import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ROUTES_DATA } from '../data/routes-data';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private _routes$ = new BehaviorSubject<Route[]>([...ROUTES_DATA]);
  routes$: Observable<Route[]> = this._routes$.asObservable();

  private ipToNumber(ip: string): number {
    const address = ip.split('/')[0].trim();
    const octets = address.split('.').map(o => parseInt(o, 10));
    if (octets.length !== 4 || octets.some(isNaN)) {
      return 0;
    }
    return (
      ((octets[0] & 0xff) << 24) +
      ((octets[1] & 0xff) << 16) +
      ((octets[2] & 0xff) << 8) +
      (octets[3] & 0xff)
    ) >>> 0;
  }

  sortRoutes(field: keyof Omit<Route, 'uuid'>, direction: 'asc' | 'desc'): void {
    const current = [...this._routes$.value];
    current.sort((a, b) => {
      let res = 0;
      if (field === 'address' || field === 'gateway') {
        const na = this.ipToNumber(a[field]);
        const nb = this.ipToNumber(b[field]);
        res = na - nb;
      } else if (field === 'mask') {
        const ma = parseInt(a.mask, 10);
        const mb = parseInt(b.mask, 10);
        res = ma - mb;
      } else {
        res = a.interface.localeCompare(b.interface);
      }
      return direction === 'asc' ? res : -res;
    });
    this._routes$.next(current);
  }

  resetRoutes(): void {
    this._routes$.next([...ROUTES_DATA]);
  }
}

