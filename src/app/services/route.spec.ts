import { TestBed } from '@angular/core/testing';
import { RouteService } from './route';
import { Route } from '../models/route.model';

describe('RouteService', () => {
  let service: RouteService;

  const testRoutes: Route[] = [
    { uuid:'1', address:'192.168.1.10', mask:'24', gateway:'0.0.0.0', interface:'Дом'    },
    { uuid:'2', address:'10.0.0.5',   mask:'24', gateway:'0.0.0.0', interface:'Office' },
    { uuid:'3', address:'abc.def',    mask:'24', gateway:'0.0.0.0', interface:'Invalid'},
    { uuid:'4', address:'172.16.0.1', mask:'16', gateway:'0.0.0.1', interface:'VPN'    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [RouteService] });
    service = TestBed.inject(RouteService);
    // Подменяем исходные данные
    (service as any)['_bs'].next([...testRoutes]);
  });

  it('should sort valid IPs numerically and push invalid to end', (done) => {
    service.routes$.subscribe(sorted => {
      expect(sorted.map(r => r.address)).toEqual([
        '10.0.0.5',
        '172.16.0.1',
        '192.168.1.10',
        'abc.def'
      ]);
      done();
    });
    service.sortRoutes('address','asc');
  });

  it('should reset routes to original order', (done) => {
    service.sortRoutes('address','asc');
    service.resetRoutes();
    service.routes$.subscribe(restored => {
      expect(restored).toEqual(testRoutes);
      done();
    });
  });
});

