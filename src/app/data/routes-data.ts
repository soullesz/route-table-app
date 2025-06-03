import { Route } from '../models/route.model';

export const ROUTES_DATA: Route[] = [
  {
    uuid: '1',
    address: '0.0.0.0',
    mask: '0',
    gateway: '193.0.174.1',
    interface: 'Интернет-подключение'
  },
  {
    uuid: '2',
    address: '10.1.30.0',
    mask: '24',
    gateway: '0.0.0.0',
    interface: 'Гостевая сеть'
  },
  {
    uuid: '3',
    address: '192.168.1.0',
    mask: '24',
    gateway: '0.0.0.0',
    interface: 'Домашняя сеть'
  },
  {
    uuid: '4',
    address: '193.0.174.0',
    mask: '24',
    gateway: '0.0.0.0',
    interface: 'Интернет-подключение'
  },
  {
    uuid: '5',
    address: '193.0.175.0',
    mask: '25',
    gateway: '193.0.174.10',
    interface: 'Интернет-подключение'
  },
  {
    uuid: '6',
    address: '193.0.175.22',
    mask: '32',
    gateway: '193.0.174.1',
    interface: 'Интернет-подключение'
  },
  {
    uuid: '7',
    address: '172.16.0.0',
    mask: '16',
    gateway: '0.0.0.0',
    interface: 'Виртуальный адаптер'
  },
  {
    uuid: '8',
    address: '10.0.0.0',
    mask: '8',
    gateway: '192.168.1.1',
    interface: 'VPN-соединение'
  }
];
