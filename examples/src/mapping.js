import AutoMap from '../../';
import { MapKeys } from './map.keys';

export default {
	/** create maps */
	map1: AutoMap.CreateMap(MapKeys.key1)
		.forMember('carID').mapFrom('carID')
		.forMember('make').mapFrom('make')
		.forMember('model').mapFrom('model')
		.forMember('year').mapFrom('year'),
	map2: AutoMap.CreateMap(MapKeys.key2)
		.forMember('test1').mapFrom('test2')
		.forMember('test2').mapFrom('test3')
		.forMember('test3').mapFrom('test3').condition((source, destination) => { return true })
}