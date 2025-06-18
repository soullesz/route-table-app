import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ROUTES_DATA }     from '../data/routes-data';
import { Route }           from '../models/route.model';

@Injectable({ providedIn: 'root' })
export class RouteService {
  private _bs = new BehaviorSubject<Route[]>([...ROUTES_DATA]);
  readonly routes$ = this._bs.asObservable();

  private parseIp(ip: string): number {
    return ip
      .split('.')
      .map(n => parseInt(n,10) || 0)
      .reduce((acc, oct) => (acc << 8) + oct, 0);
  }

  sortRoutes(field: keyof Omit<Route,'uuid'|'mask'>, dir: 'asc'|'desc'): void {
    const arr = [...this._bs.value];
    arr.sort((a,b) => {
      let res: number;
      if (field==='address' || field==='gateway') {
        res = this.parseIp(a[field]) - this.parseIp(b[field]);
      } else {
        res = a[field].localeCompare(b[field]);
      }
      return dir==='asc' ? res : -res;
    });
    this._bs.next(arr);
  }

  resetRoutes(): void {
    this._bs.next([...ROUTES_DATA]);
  }
}


