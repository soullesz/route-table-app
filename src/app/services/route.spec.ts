import { TestBed } from '@angular/core/testing';
import { RouteService } from './route';
import { Route } from '../models/route.model';

describe('RouteService', () => {
  let service: RouteService;

  const testRoutes: Route[] = [
    { uuid: '1', address: '192.168.1.10', mask: '24', gateway: '0.0.0.0', interface: 'Дом' },
    { uuid: '2', address: '10.0.0.5', mask: '24', gateway: '0.0.0.0', interface: 'Office' },
    { uuid: '3', address: 'abc.def.ghi.jkl', mask: '24', gateway: '0.0.0.0', interface: 'Invalid' },
    { uuid: '4', address: '172.16.0.1', mask: '16', gateway: '0.0.0.1', interface: 'VPN' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteService]
    });
    service = TestBed.inject(RouteService);
    (service as any).originalRoutes = [...testRoutes];
    (service as any).routesSubject.next([...testRoutes]);
  });

  it('should sort valid IPs numerically and push invalid IP to end', () => {
    service.sortRoutes('address');
    service.routes$.subscribe(sorted => {
      expect(sorted.length).toBe(4);
      expect(sorted[0].address).toBe('10.0.0.5');
      expect(sorted[1].address).toBe('172.16.0.1');
      expect(sorted[2].address).toBe('192.168.1.10');
      expect(sorted[3].address).toBe('abc.def.ghi.jkl');
    });
  });

  it('should reset routes to original order', () => {
    service.sortRoutes('address');
    service.resetRoutes();
    service.routes$.subscribe(reseted => {
      expect(reseted).toEqual(testRoutes);
    });
  });
});

