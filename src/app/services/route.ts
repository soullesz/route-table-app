import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Route } from '../models/route.model';
import { ROUTES_DATA } from '../data/routes-data';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private originalRoutes: Route[] = [...ROUTES_DATA];
  private routesSubject = new BehaviorSubject<Route[]>([...this.originalRoutes]);
  routes$ = this.routesSubject.asObservable();

  private isValidIp(ip: string): boolean {
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    return parts.every(p => {
      const num = Number(p);
      return !isNaN(num) && num >= 0 && num <= 255;
    });
  }

  private ipToNumber(ip: string): number {
    if (!this.isValidIp(ip)) return -1;
    return ip.split('.')
      .map(p => Number(p))
      .reduce((acc, octet) => (acc << 8) + octet, 0);
  }

  sortRoutes(field: keyof Omit<Route, 'uuid' | 'mask'>): void {
    const routes = [...this.routesSubject.value];
    const valid: { route: Route; key: number }[] = [];
    const invalid: Route[] = [];

    routes.forEach(r => {
      const value = field === 'address' || field === 'gateway'
        ? this.ipToNumber(r[field] as string)
        : NaN;
      if (value >= 0) {
        valid.push({ route: r, key: value });
      } else {
        invalid.push(r);
      }
    });

    valid.sort((a, b) => a.key - b.key);
    const sorted = [...valid.map(v => v.route), ...invalid];
    this.routesSubject.next(sorted);
  }

  resetRoutes(): void {
    this.routesSubject.next([...this.originalRoutes]);
  }
}

