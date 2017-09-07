/**
 * AutoMap
 * AutoMap allows mapping of one entity to another
 */

/** export AutoMap */
(function(root, factory){
	/** decide how to export it */
	if (typeof define === 'function' && define.amd) { /** check for AMD */
		define('AutoMap', factory);
	} else if (typeof exports === 'object') { /** check for Node, CommonJS */
		module.exports.AutoMap = factory();
	} else { // Browser global (root is window)
		root.AutoMap = factory();
	}
})(typeof window !== "undefined" ? window : this, function() {
	'use strict';

	/**
	 * Mappings is an array of MapDef objects held in memory
	 * @type {MapDef[]} An array of MapDef
	 */
	var Mappings = [];

	/**
	 * @class MemberMap 
	 * Create MemberMap with destinationProperty and MapDef
	 * @param {string} destinationProperty The destination property name we are mapping
	 * @param {MapDef} mapDef The MapDef object
	 */
	function MemberMap(destinationProperty, mapDef) {
		/** @member {string} The destination property name */
		this.destinationProperty = destinationProperty;
	
		/** @member {string} The source property name */
		this.sourceProperty = null;

		/** @member {MapDef} A MapDef object for continuing defining MemberMaps on the current mapping */
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
	 * @return {MemberMap}
	 */
	MemberMap.prototype.mapFrom = function(sourceProperty) {
		this.sourceProperty = sourceProperty;
		return this;
	};

	/**
	 * Set an expression to derive the value from
	 * @param {(source: object, destination: object) => any} expr The value expression
	 * @param {object} ref The "this" reference that will be used in the value expression
	 * @return {MemberMap}
	 */
	MemberMap.prototype.value = function(expr, ref = null) {
		this.valueExpr = expr;
		this.valueExprRef = ref;
		return this;
	};
		
	/**
	 * Set a conditional expression that will cause the property to be mapped if the condition returns true
	 * @param {(source: object, destination: object) => boolean} expr The conditional expression
	 * @param {object} ref The "this" reference that will be used in the conditional expression
	 * @return {MemberMap}
	 */
	MemberMap.prototype.condition = function(expr, ref = null) {
		this.conditionExpr = expr;
		this.conditionExprRef = ref;
		return this;
	};

	/**
	 * Ignore this property
	 * @return {MemberMap}
	 */
	MemberMap.prototype.ignore = function() {
		this.ignored = true;
		return this;
	};

	/**
	 * A chainable method for continuing to map destination properties
	 * @param {string} destinationProperty The destination property name we want to begin a new mapping for
	 * @return {MemberMap}
	 */
	MemberMap.prototype.forMember = function(destinationProperty) {
		let memberMap = this.mapDef.forMember(destinationProperty);
		return memberMap;
	};

	/**
	 * Is this destination property being ignored?
	 * @return {boolean}
	 */
	MemberMap.prototype.isIgnored = function() {
		return this.ignored;
	};

	/**
	 * Get the conditional expression
	 * @return {(source: object, destination: object) => boolean}
	 */
	MemberMap.prototype.getConditionExpr = function() {
		return this.conditionExpr;
	};

	/**
	 * Get the value expression
	 * @return {(source: object, destination: object) => any}
	 */
	MemberMap.prototype.getValueExpr = function() {
		return this.valueExpr;
	};

	/**
	 * @class MapDef
	 * Defines a mapping between a source type and destination type
	 * @param {string} mapKey A unique key defining a mapping between objects
	 */
	function MapDef(mapKey) {
		/** @member {string} A unique key defining a mapping between objects */
		this.mapKey = mapKey;

		/** @member {MemberMap[]} An array of MemberMap objects */
		this.memberMaps = [];
	}

	/**
	 * Begin a property map between the destination property and source property
	 * @param {string} destinationProperty The name of the destination property
	 * @param {string} sourceProperty The name of the source property
	 */
	MapDef.prototype.forMember = function(destinationProperty) {
		/** create a member map */
		let memberMap = new MemberMap(destinationProperty, this);
		
		/** create the member map */
		this.memberMaps.push(memberMap);

		/** return self */
		return memberMap;
	}

	/**
	 * Create a Mapping Definition
	 * @param {string} mapKey A unique key defining a mapping between objects
	 * @return {MapDef}
	 */
	function CreateMap(mapKey) {
		/** create the map */
		let map = new MapDef(mapKey);

		/** add to the mappings */
		Mappings.push(map);

		/** return map */
		return map;
	}

	/**
	 * Map a source object to a destination object
	 * @param {string} mapKey The unique key of the MapDef we are using
	 * @param {object} source The source object
	 * @param {object} destination The destination object
	 * @return {object} The modified destination object
	 */
	function Map(mapKey, source, destination) {
		/** find the correct mapping */
		let mapping = Mappings.find(function(def) {
			return mapKey === def.mapKey;
		});

		/** check for the mapping match */
		if (!mapping || mapping === null) return destination;

		/** get the keys */
		let sourceKeys = Object.keys(source);
		let destinationKeys = Object.keys(destination);
		let mappedProperties = mapping.memberMaps.map(function(m) { return m.destinationProperty; });

		/** cycle through destination keys */
		destinationKeys.forEach(function(k) {
			if (!sourceKeys.includes(k)) mapping.forMember(k).ignore();
			if (!mappedProperties.includes(k) && sourceKeys.indexOf(k) > -1) {
				mapping.forMember(k).mapFrom(k);
			}
		});

		/** execute member maps */
		mapping.memberMaps.forEach(function(m) {
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

	/** create AutoMap object */
	return {
		Mappings: Mappings,
		MemberMap: MemberMap,
		MapDef: MapDef,
		CreateMap: CreateMap,
		Map: Map
	};
});