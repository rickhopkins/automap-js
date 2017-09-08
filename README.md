# automap-js

AutoMap-JS is a small javascript library for mapping entities that resembles AutoMapper.net. You can create entity maps that are held in memory and referenced when you need to map two entities together.

### Installation

_npm install automap-js --save_

### How it works...

The simplest way to see how it works is to view the inline.html file under the examples folder. Essentially you call the AutoMap.CreateMap to define a mapping between a source entity and a destination entity, giving it a unique string key to represent the mapping. The .forMember function defines which the member / property on the destination entity, and the .mapFrom method defines the source member / property to pull the value from. So you're defining "for this destination entity property, pull it's value from this source entity property". You can however get more complex with your mapping and use the .value, .condition, .ignore. See the examples and documentation below for more information.

### Example (inline)

	<html>
		<head>
			<title>AutoMap Examples</title>
		</head>
		<body>
			Testing Inline... Watch the console
			<script type="text/javascript" src="../src/index.js"></script>
			<script type="text/javascript">
				/** hold map keys */
				var MapKeys = {
					key1: 'carE=>carM',
					key2: 'Any1=>Any2'
				};
				
				/** create maps */
				AutoMap.CreateMap(MapKeys.key1)
					.forMember('carID').mapFrom('carID')
					.forMember('make').mapFrom('make')
					.forMember('model').mapFrom('model')
					.forMember('year').mapFrom('year');
				AutoMap.CreateMap(MapKeys.key2)
					.forMember('test1').mapFrom('test2')
					.forMember('test2').mapFrom('test3')
					.forMember('test3').mapFrom('test3').condition((source, destination) => { return false });
				
				/** create any objects and test */
				let any1 = { test1: 'value 1', test2: 'value 2', test3: { key: 'value' } };
				let any2 = { test1: 'value 1', test2: 'value 2', test3: 'Not Mapped' };
				let anyMapped = AutoMap.Map(MapKeys.key2, any1, any2);
				console.log(anyMapped);
			</script>
		</body>
	</html>

### Advanced Usage

For more advanced usage look at the example code in the repo under ./examples/src. Webpack was used to compile the code. The map keys, mapping, and models are all pulled in as separate modules.

# Documentation

### AutoMap.Mappings
An array of MapDef objects that is held in memory.

### AutoMap.MapDef (class)
Defines a mapping between a source type and destination type.

##### Properties
* mapKey: string;
  * A unique string to identify the mapping
* memberMaps: MemberMap[];
  * An array of MemberMap objects

##### Methods
* constructor(mapKey: string);
  * Initialize a new MapDef.
* forMember(destinationProperty: string): MemberMap;
  * Begins a member mapping for the designated destination property.

### AutoMap.MemberMap (class)
Create MemberMap with destinationProperty and MapDef.

##### Properties
* destinationProperty: string;
  * The destination property we're mapping to.
* sourceProperty: string;
  * The source property we're mapping from.
* mapDef: MapDef;
  * A reference to the MapDef object this MemberMap is a part of.
* ignored: boolean;
  * A flag indicating whether this destination property should be ignored in the mapping.
* valueExpr: (source: object, destination: object) => any;
  * An expression that will be evaluated and the value will be set to the destination property.
* valueExprRef: object;
  * The "this" reference that will be used in valueExpr. If null, the MapDef will be used.
* conditionExpr: (source: object, destination: object) => boolean;
  * A conditional expression that will be evaluated to decided if this destination property is ignored or mapped. If it returns false it will not be mapped.
* conditionExprRef: object;
  * The "this" reference that will be used in the conditionExpr. If null, the MapDef will be used.

##### Methods
* constructor(destinationProperty, mapDef);
  * Intialize a new MemberMap.
* mapFrom(sourceProperty): MemberMap;
  * Define the source entity property we are pulling the value from.
* value(expr: (source: object, destination: object) => any, ref = null): MemberMap;
  * Set an expression to derive the value from.
* condition(expr: (source: object, destination: object) => boolean, ref = null): MemberMap;
  * Set a conditional expression that will cause the property to be mapped if the condition returns true.
* ignore(): MemberMap;
  * Ignore this destination property.
* forMember(destinationProperty): MemberMap;
  * Creates a new MemberMap on the current MapDef and returns that new MemberMap;

### AutoMap Functions

##### AutoMap.CreateMap(mapKey: string): MapDef; 
Creates a new MapDef object and sets it in memory, and returns it.

	var mapDef = AutoMap.CreateMap('entity1=>entity2');

##### AutoMap.Map(mapKey: string, source: object, destination: object): object;
Uses the supplied mapKey to find the mapping in memory, then sets values on the destination object according to the defined mapping. If no mapping is found for the mapKey, the destination object is returned untouched. 

**NOTE**: If the destination object has properties that do not exist on the source object, they are automatically ignored. Also, if a property was not explicitly mapped, and the destination property is named the exact same name as a source property, it will automatically be mapped. 

**NOTE**: The Map function runs through three steps.
1. Check the ignored flag. If the property is ignored, no further logic is executed.
2. Check for the conditionExpr. If it is set and evaluates to false, no further logic is executed.
3. Check for the valueExpr. If it is set, it will be evaluated and the result will be set to the destination property value. No further logic is executed.
4. The value of the destination property is set to the value of the source property.
