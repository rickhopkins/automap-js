!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a={Mappings:[],MemberMap:function(){function e(t,r){n(this,e),this.destinationProperty=t,this.sourceProperty=null,this.mapDef=r,this.ignored=!1,this.valueExpr=null,this.valueExprRef=null,this.conditionExpr=null,this.conditionExprRef=null}return i(e,[{key:"mapFrom",value:function(e){return this.sourceProperty=e,this}},{key:"value",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return this.valueExpr=e,this.valueExprRef=t,this}},{key:"condition",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return this.conditionExpr=e,this.conditionExprRef=t,this}},{key:"ignore",value:function(){return this.ignored=!0,this}},{key:"forMember",value:function(e){return this.mapDef.forMember(e)}},{key:"isIgnored",value:function(){return this.ignored}},{key:"getConditionExpr",value:function(){return this.conditionExpr}},{key:"getValueExpr",value:function(){return this.valueExpr}}]),e}(),MapDef:function(){function e(t){n(this,e),this.mapKey=t,this.memberMaps=[]}return i(e,[{key:"forMember",value:function(e){var t=new a.MemberMap(e,this);return this.memberMaps.push(t),t}}]),e}(),CreateMap:function(e){var t=new a.MapDef(e);return a.Mappings.push(t),t},Map:function(e,t,r){var n=a.Mappings.find(function(t){return e===t.mapKey});if(!n||null===n)return r;var i=Object.keys(t),u=Object.keys(r),s=n.memberMaps.map(function(e){return e.destinationProperty});return u.forEach(function(e){i.includes(e)||n.forMember(e).ignore(),!s.includes(e)&&i.indexOf(e)>-1&&n.forMember(e).mapFrom(e)}),n.memberMaps.forEach(function(e){if(!e.isIgnored()&&(null===e.getConditionExpr()||e.getConditionExpr().call(e.conditionExprRef||void 0,t,r)))return null!==e.getValueExpr()?void(r[e.destinationProperty]=e.getValueExpr().call(e.valueExprRef||void 0,t,r)):void(["string","number","boolean"].includes(o(t[e.sourceProperty]))?r[e.destinationProperty]=t[e.sourceProperty]:r[e.destinationProperty]=JSON.parse(JSON.stringify(t[e.sourceProperty])))}),r}};t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.MapKeys={key1:"carE=>carM",key2:"Any1=>Any2"}},function(e,t,r){"use strict";var n=r(0),o=function(e){return e&&e.__esModule?e:{default:e}}(n),i=r(1);r(3);var a=r(4),u=r(5),s=new a.CarEntity;s.carID=1,s.make="Toyota",s.model="Corolla",s.year=2010;var l=new u.CarModel;l.carID=0,l.make="",l.model="",l.year=0,l.color="blue";var c=o.default.Map(i.MapKeys.key1,s,l);console.log(c);var f={test1:"value 1",test2:"value 2",test3:{key:"value"}},p={test1:"value 1",test2:"value 2",test3:"Not Mapped"},y=o.default.Map(i.MapKeys.key2,f,p);console.log(y)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=function(e){return e&&e.__esModule?e:{default:e}}(n),i=r(1);t.default={map1:o.default.CreateMap(i.MapKeys.key1).forMember("carID").mapFrom("carID").forMember("make").mapFrom("make").forMember("model").mapFrom("model").forMember("year").mapFrom("year"),map2:o.default.CreateMap(i.MapKeys.key2).forMember("test1").mapFrom("test2").forMember("test2").mapFrom("test3").forMember("test3").mapFrom("test3").condition(function(e,t){return!0})}},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});t.CarEntity=function e(){n(this,e),this.carID=0,this.make="",this.model="",this.year=0}},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});t.CarModel=function e(){n(this,e),this.carID=0,this.make="",this.model="",this.year=0,this.color=""}}]);