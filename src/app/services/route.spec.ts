import { TestBed } from '@angular/core/testing';
import { RouteService } from './route';
import { Route } from '../models/route.model';

describe('RouteService', () => {
  let service: RouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteService);
  });

  it('should sort IP addresses in numeric order', () => {
    const testData: Route[] = [
      { uuid: '1', address: '10.0.0.0', mask: '24', gateway: '0.0.0.0', interface: 'A' },
      { uuid: '2', address: '192.168.0.1', mask: '24', gateway: '0.0.0.0', interface: 'A' },
      { uuid: '3', address: '10.10.0.0', mask: '24', gateway: '0.0.0.0', interface: 'A' }
    ];
    (service as any)._routes$.next(testData);
    service.sortRoutes('address', 'asc');
    service.routes$.subscribe(sorted => {
      expect(sorted.map(r => r.address)).toEqual(['10.0.0.0', '10.10.0.0', '192.168.0.1']);
    });
  });

  it('should sort mask as numbers', () => {
    const testData: Route[] = [
      { uuid: '1', address: '0.0.0.0', mask: '8', gateway: '0.0.0.0', interface: 'A' },
      { uuid: '2', address: '0.0.0.0', mask: '16', gateway: '0.0.0.0', interface: 'A' },
      { uuid: '3', address: '0.0.0.0', mask: '24', gateway: '0.0.0.0', interface: 'A' }
    ];
    (service as any)._routes$.next(testData);
    service.sortRoutes('mask', 'asc');
    service.routes$.subscribe(sorted => {
      expect(sorted.map(r => r.mask)).toEqual(['8', '16', '24']);
    });
  });

  it('should sort gateway IPs in numeric order', () => {
    const testData: Route[] = [
      { uuid: '1', address: '0.0.0.0', mask: '24', gateway: '192.168.1.1', interface: 'A' },
      { uuid: '2', address: '0.0.0.0', mask: '24', gateway: '10.0.0.1', interface: 'A' },
      { uuid: '3', address: '0.0.0.0', mask: '24', gateway: '10.0.0.2', interface: 'A' }
    ];
    (service as any)._routes$.next(testData);
    service.sortRoutes('gateway', 'asc');
    service.routes$.subscribe(sorted => {
      expect(sorted.map(r => r.gateway)).toEqual(['10.0.0.1', '10.0.0.2', '192.168.1.1']);
    });
  });

  it('should sort interface lexicographically', () => {
    const testData: Route[] = [
      { uuid: '1', address: '0.0.0.0', mask: '24', gateway: '0.0.0.0', interface: 'C' },
      { uuid: '2', address: '0.0.0.0', mask: '24', gateway: '0.0.0.0', interface: 'A' },
      { uuid: '3', address: '0.0.0.0', mask: '24', gateway: '0.0.0.0', interface: 'B' }
    ];
    (service as any)._routes$.next(testData);
    service.sortRoutes('interface', 'asc');
    service.routes$.subscribe(sorted => {
      expect(sorted.map(r => r.interface)).toEqual(['A', 'B', 'C']);
    });
  });
});
