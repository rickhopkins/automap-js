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

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * AutoMap
 * AutoMap allows mapping of one entity to another
 */

/** export AutoMap */
(function (root, factory) {
	/** decide how to export it */
	if (true) {
		/** check for AMD */
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		/** check for Node, CommonJS */
		module.exports.AutoMap = factory();
	} else {
		// Browser global (root is window)
		root.AutoMap = factory();
	}
})(typeof window !== "undefined" ? window : this, function () {
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
	MemberMap.prototype.mapFrom = function (sourceProperty) {
		this.sourceProperty = sourceProperty;
		return this;
	};

	/**
  * Set an expression to derive the value from
  * @param {(source: object, destination: object) => any} expr The value expression
  * @param {object} ref The "this" reference that will be used in the value expression
  * @return {MemberMap}
  */
	MemberMap.prototype.value = function (expr) {
		var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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
	MemberMap.prototype.condition = function (expr) {
		var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		this.conditionExpr = expr;
		this.conditionExprRef = ref;
		return this;
	};

	/**
  * Ignore this property
  * @return {MemberMap}
  */
	MemberMap.prototype.ignore = function () {
		this.ignored = true;
		return this;
	};

	/**
  * A chainable method for continuing to map destination properties
  * @param {string} destinationProperty The destination property name we want to begin a new mapping for
  * @return {MemberMap}
  */
	MemberMap.prototype.forMember = function (destinationProperty) {
		var memberMap = this.mapDef.forMember(destinationProperty);
		return memberMap;
	};

	/**
  * Is this destination property being ignored?
  * @return {boolean}
  */
	MemberMap.prototype.isIgnored = function () {
		return this.ignored;
	};

	/**
  * Get the conditional expression
  * @return {(source: object, destination: object) => boolean}
  */
	MemberMap.prototype.getConditionExpr = function () {
		return this.conditionExpr;
	};

	/**
  * Get the value expression
  * @return {(source: object, destination: object) => any}
  */
	MemberMap.prototype.getValueExpr = function () {
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
	MapDef.prototype.forMember = function (destinationProperty) {
		/** create a member map */
		var memberMap = new MemberMap(destinationProperty, this);

		/** create the member map */
		this.memberMaps.push(memberMap);

		/** return self */
		return memberMap;
	};

	/**
  * Create a Mapping Definition
  * @param {string} mapKey A unique key defining a mapping between objects
  * @return {MapDef}
  */
	function CreateMap(mapKey) {
		/** create the map */
		var map = new MapDef(mapKey);

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
		var mapping = Mappings.find(function (def) {
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
			if (m.getConditionExpr() !== null && !m.getConditionExpr().call(m.conditionExprRef || this, source, destination)) return;
			if (m.getValueExpr() !== null) {
				/** execute value expression and set value */
				destination[m.destinationProperty] = m.getValueExpr().call(m.valueExprRef || this, source, destination);
				return;
			}

			/** check the value type */
			if (['string', 'number', 'boolean'].includes(_typeof(source[m.sourceProperty]))) destination[m.destinationProperty] = source[m.sourceProperty];else destination[m.destinationProperty] = JSON.parse(JSON.stringify(source[m.sourceProperty]));
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapKeys; });
var MapKeys = {
	key1: 'carE=>carM',
	key2: 'Any1=>Any2'
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map_keys__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapping__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__car_entity__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__car_model__ = __webpack_require__(5);






/** create car objects and test */
var carE = new __WEBPACK_IMPORTED_MODULE_3__car_entity__["a" /* CarEntity */]();
carE.carID = 1;
carE.make = 'Toyota';
carE.model = 'Corolla';
carE.year = 2010;

var carM = new __WEBPACK_IMPORTED_MODULE_4__car_model__["a" /* CarModel */]();
carM.carID = 0;
carM.make = '';
carM.model = '';
carM.year = 0;
carM.color = 'blue';

var carMMapped = __WEBPACK_IMPORTED_MODULE_0__src___default.a.Map(__WEBPACK_IMPORTED_MODULE_1__map_keys__["a" /* MapKeys */].key1, carE, carM);
console.log(carMMapped);

/** create any objects and test */
var any1 = { test1: 'value 1', test2: 'value 2', test3: { key: 'value' } };
var any2 = { test1: 'value 1', test2: 'value 2', test3: 'Not Mapped' };

var anyMapped = __WEBPACK_IMPORTED_MODULE_0__src___default.a.Map(__WEBPACK_IMPORTED_MODULE_1__map_keys__["a" /* MapKeys */].key2, any1, any2);
console.log(anyMapped);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map_keys__ = __webpack_require__(1);



/* unused harmony default export */ var _unused_webpack_default_export = ({
	/** create maps */
	map1: __WEBPACK_IMPORTED_MODULE_0__src___default.a.CreateMap(__WEBPACK_IMPORTED_MODULE_1__map_keys__["a" /* MapKeys */].key1).forMember('carID').mapFrom('carID').forMember('make').mapFrom('make').forMember('model').mapFrom('model').forMember('year').mapFrom('year'),
	map2: __WEBPACK_IMPORTED_MODULE_0__src___default.a.CreateMap(__WEBPACK_IMPORTED_MODULE_1__map_keys__["a" /* MapKeys */].key2).forMember('test1').mapFrom('test2').forMember('test2').mapFrom('test3').forMember('test3').mapFrom('test3').condition(function (source, destination) {
		return true;
	})
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarEntity; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarEntity = function CarEntity() {
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarModel; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarModel = function CarModel() {
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