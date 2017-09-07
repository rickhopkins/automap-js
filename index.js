/**
 * @module AutoMap
 * AutoMap allows mapping of one entity to another
 */

const AutoMap = {
	/**
	 * Mappings is an array of MapDef objects held in memory
	 * @type {MapDef[]} An array of MapDef
	 */
	Mappings: [],

	/**
	 * @class MemberMap 
	 * Defines a mapping between a destination property and a source property
	 */
	MemberMap: class {
		/**
		 * Create MemberMap with destinationProperty and MapDef
		 * @param {string} destinationProperty The destination property name we are mapping
		 * @param {AutoMap.MapDef} mapDef The MapDef object
		 */
		constructor(destinationProperty, mapDef) {
			/** @member {string} The destination property name */
			this.destinationProperty = destinationProperty;
		
			/** @member {string} The source property name */
			this.sourceProperty = null;
	
			/** @member {AutoMap.MapDef} A MapDef object for continuing defining MemberMaps on the current mapping */
			this.mapDef = mapDef;
	
			/** @member {boolean} Boolean indicating whether this destination property is ignored */
			this.ignored = false;
	
			/** @member {(source: object, destination: object) => any} A value expression that will be executed to get the value for the destination property */
			this.valueExpr = null;
	
			/** @member {object} The "this" reference that will be used in the valueExpr. If null, the MapDef will be used */
			this.valueExprRef = null;
	
			/** @member {(source: object, destination: object) => boolean} A conditional expression that will be executed to decide whether the property is mapped or ignored */
			this.conditionExpr = null;
	
			/** @member {object} The "this" reference that will be used in the conditionExpr. If null, the MapDef will be used */
			this.conditionExprRef = null;
		}

		/**
		 * Set the source property we are mapping from
		 * @param {string} sourceProperty The source property name we are mapping to
		 * @return {AutoMap.MemberMap}
		 */
		mapFrom(sourceProperty) {
			this.sourceProperty = sourceProperty;
			return this;
		};

		/**
		 * Set an expression to derive the value from
		 * @param {(source: object, destination: object) => any} expr The value expression
		 * @param {object} ref The "this" reference that will be used in the value expression
		 * @return {AutoMap.MemberMap}
		 */
		value(expr, ref = null) {
			this.valueExpr = expr;
			this.valueExprRef = ref;
			return this;
		}
		
		/**
		 * Set a conditional expression that will cause the property to be mapped if the condition returns true
		 * @param {(source: object, destination: object) => boolean} expr The conditional expression
		 * @param {object} ref The "this" reference that will be used in the conditional expression
		 * @return {AutoMap.MemberMap}
		 */
		condition(expr, ref = null) {
			this.conditionExpr = expr;
			this.conditionExprRef = ref;
			return this;
		}

		/**
		 * Ignore this property
		 * @return {AutoMap.MemberMap}
		 */
		ignore() {
			this.ignored = true;
			return this;
		}

		/**
		 * A chainable method for continuing to map destination properties
		 * @param {string} destinationProperty The destination property name we want to begin a new mapping for
		 * @return {AutoMap.MemberMap}
		 */
		forMember(destinationProperty) {
			let memberMap = this.mapDef.forMember(destinationProperty);
			return memberMap;
		}

		/**
		 * Is this destination property being ignored?
		 * @return {boolean}
		 */
		isIgnored() {
			return this.ignored;
		}

		/**
		 * Get the conditional expression
		 * @return {(source: object, destination: object) => boolean}
		 */
		getConditionExpr() {
			return this.conditionExpr;
		}

		/**
		 * Get the value expression
		 * @return {(source: object, destination: object) => any}
		 */
		getValueExpr() {
			return this.valueExpr;
		}
	},

	/**
	 * @class MapDef
	 * Defines a mapping between a source type and destination type
	 */
	MapDef: class {
		/**
		 * Create a MapDef object
		 * @param {string} mapKey A unique key defining a mapping between objects
		 */
		constructor(mapKey) {
			/** @member {string} A unique key defining a mapping between objects */
			this.mapKey = mapKey;

			/** @member {AutoMap.MemberMap[]} An array of MemberMap objects */
			this.memberMaps = [];
		}

		/**
		 * Begin a property map between the destination property and source property
		 * @param {string} destinationProperty The name of the destination property
		 * @param {string} sourceProperty The name of the source property
		 */
		forMember(destinationProperty) {
			/** create a member map */
			let memberMap = new AutoMap.MemberMap(destinationProperty, this);

			/** create the member map */
			this.memberMaps.push(memberMap);

			/** return self */
			return memberMap;
		}
	},

	/**
	 * Create a Mapping Definition
	 * @param {string} mapKey A unique key defining a mapping between objects
	 * @return {AutoMap.MapDef}
	 */
	CreateMap: (mapKey) => {
		/** create the map */
		let map = new AutoMap.MapDef(mapKey);

		/** add to the mappings */
		AutoMap.Mappings.push(map);

		/** return map */
		return map;
	},

	/**
	 * Map a source object to a destination object
	 * @param {string} mapKey The unique key of the MapDef we are using
	 * @param {object} source The source object
	 * @param {object} destination The destination object
	 * @return {object} The modified destination object
	 */
	Map: (mapKey, source, destination) => {
		/** find the correct mapping */
		let mapping = AutoMap.Mappings.find(def => {
			return mapKey === def.mapKey;
		});

		/** check for the mapping match */
		if (!mapping || mapping === null) return destination;

		/** get the keys */
		let sourceKeys = Object.keys(source);
		let destinationKeys = Object.keys(destination);
		let mappedProperties = mapping.memberMaps.map(m => m.destinationProperty);

		/** cycle through destination keys */
		destinationKeys.forEach(k => {
			if (!sourceKeys.includes(k)) mapping.forMember(k).ignore();
			if (!mappedProperties.includes(k) && sourceKeys.indexOf(k) > -1) {
				mapping.forMember(k).mapFrom(k);
			}
		});

		/** execute member maps */
		mapping.memberMaps.forEach(m => {
			/** check ignored and expressions */
			if (m.isIgnored()) return;
			if (m.getConditionExpr() !== null && !m.getConditionExpr().call((m.conditionExprRef || this), source, destination)) return;
			if (m.getValueExpr() !== null) {
				/** execute value expression and set value */
				destination[m.destinationProperty] = m.getValueExpr().call((m.valueExprRef || this), source, destination);
				return;
			}

			/** check the value type */
			if (['string', 'number', 'boolean'].includes(typeof(source[m.sourceProperty]))) destination[m.destinationProperty] = source[m.sourceProperty];
			else destination[m.destinationProperty] = JSON.parse(JSON.stringify(source[m.sourceProperty]));
		});

		/** return the destination */
		return destination;
	}
};

/** export the AutoMap object */
export default AutoMap;