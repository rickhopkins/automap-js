/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @module AutoMap
 * AutoMap allows mapping of one entity to another
 */

var AutoMap = exports.AutoMap = {
	/**
  * Mappings is an array of MapDef objects held in memory
  * @type {MapDef[]} An array of MapDef
  */
	Mappings: [],

	/**
  * @class MemberMap 
  * Defines a mapping between a destination property and a source property
  */
	MemberMap: function () {
		/**
   * Create MemberMap with destinationProperty and MapDef
   * @param {string} destinationProperty The destination property name we are mapping
   * @param {AutoMap.MapDef} mapDef The MapDef object
   */
		function MemberMap(destinationProperty, mapDef) {
			_classCallCheck(this, MemberMap);

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


		_createClass(MemberMap, [{
			key: 'mapFrom',
			value: function mapFrom(sourceProperty) {
				this.sourceProperty = sourceProperty;
				return this;
			}
		}, {
			key: 'value',


			/**
    * Set an expression to derive the value from
    * @param {(source: object, destination: object) => any} expr The value expression
    * @param {object} ref The "this" reference that will be used in the value expression
    * @return {AutoMap.MemberMap}
    */
			value: function value(expr) {
				var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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

		}, {
			key: 'condition',
			value: function condition(expr) {
				var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				this.conditionExpr = expr;
				this.conditionExprRef = ref;
				return this;
			}

			/**
    * Ignore this property
    * @return {AutoMap.MemberMap}
    */

		}, {
			key: 'ignore',
			value: function ignore() {
				this.ignored = true;
				return this;
			}

			/**
    * A chainable method for continuing to map destination properties
    * @param {string} destinationProperty The destination property name we want to begin a new mapping for
    * @return {AutoMap.MemberMap}
    */

		}, {
			key: 'forMember',
			value: function forMember(destinationProperty) {
				var memberMap = this.mapDef.forMember(destinationProperty);
				return memberMap;
			}

			/**
    * Is this destination property being ignored?
    * @return {boolean}
    */

		}, {
			key: 'isIgnored',
			value: function isIgnored() {
				return this.ignored;
			}

			/**
    * Get the conditional expression
    * @return {(source: object, destination: object) => boolean}
    */

		}, {
			key: 'getConditionExpr',
			value: function getConditionExpr() {
				return this.conditionExpr;
			}

			/**
    * Get the value expression
    * @return {(source: object, destination: object) => any}
    */

		}, {
			key: 'getValueExpr',
			value: function getValueExpr() {
				return this.valueExpr;
			}
		}]);

		return MemberMap;
	}(),

	/**
  * @class MapDef
  * Defines a mapping between a source type and destination type
  */
	MapDef: function () {
		/**
   * Create a MapDef object
   * @param {string} mapKey A unique key defining a mapping between objects
   */
		function MapDef(mapKey) {
			_classCallCheck(this, MapDef);

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


		_createClass(MapDef, [{
			key: 'forMember',
			value: function forMember(destinationProperty) {
				/** create a member map */
				var memberMap = new AutoMap.MemberMap(destinationProperty, this);

				/** create the member map */
				this.memberMaps.push(memberMap);

				/** return self */
				return memberMap;
			}
		}]);

		return MapDef;
	}(),

	/**
  * Create a Mapping Definition
  * @param {string} mapKey A unique key defining a mapping between objects
  * @return {AutoMap.MapDef}
  */
	CreateMap: function CreateMap(mapKey) {
		/** create the map */
		var map = new AutoMap.MapDef(mapKey);

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
	Map: function Map(mapKey, source, destination) {
		/** find the correct mapping */
		var mapping = AutoMap.Mappings.find(function (def) {
			return mapKey === def.mapKey;
		});

		/** check for the mapping match */
		if (!mapping || mapping === null) return destination;

		/** get the keys */
		var sourceKeys = Object.keys(source);
		var destinationKeys = Object.keys(destination);
		var mappedProperties = mapping.memberMaps.map(function (m) {
			return m.destinationProperty;
		});

		/** cycle through destination keys */
		destinationKeys.forEach(function (k) {
			if (!sourceKeys.includes(k)) mapping.forMember(k).ignore();
			if (!mappedProperties.includes(k) && sourceKeys.indexOf(k) > -1) {
				mapping.forMember(k).mapFrom(k);
			}
		});

		/** execute member maps */
		mapping.memberMaps.forEach(function (m) {
			/** check ignored and expressions */
			if (m.isIgnored()) return;
			if (m.getConditionExpr() !== null && !m.getConditionExpr().call(m.conditionExprRef || undefined, source, destination)) return;
			if (m.getValueExpr() !== null) {
				/** execute value expression and set value */
				destination[m.destinationProperty] = m.getValueExpr().call(m.valueExprRef || undefined, source, destination);
				return;
			}

			/** check the value type */
			if (['string', 'number', 'boolean'].includes(_typeof(source[m.sourceProperty]))) destination[m.destinationProperty] = source[m.sourceProperty];else destination[m.destinationProperty] = JSON.parse(JSON.stringify(source[m.sourceProperty]));
		});

		/** return the destination */
		return destination;
	}
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var MapKeys = exports.MapKeys = {
	key1: 'carE=>carM',
	key2: 'Any1=>Any2'
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

var _map = __webpack_require__(1);

__webpack_require__(3);

var _car = __webpack_require__(4);

var _car2 = __webpack_require__(5);

/** create car objects and test */
var carE = new _car.CarEntity();
carE.carID = 1;
carE.make = 'Toyota';
carE.model = 'Corolla';
carE.year = 2010;

var carM = new _car2.CarModel();
carM.carID = 0;
carM.make = '';
carM.model = '';
carM.year = 0;
carM.color = 'blue';

var carMMapped = _.AutoMap.Map(_map.MapKeys.key1, carE, carM);
console.log(carMMapped);

/** create any objects and test */
var any1 = { test1: 'value 1', test2: 'value 2', test3: { key: 'value' } };
var any2 = { test1: 'value 1', test2: 'value 2', test3: 'Not Mapped' };

var anyMapped = _.AutoMap.Map(_map.MapKeys.key2, any1, any2);
console.log(anyMapped);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ = __webpack_require__(0);

var _map = __webpack_require__(1);

exports.default = {
	/** create maps */
	map1: _.AutoMap.CreateMap(_map.MapKeys.key1).forMember('carID').mapFrom('carID').forMember('make').mapFrom('make').forMember('model').mapFrom('model').forMember('year').mapFrom('year'),
	map2: _.AutoMap.CreateMap(_map.MapKeys.key2).forMember('test1').mapFrom('test2').forMember('test2').mapFrom('test3').forMember('test3').mapFrom('test3').condition(function (source, destination) {
		return true;
	})
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarEntity = exports.CarEntity = function CarEntity() {
	_classCallCheck(this, CarEntity);

	/** @member {number} */
	this.carID = 0;

	/** @member {string} */
	this.make = '';

	/** @member {string} */
	this.model = '';

	/** @member {number} */
	this.year = 0;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarModel = exports.CarModel = function CarModel() {
	_classCallCheck(this, CarModel);

	/** @member {number} */
	this.carID = 0;

	/** @member {string} */
	this.make = '';

	/** @member {string} */
	this.model = '';

	/** @member {number} */
	this.year = 0;

	/** @member {string} */
	this.color = '';
};

/***/ })
/******/ ]);