import { AutoMap } from '../../';
import { MapKeys } from './map.keys';
import './mapping';
import { CarEntity  } from './car.entity';
import { CarModel } from './car.model';

/** create car objects and test */
let carE = new CarEntity();
carE.carID = 1;
carE.make = 'Toyota';
carE.model = 'Corolla';
carE.year = 2010;

let carM = new CarModel();
carM.carID = 0;
carM.make = '';
carM.model = '';
carM.year = 0;
carM.color = 'blue';

let carMMapped = AutoMap.Map(MapKeys.key1, carE, carM);
console.log(carMMapped);

/** create any objects and test */
let any1 = { test1: 'value 1', test2: 'value 2', test3: { key: 'value' } };
let any2 = { test1: 'value 1', test2: 'value 2', test3: 'Not Mapped' };

let anyMapped = AutoMap.Map(MapKeys.key2, any1, any2);
console.log(anyMapped);