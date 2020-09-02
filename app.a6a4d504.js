// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"vendors/ogl/src/math/functions/Vec3Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.length = length;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.scale = scale;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.transformMat4 = transformMat4;
exports.scaleRotateMat4 = scaleRotateMat4;
exports.transformMat3 = transformMat3;
exports.transformQuat = transformQuat;
exports.exactEquals = exactEquals;
exports.angle = void 0;
var EPSILON = 0.000001;
/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */


function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */


function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */


function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */


function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Same as above but doesn't apply translation.
 * Useful for rays.
 */


function scaleRotateMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */


function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */


function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var uvx = qy * z - qz * y;
  var uvy = qz * x - qx * z;
  var uvz = qx * y - qy * x;
  var uuvx = qy * uvz - qz * uvy;
  var uuvy = qz * uvx - qx * uvz;
  var uuvz = qx * uvy - qy * uvx;
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */


var angle = function () {
  var tempA = [0, 0, 0];
  var tempB = [0, 0, 0];
  return function (a, b) {
    copy(tempA, a);
    copy(tempB, b);
    normalize(tempA, tempA);
    normalize(tempB, tempB);
    var cosine = dot(tempA, tempB);

    if (cosine > 1.0) {
      return 0;
    } else if (cosine < -1.0) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  };
}();
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


exports.angle = angle;

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
},{}],"vendors/ogl/src/math/Vec3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec3 = void 0;

var Vec3Func = _interopRequireWildcard(require("./functions/Vec3Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Vec3 = /*#__PURE__*/function (_Array) {
  _inherits(Vec3, _Array);

  var _super = _createSuper(Vec3);

  function Vec3() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;

    _classCallCheck(this, Vec3);

    _this = _super.call(this, x, y, z);
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Vec3, [{
    key: "set",
    value: function set(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
      if (x.length) return this.copy(x);
      Vec3Func.set(this, x, y, z);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      Vec3Func.copy(this, v);
      return this;
    }
  }, {
    key: "add",
    value: function add(va, vb) {
      if (vb) Vec3Func.add(this, va, vb);else Vec3Func.add(this, this, va);
      return this;
    }
  }, {
    key: "sub",
    value: function sub(va, vb) {
      if (vb) Vec3Func.subtract(this, va, vb);else Vec3Func.subtract(this, this, va);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(v) {
      if (v.length) Vec3Func.multiply(this, this, v);else Vec3Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "divide",
    value: function divide(v) {
      if (v.length) Vec3Func.divide(this, this, v);else Vec3Func.scale(this, this, 1 / v);
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec3Func.inverse(this, v);
      return this;
    } // Can't use 'length' as Array.prototype uses it

  }, {
    key: "len",
    value: function len() {
      return Vec3Func.length(this);
    }
  }, {
    key: "distance",
    value: function distance(v) {
      if (v) return Vec3Func.distance(this, v);else return Vec3Func.length(this);
    }
  }, {
    key: "squaredLen",
    value: function squaredLen() {
      return Vec3Func.squaredLength(this);
    }
  }, {
    key: "squaredDistance",
    value: function squaredDistance(v) {
      if (v) return Vec3Func.squaredDistance(this, v);else return Vec3Func.squaredLength(this);
    }
  }, {
    key: "negate",
    value: function negate() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec3Func.negate(this, v);
      return this;
    }
  }, {
    key: "cross",
    value: function cross(va, vb) {
      if (vb) Vec3Func.cross(this, va, vb);else Vec3Func.cross(this, this, va);
      return this;
    }
  }, {
    key: "scale",
    value: function scale(v) {
      Vec3Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      Vec3Func.normalize(this, this);
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return Vec3Func.dot(this, v);
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return Vec3Func.exactEquals(this, v);
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(mat4) {
      Vec3Func.transformMat4(this, this, mat4);
      return this;
    }
  }, {
    key: "scaleRotateMatrix4",
    value: function scaleRotateMatrix4(mat4) {
      Vec3Func.scaleRotateMat4(this, this, mat4);
      return this;
    }
  }, {
    key: "applyQuaternion",
    value: function applyQuaternion(q) {
      Vec3Func.transformQuat(this, this, q);
      return this;
    }
  }, {
    key: "angle",
    value: function angle(v) {
      return Vec3Func.angle(this, v);
    }
  }, {
    key: "lerp",
    value: function lerp(v, t) {
      Vec3Func.lerp(this, this, v, t);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec3(this[0], this[1], this[2]);
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      return a;
    }
  }, {
    key: "transformDirection",
    value: function transformDirection(mat4) {
      var x = this[0];
      var y = this[1];
      var z = this[2];
      this[0] = mat4[0] * x + mat4[4] * y + mat4[8] * z;
      this[1] = mat4[1] * x + mat4[5] * y + mat4[9] * z;
      this[2] = mat4[2] * x + mat4[6] * y + mat4[10] * z;
      return this.normalize();
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
    }
  }, {
    key: "z",
    get: function get() {
      return this[2];
    },
    set: function set(v) {
      this[2] = v;
    }
  }]);

  return Vec3;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Vec3 = Vec3;
},{"./functions/Vec3Func.js":"vendors/ogl/src/math/functions/Vec3Func.js"}],"vendors/ogl/src/core/Renderer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Renderer = void 0;

var _Vec = require("../math/Vec3.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: Handle context loss https://www.khronos.org/webgl/wiki/HandlingContextLost
// Not automatic - devs to use these methods manually
// gl.colorMask( colorMask, colorMask, colorMask, colorMask );
// gl.clearColor( r, g, b, a );
// gl.stencilMask( stencilMask );
// gl.stencilFunc( stencilFunc, stencilRef, stencilMask );
// gl.stencilOp( stencilFail, stencilZFail, stencilZPass );
// gl.clearStencil( stencil );
var tempVec3 = new _Vec.Vec3();
var ID = 1;

var Renderer = /*#__PURE__*/function () {
  function Renderer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$canvas = _ref.canvas,
        canvas = _ref$canvas === void 0 ? document.createElement('canvas') : _ref$canvas,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 300 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 150 : _ref$height,
        _ref$dpr = _ref.dpr,
        dpr = _ref$dpr === void 0 ? 1 : _ref$dpr,
        _ref$alpha = _ref.alpha,
        alpha = _ref$alpha === void 0 ? false : _ref$alpha,
        _ref$depth = _ref.depth,
        depth = _ref$depth === void 0 ? true : _ref$depth,
        _ref$stencil = _ref.stencil,
        stencil = _ref$stencil === void 0 ? false : _ref$stencil,
        _ref$antialias = _ref.antialias,
        antialias = _ref$antialias === void 0 ? false : _ref$antialias,
        _ref$premultipliedAlp = _ref.premultipliedAlpha,
        premultipliedAlpha = _ref$premultipliedAlp === void 0 ? false : _ref$premultipliedAlp,
        _ref$preserveDrawingB = _ref.preserveDrawingBuffer,
        preserveDrawingBuffer = _ref$preserveDrawingB === void 0 ? false : _ref$preserveDrawingB,
        _ref$powerPreference = _ref.powerPreference,
        powerPreference = _ref$powerPreference === void 0 ? 'default' : _ref$powerPreference,
        _ref$autoClear = _ref.autoClear,
        autoClear = _ref$autoClear === void 0 ? true : _ref$autoClear,
        _ref$webgl = _ref.webgl,
        webgl = _ref$webgl === void 0 ? 2 : _ref$webgl;

    _classCallCheck(this, Renderer);

    var attributes = {
      alpha: alpha,
      depth: depth,
      stencil: stencil,
      antialias: antialias,
      premultipliedAlpha: premultipliedAlpha,
      preserveDrawingBuffer: preserveDrawingBuffer,
      powerPreference: powerPreference
    };
    this.dpr = dpr;
    this.alpha = alpha;
    this.color = true;
    this.depth = depth;
    this.stencil = stencil;
    this.premultipliedAlpha = premultipliedAlpha;
    this.autoClear = autoClear;
    this.id = ID++; // Attempt WebGL2 unless forced to 1, if not supported fallback to WebGL1

    if (webgl === 2) this.gl = canvas.getContext('webgl2', attributes);
    this.isWebgl2 = !!this.gl;

    if (!this.gl) {
      this.gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
    } // Attach renderer to gl so that all classes have access to internal state functions


    this.gl.renderer = this; // initialise size values

    this.setSize(width, height); // gl state stores to avoid redundant calls on methods used internally

    this.state = {};
    this.state.blendFunc = {
      src: this.gl.ONE,
      dst: this.gl.ZERO
    };
    this.state.blendEquation = {
      modeRGB: this.gl.FUNC_ADD
    };
    this.state.cullFace = null;
    this.state.frontFace = this.gl.CCW;
    this.state.depthMask = true;
    this.state.depthFunc = this.gl.LESS;
    this.state.premultiplyAlpha = false;
    this.state.flipY = false;
    this.state.unpackAlignment = 4;
    this.state.framebuffer = null;
    this.state.viewport = {
      width: null,
      height: null
    };
    this.state.textureUnits = [];
    this.state.activeTextureUnit = 0;
    this.state.boundBuffer = null;
    this.state.uniformLocations = new Map(); // store requested extensions

    this.extensions = {}; // Initialise extra format types

    if (this.isWebgl2) {
      this.getExtension('EXT_color_buffer_float');
      this.getExtension('OES_texture_float_linear');
    } else {
      this.getExtension('OES_texture_float');
      this.getExtension('OES_texture_float_linear');
      this.getExtension('OES_texture_half_float');
      this.getExtension('OES_texture_half_float_linear');
      this.getExtension('OES_element_index_uint');
      this.getExtension('OES_standard_derivatives');
      this.getExtension('EXT_sRGB');
      this.getExtension('WEBGL_depth_texture');
      this.getExtension('WEBGL_draw_buffers');
    } // Create method aliases using extension (WebGL1) or native if available (WebGL2)


    this.vertexAttribDivisor = this.getExtension('ANGLE_instanced_arrays', 'vertexAttribDivisor', 'vertexAttribDivisorANGLE');
    this.drawArraysInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawArraysInstanced', 'drawArraysInstancedANGLE');
    this.drawElementsInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawElementsInstanced', 'drawElementsInstancedANGLE');
    this.createVertexArray = this.getExtension('OES_vertex_array_object', 'createVertexArray', 'createVertexArrayOES');
    this.bindVertexArray = this.getExtension('OES_vertex_array_object', 'bindVertexArray', 'bindVertexArrayOES');
    this.deleteVertexArray = this.getExtension('OES_vertex_array_object', 'deleteVertexArray', 'deleteVertexArrayOES');
    this.drawBuffers = this.getExtension('WEBGL_draw_buffers', 'drawBuffers', 'drawBuffersWEBGL'); // Store device parameters

    this.parameters = {};
    this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    this.parameters.maxAnisotropy = this.getExtension('EXT_texture_filter_anisotropic') ? this.gl.getParameter(this.getExtension('EXT_texture_filter_anisotropic').MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
  }

  _createClass(Renderer, [{
    key: "setSize",
    value: function setSize(width, height) {
      this.width = width;
      this.height = height;
      this.gl.canvas.width = width * this.dpr;
      this.gl.canvas.height = height * this.dpr;
      Object.assign(this.gl.canvas.style, {
        width: width + 'px',
        height: height + 'px'
      });
    }
  }, {
    key: "setViewport",
    value: function setViewport(width, height) {
      if (this.state.viewport.width === width && this.state.viewport.height === height) return;
      this.state.viewport.width = width;
      this.state.viewport.height = height;
      this.gl.viewport(0, 0, width, height);
    }
  }, {
    key: "enable",
    value: function enable(id) {
      if (this.state[id] === true) return;
      this.gl.enable(id);
      this.state[id] = true;
    }
  }, {
    key: "disable",
    value: function disable(id) {
      if (this.state[id] === false) return;
      this.gl.disable(id);
      this.state[id] = false;
    }
  }, {
    key: "setBlendFunc",
    value: function setBlendFunc(src, dst, srcAlpha, dstAlpha) {
      if (this.state.blendFunc.src === src && this.state.blendFunc.dst === dst && this.state.blendFunc.srcAlpha === srcAlpha && this.state.blendFunc.dstAlpha === dstAlpha) return;
      this.state.blendFunc.src = src;
      this.state.blendFunc.dst = dst;
      this.state.blendFunc.srcAlpha = srcAlpha;
      this.state.blendFunc.dstAlpha = dstAlpha;
      if (srcAlpha !== undefined) this.gl.blendFuncSeparate(src, dst, srcAlpha, dstAlpha);else this.gl.blendFunc(src, dst);
    }
  }, {
    key: "setBlendEquation",
    value: function setBlendEquation(modeRGB, modeAlpha) {
      if (this.state.blendEquation.modeRGB === modeRGB && this.state.blendEquation.modeAlpha === modeAlpha) return;
      this.state.blendEquation.modeRGB = modeRGB;
      this.state.blendEquation.modeAlpha = modeAlpha;
      if (modeAlpha !== undefined) this.gl.blendEquationSeparate(modeRGB, modeAlpha);else this.gl.blendEquation(modeRGB);
    }
  }, {
    key: "setCullFace",
    value: function setCullFace(value) {
      if (this.state.cullFace === value) return;
      this.state.cullFace = value;
      this.gl.cullFace(value);
    }
  }, {
    key: "setFrontFace",
    value: function setFrontFace(value) {
      if (this.state.frontFace === value) return;
      this.state.frontFace = value;
      this.gl.frontFace(value);
    }
  }, {
    key: "setDepthMask",
    value: function setDepthMask(value) {
      if (this.state.depthMask === value) return;
      this.state.depthMask = value;
      this.gl.depthMask(value);
    }
  }, {
    key: "setDepthFunc",
    value: function setDepthFunc(value) {
      if (this.state.depthFunc === value) return;
      this.state.depthFunc = value;
      this.gl.depthFunc(value);
    }
  }, {
    key: "activeTexture",
    value: function activeTexture(value) {
      if (this.state.activeTextureUnit === value) return;
      this.state.activeTextureUnit = value;
      this.gl.activeTexture(this.gl.TEXTURE0 + value);
    }
  }, {
    key: "bindFramebuffer",
    value: function bindFramebuffer() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$target = _ref2.target,
          target = _ref2$target === void 0 ? this.gl.FRAMEBUFFER : _ref2$target,
          _ref2$buffer = _ref2.buffer,
          buffer = _ref2$buffer === void 0 ? null : _ref2$buffer;

      if (this.state.framebuffer === buffer) return;
      this.state.framebuffer = buffer;
      this.gl.bindFramebuffer(target, buffer);
    }
  }, {
    key: "getExtension",
    value: function getExtension(extension, webgl2Func, extFunc) {
      // if webgl2 function supported, return func bound to gl context
      if (webgl2Func && this.gl[webgl2Func]) return this.gl[webgl2Func].bind(this.gl); // fetch extension once only

      if (!this.extensions[extension]) {
        this.extensions[extension] = this.gl.getExtension(extension);
      } // return extension if no function requested


      if (!webgl2Func) return this.extensions[extension]; // Return null if extension not supported

      if (!this.extensions[extension]) return null; // return extension function, bound to extension

      return this.extensions[extension][extFunc].bind(this.extensions[extension]);
    }
  }, {
    key: "sortOpaque",
    value: function sortOpaque(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      } else if (a.program.id !== b.program.id) {
        return a.program.id - b.program.id;
      } else if (a.zDepth !== b.zDepth) {
        return a.zDepth - b.zDepth;
      } else {
        return b.id - a.id;
      }
    }
  }, {
    key: "sortTransparent",
    value: function sortTransparent(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      }

      if (a.zDepth !== b.zDepth) {
        return b.zDepth - a.zDepth;
      } else {
        return b.id - a.id;
      }
    }
  }, {
    key: "sortUI",
    value: function sortUI(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      } else if (a.program.id !== b.program.id) {
        return a.program.id - b.program.id;
      } else {
        return b.id - a.id;
      }
    }
  }, {
    key: "getRenderList",
    value: function getRenderList(_ref3) {
      var scene = _ref3.scene,
          camera = _ref3.camera,
          frustumCull = _ref3.frustumCull,
          sort = _ref3.sort;
      var renderList = [];
      if (camera && frustumCull) camera.updateFrustum(); // Get visible

      scene.traverse(function (node) {
        if (!node.visible) return true;
        if (!node.draw) return;

        if (frustumCull && node.frustumCulled && camera) {
          if (!camera.frustumIntersectsMesh(node)) return;
        }

        renderList.push(node);
      });

      if (sort) {
        var opaque = [];
        var transparent = []; // depthTest true

        var ui = []; // depthTest false

        renderList.forEach(function (node) {
          // Split into the 3 render groups
          if (!node.program.transparent) {
            opaque.push(node);
          } else if (node.program.depthTest) {
            transparent.push(node);
          } else {
            ui.push(node);
          }

          node.zDepth = 0; // Only calculate z-depth if renderOrder unset and depthTest is true

          if (node.renderOrder !== 0 || !node.program.depthTest || !camera) return; // update z-depth

          node.worldMatrix.getTranslation(tempVec3);
          tempVec3.applyMatrix4(camera.projectionViewMatrix);
          node.zDepth = tempVec3.z;
        });
        opaque.sort(this.sortOpaque);
        transparent.sort(this.sortTransparent);
        ui.sort(this.sortUI);
        renderList = opaque.concat(transparent, ui);
      }

      return renderList;
    }
  }, {
    key: "render",
    value: function render(_ref4) {
      var scene = _ref4.scene,
          camera = _ref4.camera,
          _ref4$target = _ref4.target,
          target = _ref4$target === void 0 ? null : _ref4$target,
          _ref4$update = _ref4.update,
          update = _ref4$update === void 0 ? true : _ref4$update,
          _ref4$sort = _ref4.sort,
          sort = _ref4$sort === void 0 ? true : _ref4$sort,
          _ref4$frustumCull = _ref4.frustumCull,
          frustumCull = _ref4$frustumCull === void 0 ? true : _ref4$frustumCull,
          clear = _ref4.clear;

      if (target === null) {
        // make sure no render target bound so draws to canvas
        this.bindFramebuffer();
        this.setViewport(this.width * this.dpr, this.height * this.dpr);
      } else {
        // bind supplied render target and update viewport
        this.bindFramebuffer(target);
        this.setViewport(target.width, target.height);
      }

      if (clear || this.autoClear && clear !== false) {
        // Ensure depth buffer writing is enabled so it can be cleared
        if (this.depth && (!target || target.depth)) {
          this.enable(this.gl.DEPTH_TEST);
          this.setDepthMask(true);
        }

        this.gl.clear((this.color ? this.gl.COLOR_BUFFER_BIT : 0) | (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) | (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0));
      } // updates all scene graph matrices


      if (update) scene.updateMatrixWorld(); // Update camera separately, in case not in scene graph

      if (camera) camera.updateMatrixWorld(); // Get render list - entails culling and sorting

      var renderList = this.getRenderList({
        scene: scene,
        camera: camera,
        frustumCull: frustumCull,
        sort: sort
      });
      renderList.forEach(function (node) {
        node.draw({
          camera: camera
        });
      });
    }
  }]);

  return Renderer;
}();

exports.Renderer = Renderer;
},{"../math/Vec3.js":"vendors/ogl/src/math/Vec3.js"}],"Vendors/ogl/src/math/functions/Vec3Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.length = length;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.scale = scale;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.transformMat4 = transformMat4;
exports.scaleRotateMat4 = scaleRotateMat4;
exports.transformMat3 = transformMat3;
exports.transformQuat = transformQuat;
exports.exactEquals = exactEquals;
exports.angle = void 0;
var EPSILON = 0.000001;
/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */


function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */


function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */


function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */


function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Same as above but doesn't apply translation.
 * Useful for rays.
 */


function scaleRotateMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */


function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */


function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var uvx = qy * z - qz * y;
  var uvy = qz * x - qx * z;
  var uvz = qx * y - qy * x;
  var uuvx = qy * uvz - qz * uvy;
  var uuvy = qz * uvx - qx * uvz;
  var uuvz = qx * uvy - qy * uvx;
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */


var angle = function () {
  var tempA = [0, 0, 0];
  var tempB = [0, 0, 0];
  return function (a, b) {
    copy(tempA, a);
    copy(tempB, b);
    normalize(tempA, tempA);
    normalize(tempB, tempB);
    var cosine = dot(tempA, tempB);

    if (cosine > 1.0) {
      return 0;
    } else if (cosine < -1.0) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  };
}();
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


exports.angle = angle;

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
},{}],"Vendors/ogl/src/math/Vec3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec3 = void 0;

var Vec3Func = _interopRequireWildcard(require("./functions/Vec3Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Vec3 = /*#__PURE__*/function (_Array) {
  _inherits(Vec3, _Array);

  var _super = _createSuper(Vec3);

  function Vec3() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;

    _classCallCheck(this, Vec3);

    _this = _super.call(this, x, y, z);
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Vec3, [{
    key: "set",
    value: function set(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
      if (x.length) return this.copy(x);
      Vec3Func.set(this, x, y, z);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      Vec3Func.copy(this, v);
      return this;
    }
  }, {
    key: "add",
    value: function add(va, vb) {
      if (vb) Vec3Func.add(this, va, vb);else Vec3Func.add(this, this, va);
      return this;
    }
  }, {
    key: "sub",
    value: function sub(va, vb) {
      if (vb) Vec3Func.subtract(this, va, vb);else Vec3Func.subtract(this, this, va);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(v) {
      if (v.length) Vec3Func.multiply(this, this, v);else Vec3Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "divide",
    value: function divide(v) {
      if (v.length) Vec3Func.divide(this, this, v);else Vec3Func.scale(this, this, 1 / v);
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec3Func.inverse(this, v);
      return this;
    } // Can't use 'length' as Array.prototype uses it

  }, {
    key: "len",
    value: function len() {
      return Vec3Func.length(this);
    }
  }, {
    key: "distance",
    value: function distance(v) {
      if (v) return Vec3Func.distance(this, v);else return Vec3Func.length(this);
    }
  }, {
    key: "squaredLen",
    value: function squaredLen() {
      return Vec3Func.squaredLength(this);
    }
  }, {
    key: "squaredDistance",
    value: function squaredDistance(v) {
      if (v) return Vec3Func.squaredDistance(this, v);else return Vec3Func.squaredLength(this);
    }
  }, {
    key: "negate",
    value: function negate() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec3Func.negate(this, v);
      return this;
    }
  }, {
    key: "cross",
    value: function cross(va, vb) {
      if (vb) Vec3Func.cross(this, va, vb);else Vec3Func.cross(this, this, va);
      return this;
    }
  }, {
    key: "scale",
    value: function scale(v) {
      Vec3Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      Vec3Func.normalize(this, this);
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return Vec3Func.dot(this, v);
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return Vec3Func.exactEquals(this, v);
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(mat4) {
      Vec3Func.transformMat4(this, this, mat4);
      return this;
    }
  }, {
    key: "scaleRotateMatrix4",
    value: function scaleRotateMatrix4(mat4) {
      Vec3Func.scaleRotateMat4(this, this, mat4);
      return this;
    }
  }, {
    key: "applyQuaternion",
    value: function applyQuaternion(q) {
      Vec3Func.transformQuat(this, this, q);
      return this;
    }
  }, {
    key: "angle",
    value: function angle(v) {
      return Vec3Func.angle(this, v);
    }
  }, {
    key: "lerp",
    value: function lerp(v, t) {
      Vec3Func.lerp(this, this, v, t);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec3(this[0], this[1], this[2]);
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      return a;
    }
  }, {
    key: "transformDirection",
    value: function transformDirection(mat4) {
      var x = this[0];
      var y = this[1];
      var z = this[2];
      this[0] = mat4[0] * x + mat4[4] * y + mat4[8] * z;
      this[1] = mat4[1] * x + mat4[5] * y + mat4[9] * z;
      this[2] = mat4[2] * x + mat4[6] * y + mat4[10] * z;
      return this.normalize();
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
    }
  }, {
    key: "z",
    get: function get() {
      return this[2];
    },
    set: function set(v) {
      this[2] = v;
    }
  }]);

  return Vec3;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Vec3 = Vec3;
},{"./functions/Vec3Func.js":"Vendors/ogl/src/math/functions/Vec3Func.js"}],"Vendors/ogl/src/math/functions/Vec4Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.scale = scale;
exports.length = length;
exports.normalize = normalize;
exports.dot = dot;
exports.lerp = lerp;
var EPSILON = 0.000001;
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */


function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */


function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */


function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
},{}],"Vendors/ogl/src/math/functions/QuatFunc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = identity;
exports.setAxisAngle = setAxisAngle;
exports.multiply = multiply;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.slerp = slerp;
exports.invert = invert;
exports.conjugate = conjugate;
exports.fromMat3 = fromMat3;
exports.fromEuler = fromEuler;
exports.normalize = exports.length = exports.lerp = exports.dot = exports.scale = exports.add = exports.set = exports.copy = void 0;

var vec4 = _interopRequireWildcard(require("./Vec4Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/


function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Multiplies two quats
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */


function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


function rotateX(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


function rotateY(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


function rotateZ(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */


function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > 0.000001) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */


function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */


function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */


function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} euler Angles to rotate around each axis in degrees.
 * @param {String} order detailing order of operations. Default 'XYZ'.
 * @returns {quat} out
 * @function
 */


function fromEuler(out, euler) {
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'YXZ';
  var sx = Math.sin(euler[0] * 0.5);
  var cx = Math.cos(euler[0] * 0.5);
  var sy = Math.sin(euler[1] * 0.5);
  var cy = Math.cos(euler[1] * 0.5);
  var sz = Math.sin(euler[2] * 0.5);
  var cz = Math.cos(euler[2] * 0.5);

  if (order === 'XYZ') {
    out[0] = sx * cy * cz + cx * sy * sz;
    out[1] = cx * sy * cz - sx * cy * sz;
    out[2] = cx * cy * sz + sx * sy * cz;
    out[3] = cx * cy * cz - sx * sy * sz;
  } else if (order === 'YXZ') {
    out[0] = sx * cy * cz + cx * sy * sz;
    out[1] = cx * sy * cz - sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
  } else if (order === 'ZXY') {
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz + sx * sy * cz;
    out[3] = cx * cy * cz - sx * sy * sz;
  } else if (order === 'ZYX') {
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
  } else if (order === 'YZX') {
    out[0] = sx * cy * cz + cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz - sx * sy * sz;
  } else if (order === 'XZY') {
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz - sx * cy * sz;
    out[2] = cx * cy * sz + sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
  }

  return out;
}
/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */


var copy = vec4.copy;
/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */

exports.copy = copy;
var set = vec4.set;
/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */

exports.set = set;
var add = vec4.add;
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */

exports.add = add;
var scale = vec4.scale;
/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

exports.scale = scale;
var dot = vec4.dot;
/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */

exports.dot = dot;
var lerp = vec4.lerp;
/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */

exports.lerp = lerp;
var length = vec4.length;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

exports.length = length;
var normalize = vec4.normalize;
exports.normalize = normalize;
},{"./Vec4Func.js":"Vendors/ogl/src/math/functions/Vec4Func.js"}],"Vendors/ogl/src/math/Quat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Quat = void 0;

var QuatFunc = _interopRequireWildcard(require("./functions/QuatFunc.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Quat = /*#__PURE__*/function (_Array) {
  _inherits(Quat, _Array);

  var _super = _createSuper(Quat);

  function Quat() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck(this, Quat);

    _this = _super.call(this, x, y, z, w);

    _this.onChange = function () {};

    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Quat, [{
    key: "identity",
    value: function identity() {
      QuatFunc.identity(this);
      this.onChange();
      return this;
    }
  }, {
    key: "set",
    value: function set(x, y, z, w) {
      if (x.length) return this.copy(x);
      QuatFunc.set(this, x, y, z, w);
      this.onChange();
      return this;
    }
  }, {
    key: "rotateX",
    value: function rotateX(a) {
      QuatFunc.rotateX(this, this, a);
      this.onChange();
      return this;
    }
  }, {
    key: "rotateY",
    value: function rotateY(a) {
      QuatFunc.rotateY(this, this, a);
      this.onChange();
      return this;
    }
  }, {
    key: "rotateZ",
    value: function rotateZ(a) {
      QuatFunc.rotateZ(this, this, a);
      this.onChange();
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      QuatFunc.invert(this, q);
      this.onChange();
      return this;
    }
  }, {
    key: "conjugate",
    value: function conjugate() {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      QuatFunc.conjugate(this, q);
      this.onChange();
      return this;
    }
  }, {
    key: "copy",
    value: function copy(q) {
      QuatFunc.copy(this, q);
      this.onChange();
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      QuatFunc.normalize(this, q);
      this.onChange();
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(qA, qB) {
      if (qB) {
        QuatFunc.multiply(this, qA, qB);
      } else {
        QuatFunc.multiply(this, this, qA);
      }

      this.onChange();
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return QuatFunc.dot(this, v);
    }
  }, {
    key: "fromMatrix3",
    value: function fromMatrix3(matrix3) {
      QuatFunc.fromMat3(this, matrix3);
      this.onChange();
      return this;
    }
  }, {
    key: "fromEuler",
    value: function fromEuler(euler) {
      QuatFunc.fromEuler(this, euler, euler.order);
      return this;
    }
  }, {
    key: "fromAxisAngle",
    value: function fromAxisAngle(axis, a) {
      QuatFunc.setAxisAngle(this, axis, a);
      return this;
    }
  }, {
    key: "slerp",
    value: function slerp(q, t) {
      QuatFunc.slerp(this, this, q, t);
      return this;
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      this[3] = a[o + 3];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      a[o + 3] = this[3];
      return a;
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
      this.onChange();
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
      this.onChange();
    }
  }, {
    key: "z",
    get: function get() {
      return this[2];
    },
    set: function set(v) {
      this[2] = v;
      this.onChange();
    }
  }, {
    key: "w",
    get: function get() {
      return this[3];
    },
    set: function set(v) {
      this[3] = v;
      this.onChange();
    }
  }]);

  return Quat;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Quat = Quat;
},{"./functions/QuatFunc.js":"Vendors/ogl/src/math/functions/QuatFunc.js"}],"Vendors/ogl/src/math/functions/Mat4Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.scale = scale;
exports.rotate = rotate;
exports.getTranslation = getTranslation;
exports.getScaling = getScaling;
exports.getMaxScaleOnAxis = getMaxScaleOnAxis;
exports.fromRotationTranslationScale = fromRotationTranslationScale;
exports.fromQuat = fromQuat;
exports.perspective = perspective;
exports.ortho = ortho;
exports.targetTo = targetTo;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
exports.getRotation = void 0;
var EPSILON = 0.000001;
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */


function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */


function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */


function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/


function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */


function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (Math.abs(len) < EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}

function getMaxScaleOnAxis(mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  var x = m11 * m11 + m12 * m12 + m13 * m13;
  var y = m21 * m21 + m22 * m22 + m23 * m23;
  var z = m31 * m31 + m32 * m32 + m33 * m33;
  return Math.sqrt(Math.max(x, y, z));
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */


var getRotation = function () {
  var temp = [0, 0, 0];
  return function (out, mat) {
    var scaling = temp;
    getScaling(scaling, mat);
    var is1 = 1 / scaling[0];
    var is2 = 1 / scaling[1];
    var is3 = 1 / scaling[2];
    var sm11 = mat[0] * is1;
    var sm12 = mat[1] * is2;
    var sm13 = mat[2] * is3;
    var sm21 = mat[4] * is1;
    var sm22 = mat[5] * is2;
    var sm23 = mat[6] * is3;
    var sm31 = mat[8] * is1;
    var sm32 = mat[9] * is2;
    var sm33 = mat[10] * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }

    return out;
  };
}();
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */


exports.getRotation = getRotation;

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */


function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2);
  var nf = 1 / (near - far);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = 2 * far * near * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} target Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */


function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len === 0) {
    // eye and target are in the same position
    z2 = 1;
  } else {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len === 0) {
    // up and z are parallel
    if (upz) {
      upx += 1e-6;
    } else if (upy) {
      upz += 1e-6;
    } else {
      upy += 1e-6;
    }

    x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
    len = x0 * x0 + x1 * x1 + x2 * x2;
  }

  len = 1 / Math.sqrt(len);
  x0 *= len;
  x1 *= len;
  x2 *= len;
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */


function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
},{}],"Vendors/ogl/src/math/Mat4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mat4 = void 0;

var Mat4Func = _interopRequireWildcard(require("./functions/Mat4Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Mat4 = /*#__PURE__*/function (_Array) {
  _inherits(Mat4, _Array);

  var _super = _createSuper(Mat4);

  function Mat4() {
    var _this;

    var m00 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var m01 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var m02 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var m03 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var m10 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var m11 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
    var m12 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var m13 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var m20 = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var m21 = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    var m22 = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 1;
    var m23 = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;
    var m30 = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0;
    var m31 = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : 0;
    var m32 = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0;
    var m33 = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : 1;

    _classCallCheck(this, Mat4);

    _this = _super.call(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Mat4, [{
    key: "set",
    value: function set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      if (m00.length) return this.copy(m00);
      Mat4Func.set(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      return this;
    }
  }, {
    key: "translate",
    value: function translate(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat4Func.translate(this, m, v);
      return this;
    }
  }, {
    key: "rotate",
    value: function rotate(v, axis) {
      var m = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
      Mat4Func.rotate(this, m, v, axis);
      return this;
    }
  }, {
    key: "scale",
    value: function scale(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat4Func.scale(this, m, typeof v === 'number' ? [v, v, v] : v);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(ma, mb) {
      if (mb) {
        Mat4Func.multiply(this, ma, mb);
      } else {
        Mat4Func.multiply(this, this, ma);
      }

      return this;
    }
  }, {
    key: "identity",
    value: function identity() {
      Mat4Func.identity(this);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(m) {
      Mat4Func.copy(this, m);
      return this;
    }
  }, {
    key: "fromPerspective",
    value: function fromPerspective() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          fov = _ref.fov,
          aspect = _ref.aspect,
          near = _ref.near,
          far = _ref.far;

      Mat4Func.perspective(this, fov, aspect, near, far);
      return this;
    }
  }, {
    key: "fromOrthogonal",
    value: function fromOrthogonal(_ref2) {
      var left = _ref2.left,
          right = _ref2.right,
          bottom = _ref2.bottom,
          top = _ref2.top,
          near = _ref2.near,
          far = _ref2.far;
      Mat4Func.ortho(this, left, right, bottom, top, near, far);
      return this;
    }
  }, {
    key: "fromQuaternion",
    value: function fromQuaternion(q) {
      Mat4Func.fromQuat(this, q);
      return this;
    }
  }, {
    key: "setPosition",
    value: function setPosition(v) {
      this.x = v[0];
      this.y = v[1];
      this.z = v[2];
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Mat4Func.invert(this, m);
      return this;
    }
  }, {
    key: "compose",
    value: function compose(q, pos, scale) {
      Mat4Func.fromRotationTranslationScale(this, q, pos, scale);
      return this;
    }
  }, {
    key: "getRotation",
    value: function getRotation(q) {
      Mat4Func.getRotation(q, this);
      return this;
    }
  }, {
    key: "getTranslation",
    value: function getTranslation(pos) {
      Mat4Func.getTranslation(pos, this);
      return this;
    }
  }, {
    key: "getScaling",
    value: function getScaling(scale) {
      Mat4Func.getScaling(scale, this);
      return this;
    }
  }, {
    key: "getMaxScaleOnAxis",
    value: function getMaxScaleOnAxis() {
      return Mat4Func.getMaxScaleOnAxis(this);
    }
  }, {
    key: "lookAt",
    value: function lookAt(eye, target, up) {
      Mat4Func.targetTo(this, eye, target, up);
      return this;
    }
  }, {
    key: "determinant",
    value: function determinant() {
      return Mat4Func.determinant(this);
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      this[3] = a[o + 3];
      this[4] = a[o + 4];
      this[5] = a[o + 5];
      this[6] = a[o + 6];
      this[7] = a[o + 7];
      this[8] = a[o + 8];
      this[9] = a[o + 9];
      this[10] = a[o + 10];
      this[11] = a[o + 11];
      this[12] = a[o + 12];
      this[13] = a[o + 13];
      this[14] = a[o + 14];
      this[15] = a[o + 15];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      a[o + 3] = this[3];
      a[o + 4] = this[4];
      a[o + 5] = this[5];
      a[o + 6] = this[6];
      a[o + 7] = this[7];
      a[o + 8] = this[8];
      a[o + 9] = this[9];
      a[o + 10] = this[10];
      a[o + 11] = this[11];
      a[o + 12] = this[12];
      a[o + 13] = this[13];
      a[o + 14] = this[14];
      a[o + 15] = this[15];
      return a;
    }
  }, {
    key: "x",
    get: function get() {
      return this[12];
    },
    set: function set(v) {
      this[12] = v;
    }
  }, {
    key: "y",
    get: function get() {
      return this[13];
    },
    set: function set(v) {
      this[13] = v;
    }
  }, {
    key: "z",
    get: function get() {
      return this[14];
    },
    set: function set(v) {
      this[14] = v;
    }
  }, {
    key: "w",
    get: function get() {
      return this[15];
    },
    set: function set(v) {
      this[15] = v;
    }
  }]);

  return Mat4;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Mat4 = Mat4;
},{"./functions/Mat4Func.js":"Vendors/ogl/src/math/functions/Mat4Func.js"}],"Vendors/ogl/src/math/functions/EulerFunc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromRotationMatrix = fromRotationMatrix;

// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
function fromRotationMatrix(out, m) {
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'YXZ';

  if (order === 'XYZ') {
    out[1] = Math.asin(Math.min(Math.max(m[8], -1), 1));

    if (Math.abs(m[8]) < 0.99999) {
      out[0] = Math.atan2(-m[9], m[10]);
      out[2] = Math.atan2(-m[4], m[0]);
    } else {
      out[0] = Math.atan2(m[6], m[5]);
      out[2] = 0;
    }
  } else if (order === 'YXZ') {
    out[0] = Math.asin(-Math.min(Math.max(m[9], -1), 1));

    if (Math.abs(m[9]) < 0.99999) {
      out[1] = Math.atan2(m[8], m[10]);
      out[2] = Math.atan2(m[1], m[5]);
    } else {
      out[1] = Math.atan2(-m[2], m[0]);
      out[2] = 0;
    }
  } else if (order === 'ZXY') {
    out[0] = Math.asin(Math.min(Math.max(m[6], -1), 1));

    if (Math.abs(m[6]) < 0.99999) {
      out[1] = Math.atan2(-m[2], m[10]);
      out[2] = Math.atan2(-m[4], m[5]);
    } else {
      out[1] = 0;
      out[2] = Math.atan2(m[1], m[0]);
    }
  } else if (order === 'ZYX') {
    out[1] = Math.asin(-Math.min(Math.max(m[2], -1), 1));

    if (Math.abs(m[2]) < 0.99999) {
      out[0] = Math.atan2(m[6], m[10]);
      out[2] = Math.atan2(m[1], m[0]);
    } else {
      out[0] = 0;
      out[2] = Math.atan2(-m[4], m[5]);
    }
  } else if (order === 'YZX') {
    out[2] = Math.asin(Math.min(Math.max(m[1], -1), 1));

    if (Math.abs(m[1]) < 0.99999) {
      out[0] = Math.atan2(-m[9], m[5]);
      out[1] = Math.atan2(-m[2], m[0]);
    } else {
      out[0] = 0;
      out[1] = Math.atan2(m[8], m[10]);
    }
  } else if (order === 'XZY') {
    out[2] = Math.asin(-Math.min(Math.max(m[4], -1), 1));

    if (Math.abs(m[4]) < 0.99999) {
      out[0] = Math.atan2(m[6], m[5]);
      out[1] = Math.atan2(m[8], m[0]);
    } else {
      out[0] = Math.atan2(-m[9], m[10]);
      out[1] = 0;
    }
  }

  return out;
}
},{}],"Vendors/ogl/src/math/Euler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Euler = void 0;

var EulerFunc = _interopRequireWildcard(require("./functions/EulerFunc.js"));

var _Mat = require("./Mat4.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var tmpMat4 = new _Mat.Mat4();

var Euler = /*#__PURE__*/function (_Array) {
  _inherits(Euler, _Array);

  var _super = _createSuper(Euler);

  function Euler() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
    var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'YXZ';

    _classCallCheck(this, Euler);

    _this = _super.call(this, x, y, z);
    _this.order = order;

    _this.onChange = function () {};

    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Euler, [{
    key: "set",
    value: function set(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
      if (x.length) return this.copy(x);
      this[0] = x;
      this[1] = y;
      this[2] = z;
      this.onChange();
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this[0] = v[0];
      this[1] = v[1];
      this[2] = v[2];
      this.onChange();
      return this;
    }
  }, {
    key: "reorder",
    value: function reorder(order) {
      this.order = order;
      this.onChange();
      return this;
    }
  }, {
    key: "fromRotationMatrix",
    value: function fromRotationMatrix(m) {
      var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.order;
      EulerFunc.fromRotationMatrix(this, m, order);
      return this;
    }
  }, {
    key: "fromQuaternion",
    value: function fromQuaternion(q) {
      var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.order;
      tmpMat4.fromQuaternion(q);
      return this.fromRotationMatrix(tmpMat4, order);
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
      this.onChange();
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
      this.onChange();
    }
  }, {
    key: "z",
    get: function get() {
      return this[2];
    },
    set: function set(v) {
      this[2] = v;
      this.onChange();
    }
  }]);

  return Euler;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Euler = Euler;
},{"./functions/EulerFunc.js":"Vendors/ogl/src/math/functions/EulerFunc.js","./Mat4.js":"Vendors/ogl/src/math/Mat4.js"}],"Vendors/ogl/src/core/Transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transform = void 0;

var _Vec = require("../math/Vec3.js");

var _Quat = require("../math/Quat.js");

var _Mat = require("../math/Mat4.js");

var _Euler = require("../math/Euler.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Transform = /*#__PURE__*/function () {
  function Transform() {
    var _this = this;

    _classCallCheck(this, Transform);

    this.parent = null;
    this.children = [];
    this.visible = true;
    this.matrix = new _Mat.Mat4();
    this.worldMatrix = new _Mat.Mat4();
    this.matrixAutoUpdate = true;
    this.position = new _Vec.Vec3();
    this.quaternion = new _Quat.Quat();
    this.scale = new _Vec.Vec3(1);
    this.rotation = new _Euler.Euler();
    this.up = new _Vec.Vec3(0, 1, 0);

    this.rotation.onChange = function () {
      return _this.quaternion.fromEuler(_this.rotation);
    };

    this.quaternion.onChange = function () {
      return _this.rotation.fromQuaternion(_this.quaternion);
    };
  }

  _createClass(Transform, [{
    key: "setParent",
    value: function setParent(parent) {
      var notifyParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (notifyParent && this.parent && parent !== this.parent) this.parent.removeChild(this, false);
      this.parent = parent;
      if (notifyParent && parent) parent.addChild(this, false);
    }
  }, {
    key: "addChild",
    value: function addChild(child) {
      var notifyChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!~this.children.indexOf(child)) this.children.push(child);
      if (notifyChild) child.setParent(this, false);
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      var notifyChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!!~this.children.indexOf(child)) this.children.splice(this.children.indexOf(child), 1);
      if (notifyChild) child.setParent(null, false);
    }
  }, {
    key: "updateMatrixWorld",
    value: function updateMatrixWorld(force) {
      if (this.matrixAutoUpdate) this.updateMatrix();

      if (this.worldMatrixNeedsUpdate || force) {
        if (this.parent === null) this.worldMatrix.copy(this.matrix);else this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
        this.worldMatrixNeedsUpdate = false;
        force = true;
      }

      for (var i = 0, l = this.children.length; i < l; i++) {
        this.children[i].updateMatrixWorld(force);
      }
    }
  }, {
    key: "updateMatrix",
    value: function updateMatrix() {
      this.matrix.compose(this.quaternion, this.position, this.scale);
      this.worldMatrixNeedsUpdate = true;
    }
  }, {
    key: "traverse",
    value: function traverse(callback) {
      // Return true in callback to stop traversing children
      if (callback(this)) return;

      for (var i = 0, l = this.children.length; i < l; i++) {
        this.children[i].traverse(callback);
      }
    }
  }, {
    key: "decompose",
    value: function decompose() {
      this.matrix.getTranslation(this.position);
      this.matrix.getRotation(this.quaternion);
      this.matrix.getScaling(this.scale);
      this.rotation.fromQuaternion(this.quaternion);
    }
  }, {
    key: "lookAt",
    value: function lookAt(target) {
      var invert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (invert) this.matrix.lookAt(this.position, target, this.up);else this.matrix.lookAt(target, this.position, this.up);
      this.matrix.getRotation(this.quaternion);
      this.rotation.fromQuaternion(this.quaternion);
    }
  }]);

  return Transform;
}();

exports.Transform = Transform;
},{"../math/Vec3.js":"Vendors/ogl/src/math/Vec3.js","../math/Quat.js":"Vendors/ogl/src/math/Quat.js","../math/Mat4.js":"Vendors/ogl/src/math/Mat4.js","../math/Euler.js":"Vendors/ogl/src/math/Euler.js"}],"Vendors/ogl/src/core/Camera.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = void 0;

var _Transform2 = require("./Transform.js");

var _Mat = require("../math/Mat4.js");

var _Vec = require("../math/Vec3.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var tempMat4 = new _Mat.Mat4();
var tempVec3a = new _Vec.Vec3();
var tempVec3b = new _Vec.Vec3();

var Camera = /*#__PURE__*/function (_Transform) {
  _inherits(Camera, _Transform);

  var _super = _createSuper(Camera);

  function Camera(gl) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$near = _ref.near,
        near = _ref$near === void 0 ? 0.1 : _ref$near,
        _ref$far = _ref.far,
        far = _ref$far === void 0 ? 100 : _ref$far,
        _ref$fov = _ref.fov,
        fov = _ref$fov === void 0 ? 45 : _ref$fov,
        _ref$aspect = _ref.aspect,
        aspect = _ref$aspect === void 0 ? 1 : _ref$aspect,
        left = _ref.left,
        right = _ref.right,
        bottom = _ref.bottom,
        top = _ref.top,
        _ref$zoom = _ref.zoom,
        zoom = _ref$zoom === void 0 ? 1 : _ref$zoom;

    _classCallCheck(this, Camera);

    _this = _super.call(this);
    Object.assign(_assertThisInitialized(_this), {
      near: near,
      far: far,
      fov: fov,
      aspect: aspect,
      left: left,
      right: right,
      bottom: bottom,
      top: top,
      zoom: zoom
    });
    _this.projectionMatrix = new _Mat.Mat4();
    _this.viewMatrix = new _Mat.Mat4();
    _this.projectionViewMatrix = new _Mat.Mat4();
    _this.worldPosition = new _Vec.Vec3(); // Use orthographic if left/right set, else default to perspective camera

    _this.type = left || right ? 'orthographic' : 'perspective';
    if (_this.type === 'orthographic') _this.orthographic();else _this.perspective();
    return _this;
  }

  _createClass(Camera, [{
    key: "perspective",
    value: function perspective() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$near = _ref2.near,
          near = _ref2$near === void 0 ? this.near : _ref2$near,
          _ref2$far = _ref2.far,
          far = _ref2$far === void 0 ? this.far : _ref2$far,
          _ref2$fov = _ref2.fov,
          fov = _ref2$fov === void 0 ? this.fov : _ref2$fov,
          _ref2$aspect = _ref2.aspect,
          aspect = _ref2$aspect === void 0 ? this.aspect : _ref2$aspect;

      Object.assign(this, {
        near: near,
        far: far,
        fov: fov,
        aspect: aspect
      });
      this.projectionMatrix.fromPerspective({
        fov: fov * (Math.PI / 180),
        aspect: aspect,
        near: near,
        far: far
      });
      this.type = 'perspective';
      return this;
    }
  }, {
    key: "orthographic",
    value: function orthographic() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$near = _ref3.near,
          near = _ref3$near === void 0 ? this.near : _ref3$near,
          _ref3$far = _ref3.far,
          far = _ref3$far === void 0 ? this.far : _ref3$far,
          _ref3$left = _ref3.left,
          left = _ref3$left === void 0 ? this.left : _ref3$left,
          _ref3$right = _ref3.right,
          right = _ref3$right === void 0 ? this.right : _ref3$right,
          _ref3$bottom = _ref3.bottom,
          bottom = _ref3$bottom === void 0 ? this.bottom : _ref3$bottom,
          _ref3$top = _ref3.top,
          top = _ref3$top === void 0 ? this.top : _ref3$top,
          _ref3$zoom = _ref3.zoom,
          zoom = _ref3$zoom === void 0 ? this.zoom : _ref3$zoom;

      Object.assign(this, {
        near: near,
        far: far,
        left: left,
        right: right,
        bottom: bottom,
        top: top,
        zoom: zoom
      });
      left /= zoom;
      right /= zoom;
      bottom /= zoom;
      top /= zoom;
      this.projectionMatrix.fromOrthogonal({
        left: left,
        right: right,
        bottom: bottom,
        top: top,
        near: near,
        far: far
      });
      this.type = 'orthographic';
      return this;
    }
  }, {
    key: "updateMatrixWorld",
    value: function updateMatrixWorld() {
      _get(_getPrototypeOf(Camera.prototype), "updateMatrixWorld", this).call(this);

      this.viewMatrix.inverse(this.worldMatrix);
      this.worldMatrix.getTranslation(this.worldPosition); // used for sorting

      this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix);
      return this;
    }
  }, {
    key: "lookAt",
    value: function lookAt(target) {
      _get(_getPrototypeOf(Camera.prototype), "lookAt", this).call(this, target, true);

      return this;
    } // Project 3D coordinate to 2D point

  }, {
    key: "project",
    value: function project(v) {
      v.applyMatrix4(this.viewMatrix);
      v.applyMatrix4(this.projectionMatrix);
      return this;
    } // Unproject 2D point to 3D coordinate

  }, {
    key: "unproject",
    value: function unproject(v) {
      v.applyMatrix4(tempMat4.inverse(this.projectionMatrix));
      v.applyMatrix4(this.worldMatrix);
      return this;
    }
  }, {
    key: "updateFrustum",
    value: function updateFrustum() {
      if (!this.frustum) {
        this.frustum = [new _Vec.Vec3(), new _Vec.Vec3(), new _Vec.Vec3(), new _Vec.Vec3(), new _Vec.Vec3(), new _Vec.Vec3()];
      }

      var m = this.projectionViewMatrix;
      this.frustum[0].set(m[3] - m[0], m[7] - m[4], m[11] - m[8]).constant = m[15] - m[12]; // -x

      this.frustum[1].set(m[3] + m[0], m[7] + m[4], m[11] + m[8]).constant = m[15] + m[12]; // +x

      this.frustum[2].set(m[3] + m[1], m[7] + m[5], m[11] + m[9]).constant = m[15] + m[13]; // +y

      this.frustum[3].set(m[3] - m[1], m[7] - m[5], m[11] - m[9]).constant = m[15] - m[13]; // -y

      this.frustum[4].set(m[3] - m[2], m[7] - m[6], m[11] - m[10]).constant = m[15] - m[14]; // +z (far)

      this.frustum[5].set(m[3] + m[2], m[7] + m[6], m[11] + m[10]).constant = m[15] + m[14]; // -z (near)

      for (var i = 0; i < 6; i++) {
        var invLen = 1.0 / this.frustum[i].distance();
        this.frustum[i].multiply(invLen);
        this.frustum[i].constant *= invLen;
      }
    }
  }, {
    key: "frustumIntersectsMesh",
    value: function frustumIntersectsMesh(node) {
      // If no position attribute, treat as frustumCulled false
      if (!node.geometry.attributes.position) return true;
      if (!node.geometry.bounds || node.geometry.bounds.radius === Infinity) node.geometry.computeBoundingSphere();
      if (!node.geometry.bounds) return true;
      var center = tempVec3a;
      center.copy(node.geometry.bounds.center);
      center.applyMatrix4(node.worldMatrix);
      var radius = node.geometry.bounds.radius * node.worldMatrix.getMaxScaleOnAxis();
      return this.frustumIntersectsSphere(center, radius);
    }
  }, {
    key: "frustumIntersectsSphere",
    value: function frustumIntersectsSphere(center, radius) {
      var normal = tempVec3b;

      for (var i = 0; i < 6; i++) {
        var plane = this.frustum[i];
        var distance = normal.copy(plane).dot(center) + plane.constant;
        if (distance < -radius) return false;
      }

      return true;
    }
  }]);

  return Camera;
}(_Transform2.Transform);

exports.Camera = Camera;
},{"./Transform.js":"Vendors/ogl/src/core/Transform.js","../math/Mat4.js":"Vendors/ogl/src/math/Mat4.js","../math/Vec3.js":"Vendors/ogl/src/math/Vec3.js"}],"Vendors/ogl/src/math/functions/Vec2Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.scale = scale;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.length = length;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.transformMat2 = transformMat2;
exports.transformMat2d = transformMat2d;
exports.transformMat3 = transformMat3;
exports.transformMat4 = transformMat4;
exports.exactEquals = exactEquals;
var EPSILON = 0.000001;
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */


function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}
/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  var x = a[0],
      y = a[1];
  return Math.sqrt(x * x + y * y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */


function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product returns a scalar
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} cross product of a and b
 */


function cross(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */


function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
},{}],"Vendors/ogl/src/math/Vec2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec2 = void 0;

var Vec2Func = _interopRequireWildcard(require("./functions/Vec2Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Vec2 = /*#__PURE__*/function (_Array) {
  _inherits(Vec2, _Array);

  var _super = _createSuper(Vec2);

  function Vec2() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;

    _classCallCheck(this, Vec2);

    _this = _super.call(this, x, y);
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Vec2, [{
    key: "set",
    value: function set(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      if (x.length) return this.copy(x);
      Vec2Func.set(this, x, y);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      Vec2Func.copy(this, v);
      return this;
    }
  }, {
    key: "add",
    value: function add(va, vb) {
      if (vb) Vec2Func.add(this, va, vb);else Vec2Func.add(this, this, va);
      return this;
    }
  }, {
    key: "sub",
    value: function sub(va, vb) {
      if (vb) Vec2Func.subtract(this, va, vb);else Vec2Func.subtract(this, this, va);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(v) {
      if (v.length) Vec2Func.multiply(this, this, v);else Vec2Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "divide",
    value: function divide(v) {
      if (v.length) Vec2Func.divide(this, this, v);else Vec2Func.scale(this, this, 1 / v);
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec2Func.inverse(this, v);
      return this;
    } // Can't use 'length' as Array.prototype uses it

  }, {
    key: "len",
    value: function len() {
      return Vec2Func.length(this);
    }
  }, {
    key: "distance",
    value: function distance(v) {
      if (v) return Vec2Func.distance(this, v);else return Vec2Func.length(this);
    }
  }, {
    key: "squaredLen",
    value: function squaredLen() {
      return this.squaredDistance();
    }
  }, {
    key: "squaredDistance",
    value: function squaredDistance(v) {
      if (v) return Vec2Func.squaredDistance(this, v);else return Vec2Func.squaredLength(this);
    }
  }, {
    key: "negate",
    value: function negate() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec2Func.negate(this, v);
      return this;
    }
  }, {
    key: "cross",
    value: function cross(va, vb) {
      if (vb) return Vec2Func.cross(va, vb);
      return Vec2Func.cross(this, va);
    }
  }, {
    key: "scale",
    value: function scale(v) {
      Vec2Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      Vec2Func.normalize(this, this);
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return Vec2Func.dot(this, v);
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return Vec2Func.exactEquals(this, v);
    }
  }, {
    key: "applyMatrix3",
    value: function applyMatrix3(mat3) {
      Vec2Func.transformMat3(this, this, mat3);
      return this;
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(mat4) {
      Vec2Func.transformMat4(this, this, mat4);
      return this;
    }
  }, {
    key: "lerp",
    value: function lerp(v, a) {
      Vec2Func.lerp(this, this, v, a);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec2(this[0], this[1]);
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      return a;
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
    }
  }]);

  return Vec2;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Vec2 = Vec2;
},{"./functions/Vec2Func.js":"Vendors/ogl/src/math/functions/Vec2Func.js"}],"Vendors/ogl/src/extras/Orbit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Orbit = Orbit;

var _Vec = require("../math/Vec3.js");

var _Vec2 = require("../math/Vec2.js");

// Based from ThreeJS' OrbitControls class, rewritten using es6 with some additions and subtractions.
// TODO: abstract event handlers so can be fed from other sources
// TODO: make scroll zoom more accurate than just >/< zero
// TODO: be able to pass in new camera position
var STATE = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  DOLLY_PAN: 3
};
var tempVec3 = new _Vec.Vec3();
var tempVec2a = new _Vec2.Vec2();
var tempVec2b = new _Vec2.Vec2();

function Orbit(object) {
  var _this = this;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$element = _ref.element,
      element = _ref$element === void 0 ? document : _ref$element,
      _ref$enabled = _ref.enabled,
      enabled = _ref$enabled === void 0 ? true : _ref$enabled,
      _ref$target = _ref.target,
      target = _ref$target === void 0 ? new _Vec.Vec3() : _ref$target,
      _ref$ease = _ref.ease,
      ease = _ref$ease === void 0 ? 0.25 : _ref$ease,
      _ref$inertia = _ref.inertia,
      inertia = _ref$inertia === void 0 ? 0.85 : _ref$inertia,
      _ref$enableRotate = _ref.enableRotate,
      enableRotate = _ref$enableRotate === void 0 ? true : _ref$enableRotate,
      _ref$rotateSpeed = _ref.rotateSpeed,
      rotateSpeed = _ref$rotateSpeed === void 0 ? 0.1 : _ref$rotateSpeed,
      _ref$autoRotate = _ref.autoRotate,
      autoRotate = _ref$autoRotate === void 0 ? false : _ref$autoRotate,
      _ref$autoRotateSpeed = _ref.autoRotateSpeed,
      autoRotateSpeed = _ref$autoRotateSpeed === void 0 ? 1.0 : _ref$autoRotateSpeed,
      _ref$enableZoom = _ref.enableZoom,
      enableZoom = _ref$enableZoom === void 0 ? true : _ref$enableZoom,
      _ref$zoomSpeed = _ref.zoomSpeed,
      zoomSpeed = _ref$zoomSpeed === void 0 ? 1 : _ref$zoomSpeed,
      _ref$enablePan = _ref.enablePan,
      enablePan = _ref$enablePan === void 0 ? true : _ref$enablePan,
      _ref$panSpeed = _ref.panSpeed,
      panSpeed = _ref$panSpeed === void 0 ? 0.1 : _ref$panSpeed,
      _ref$minPolarAngle = _ref.minPolarAngle,
      minPolarAngle = _ref$minPolarAngle === void 0 ? 0 : _ref$minPolarAngle,
      _ref$maxPolarAngle = _ref.maxPolarAngle,
      maxPolarAngle = _ref$maxPolarAngle === void 0 ? Math.PI : _ref$maxPolarAngle,
      _ref$minAzimuthAngle = _ref.minAzimuthAngle,
      minAzimuthAngle = _ref$minAzimuthAngle === void 0 ? -Infinity : _ref$minAzimuthAngle,
      _ref$maxAzimuthAngle = _ref.maxAzimuthAngle,
      maxAzimuthAngle = _ref$maxAzimuthAngle === void 0 ? Infinity : _ref$maxAzimuthAngle,
      _ref$minDistance = _ref.minDistance,
      minDistance = _ref$minDistance === void 0 ? 0 : _ref$minDistance,
      _ref$maxDistance = _ref.maxDistance,
      maxDistance = _ref$maxDistance === void 0 ? Infinity : _ref$maxDistance;

  this.enabled = enabled;
  this.target = target; // Catch attempts to disable - set to 1 so has no effect

  ease = ease || 1;
  inertia = inertia || 0;
  this.minDistance = minDistance;
  this.maxDistance = maxDistance; // current position in sphericalTarget coordinates

  var sphericalDelta = {
    radius: 1,
    phi: 0,
    theta: 0
  };
  var sphericalTarget = {
    radius: 1,
    phi: 0,
    theta: 0
  };
  var spherical = {
    radius: 1,
    phi: 0,
    theta: 0
  };
  var panDelta = new _Vec.Vec3(); // Grab initial position values

  var offset = new _Vec.Vec3();
  offset.copy(object.position).sub(this.target);
  spherical.radius = sphericalTarget.radius = offset.distance();
  spherical.theta = sphericalTarget.theta = Math.atan2(offset.x, offset.z);
  spherical.phi = sphericalTarget.phi = Math.acos(Math.min(Math.max(offset.y / sphericalTarget.radius, -1), 1));
  this.offset = offset;

  this.update = function () {
    if (autoRotate) {
      handleAutoRotate();
    } // apply delta


    sphericalTarget.radius *= sphericalDelta.radius;
    sphericalTarget.theta += sphericalDelta.theta;
    sphericalTarget.phi += sphericalDelta.phi; // apply boundaries

    sphericalTarget.theta = Math.max(minAzimuthAngle, Math.min(maxAzimuthAngle, sphericalTarget.theta));
    sphericalTarget.phi = Math.max(minPolarAngle, Math.min(maxPolarAngle, sphericalTarget.phi));
    sphericalTarget.radius = Math.max(_this.minDistance, Math.min(_this.maxDistance, sphericalTarget.radius)); // ease values

    spherical.phi += (sphericalTarget.phi - spherical.phi) * ease;
    spherical.theta += (sphericalTarget.theta - spherical.theta) * ease;
    spherical.radius += (sphericalTarget.radius - spherical.radius) * ease; // apply pan to target. As offset is relative to target, it also shifts

    _this.target.add(panDelta); // apply rotation to offset


    var sinPhiRadius = spherical.radius * Math.sin(Math.max(0.000001, spherical.phi));
    offset.x = sinPhiRadius * Math.sin(spherical.theta);
    offset.y = spherical.radius * Math.cos(spherical.phi);
    offset.z = sinPhiRadius * Math.cos(spherical.theta); // Apply updated values to object

    object.position.copy(_this.target).add(offset);
    object.lookAt(_this.target); // Apply inertia to values

    sphericalDelta.theta *= inertia;
    sphericalDelta.phi *= inertia;
    panDelta.multiply(inertia); // Reset scale every frame to avoid applying scale multiple times

    sphericalDelta.radius = 1;
  }; // Updates internals with new position


  this.forcePosition = function () {
    offset.copy(object.position).sub(_this.target);
    spherical.radius = sphericalTarget.radius = offset.distance();
    spherical.theta = sphericalTarget.theta = Math.atan2(offset.x, offset.z);
    spherical.phi = sphericalTarget.phi = Math.acos(Math.min(Math.max(offset.y / sphericalTarget.radius, -1), 1));
    object.lookAt(_this.target);
  }; // Everything below here just updates panDelta and sphericalDelta
  // Using those two objects' values, the orbit is calculated


  var rotateStart = new _Vec2.Vec2();
  var panStart = new _Vec2.Vec2();
  var dollyStart = new _Vec2.Vec2();
  var state = STATE.NONE;
  this.mouseButtons = {
    ORBIT: 0,
    ZOOM: 1,
    PAN: 2
  };

  function getZoomScale() {
    return Math.pow(0.95, zoomSpeed);
  }

  function panLeft(distance, m) {
    tempVec3.set(m[0], m[1], m[2]);
    tempVec3.multiply(-distance);
    panDelta.add(tempVec3);
  }

  function panUp(distance, m) {
    tempVec3.set(m[4], m[5], m[6]);
    tempVec3.multiply(distance);
    panDelta.add(tempVec3);
  }

  var pan = function pan(deltaX, deltaY) {
    var el = element === document ? document.body : element;
    tempVec3.copy(object.position).sub(_this.target);
    var targetDistance = tempVec3.distance();
    targetDistance *= Math.tan((object.fov || 45) / 2 * Math.PI / 180.0);
    panLeft(2 * deltaX * targetDistance / el.clientHeight, object.matrix);
    panUp(2 * deltaY * targetDistance / el.clientHeight, object.matrix);
  };

  function dolly(dollyScale) {
    sphericalDelta.radius /= dollyScale;
  }

  function handleAutoRotate() {
    var angle = 2 * Math.PI / 60 / 60 * autoRotateSpeed;
    sphericalDelta.theta -= angle;
  }

  function handleMoveRotate(x, y) {
    tempVec2a.set(x, y);
    tempVec2b.sub(tempVec2a, rotateStart).multiply(rotateSpeed);
    var el = element === document ? document.body : element;
    sphericalDelta.theta -= 2 * Math.PI * tempVec2b.x / el.clientHeight;
    sphericalDelta.phi -= 2 * Math.PI * tempVec2b.y / el.clientHeight;
    rotateStart.copy(tempVec2a);
  }

  function handleMouseMoveDolly(e) {
    tempVec2a.set(e.clientX, e.clientY);
    tempVec2b.sub(tempVec2a, dollyStart);

    if (tempVec2b.y > 0) {
      dolly(getZoomScale());
    } else if (tempVec2b.y < 0) {
      dolly(1 / getZoomScale());
    }

    dollyStart.copy(tempVec2a);
  }

  function handleMovePan(x, y) {
    tempVec2a.set(x, y);
    tempVec2b.sub(tempVec2a, panStart).multiply(panSpeed);
    pan(tempVec2b.x, tempVec2b.y);
    panStart.copy(tempVec2a);
  }

  function handleTouchStartDollyPan(e) {
    if (enableZoom) {
      var dx = e.touches[0].pageX - e.touches[1].pageX;
      var dy = e.touches[0].pageY - e.touches[1].pageY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      dollyStart.set(0, distance);
    }

    if (enablePan) {
      var x = 0.5 * (e.touches[0].pageX + e.touches[1].pageX);
      var y = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
      panStart.set(x, y);
    }
  }

  function handleTouchMoveDollyPan(e) {
    if (enableZoom) {
      var dx = e.touches[0].pageX - e.touches[1].pageX;
      var dy = e.touches[0].pageY - e.touches[1].pageY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      tempVec2a.set(0, distance);
      tempVec2b.set(0, Math.pow(tempVec2a.y / dollyStart.y, zoomSpeed));
      dolly(tempVec2b.y);
      dollyStart.copy(tempVec2a);
    }

    if (enablePan) {
      var x = 0.5 * (e.touches[0].pageX + e.touches[1].pageX);
      var y = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
      handleMovePan(x, y);
    }
  }

  var onMouseDown = function onMouseDown(e) {
    if (!_this.enabled) return;

    switch (e.button) {
      case _this.mouseButtons.ORBIT:
        if (enableRotate === false) return;
        rotateStart.set(e.clientX, e.clientY);
        state = STATE.ROTATE;
        break;

      case _this.mouseButtons.ZOOM:
        if (enableZoom === false) return;
        dollyStart.set(e.clientX, e.clientY);
        state = STATE.DOLLY;
        break;

      case _this.mouseButtons.PAN:
        if (enablePan === false) return;
        panStart.set(e.clientX, e.clientY);
        state = STATE.PAN;
        break;
    }

    if (state !== STATE.NONE) {
      window.addEventListener('mousemove', onMouseMove, false);
      window.addEventListener('mouseup', onMouseUp, false);
    }
  };

  var onMouseMove = function onMouseMove(e) {
    if (!_this.enabled) return;

    switch (state) {
      case STATE.ROTATE:
        if (enableRotate === false) return;
        handleMoveRotate(e.clientX, e.clientY);
        break;

      case STATE.DOLLY:
        if (enableZoom === false) return;
        handleMouseMoveDolly(e);
        break;

      case STATE.PAN:
        if (enablePan === false) return;
        handleMovePan(e.clientX, e.clientY);
        break;
    }
  };

  var onMouseUp = function onMouseUp() {
    window.removeEventListener('mousemove', onMouseMove, false);
    window.removeEventListener('mouseup', onMouseUp, false);
    state = STATE.NONE;
  };

  var onMouseWheel = function onMouseWheel(e) {
    if (!_this.enabled || !enableZoom || state !== STATE.NONE && state !== STATE.ROTATE) return;
    e.stopPropagation();
    e.preventDefault();

    if (e.deltaY < 0) {
      dolly(1 / getZoomScale());
    } else if (e.deltaY > 0) {
      dolly(getZoomScale());
    }
  };

  var onTouchStart = function onTouchStart(e) {
    if (!_this.enabled) return;
    e.preventDefault();

    switch (e.touches.length) {
      case 1:
        if (enableRotate === false) return;
        rotateStart.set(e.touches[0].pageX, e.touches[0].pageY);
        state = STATE.ROTATE;
        break;

      case 2:
        if (enableZoom === false && enablePan === false) return;
        handleTouchStartDollyPan(e);
        state = STATE.DOLLY_PAN;
        break;

      default:
        state = STATE.NONE;
    }
  };

  var onTouchMove = function onTouchMove(e) {
    if (!_this.enabled) return;
    e.preventDefault();
    e.stopPropagation();

    switch (e.touches.length) {
      case 1:
        if (enableRotate === false) return;
        handleMoveRotate(e.touches[0].pageX, e.touches[0].pageY);
        break;

      case 2:
        if (enableZoom === false && enablePan === false) return;
        handleTouchMoveDollyPan(e);
        break;

      default:
        state = STATE.NONE;
    }
  };

  var onTouchEnd = function onTouchEnd() {
    if (!_this.enabled) return;
    state = STATE.NONE;
  };

  var onContextMenu = function onContextMenu(e) {
    if (!_this.enabled) return;
    e.preventDefault();
  };

  function addHandlers() {
    element.addEventListener('contextmenu', onContextMenu, false);
    element.addEventListener('mousedown', onMouseDown, false);
    element.addEventListener('wheel', onMouseWheel, {
      passive: false
    });
    element.addEventListener('touchstart', onTouchStart, {
      passive: false
    });
    element.addEventListener('touchend', onTouchEnd, false);
    element.addEventListener('touchmove', onTouchMove, {
      passive: false
    });
  }

  this.remove = function () {
    element.removeEventListener('contextmenu', onContextMenu);
    element.removeEventListener('mousedown', onMouseDown);
    element.removeEventListener('wheel', onMouseWheel);
    element.removeEventListener('touchstart', onTouchStart);
    element.removeEventListener('touchend', onTouchEnd);
    element.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  addHandlers();
}
},{"../math/Vec3.js":"Vendors/ogl/src/math/Vec3.js","../math/Vec2.js":"Vendors/ogl/src/math/Vec2.js"}],"vendors/ogl/src/core/Geometry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Geometry = void 0;

var _Vec = require("../math/Vec3.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var tempVec3 = new _Vec.Vec3();
var ID = 1;
var ATTR_ID = 1; // To stop inifinite warnings

var isBoundsWarned = false;

var Geometry = /*#__PURE__*/function () {
  function Geometry(gl) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Geometry);

    if (!gl.canvas) console.error('gl not passed as first argument to Geometry');
    this.gl = gl;
    this.attributes = attributes;
    this.id = ID++; // Store one VAO per program attribute locations order

    this.VAOs = {};
    this.drawRange = {
      start: 0,
      count: 0
    };
    this.instancedCount = 0; // Unbind current VAO so that new buffers don't get added to active mesh

    this.gl.renderer.bindVertexArray(null);
    this.gl.renderer.currentGeometry = null; // Alias for state store to avoid redundant calls for global state

    this.glState = this.gl.renderer.state; // create the buffers

    for (var key in attributes) {
      this.addAttribute(key, attributes[key]);
    }
  }

  _createClass(Geometry, [{
    key: "addAttribute",
    value: function addAttribute(key, attr) {
      this.attributes[key] = attr; // Set options

      attr.id = ATTR_ID++; // TODO: currently unused, remove?

      attr.size = attr.size || 1;
      attr.type = attr.type || (attr.data.constructor === Float32Array ? this.gl.FLOAT : attr.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT); // Uint32Array

      attr.target = key === 'index' ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
      attr.normalized = attr.normalized || false;
      attr.stride = attr.stride || 0;
      attr.offset = attr.offset || 0;
      attr.count = attr.count || (attr.stride ? attr.data.byteLength / attr.stride : attr.data.length / attr.size);
      attr.divisor = attr.instanced || 0;
      attr.needsUpdate = false;

      if (!attr.buffer) {
        attr.buffer = this.gl.createBuffer(); // Push data to buffer

        this.updateAttribute(attr);
      } // Update geometry counts. If indexed, ignore regular attributes


      if (attr.divisor) {
        this.isInstanced = true;

        if (this.instancedCount && this.instancedCount !== attr.count * attr.divisor) {
          console.warn('geometry has multiple instanced buffers of different length');
          return this.instancedCount = Math.min(this.instancedCount, attr.count * attr.divisor);
        }

        this.instancedCount = attr.count * attr.divisor;
      } else if (key === 'index') {
        this.drawRange.count = attr.count;
      } else if (!this.attributes.index) {
        this.drawRange.count = Math.max(this.drawRange.count, attr.count);
      }
    }
  }, {
    key: "updateAttribute",
    value: function updateAttribute(attr) {
      if (this.glState.boundBuffer !== attr.buffer) {
        this.gl.bindBuffer(attr.target, attr.buffer);
        this.glState.boundBuffer = attr.buffer;
      }

      this.gl.bufferData(attr.target, attr.data, this.gl.STATIC_DRAW);
      attr.needsUpdate = false;
    }
  }, {
    key: "setIndex",
    value: function setIndex(value) {
      this.addAttribute('index', value);
    }
  }, {
    key: "setDrawRange",
    value: function setDrawRange(start, count) {
      this.drawRange.start = start;
      this.drawRange.count = count;
    }
  }, {
    key: "setInstancedCount",
    value: function setInstancedCount(value) {
      this.instancedCount = value;
    }
  }, {
    key: "createVAO",
    value: function createVAO(program) {
      this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
      this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
      this.bindAttributes(program);
    }
  }, {
    key: "bindAttributes",
    value: function bindAttributes(program) {
      var _this = this;

      // Link all attributes to program using gl.vertexAttribPointer
      program.attributeLocations.forEach(function (location, _ref) {
        var name = _ref.name,
            type = _ref.type;

        // If geometry missing a required shader attribute
        if (!_this.attributes[name]) {
          console.warn("active attribute ".concat(name, " not being supplied"));
          return;
        }

        var attr = _this.attributes[name];

        _this.gl.bindBuffer(attr.target, attr.buffer);

        _this.glState.boundBuffer = attr.buffer; // For matrix attributes, buffer needs to be defined per column

        var numLoc = 1;
        if (type === 35674) numLoc = 2; // mat2

        if (type === 35675) numLoc = 3; // mat3

        if (type === 35676) numLoc = 4; // mat4

        var size = attr.size / numLoc;
        var stride = numLoc === 1 ? 0 : numLoc * numLoc * numLoc;
        var offset = numLoc === 1 ? 0 : numLoc * numLoc;

        for (var i = 0; i < numLoc; i++) {
          _this.gl.vertexAttribPointer(location + i, size, attr.type, attr.normalized, attr.stride + stride, attr.offset + i * offset);

          _this.gl.enableVertexAttribArray(location + i); // For instanced attributes, divisor needs to be set.
          // For firefox, need to set back to 0 if non-instanced drawn after instanced. Else won't render


          _this.gl.renderer.vertexAttribDivisor(location + i, attr.divisor);
        }
      }); // Bind indices if geometry indexed

      if (this.attributes.index) this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
    }
  }, {
    key: "draw",
    value: function draw(_ref2) {
      var _this2 = this;

      var program = _ref2.program,
          _ref2$mode = _ref2.mode,
          mode = _ref2$mode === void 0 ? this.gl.TRIANGLES : _ref2$mode;

      if (this.gl.renderer.currentGeometry !== "".concat(this.id, "_").concat(program.attributeOrder)) {
        if (!this.VAOs[program.attributeOrder]) this.createVAO(program);
        this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
        this.gl.renderer.currentGeometry = "".concat(this.id, "_").concat(program.attributeOrder);
      } // Check if any attributes need updating


      program.attributeLocations.forEach(function (location, _ref3) {
        var name = _ref3.name;
        var attr = _this2.attributes[name];
        if (attr.needsUpdate) _this2.updateAttribute(attr);
      });

      if (this.isInstanced) {
        if (this.attributes.index) {
          this.gl.renderer.drawElementsInstanced(mode, this.drawRange.count, this.attributes.index.type, this.drawRange.start, this.instancedCount);
        } else {
          this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
        }
      } else {
        if (this.attributes.index) {
          this.gl.drawElements(mode, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * 2);
        } else {
          this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
        }
      }
    }
  }, {
    key: "getPositionArray",
    value: function getPositionArray() {
      // Use position buffer, or min/max if available
      var attr = this.attributes.position;
      if (attr.min) return [].concat(_toConsumableArray(attr.min), _toConsumableArray(attr.max));
      if (attr.data) return attr.data;
      if (isBoundsWarned) return;
      console.warn('No position buffer data found to compute bounds');
      return isBoundsWarned = true;
    }
  }, {
    key: "computeBoundingBox",
    value: function computeBoundingBox(array) {
      if (!array) array = this.getPositionArray();

      if (!this.bounds) {
        this.bounds = {
          min: new _Vec.Vec3(),
          max: new _Vec.Vec3(),
          center: new _Vec.Vec3(),
          scale: new _Vec.Vec3(),
          radius: Infinity
        };
      }

      var min = this.bounds.min;
      var max = this.bounds.max;
      var center = this.bounds.center;
      var scale = this.bounds.scale;
      min.set(+Infinity);
      max.set(-Infinity); // TODO: use offset/stride if exists
      // TODO: check size of position (eg triangle with Vec2)

      for (var i = 0, l = array.length; i < l; i += 3) {
        var x = array[i];
        var y = array[i + 1];
        var z = array[i + 2];
        min.x = Math.min(x, min.x);
        min.y = Math.min(y, min.y);
        min.z = Math.min(z, min.z);
        max.x = Math.max(x, max.x);
        max.y = Math.max(y, max.y);
        max.z = Math.max(z, max.z);
      }

      scale.sub(max, min);
      center.add(min, max).divide(2);
    }
  }, {
    key: "computeBoundingSphere",
    value: function computeBoundingSphere(array) {
      if (!array) array = this.getPositionArray();
      if (!this.bounds) this.computeBoundingBox(array);
      var maxRadiusSq = 0;

      for (var i = 0, l = array.length; i < l; i += 3) {
        tempVec3.fromArray(array, i);
        maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.squaredDistance(tempVec3));
      }

      this.bounds.radius = Math.sqrt(maxRadiusSq);
    }
  }, {
    key: "remove",
    value: function remove() {
      if (this.vao) this.gl.renderer.deleteVertexArray(this.vao);

      for (var key in this.attributes) {
        this.gl.deleteBuffer(this.attributes[key].buffer);
        delete this.attributes[key];
      }
    }
  }]);

  return Geometry;
}();

exports.Geometry = Geometry;
},{"../math/Vec3.js":"vendors/ogl/src/math/Vec3.js"}],"vendors/ogl/src/extras/Plane.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plane = void 0;

var _Geometry2 = require("../core/Geometry.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Plane = /*#__PURE__*/function (_Geometry) {
  _inherits(Plane, _Geometry);

  var _super = _createSuper(Plane);

  function Plane(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 1 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 1 : _ref$height,
        _ref$widthSegments = _ref.widthSegments,
        widthSegments = _ref$widthSegments === void 0 ? 1 : _ref$widthSegments,
        _ref$heightSegments = _ref.heightSegments,
        heightSegments = _ref$heightSegments === void 0 ? 1 : _ref$heightSegments,
        _ref$attributes = _ref.attributes,
        attributes = _ref$attributes === void 0 ? {} : _ref$attributes;

    _classCallCheck(this, Plane);

    var wSegs = widthSegments;
    var hSegs = heightSegments; // Determine length of arrays

    var num = (wSegs + 1) * (hSegs + 1);
    var numIndices = wSegs * hSegs * 6; // Generate empty arrays once

    var position = new Float32Array(num * 3);
    var normal = new Float32Array(num * 3);
    var uv = new Float32Array(num * 2);
    var index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
    Plane.buildPlane(position, normal, uv, index, width, height, 0, wSegs, hSegs);
    Object.assign(attributes, {
      position: {
        size: 3,
        data: position
      },
      normal: {
        size: 3,
        data: normal
      },
      uv: {
        size: 2,
        data: uv
      },
      index: {
        data: index
      }
    });
    return _super.call(this, gl, attributes);
  }

  _createClass(Plane, null, [{
    key: "buildPlane",
    value: function buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs) {
      var u = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
      var v = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 1;
      var w = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 2;
      var uDir = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 1;
      var vDir = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : -1;
      var i = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0;
      var ii = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : 0;
      var io = i;
      var segW = width / wSegs;
      var segH = height / hSegs;

      for (var iy = 0; iy <= hSegs; iy++) {
        var y = iy * segH - height / 2;

        for (var ix = 0; ix <= wSegs; ix++, i++) {
          var x = ix * segW - width / 2;
          position[i * 3 + u] = x * uDir;
          position[i * 3 + v] = y * vDir;
          position[i * 3 + w] = depth / 2;
          normal[i * 3 + u] = 0;
          normal[i * 3 + v] = 0;
          normal[i * 3 + w] = depth >= 0 ? 1 : -1;
          uv[i * 2] = ix / wSegs;
          uv[i * 2 + 1] = 1 - iy / hSegs;
          if (iy === hSegs || ix === wSegs) continue;
          var a = io + ix + iy * (wSegs + 1);
          var b = io + ix + (iy + 1) * (wSegs + 1);
          var c = io + ix + (iy + 1) * (wSegs + 1) + 1;
          var d = io + ix + iy * (wSegs + 1) + 1;
          index[ii * 6] = a;
          index[ii * 6 + 1] = b;
          index[ii * 6 + 2] = d;
          index[ii * 6 + 3] = b;
          index[ii * 6 + 4] = c;
          index[ii * 6 + 5] = d;
          ii++;
        }
      }
    }
  }]);

  return Plane;
}(_Geometry2.Geometry);

exports.Plane = Plane;
},{"../core/Geometry.js":"vendors/ogl/src/core/Geometry.js"}],"Vendors/ogl/src/core/Program.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Program = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: upload empty texture if null ? maybe not
// TODO: upload identity matrix if null ?
// TODO: sampler Cube
var ID = 1; // cache of typed arrays used to flatten uniform arrays

var arrayCacheF32 = {};

var Program = /*#__PURE__*/function () {
  function Program(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        vertex = _ref.vertex,
        fragment = _ref.fragment,
        _ref$uniforms = _ref.uniforms,
        uniforms = _ref$uniforms === void 0 ? {} : _ref$uniforms,
        _ref$transparent = _ref.transparent,
        transparent = _ref$transparent === void 0 ? false : _ref$transparent,
        _ref$cullFace = _ref.cullFace,
        cullFace = _ref$cullFace === void 0 ? gl.BACK : _ref$cullFace,
        _ref$frontFace = _ref.frontFace,
        frontFace = _ref$frontFace === void 0 ? gl.CCW : _ref$frontFace,
        _ref$depthTest = _ref.depthTest,
        depthTest = _ref$depthTest === void 0 ? true : _ref$depthTest,
        _ref$depthWrite = _ref.depthWrite,
        depthWrite = _ref$depthWrite === void 0 ? true : _ref$depthWrite,
        _ref$depthFunc = _ref.depthFunc,
        depthFunc = _ref$depthFunc === void 0 ? gl.LESS : _ref$depthFunc;

    _classCallCheck(this, Program);

    if (!gl.canvas) console.error('gl not passed as fist argument to Program');
    this.gl = gl;
    this.uniforms = uniforms;
    this.id = ID++;
    if (!vertex) console.warn('vertex shader not supplied');
    if (!fragment) console.warn('fragment shader not supplied'); // Store program state

    this.transparent = transparent;
    this.cullFace = cullFace;
    this.frontFace = frontFace;
    this.depthTest = depthTest;
    this.depthWrite = depthWrite;
    this.depthFunc = depthFunc;
    this.blendFunc = {};
    this.blendEquation = {}; // set default blendFunc if transparent flagged

    if (this.transparent && !this.blendFunc.src) {
      if (this.gl.renderer.premultipliedAlpha) this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);else this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    } // compile vertex shader and log errors


    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertex);
    gl.compileShader(vertexShader);

    if (gl.getShaderInfoLog(vertexShader) !== '') {
      console.warn("".concat(gl.getShaderInfoLog(vertexShader), "\nVertex Shader\n").concat(addLineNumbers(vertex)));
    } // compile fragment shader and log errors


    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);

    if (gl.getShaderInfoLog(fragmentShader) !== '') {
      console.warn("".concat(gl.getShaderInfoLog(fragmentShader), "\nFragment Shader\n").concat(addLineNumbers(fragment)));
    } // compile program and log errors


    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      return console.warn(gl.getProgramInfoLog(this.program));
    } // Remove shader once linked


    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader); // Get active uniform locations

    this.uniformLocations = new Map();
    var numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);

    for (var uIndex = 0; uIndex < numUniforms; uIndex++) {
      var uniform = gl.getActiveUniform(this.program, uIndex);
      this.uniformLocations.set(uniform, gl.getUniformLocation(this.program, uniform.name)); // split uniforms' names to separate array and struct declarations

      var split = uniform.name.match(/(\w+)/g);
      uniform.uniformName = split[0];

      if (split.length === 3) {
        uniform.isStructArray = true;
        uniform.structIndex = Number(split[1]);
        uniform.structProperty = split[2];
      } else if (split.length === 2 && isNaN(Number(split[1]))) {
        uniform.isStruct = true;
        uniform.structProperty = split[1];
      }
    } // Get active attribute locations


    this.attributeLocations = new Map();
    var locations = [];
    var numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);

    for (var aIndex = 0; aIndex < numAttribs; aIndex++) {
      var attribute = gl.getActiveAttrib(this.program, aIndex);
      var location = gl.getAttribLocation(this.program, attribute.name);
      locations[location] = attribute.name;
      this.attributeLocations.set(attribute, location);
    }

    this.attributeOrder = locations.join('');
  }

  _createClass(Program, [{
    key: "setBlendFunc",
    value: function setBlendFunc(src, dst, srcAlpha, dstAlpha) {
      this.blendFunc.src = src;
      this.blendFunc.dst = dst;
      this.blendFunc.srcAlpha = srcAlpha;
      this.blendFunc.dstAlpha = dstAlpha;
      if (src) this.transparent = true;
    }
  }, {
    key: "setBlendEquation",
    value: function setBlendEquation(modeRGB, modeAlpha) {
      this.blendEquation.modeRGB = modeRGB;
      this.blendEquation.modeAlpha = modeAlpha;
    }
  }, {
    key: "applyState",
    value: function applyState() {
      if (this.depthTest) this.gl.renderer.enable(this.gl.DEPTH_TEST);else this.gl.renderer.disable(this.gl.DEPTH_TEST);
      if (this.cullFace) this.gl.renderer.enable(this.gl.CULL_FACE);else this.gl.renderer.disable(this.gl.CULL_FACE);
      if (this.blendFunc.src) this.gl.renderer.enable(this.gl.BLEND);else this.gl.renderer.disable(this.gl.BLEND);
      if (this.cullFace) this.gl.renderer.setCullFace(this.cullFace);
      this.gl.renderer.setFrontFace(this.frontFace);
      this.gl.renderer.setDepthMask(this.depthWrite);
      this.gl.renderer.setDepthFunc(this.depthFunc);
      if (this.blendFunc.src) this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha);
      if (this.blendEquation.modeRGB) this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
    }
  }, {
    key: "use",
    value: function use() {
      var _this = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$flipFaces = _ref2.flipFaces,
          flipFaces = _ref2$flipFaces === void 0 ? false : _ref2$flipFaces;

      var textureUnit = -1;
      var programActive = this.gl.renderer.currentProgram === this.id; // Avoid gl call if program already in use

      if (!programActive) {
        this.gl.useProgram(this.program);
        this.gl.renderer.currentProgram = this.id;
      } // Set only the active uniforms found in the shader


      this.uniformLocations.forEach(function (location, activeUniform) {
        var name = activeUniform.uniformName; // get supplied uniform

        var uniform = _this.uniforms[name]; // For structs, get the specific property instead of the entire object

        if (activeUniform.isStruct) {
          uniform = uniform[activeUniform.structProperty];
          name += ".".concat(activeUniform.structProperty);
        }

        if (activeUniform.isStructArray) {
          uniform = uniform[activeUniform.structIndex][activeUniform.structProperty];
          name += "[".concat(activeUniform.structIndex, "].").concat(activeUniform.structProperty);
        }

        if (!uniform) {
          return warn("Active uniform ".concat(name, " has not been supplied"));
        }

        if (uniform && uniform.value === undefined) {
          return warn("".concat(name, " uniform is missing a value parameter"));
        }

        if (uniform.value.texture) {
          textureUnit = textureUnit + 1; // Check if texture needs to be updated

          uniform.value.update(textureUnit);
          return setUniform(_this.gl, activeUniform.type, location, textureUnit);
        } // For texture arrays, set uniform as an array of texture units instead of just one


        if (uniform.value.length && uniform.value[0].texture) {
          var textureUnits = [];
          uniform.value.forEach(function (value) {
            textureUnit = textureUnit + 1;
            value.update(textureUnit);
            textureUnits.push(textureUnit);
          });
          return setUniform(_this.gl, activeUniform.type, location, textureUnits);
        }

        setUniform(_this.gl, activeUniform.type, location, uniform.value);
      });
      this.applyState();
      if (flipFaces) this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.gl.deleteProgram(this.program);
    }
  }]);

  return Program;
}();

exports.Program = Program;

function setUniform(gl, type, location, value) {
  value = value.length ? flatten(value) : value;
  var setValue = gl.renderer.state.uniformLocations.get(location); // Avoid redundant uniform commands

  if (value.length) {
    if (setValue === undefined || setValue.length !== value.length) {
      // clone array to store as cache
      gl.renderer.state.uniformLocations.set(location, value.slice(0));
    } else {
      if (arraysEqual(setValue, value)) return; // Update cached array values

      setValue.set ? setValue.set(value) : setArray(setValue, value);
      gl.renderer.state.uniformLocations.set(location, setValue);
    }
  } else {
    if (setValue === value) return;
    gl.renderer.state.uniformLocations.set(location, value);
  }

  switch (type) {
    case 5126:
      return value.length ? gl.uniform1fv(location, value) : gl.uniform1f(location, value);
    // FLOAT

    case 35664:
      return gl.uniform2fv(location, value);
    // FLOAT_VEC2

    case 35665:
      return gl.uniform3fv(location, value);
    // FLOAT_VEC3

    case 35666:
      return gl.uniform4fv(location, value);
    // FLOAT_VEC4

    case 35670: // BOOL

    case 5124: // INT

    case 35678: // SAMPLER_2D

    case 35680:
      return value.length ? gl.uniform1iv(location, value) : gl.uniform1i(location, value);
    // SAMPLER_CUBE

    case 35671: // BOOL_VEC2

    case 35667:
      return gl.uniform2iv(location, value);
    // INT_VEC2

    case 35672: // BOOL_VEC3

    case 35668:
      return gl.uniform3iv(location, value);
    // INT_VEC3

    case 35673: // BOOL_VEC4

    case 35669:
      return gl.uniform4iv(location, value);
    // INT_VEC4

    case 35674:
      return gl.uniformMatrix2fv(location, false, value);
    // FLOAT_MAT2

    case 35675:
      return gl.uniformMatrix3fv(location, false, value);
    // FLOAT_MAT3

    case 35676:
      return gl.uniformMatrix4fv(location, false, value);
    // FLOAT_MAT4
  }
}

function addLineNumbers(string) {
  var lines = string.split('\n');

  for (var i = 0; i < lines.length; i++) {
    lines[i] = i + 1 + ': ' + lines[i];
  }

  return lines.join('\n');
}

function flatten(a) {
  var arrayLen = a.length;
  var valueLen = a[0].length;
  if (valueLen === undefined) return a;
  var length = arrayLen * valueLen;
  var value = arrayCacheF32[length];
  if (!value) arrayCacheF32[length] = value = new Float32Array(length);

  for (var i = 0; i < arrayLen; i++) {
    value.set(a[i], i * valueLen);
  }

  return value;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;

  for (var i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

function setArray(a, b) {
  for (var i = 0, l = a.length; i < l; i++) {
    a[i] = b[i];
  }
}

var warnCount = 0;

function warn(message) {
  if (warnCount > 100) return;
  console.warn(message);
  warnCount++;
  if (warnCount > 100) console.warn('More than 100 program warnings - stopping logs.');
}
},{}],"Vendors/ogl/src/core/Texture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Texture = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: delete texture
// TODO: use texSubImage2D for updates (video or when loaded)
// TODO: need? encoding = linearEncoding
// TODO: support non-compressed mipmaps uploads
var emptyPixel = new Uint8Array(4);

function isPowerOf2(value) {
  return (value & value - 1) === 0;
}

var ID = 1;

var Texture = /*#__PURE__*/function () {
  function Texture(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        image = _ref.image,
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? gl.TEXTURE_2D : _ref$target,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? gl.UNSIGNED_BYTE : _ref$type,
        _ref$format = _ref.format,
        format = _ref$format === void 0 ? gl.RGBA : _ref$format,
        _ref$internalFormat = _ref.internalFormat,
        internalFormat = _ref$internalFormat === void 0 ? format : _ref$internalFormat,
        _ref$wrapS = _ref.wrapS,
        wrapS = _ref$wrapS === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapS,
        _ref$wrapT = _ref.wrapT,
        wrapT = _ref$wrapT === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapT,
        _ref$generateMipmaps = _ref.generateMipmaps,
        generateMipmaps = _ref$generateMipmaps === void 0 ? true : _ref$generateMipmaps,
        _ref$minFilter = _ref.minFilter,
        minFilter = _ref$minFilter === void 0 ? generateMipmaps ? gl.NEAREST_MIPMAP_LINEAR : gl.LINEAR : _ref$minFilter,
        _ref$magFilter = _ref.magFilter,
        magFilter = _ref$magFilter === void 0 ? gl.LINEAR : _ref$magFilter,
        _ref$premultiplyAlpha = _ref.premultiplyAlpha,
        premultiplyAlpha = _ref$premultiplyAlpha === void 0 ? false : _ref$premultiplyAlpha,
        _ref$unpackAlignment = _ref.unpackAlignment,
        unpackAlignment = _ref$unpackAlignment === void 0 ? 4 : _ref$unpackAlignment,
        _ref$flipY = _ref.flipY,
        flipY = _ref$flipY === void 0 ? target == gl.TEXTURE_2D ? true : false : _ref$flipY,
        _ref$anisotropy = _ref.anisotropy,
        anisotropy = _ref$anisotropy === void 0 ? 0 : _ref$anisotropy,
        _ref$level = _ref.level,
        level = _ref$level === void 0 ? 0 : _ref$level,
        width = _ref.width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? width : _ref$height;

    _classCallCheck(this, Texture);

    this.gl = gl;
    this.id = ID++;
    this.image = image;
    this.target = target;
    this.type = type;
    this.format = format;
    this.internalFormat = internalFormat;
    this.minFilter = minFilter;
    this.magFilter = magFilter;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.generateMipmaps = generateMipmaps;
    this.premultiplyAlpha = premultiplyAlpha;
    this.unpackAlignment = unpackAlignment;
    this.flipY = flipY;
    this.anisotropy = Math.min(anisotropy, this.gl.renderer.parameters.maxAnisotropy);
    this.level = level;
    this.width = width;
    this.height = height;
    this.texture = this.gl.createTexture();
    this.store = {
      image: null
    }; // Alias for state store to avoid redundant calls for global state

    this.glState = this.gl.renderer.state; // State store to avoid redundant calls for per-texture state

    this.state = {};
    this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR;
    this.state.magFilter = this.gl.LINEAR;
    this.state.wrapS = this.gl.REPEAT;
    this.state.wrapT = this.gl.REPEAT;
    this.state.anisotropy = 0;
  }

  _createClass(Texture, [{
    key: "bind",
    value: function bind() {
      // Already bound to active texture unit
      if (this.glState.textureUnits[this.glState.activeTextureUnit] === this.id) return;
      this.gl.bindTexture(this.target, this.texture);
      this.glState.textureUnits[this.glState.activeTextureUnit] = this.id;
    }
  }, {
    key: "update",
    value: function update() {
      var textureUnit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var needsUpdate = !(this.image === this.store.image && !this.needsUpdate); // Make sure that texture is bound to its texture unit

      if (needsUpdate || this.glState.textureUnits[textureUnit] !== this.id) {
        // set active texture unit to perform texture functions
        this.gl.renderer.activeTexture(textureUnit);
        this.bind();
      }

      if (!needsUpdate) return;
      this.needsUpdate = false;

      if (this.flipY !== this.glState.flipY) {
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
        this.glState.flipY = this.flipY;
      }

      if (this.premultiplyAlpha !== this.glState.premultiplyAlpha) {
        this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
        this.glState.premultiplyAlpha = this.premultiplyAlpha;
      }

      if (this.unpackAlignment !== this.glState.unpackAlignment) {
        this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment);
        this.glState.unpackAlignment = this.unpackAlignment;
      }

      if (this.minFilter !== this.state.minFilter) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
        this.state.minFilter = this.minFilter;
      }

      if (this.magFilter !== this.state.magFilter) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
        this.state.magFilter = this.magFilter;
      }

      if (this.wrapS !== this.state.wrapS) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS);
        this.state.wrapS = this.wrapS;
      }

      if (this.wrapT !== this.state.wrapT) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT);
        this.state.wrapT = this.wrapT;
      }

      if (this.anisotropy && this.anisotropy !== this.state.anisotropy) {
        this.gl.texParameterf(this.target, this.gl.renderer.getExtension('EXT_texture_filter_anisotropic').TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropy);
        this.state.anisotropy = this.anisotropy;
      }

      if (this.image) {
        if (this.image.width) {
          this.width = this.image.width;
          this.height = this.image.height;
        }

        if (this.target === this.gl.TEXTURE_CUBE_MAP) {
          // For cube maps
          for (var i = 0; i < 6; i++) {
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, this.level, this.internalFormat, this.format, this.type, this.image[i]);
          }
        } else if (ArrayBuffer.isView(this.image)) {
          // Data texture
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
        } else if (this.image.isCompressedTexture) {
          // Compressed texture
          for (var level = 0; level < this.image.length; level++) {
            this.gl.compressedTexImage2D(this.target, level, this.internalFormat, this.image[level].width, this.image[level].height, 0, this.image[level].data);
          }
        } else {
          // Regular texture
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
        }

        if (this.generateMipmaps) {
          // For WebGL1, if not a power of 2, turn off mips, set wrapping to clamp to edge and minFilter to linear
          if (!this.gl.renderer.isWebgl2 && (!isPowerOf2(this.image.width) || !isPowerOf2(this.image.height))) {
            this.generateMipmaps = false;
            this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;
            this.minFilter = this.gl.LINEAR;
          } else {
            this.gl.generateMipmap(this.target);
          }
        } // Callback for when data is pushed to GPU


        this.onUpdate && this.onUpdate();
      } else {
        if (this.target === this.gl.TEXTURE_CUBE_MAP) {
          // Upload empty pixel for each side while no image to avoid errors while image or video loading
          for (var _i = 0; _i < 6; _i++) {
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + _i, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
          }
        } else if (this.width) {
          // image intentionally left null for RenderTarget
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null);
        } else {
          // Upload empty pixel if no image to avoid errors while image or video loading
          this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
        }
      }

      this.store.image = this.image;
    }
  }]);

  return Texture;
}();

exports.Texture = Texture;
},{}],"Vendors/ogl/src/math/functions/Mat3Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromMat4 = fromMat4;
exports.fromQuat = fromQuat;
exports.copy = copy;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.rotate = rotate;
exports.scale = scale;
exports.normalFromMat4 = normalFromMat4;
exports.projection = projection;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
var EPSILON = 0.000001;
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */

function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */


function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */


function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */


function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */


function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */


function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/


function scale(out, a, v) {
  var x = v[0],
      y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {mat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */


function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */


function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */


function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
},{}],"Vendors/ogl/src/math/Mat3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mat3 = void 0;

var Mat3Func = _interopRequireWildcard(require("./functions/Mat3Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Mat3 = /*#__PURE__*/function (_Array) {
  _inherits(Mat3, _Array);

  var _super = _createSuper(Mat3);

  function Mat3() {
    var _this;

    var m00 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var m01 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var m02 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var m10 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var m11 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    var m12 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var m20 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var m21 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var m22 = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;

    _classCallCheck(this, Mat3);

    _this = _super.call(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Mat3, [{
    key: "set",
    value: function set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      if (m00.length) return this.copy(m00);
      Mat3Func.set(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
      return this;
    }
  }, {
    key: "translate",
    value: function translate(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat3Func.translate(this, m, v);
      return this;
    }
  }, {
    key: "rotate",
    value: function rotate(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat3Func.rotate(this, m, v);
      return this;
    }
  }, {
    key: "scale",
    value: function scale(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat3Func.scale(this, m, v);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(ma, mb) {
      if (mb) {
        Mat3Func.multiply(this, ma, mb);
      } else {
        Mat3Func.multiply(this, this, ma);
      }

      return this;
    }
  }, {
    key: "identity",
    value: function identity() {
      Mat3Func.identity(this);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(m) {
      Mat3Func.copy(this, m);
      return this;
    }
  }, {
    key: "fromMatrix4",
    value: function fromMatrix4(m) {
      Mat3Func.fromMat4(this, m);
      return this;
    }
  }, {
    key: "fromQuaternion",
    value: function fromQuaternion(q) {
      Mat3Func.fromQuat(this, q);
      return this;
    }
  }, {
    key: "fromBasis",
    value: function fromBasis(vec3a, vec3b, vec3c) {
      this.set(vec3a[0], vec3a[1], vec3a[2], vec3b[0], vec3b[1], vec3b[2], vec3c[0], vec3c[1], vec3c[2]);
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Mat3Func.invert(this, m);
      return this;
    }
  }, {
    key: "getNormalMatrix",
    value: function getNormalMatrix(m) {
      Mat3Func.normalFromMat4(this, m);
      return this;
    }
  }]);

  return Mat3;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.Mat3 = Mat3;
},{"./functions/Mat3Func.js":"Vendors/ogl/src/math/functions/Mat3Func.js"}],"Vendors/ogl/src/core/Mesh.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mesh = void 0;

var _Transform2 = require("./Transform.js");

var _Mat = require("../math/Mat3.js");

var _Mat2 = require("../math/Mat4.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ID = 0;

var Mesh = /*#__PURE__*/function (_Transform) {
  _inherits(Mesh, _Transform);

  var _super = _createSuper(Mesh);

  function Mesh(gl) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        geometry = _ref.geometry,
        program = _ref.program,
        _ref$mode = _ref.mode,
        mode = _ref$mode === void 0 ? gl.TRIANGLES : _ref$mode,
        _ref$frustumCulled = _ref.frustumCulled,
        frustumCulled = _ref$frustumCulled === void 0 ? true : _ref$frustumCulled,
        _ref$renderOrder = _ref.renderOrder,
        renderOrder = _ref$renderOrder === void 0 ? 0 : _ref$renderOrder;

    _classCallCheck(this, Mesh);

    _this = _super.call(this);
    if (!gl.canvas) console.error('gl not passed as first argument to Mesh');
    _this.gl = gl;
    _this.id = ID++;
    _this.geometry = geometry;
    _this.program = program;
    _this.mode = mode; // Used to skip frustum culling

    _this.frustumCulled = frustumCulled; // Override sorting to force an order

    _this.renderOrder = renderOrder;
    _this.modelViewMatrix = new _Mat2.Mat4();
    _this.normalMatrix = new _Mat.Mat3();
    _this.beforeRenderCallbacks = [];
    _this.afterRenderCallbacks = [];
    return _this;
  }

  _createClass(Mesh, [{
    key: "onBeforeRender",
    value: function onBeforeRender(f) {
      this.beforeRenderCallbacks.push(f);
      return this;
    }
  }, {
    key: "onAfterRender",
    value: function onAfterRender(f) {
      this.afterRenderCallbacks.push(f);
      return this;
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this2 = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          camera = _ref2.camera;

      this.beforeRenderCallbacks.forEach(function (f) {
        return f && f({
          mesh: _this2,
          camera: camera
        });
      });

      if (camera) {
        // Add empty matrix uniforms to program if unset
        if (!this.program.uniforms.modelMatrix) {
          Object.assign(this.program.uniforms, {
            modelMatrix: {
              value: null
            },
            viewMatrix: {
              value: null
            },
            modelViewMatrix: {
              value: null
            },
            normalMatrix: {
              value: null
            },
            projectionMatrix: {
              value: null
            },
            cameraPosition: {
              value: null
            }
          });
        } // Set the matrix uniforms


        this.program.uniforms.projectionMatrix.value = camera.projectionMatrix;
        this.program.uniforms.cameraPosition.value = camera.worldPosition;
        this.program.uniforms.viewMatrix.value = camera.viewMatrix;
        this.modelViewMatrix.multiply(camera.viewMatrix, this.worldMatrix);
        this.normalMatrix.getNormalMatrix(this.modelViewMatrix);
        this.program.uniforms.modelMatrix.value = this.worldMatrix;
        this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix;
        this.program.uniforms.normalMatrix.value = this.normalMatrix;
      } // determine if faces need to be flipped - when mesh scaled negatively


      var flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
      this.program.use({
        flipFaces: flipFaces
      });
      this.geometry.draw({
        mode: this.mode,
        program: this.program
      });
      this.afterRenderCallbacks.forEach(function (f) {
        return f && f({
          mesh: _this2,
          camera: camera
        });
      });
    }
  }]);

  return Mesh;
}(_Transform2.Transform);

exports.Mesh = Mesh;
},{"./Transform.js":"Vendors/ogl/src/core/Transform.js","../math/Mat3.js":"Vendors/ogl/src/math/Mat3.js","../math/Mat4.js":"Vendors/ogl/src/math/Mat4.js"}],"src/Quad/shader/quad.vert":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nvarying vec2 vUV;\n\nvoid main() {\n\n    vec3 pos = position;\n\n    // gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n    gl_Position = vec4(pos, 1.0);\n\n    vUV = uv;\n\n}";
},{}],"src/Quad/shader/quad.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D _Video;\nuniform sampler2D _Output;\nuniform vec2 _Resolution;\n\nvarying vec2 vUV;\n\n#define FLOWSTR 0.003\n\nvoid main() {\n\n    vec2 cameraUV = vec2(1.0 - vUV.x, vUV.y);\n    cameraUV -= 0.5;\n    float aspect = (_Resolution.x / _Resolution.y) / (640.0 / 480.0);\n    cameraUV.y /= aspect;\n    cameraUV += 0.5;\n\n    vec3 flow = texture2D(_Output, vec2(1.0 - cameraUV.x, cameraUV.y)).xyz;\n    // vec3 camera = texture2D(_Video, cameraUV + flow.xy).xyz;\n    \n    float flowMag = min(1.0, length(flow.xy));\n    flow.xy *= FLOWSTR;\n\n    float r = texture2D(_Video, cameraUV + (vec2(0.003, 0.0) *flowMag) + flow.xy).x;\n    float g = texture2D(_Video, cameraUV + (vec2(0.0, 0.0015) *flowMag) + flow.xy).y;\n    float b = texture2D(_Video, cameraUV + (vec2(-0.003, 0.0) *flowMag) + flow.xy).z;\n\n    vec3 col = vec3(r,g,b);\n\n    // gl_FragColor = vec4(flow.x, flow.y, 0.0, 1.0);\n    gl_FragColor = vec4(col, 1.0);\n    // gl_FragColor = vec4(flow.x, flow.y, 0.0, 1.0);\n\n}";
},{}],"src/Quad/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Plane = require("../../vendors/ogl/src/extras/Plane");

var _Program = require("../../Vendors/ogl/src/core/Program");

var _Texture = require("../../Vendors/ogl/src/core/Texture");

var _Mesh2 = require("../../Vendors/ogl/src/core/Mesh");

var _Vec = require("../../Vendors/ogl/src/math/Vec2");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var vert = require("./shader/quad.vert");

var frag = require("./shader/quad.frag");

var Quad = /*#__PURE__*/function (_Mesh) {
  _inherits(Quad, _Mesh);

  var _super = _createSuper(Quad);

  function Quad(gl) {
    var _this;

    _classCallCheck(this, Quad);

    _this = _super.call(this, gl);
    _this.gl = gl;
    _this.geometry = new _Plane.Plane(_this.gl, {
      width: 2,
      height: 2
    });
    _this.texture = new _Texture.Texture(_this.gl, {
      generateMipmaps: false,
      minFilter: _this.gl.LINEAR,
      magFilter: _this.gl.LINEAR
    });
    var uniforms = {
      _Video: {
        value: _this.texture
      },
      _Output: {
        value: new _Texture.Texture(_this.gl)
      },
      _Resolution: {
        value: new _Vec.Vec2(_this.gl.renderer.width, _this.gl.renderer.height)
      }
    };
    _this.program = new _Program.Program(_this.gl, {
      vertex: vert,
      fragment: frag,
      uniforms: uniforms,
      transparent: false
    });
    return _this;
  }

  _createClass(Quad, [{
    key: "update",
    value: function update(_ref) {
      var inputVideo = _ref.inputVideo;

      if (inputVideo.readyState >= inputVideo.HAVE_CURRENT_DATA) {
        this.texture.image = inputVideo;
        this.texture.needsUpdate = true;
      }

      this.program.uniforms._Resolution.value.set(this.gl.renderer.width, this.gl.renderer.height);
    }
  }, {
    key: "Output",
    set: function set(t) {
      this.program.uniforms._Output.value = t;
    }
  }]);

  return Quad;
}(_Mesh2.Mesh);

exports.default = Quad;
},{"../../vendors/ogl/src/extras/Plane":"vendors/ogl/src/extras/Plane.js","../../Vendors/ogl/src/core/Program":"Vendors/ogl/src/core/Program.js","../../Vendors/ogl/src/core/Texture":"Vendors/ogl/src/core/Texture.js","../../Vendors/ogl/src/core/Mesh":"Vendors/ogl/src/core/Mesh.js","../../Vendors/ogl/src/math/Vec2":"Vendors/ogl/src/math/Vec2.js","./shader/quad.vert":"src/Quad/shader/quad.vert","./shader/quad.frag":"src/Quad/shader/quad.frag"}],"Vendors/ogl/src/core/Geometry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Geometry = void 0;

var _Vec = require("../math/Vec3.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var tempVec3 = new _Vec.Vec3();
var ID = 1;
var ATTR_ID = 1; // To stop inifinite warnings

var isBoundsWarned = false;

var Geometry = /*#__PURE__*/function () {
  function Geometry(gl) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Geometry);

    if (!gl.canvas) console.error('gl not passed as first argument to Geometry');
    this.gl = gl;
    this.attributes = attributes;
    this.id = ID++; // Store one VAO per program attribute locations order

    this.VAOs = {};
    this.drawRange = {
      start: 0,
      count: 0
    };
    this.instancedCount = 0; // Unbind current VAO so that new buffers don't get added to active mesh

    this.gl.renderer.bindVertexArray(null);
    this.gl.renderer.currentGeometry = null; // Alias for state store to avoid redundant calls for global state

    this.glState = this.gl.renderer.state; // create the buffers

    for (var key in attributes) {
      this.addAttribute(key, attributes[key]);
    }
  }

  _createClass(Geometry, [{
    key: "addAttribute",
    value: function addAttribute(key, attr) {
      this.attributes[key] = attr; // Set options

      attr.id = ATTR_ID++; // TODO: currently unused, remove?

      attr.size = attr.size || 1;
      attr.type = attr.type || (attr.data.constructor === Float32Array ? this.gl.FLOAT : attr.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT); // Uint32Array

      attr.target = key === 'index' ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
      attr.normalized = attr.normalized || false;
      attr.stride = attr.stride || 0;
      attr.offset = attr.offset || 0;
      attr.count = attr.count || (attr.stride ? attr.data.byteLength / attr.stride : attr.data.length / attr.size);
      attr.divisor = attr.instanced || 0;
      attr.needsUpdate = false;

      if (!attr.buffer) {
        attr.buffer = this.gl.createBuffer(); // Push data to buffer

        this.updateAttribute(attr);
      } // Update geometry counts. If indexed, ignore regular attributes


      if (attr.divisor) {
        this.isInstanced = true;

        if (this.instancedCount && this.instancedCount !== attr.count * attr.divisor) {
          console.warn('geometry has multiple instanced buffers of different length');
          return this.instancedCount = Math.min(this.instancedCount, attr.count * attr.divisor);
        }

        this.instancedCount = attr.count * attr.divisor;
      } else if (key === 'index') {
        this.drawRange.count = attr.count;
      } else if (!this.attributes.index) {
        this.drawRange.count = Math.max(this.drawRange.count, attr.count);
      }
    }
  }, {
    key: "updateAttribute",
    value: function updateAttribute(attr) {
      if (this.glState.boundBuffer !== attr.buffer) {
        this.gl.bindBuffer(attr.target, attr.buffer);
        this.glState.boundBuffer = attr.buffer;
      }

      this.gl.bufferData(attr.target, attr.data, this.gl.STATIC_DRAW);
      attr.needsUpdate = false;
    }
  }, {
    key: "setIndex",
    value: function setIndex(value) {
      this.addAttribute('index', value);
    }
  }, {
    key: "setDrawRange",
    value: function setDrawRange(start, count) {
      this.drawRange.start = start;
      this.drawRange.count = count;
    }
  }, {
    key: "setInstancedCount",
    value: function setInstancedCount(value) {
      this.instancedCount = value;
    }
  }, {
    key: "createVAO",
    value: function createVAO(program) {
      this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
      this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
      this.bindAttributes(program);
    }
  }, {
    key: "bindAttributes",
    value: function bindAttributes(program) {
      var _this = this;

      // Link all attributes to program using gl.vertexAttribPointer
      program.attributeLocations.forEach(function (location, _ref) {
        var name = _ref.name,
            type = _ref.type;

        // If geometry missing a required shader attribute
        if (!_this.attributes[name]) {
          console.warn("active attribute ".concat(name, " not being supplied"));
          return;
        }

        var attr = _this.attributes[name];

        _this.gl.bindBuffer(attr.target, attr.buffer);

        _this.glState.boundBuffer = attr.buffer; // For matrix attributes, buffer needs to be defined per column

        var numLoc = 1;
        if (type === 35674) numLoc = 2; // mat2

        if (type === 35675) numLoc = 3; // mat3

        if (type === 35676) numLoc = 4; // mat4

        var size = attr.size / numLoc;
        var stride = numLoc === 1 ? 0 : numLoc * numLoc * numLoc;
        var offset = numLoc === 1 ? 0 : numLoc * numLoc;

        for (var i = 0; i < numLoc; i++) {
          _this.gl.vertexAttribPointer(location + i, size, attr.type, attr.normalized, attr.stride + stride, attr.offset + i * offset);

          _this.gl.enableVertexAttribArray(location + i); // For instanced attributes, divisor needs to be set.
          // For firefox, need to set back to 0 if non-instanced drawn after instanced. Else won't render


          _this.gl.renderer.vertexAttribDivisor(location + i, attr.divisor);
        }
      }); // Bind indices if geometry indexed

      if (this.attributes.index) this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
    }
  }, {
    key: "draw",
    value: function draw(_ref2) {
      var _this2 = this;

      var program = _ref2.program,
          _ref2$mode = _ref2.mode,
          mode = _ref2$mode === void 0 ? this.gl.TRIANGLES : _ref2$mode;

      if (this.gl.renderer.currentGeometry !== "".concat(this.id, "_").concat(program.attributeOrder)) {
        if (!this.VAOs[program.attributeOrder]) this.createVAO(program);
        this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
        this.gl.renderer.currentGeometry = "".concat(this.id, "_").concat(program.attributeOrder);
      } // Check if any attributes need updating


      program.attributeLocations.forEach(function (location, _ref3) {
        var name = _ref3.name;
        var attr = _this2.attributes[name];
        if (attr.needsUpdate) _this2.updateAttribute(attr);
      });

      if (this.isInstanced) {
        if (this.attributes.index) {
          this.gl.renderer.drawElementsInstanced(mode, this.drawRange.count, this.attributes.index.type, this.drawRange.start, this.instancedCount);
        } else {
          this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
        }
      } else {
        if (this.attributes.index) {
          this.gl.drawElements(mode, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * 2);
        } else {
          this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
        }
      }
    }
  }, {
    key: "getPositionArray",
    value: function getPositionArray() {
      // Use position buffer, or min/max if available
      var attr = this.attributes.position;
      if (attr.min) return [].concat(_toConsumableArray(attr.min), _toConsumableArray(attr.max));
      if (attr.data) return attr.data;
      if (isBoundsWarned) return;
      console.warn('No position buffer data found to compute bounds');
      return isBoundsWarned = true;
    }
  }, {
    key: "computeBoundingBox",
    value: function computeBoundingBox(array) {
      if (!array) array = this.getPositionArray();

      if (!this.bounds) {
        this.bounds = {
          min: new _Vec.Vec3(),
          max: new _Vec.Vec3(),
          center: new _Vec.Vec3(),
          scale: new _Vec.Vec3(),
          radius: Infinity
        };
      }

      var min = this.bounds.min;
      var max = this.bounds.max;
      var center = this.bounds.center;
      var scale = this.bounds.scale;
      min.set(+Infinity);
      max.set(-Infinity); // TODO: use offset/stride if exists
      // TODO: check size of position (eg triangle with Vec2)

      for (var i = 0, l = array.length; i < l; i += 3) {
        var x = array[i];
        var y = array[i + 1];
        var z = array[i + 2];
        min.x = Math.min(x, min.x);
        min.y = Math.min(y, min.y);
        min.z = Math.min(z, min.z);
        max.x = Math.max(x, max.x);
        max.y = Math.max(y, max.y);
        max.z = Math.max(z, max.z);
      }

      scale.sub(max, min);
      center.add(min, max).divide(2);
    }
  }, {
    key: "computeBoundingSphere",
    value: function computeBoundingSphere(array) {
      if (!array) array = this.getPositionArray();
      if (!this.bounds) this.computeBoundingBox(array);
      var maxRadiusSq = 0;

      for (var i = 0, l = array.length; i < l; i += 3) {
        tempVec3.fromArray(array, i);
        maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.squaredDistance(tempVec3));
      }

      this.bounds.radius = Math.sqrt(maxRadiusSq);
    }
  }, {
    key: "remove",
    value: function remove() {
      if (this.vao) this.gl.renderer.deleteVertexArray(this.vao);

      for (var key in this.attributes) {
        this.gl.deleteBuffer(this.attributes[key].buffer);
        delete this.attributes[key];
      }
    }
  }]);

  return Geometry;
}();

exports.Geometry = Geometry;
},{"../math/Vec3.js":"Vendors/ogl/src/math/Vec3.js"}],"Vendors/ogl/src/extras/Triangle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Triangle = void 0;

var _Geometry2 = require("../core/Geometry.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Triangle = /*#__PURE__*/function (_Geometry) {
  _inherits(Triangle, _Geometry);

  var _super = _createSuper(Triangle);

  function Triangle(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$attributes = _ref.attributes,
        attributes = _ref$attributes === void 0 ? {} : _ref$attributes;

    _classCallCheck(this, Triangle);

    Object.assign(attributes, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 3, -1, -1, 3])
      },
      uv: {
        size: 2,
        data: new Float32Array([0, 0, 2, 0, 0, 2])
      }
    });
    return _super.call(this, gl, attributes);
  }

  return Triangle;
}(_Geometry2.Geometry);

exports.Triangle = Triangle;
},{"../core/Geometry.js":"Vendors/ogl/src/core/Geometry.js"}],"Vendors/ogl/src/core/RenderTarget.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderTarget = void 0;

var _Texture = require("./Texture.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenderTarget = function RenderTarget(gl) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? gl.canvas.width : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? gl.canvas.height : _ref$height,
      _ref$target = _ref.target,
      target = _ref$target === void 0 ? gl.FRAMEBUFFER : _ref$target,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 1 : _ref$color,
      _ref$depth = _ref.depth,
      depth = _ref$depth === void 0 ? true : _ref$depth,
      _ref$stencil = _ref.stencil,
      stencil = _ref$stencil === void 0 ? false : _ref$stencil,
      _ref$depthTexture = _ref.depthTexture,
      depthTexture = _ref$depthTexture === void 0 ? false : _ref$depthTexture,
      _ref$wrapS = _ref.wrapS,
      wrapS = _ref$wrapS === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapS,
      _ref$wrapT = _ref.wrapT,
      wrapT = _ref$wrapT === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapT,
      _ref$minFilter = _ref.minFilter,
      minFilter = _ref$minFilter === void 0 ? gl.LINEAR : _ref$minFilter,
      _ref$magFilter = _ref.magFilter,
      magFilter = _ref$magFilter === void 0 ? minFilter : _ref$magFilter,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? gl.UNSIGNED_BYTE : _ref$type,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? gl.RGBA : _ref$format,
      _ref$internalFormat = _ref.internalFormat,
      internalFormat = _ref$internalFormat === void 0 ? format : _ref$internalFormat,
      unpackAlignment = _ref.unpackAlignment,
      premultiplyAlpha = _ref.premultiplyAlpha;

  _classCallCheck(this, RenderTarget);

  this.gl = gl;
  this.width = width;
  this.height = height;
  this.depth = depth;
  this.buffer = this.gl.createFramebuffer();
  this.target = target;
  this.gl.bindFramebuffer(this.target, this.buffer);
  this.textures = [];
  var drawBuffers = []; // create and attach required num of color textures

  for (var i = 0; i < color; i++) {
    this.textures.push(new _Texture.Texture(gl, {
      width: width,
      height: height,
      wrapS: wrapS,
      wrapT: wrapT,
      minFilter: minFilter,
      magFilter: magFilter,
      type: type,
      format: format,
      internalFormat: internalFormat,
      unpackAlignment: unpackAlignment,
      premultiplyAlpha: premultiplyAlpha,
      flipY: false,
      generateMipmaps: false
    }));
    this.textures[i].update();
    this.gl.framebufferTexture2D(this.target, this.gl.COLOR_ATTACHMENT0 + i, this.gl.TEXTURE_2D, this.textures[i].texture, 0
    /* level */
    );
    drawBuffers.push(this.gl.COLOR_ATTACHMENT0 + i);
  } // For multi-render targets shader access


  if (drawBuffers.length > 1) this.gl.renderer.drawBuffers(drawBuffers); // alias for majority of use cases

  this.texture = this.textures[0]; // note depth textures break stencil - so can't use together

  if (depthTexture && (this.gl.renderer.isWebgl2 || this.gl.renderer.getExtension('WEBGL_depth_texture'))) {
    this.depthTexture = new _Texture.Texture(gl, {
      width: width,
      height: height,
      minFilter: this.gl.NEAREST,
      magFilter: this.gl.NEAREST,
      format: this.gl.DEPTH_COMPONENT,
      internalFormat: gl.renderer.isWebgl2 ? this.gl.DEPTH_COMPONENT16 : this.gl.DEPTH_COMPONENT,
      type: this.gl.UNSIGNED_INT
    });
    this.depthTexture.update();
    this.gl.framebufferTexture2D(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0
    /* level */
    );
  } else {
    // Render buffers
    if (depth && !stencil) {
      this.depthBuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
      this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthBuffer);
    }

    if (stencil && !depth) {
      this.stencilBuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.stencilBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.STENCIL_INDEX8, width, height);
      this.gl.framebufferRenderbuffer(this.target, this.gl.STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.stencilBuffer);
    }

    if (depth && stencil) {
      this.depthStencilBuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthStencilBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_STENCIL, width, height);
      this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.depthStencilBuffer);
    }
  }

  this.gl.bindFramebuffer(this.target, null);
};

exports.RenderTarget = RenderTarget;
},{"./Texture.js":"Vendors/ogl/src/core/Texture.js"}],"src/Flow/shaders/triangle.vert":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nattribute vec2 position;\nattribute vec2 uv;\n\nvarying vec2 vUV;\n\nvoid main() {\n\n    gl_Position = vec4(position, 0.0, 1.0);\n    vUV = uv;\n\n}";
},{}],"src/Flow/shaders/opticalflow.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D _CurrentFrame;\nuniform sampler2D _PrevFrame;\nuniform sampler2D _PrevFlow;\n\nuniform vec2 _Resolution;\nuniform vec2 _TexelSize;\nuniform float _Scale;\n\nvarying vec2 vUV;\n\n// #define TINY 0.000001\n// #define THRESHOLD 0.007 \n\n// #define THRESHOLD 0.007\n#define THRESHOLD 0.007\n// #define TINY 0.00001\n#define TINY 0.000001\n\n//HEAVILY INSPIRED FROM FOLLOWING SHADERS: \n//https://github.com/moostrik/ofxFlowTools/blob/master/src/core/opticalflow/ftOpticalFlowShader.h\n//By: Matthias Oostrik https://github.com/moostrik\n\n//http://www.thomasdiewald.com/\n\nvoid main() {\n\n    vec2 uv = vec2(1.0 - vUV.x, vUV.y);\n\n    //derivative X\n    float dX = texture2D(_PrevFrame, uv + vec2(_TexelSize.x, 0.0)).x - texture2D(_PrevFrame, uv - vec2(_TexelSize.x, 0.0)).x;\n    dX += texture2D(_CurrentFrame, uv + vec2(_TexelSize.x, 0.0)).x - texture2D(_CurrentFrame, uv - vec2(_TexelSize.x, 0.0)).x;\n\n    //derivative y\n    float dY = texture2D(_PrevFrame, uv + vec2(0.0, _TexelSize.y)).x - texture2D(_PrevFrame, uv - vec2(0.0, _TexelSize.y)).x;\n    dY += texture2D(_CurrentFrame, uv + vec2(0.0, _TexelSize.y)).x - texture2D(_CurrentFrame, uv - vec2(0.0, _TexelSize.y)).x;\n\n    //gradient magnitude\n    float mag = sqrt((dX * dX) + (dY * dY) + TINY);\n\n    //brightness difference\n    float dT = texture2D(_CurrentFrame, uv).x - texture2D(_PrevFrame, uv).x;\n\n    float vX = (dX / mag) * dT;\n    float vY = (dY / mag) * dT;\n\n    vec2 flow = vec2(vX, vY * -1.0);\n\n    // float flowMag = length(flow);\n    // flowMag = max(flowMag, THRESHOLD);\n    // flowMag -= THRESHOLD;\n    // flowMag /= (1.0 - THRESHOLD);\n    // // flowMag = flowMag * flowMag;\n    // flow += TINY; //prevents divisions by 0 when normalizing\n    // flow = normalize(flow) * min(flowMag, 1.0);\n    // flow *= _Scale; \n\n    float oldLen = sqrt((flow.x * flow.x) + (flow.y * flow.y) + 0.00001);\n    float newLen = max(oldLen - THRESHOLD, 0.0);\n    flow = (newLen * flow)/oldLen;\n\n    flow *= _Scale; \n\n    vec3 prevFlow = texture2D(_PrevFlow, vUV).xyz;\n\n    vec3 outPut = mix(vec3(flow, length(flow)), prevFlow, 0.97);\n    // vec3 outPut = mix(vec3(flow, length(flow)), prevFlow, 0.97);\n    \n    // gl_FragColor = vec4(vec3(flow, length(flow)), 1.0);\n    gl_FragColor = vec4(outPut, 1.0);\n\n}";
},{}],"src/Flow/shaders/capture.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D _CameraFrame;\n\nvarying vec2 vUV;\n\nvoid main() {\n\n    vec3 col = texture2D(_CameraFrame, vUV).xyz;\n    gl_FragColor = vec4(col, 1.0);\n\n}";
},{}],"src/Flow/shaders/blur.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform vec2 _Resolution;\nuniform sampler2D _Texture;\nuniform bool _Flip;\nuniform vec2 _BlurDirection;\n\nvarying vec2 vUV;\n\n//source: https://github.com/Jam3/glsl-fast-gaussian-blur/blob/master/5.glsl\n\nvec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.3333333333333333) * direction;\n  color += texture2D(image, uv).x * 0.29411764705882354;\n  color += texture2D(image, uv + (off1 / resolution)).x * 0.35294117647058826;\n  color += texture2D(image, uv - (off1 / resolution)).x * 0.35294117647058826;\n  return color; \n}\n\nvec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.3846153846) * direction;\n  vec2 off2 = vec2(3.2307692308) * direction;\n  color += texture2D(image, uv).x * 0.2270270270;\n  color += texture2D(image, uv + (off1 / resolution)).x * 0.3162162162;\n  color += texture2D(image, uv - (off1 / resolution)).x * 0.3162162162;\n  color += texture2D(image, uv + (off2 / resolution)).x * 0.0702702703;\n  color += texture2D(image, uv - (off2 / resolution)).x * 0.0702702703;\n  return color;\n}\n\nvoid main() {\n\n    gl_FragColor = blur9(_Texture, vUV, _Resolution, _BlurDirection);\n\n}";
},{}],"src/Flow/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Transform = require("../../Vendors/ogl/src/core/Transform");

var _Triangle = require("../../Vendors/ogl/src/extras/Triangle");

var _Program = require("../../Vendors/ogl/src/core/Program");

var _Texture = require("../../Vendors/ogl/src/core/Texture");

var _Mesh = require("../../Vendors/ogl/src/core/Mesh");

var _RenderTarget = require("../../Vendors/ogl/src/core/RenderTarget");

var _Vec = require("../../Vendors/ogl/src/math/Vec2");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var vert = require("./shaders/triangle.vert");

var opticalFlowFrag = require("./shaders/opticalflow.frag");

var captureFrag = require("./shaders/capture.frag");

var blur = require("./shaders/blur.frag");
/**
 * Takes a input image and does following:
 * calculates brightness derivatives for optical flow
 * takes the flow image and pass it to a blur pass
 * applies the optical flow texture to a flud sim
 *
 * getters:
 * optical flow
 * fluid sim
 */


var Flow = /*#__PURE__*/function () {
  function Flow(gl, _ref) {
    var _ref$width = _ref.width,
        width = _ref$width === void 0 ? 2 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 2 : _ref$height;

    _classCallCheck(this, Flow);

    this.gl = gl;
    this.width = width;
    this.height = height;
    this.firstTick = true;
    this.initCameraCapture();
    this.initBlurPass();
    this.initOpticalFlowPass();
    this.initVelocityPass();
  }

  _createClass(Flow, [{
    key: "initCameraCapture",
    value: function initCameraCapture() {
      this.cameraFrame = new _Texture.Texture(this.gl, {
        generateMipmaps: false,
        width: this.width,
        height: this.height
      });
      var params = {
        width: this.width,
        height: this.height,
        minFilter: this.gl.LINEAR,
        magFilter: this.gl.LINEAR,
        depth: false
      };
      this.currentFrame = new _RenderTarget.RenderTarget(this.gl, params);
      this.prevFrame = new _RenderTarget.RenderTarget(this.gl, params);
      this.cameraCaptureScene = new _Transform.Transform();
      var uniforms = {
        _CameraFrame: {
          value: this.cameraFrame
        }
      };
      this.cameraCaptureQuad = new _Mesh.Mesh(this.gl, {
        geometry: new _Triangle.Triangle(this.gl),
        program: new _Program.Program(this.gl, {
          vertex: vert,
          fragment: captureFrag,
          uniforms: uniforms,
          transparent: false
        })
      });
      this.cameraCaptureQuad.setParent(this.cameraCaptureScene);
    }
  }, {
    key: "initBlurPass",
    value: function initBlurPass() {
      var params = {
        width: this.width,
        height: this.height,
        minFilter: this.gl.LINEAR,
        magFilter: this.gl.LINEAR,
        depth: false
      };
      this.blurTextureWrite = new _RenderTarget.RenderTarget(this.gl, params);
      this.blurTextureRead = new _RenderTarget.RenderTarget(this.gl, params);
      this.blurDirectionX = new _Vec.Vec2(1.0, 0.0);
      this.blurDirectionY = new _Vec.Vec2(0.0, 1.0);
      this.blurScene = new _Transform.Transform();
      var uniforms = {
        _Texture: {
          value: this.blurTextureRead.texture
        },
        _Resolution: {
          value: new _Vec.Vec2(this.gl.renderer.width, this.gl.renderer.height)
        },
        _Flip: {
          value: false
        },
        _BlurDirection: {
          value: new _Vec.Vec2(0.0, 0.0)
        }
      };
      this.blurQuad = new _Mesh.Mesh(this.gl, {
        geometry: new _Triangle.Triangle(this.gl),
        program: new _Program.Program(this.gl, {
          vertex: vert,
          fragment: blur,
          uniforms: uniforms,
          transparent: false
        })
      });
      this.blurQuad.setParent(this.blurScene);
    }
  }, {
    key: "initOpticalFlowPass",
    value: function initOpticalFlowPass() {
      //texture where we render the flow vectors
      var params = {
        width: this.width,
        height: this.height,
        type: this.gl.HALF_FLOAT || this.gl.renderer.extensions["OES_texture_half_float"].HALF_FLOAT_OES,
        format: this.gl.RGBA,
        internalFormat: this.gl.RGBA16F,
        depth: false
      };
      this.flowVectorTextureWrite = new _RenderTarget.RenderTarget(this.gl, params);
      this.flowVectorTextureRead = new _RenderTarget.RenderTarget(this.gl, params);
      this.opticalFlowScene = new _Transform.Transform();
      var uniforms = {
        _CurrentFrame: {
          value: this.currentFrame.texture
        },
        _PrevFrame: {
          value: this.prevFrame.texture
        },
        _PrevFlow: {
          value: this.flowVectorTextureRead.texture
        },
        _Resolution: {
          value: new _Vec.Vec2(this.gl.renderer.width, this.gl.renderer.height)
        },
        _TexelSize: {
          value: new _Vec.Vec2(1.0 / this.width, 1.0 / this.height)
        },
        // _TexelSize: {
        //   value: new Vec2(
        //     0.1,
        //     0.1
        //   )
        // },
        _Scale: {
          value: 800
        }
      };
      this.opticalFlowQuad = new _Mesh.Mesh(this.gl, {
        geometry: new _Triangle.Triangle(this.gl),
        program: new _Program.Program(this.gl, {
          uniforms: uniforms,
          vertex: vert,
          fragment: opticalFlowFrag,
          transparent: false
        })
      });
      this.opticalFlowQuad.setParent(this.opticalFlowScene);
    }
  }, {
    key: "initVelocityPass",
    value: function initVelocityPass() {// const params = {
      //     width: this.width,
      //     height: this.height,
      //     type: this.gl.HALF_FLOAT || this.gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES,
      //     format: this.gl.RGBA,
      //     internalFormat: this.gl.RGBA16F,
      //     depth: false
      // }
      // this.velocityTextureRead =
    }
  }, {
    key: "blurInputVideo",
    value: function blurInputVideo() {
      var blurIterationCount = 12;
      this.gl.renderer.autoClear = false;

      for (var i = 0; i < blurIterationCount; i++) {
        var blurRadius = blurIterationCount - i - 1;
        this.blurQuad.program.uniforms._Texture.value = i === 0 ? this.cameraFrame : this.blurTextureRead.texture;

        this.blurQuad.program.uniforms._BlurDirection.value.set(i % 2 === 0 ? blurRadius : 0, i % 2 === 0 ? 0 : blurRadius);

        this.blurQuad.program.uniforms._Resolution.value.set(this.gl.renderer.width, this.gl.renderer.height);

        this.gl.renderer.render({
          scene: this.blurScene,
          target: this.blurTextureWrite
        });
        var tmp = this.blurTextureRead;
        this.blurTextureRead = this.blurTextureWrite;
        this.blurTextureWrite = tmp;
      }

      this.gl.renderer.autoClear = true;
    }
  }, {
    key: "saveCameraFrame",
    value: function saveCameraFrame() {
      var tmp = this.prevFrame;
      this.prevFrame = this.currentFrame;
      this.currentFrame = tmp;
      this.cameraCaptureQuad.program.uniforms._CameraFrame.value = this.blurTextureRead.texture;
      this.gl.renderer.render({
        scene: this.cameraCaptureScene,
        target: this.currentFrame
      });
    }
  }, {
    key: "update",
    value: function update(_ref2) {
      var inputVideo = _ref2.inputVideo;

      if (inputVideo.readyState >= inputVideo.HAVE_CURRENT_DATA) {
        this.cameraFrame.image = inputVideo;
        this.cameraFrame.needsUpdate = true; //...run as usual

        this.blurInputVideo();
        this.saveCameraFrame(); //prewarm to prevent spike in optical flow

        if (this.firstTick) {
          this.blurInputVideo();
          this.saveCameraFrame();
          this.firstTick = false;
        }
      }

      this.opticalFlowQuad.program.uniforms._CurrentFrame.value = this.currentFrame.texture;
      this.opticalFlowQuad.program.uniforms._PrevFrame.value = this.prevFrame.texture;
      this.opticalFlowQuad.program.uniforms._PrevFlow.value = this.flowVectorTextureRead.texture;

      this.opticalFlowQuad.program.uniforms._Resolution.value.set(this.gl.renderer.width, this.gl.renderer.height);

      this.opticalFlowQuad.program.uniforms._TexelSize.value.set(1.0 / this.gl.renderer.width, 1.0 / this.gl.renderer.height);

      this.gl.renderer.render({
        scene: this.opticalFlowScene,
        target: this.flowVectorTextureWrite
      });
      var tmp = this.flowVectorTextureRead;
      this.flowVectorTextureRead = this.flowVectorTextureWrite;
      this.flowVectorTextureWrite = tmp;
    }
  }]);

  return Flow;
}();

exports.default = Flow;
},{"../../Vendors/ogl/src/core/Transform":"Vendors/ogl/src/core/Transform.js","../../Vendors/ogl/src/extras/Triangle":"Vendors/ogl/src/extras/Triangle.js","../../Vendors/ogl/src/core/Program":"Vendors/ogl/src/core/Program.js","../../Vendors/ogl/src/core/Texture":"Vendors/ogl/src/core/Texture.js","../../Vendors/ogl/src/core/Mesh":"Vendors/ogl/src/core/Mesh.js","../../Vendors/ogl/src/core/RenderTarget":"Vendors/ogl/src/core/RenderTarget.js","../../Vendors/ogl/src/math/Vec2":"Vendors/ogl/src/math/Vec2.js","./shaders/triangle.vert":"src/Flow/shaders/triangle.vert","./shaders/opticalflow.frag":"src/Flow/shaders/opticalflow.frag","./shaders/capture.frag":"src/Flow/shaders/capture.frag","./shaders/blur.frag":"src/Flow/shaders/blur.frag"}],"vendors/ogl/src/core/Program.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Program = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: upload empty texture if null ? maybe not
// TODO: upload identity matrix if null ?
// TODO: sampler Cube
var ID = 1; // cache of typed arrays used to flatten uniform arrays

var arrayCacheF32 = {};

var Program = /*#__PURE__*/function () {
  function Program(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        vertex = _ref.vertex,
        fragment = _ref.fragment,
        _ref$uniforms = _ref.uniforms,
        uniforms = _ref$uniforms === void 0 ? {} : _ref$uniforms,
        _ref$transparent = _ref.transparent,
        transparent = _ref$transparent === void 0 ? false : _ref$transparent,
        _ref$cullFace = _ref.cullFace,
        cullFace = _ref$cullFace === void 0 ? gl.BACK : _ref$cullFace,
        _ref$frontFace = _ref.frontFace,
        frontFace = _ref$frontFace === void 0 ? gl.CCW : _ref$frontFace,
        _ref$depthTest = _ref.depthTest,
        depthTest = _ref$depthTest === void 0 ? true : _ref$depthTest,
        _ref$depthWrite = _ref.depthWrite,
        depthWrite = _ref$depthWrite === void 0 ? true : _ref$depthWrite,
        _ref$depthFunc = _ref.depthFunc,
        depthFunc = _ref$depthFunc === void 0 ? gl.LESS : _ref$depthFunc;

    _classCallCheck(this, Program);

    if (!gl.canvas) console.error('gl not passed as fist argument to Program');
    this.gl = gl;
    this.uniforms = uniforms;
    this.id = ID++;
    if (!vertex) console.warn('vertex shader not supplied');
    if (!fragment) console.warn('fragment shader not supplied'); // Store program state

    this.transparent = transparent;
    this.cullFace = cullFace;
    this.frontFace = frontFace;
    this.depthTest = depthTest;
    this.depthWrite = depthWrite;
    this.depthFunc = depthFunc;
    this.blendFunc = {};
    this.blendEquation = {}; // set default blendFunc if transparent flagged

    if (this.transparent && !this.blendFunc.src) {
      if (this.gl.renderer.premultipliedAlpha) this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);else this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    } // compile vertex shader and log errors


    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertex);
    gl.compileShader(vertexShader);

    if (gl.getShaderInfoLog(vertexShader) !== '') {
      console.warn("".concat(gl.getShaderInfoLog(vertexShader), "\nVertex Shader\n").concat(addLineNumbers(vertex)));
    } // compile fragment shader and log errors


    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);

    if (gl.getShaderInfoLog(fragmentShader) !== '') {
      console.warn("".concat(gl.getShaderInfoLog(fragmentShader), "\nFragment Shader\n").concat(addLineNumbers(fragment)));
    } // compile program and log errors


    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      return console.warn(gl.getProgramInfoLog(this.program));
    } // Remove shader once linked


    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader); // Get active uniform locations

    this.uniformLocations = new Map();
    var numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);

    for (var uIndex = 0; uIndex < numUniforms; uIndex++) {
      var uniform = gl.getActiveUniform(this.program, uIndex);
      this.uniformLocations.set(uniform, gl.getUniformLocation(this.program, uniform.name)); // split uniforms' names to separate array and struct declarations

      var split = uniform.name.match(/(\w+)/g);
      uniform.uniformName = split[0];

      if (split.length === 3) {
        uniform.isStructArray = true;
        uniform.structIndex = Number(split[1]);
        uniform.structProperty = split[2];
      } else if (split.length === 2 && isNaN(Number(split[1]))) {
        uniform.isStruct = true;
        uniform.structProperty = split[1];
      }
    } // Get active attribute locations


    this.attributeLocations = new Map();
    var locations = [];
    var numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);

    for (var aIndex = 0; aIndex < numAttribs; aIndex++) {
      var attribute = gl.getActiveAttrib(this.program, aIndex);
      var location = gl.getAttribLocation(this.program, attribute.name);
      locations[location] = attribute.name;
      this.attributeLocations.set(attribute, location);
    }

    this.attributeOrder = locations.join('');
  }

  _createClass(Program, [{
    key: "setBlendFunc",
    value: function setBlendFunc(src, dst, srcAlpha, dstAlpha) {
      this.blendFunc.src = src;
      this.blendFunc.dst = dst;
      this.blendFunc.srcAlpha = srcAlpha;
      this.blendFunc.dstAlpha = dstAlpha;
      if (src) this.transparent = true;
    }
  }, {
    key: "setBlendEquation",
    value: function setBlendEquation(modeRGB, modeAlpha) {
      this.blendEquation.modeRGB = modeRGB;
      this.blendEquation.modeAlpha = modeAlpha;
    }
  }, {
    key: "applyState",
    value: function applyState() {
      if (this.depthTest) this.gl.renderer.enable(this.gl.DEPTH_TEST);else this.gl.renderer.disable(this.gl.DEPTH_TEST);
      if (this.cullFace) this.gl.renderer.enable(this.gl.CULL_FACE);else this.gl.renderer.disable(this.gl.CULL_FACE);
      if (this.blendFunc.src) this.gl.renderer.enable(this.gl.BLEND);else this.gl.renderer.disable(this.gl.BLEND);
      if (this.cullFace) this.gl.renderer.setCullFace(this.cullFace);
      this.gl.renderer.setFrontFace(this.frontFace);
      this.gl.renderer.setDepthMask(this.depthWrite);
      this.gl.renderer.setDepthFunc(this.depthFunc);
      if (this.blendFunc.src) this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha);
      if (this.blendEquation.modeRGB) this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
    }
  }, {
    key: "use",
    value: function use() {
      var _this = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$flipFaces = _ref2.flipFaces,
          flipFaces = _ref2$flipFaces === void 0 ? false : _ref2$flipFaces;

      var textureUnit = -1;
      var programActive = this.gl.renderer.currentProgram === this.id; // Avoid gl call if program already in use

      if (!programActive) {
        this.gl.useProgram(this.program);
        this.gl.renderer.currentProgram = this.id;
      } // Set only the active uniforms found in the shader


      this.uniformLocations.forEach(function (location, activeUniform) {
        var name = activeUniform.uniformName; // get supplied uniform

        var uniform = _this.uniforms[name]; // For structs, get the specific property instead of the entire object

        if (activeUniform.isStruct) {
          uniform = uniform[activeUniform.structProperty];
          name += ".".concat(activeUniform.structProperty);
        }

        if (activeUniform.isStructArray) {
          uniform = uniform[activeUniform.structIndex][activeUniform.structProperty];
          name += "[".concat(activeUniform.structIndex, "].").concat(activeUniform.structProperty);
        }

        if (!uniform) {
          return warn("Active uniform ".concat(name, " has not been supplied"));
        }

        if (uniform && uniform.value === undefined) {
          return warn("".concat(name, " uniform is missing a value parameter"));
        }

        if (uniform.value.texture) {
          textureUnit = textureUnit + 1; // Check if texture needs to be updated

          uniform.value.update(textureUnit);
          return setUniform(_this.gl, activeUniform.type, location, textureUnit);
        } // For texture arrays, set uniform as an array of texture units instead of just one


        if (uniform.value.length && uniform.value[0].texture) {
          var textureUnits = [];
          uniform.value.forEach(function (value) {
            textureUnit = textureUnit + 1;
            value.update(textureUnit);
            textureUnits.push(textureUnit);
          });
          return setUniform(_this.gl, activeUniform.type, location, textureUnits);
        }

        setUniform(_this.gl, activeUniform.type, location, uniform.value);
      });
      this.applyState();
      if (flipFaces) this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.gl.deleteProgram(this.program);
    }
  }]);

  return Program;
}();

exports.Program = Program;

function setUniform(gl, type, location, value) {
  value = value.length ? flatten(value) : value;
  var setValue = gl.renderer.state.uniformLocations.get(location); // Avoid redundant uniform commands

  if (value.length) {
    if (setValue === undefined || setValue.length !== value.length) {
      // clone array to store as cache
      gl.renderer.state.uniformLocations.set(location, value.slice(0));
    } else {
      if (arraysEqual(setValue, value)) return; // Update cached array values

      setValue.set ? setValue.set(value) : setArray(setValue, value);
      gl.renderer.state.uniformLocations.set(location, setValue);
    }
  } else {
    if (setValue === value) return;
    gl.renderer.state.uniformLocations.set(location, value);
  }

  switch (type) {
    case 5126:
      return value.length ? gl.uniform1fv(location, value) : gl.uniform1f(location, value);
    // FLOAT

    case 35664:
      return gl.uniform2fv(location, value);
    // FLOAT_VEC2

    case 35665:
      return gl.uniform3fv(location, value);
    // FLOAT_VEC3

    case 35666:
      return gl.uniform4fv(location, value);
    // FLOAT_VEC4

    case 35670: // BOOL

    case 5124: // INT

    case 35678: // SAMPLER_2D

    case 35680:
      return value.length ? gl.uniform1iv(location, value) : gl.uniform1i(location, value);
    // SAMPLER_CUBE

    case 35671: // BOOL_VEC2

    case 35667:
      return gl.uniform2iv(location, value);
    // INT_VEC2

    case 35672: // BOOL_VEC3

    case 35668:
      return gl.uniform3iv(location, value);
    // INT_VEC3

    case 35673: // BOOL_VEC4

    case 35669:
      return gl.uniform4iv(location, value);
    // INT_VEC4

    case 35674:
      return gl.uniformMatrix2fv(location, false, value);
    // FLOAT_MAT2

    case 35675:
      return gl.uniformMatrix3fv(location, false, value);
    // FLOAT_MAT3

    case 35676:
      return gl.uniformMatrix4fv(location, false, value);
    // FLOAT_MAT4
  }
}

function addLineNumbers(string) {
  var lines = string.split('\n');

  for (var i = 0; i < lines.length; i++) {
    lines[i] = i + 1 + ': ' + lines[i];
  }

  return lines.join('\n');
}

function flatten(a) {
  var arrayLen = a.length;
  var valueLen = a[0].length;
  if (valueLen === undefined) return a;
  var length = arrayLen * valueLen;
  var value = arrayCacheF32[length];
  if (!value) arrayCacheF32[length] = value = new Float32Array(length);

  for (var i = 0; i < arrayLen; i++) {
    value.set(a[i], i * valueLen);
  }

  return value;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;

  for (var i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

function setArray(a, b) {
  for (var i = 0, l = a.length; i < l; i++) {
    a[i] = b[i];
  }
}

var warnCount = 0;

function warn(message) {
  if (warnCount > 100) return;
  console.warn(message);
  warnCount++;
  if (warnCount > 100) console.warn('More than 100 program warnings - stopping logs.');
}
},{}],"src/Fluid/shaders/baseVertex.vert":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\n    attribute vec2 position;\n    attribute vec2 uv;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform vec2 texelSize;\n        void main () {\n            vUv = uv;\n            vL = vUv - vec2(texelSize.x, 0.0);\n            vR = vUv + vec2(texelSize.x, 0.0);\n            vT = vUv + vec2(0.0, texelSize.y);\n            vB = vUv - vec2(0.0, texelSize.y);\n            gl_Position = vec4(position, 0, 1);\n}";
},{}],"src/Fluid/shaders/advection.frag":[function(require,module,exports) {
module.exports = "precision highp float;\nprecision highp sampler2D;\n#define GLSLIFY 1\n\n    varying vec2 vUv;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uSource;\n    uniform vec2 texelSize;\n    uniform float dt;\n    uniform float dissipation;\n    void main () {\n        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n        gl_FragColor = dissipation * texture2D(uSource, coord);\n        gl_FragColor.a = 1.0;\n}";
},{}],"src/Fluid/shaders/advectionManualFiltering.frag":[function(require,module,exports) {
module.exports = "precision highp float;\nprecision highp sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D uVelocity;\nuniform sampler2D uSource;\nuniform vec2 texelSize;\nuniform vec2 dyeTexelSize;\nuniform float dt;\nuniform float dissipation;\n    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\n        vec2 st = uv / tsize - 0.5;\n        vec2 iuv = floor(st);\n        vec2 fuv = fract(st);\n        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\n        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\n        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\n        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n    }\n    \n    void main () {\n        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\n        gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);\n        gl_FragColor.a = 1.0;\n    }";
},{}],"src/Fluid/shaders/clear.frag":[function(require,module,exports) {
module.exports = "precision mediump float;\n    precision mediump sampler2D;\n#define GLSLIFY 1\n\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float value;\n\n    void main () {\n\n        gl_FragColor = value * texture2D(uTexture, vUv);\n\n}";
},{}],"src/Fluid/shaders/curl.frag":[function(require,module,exports) {
module.exports = "precision mediump float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying highp vec2 vUv;\nvarying highp vec2 vL;\nvarying highp vec2 vR;\nvarying highp vec2 vT;\nvarying highp vec2 vB;\nuniform sampler2D uVelocity;\nvoid main () {\n    float L = texture2D(uVelocity, vL).y;\n    float R = texture2D(uVelocity, vR).y;\n    float T = texture2D(uVelocity, vT).x;\n    float B = texture2D(uVelocity, vB).x;\n    float vorticity = R - L - T + B;\n    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n}";
},{}],"src/Fluid/shaders/divergence.frag":[function(require,module,exports) {
module.exports = "precision mediump float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n    \n    void main () {\n        float L = texture2D(uVelocity, vL).x;\n        float R = texture2D(uVelocity, vR).x;\n        float T = texture2D(uVelocity, vT).y;\n        float B = texture2D(uVelocity, vB).y;\n        vec2 C = texture2D(uVelocity, vUv).xy;\n            if (vL.x < 0.0) { L = -C.x; }\n            if (vR.x > 1.0) { R = -C.x; }\n            if (vT.y > 1.0) { T = -C.y; }\n            if (vB.y < 0.0) { B = -C.y; }\n            float div = 0.5 * (R - L + T - B);\n        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n}";
},{}],"src/Fluid/shaders/gradientSubtract.frag":[function(require,module,exports) {
module.exports = "precision mediump float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying highp vec2 vUv;\nvarying highp vec2 vL;\nvarying highp vec2 vR;\nvarying highp vec2 vT;\nvarying highp vec2 vB;\nuniform sampler2D uPressure;\nuniform sampler2D uVelocity;\nvoid main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        vec2 velocity = texture2D(uVelocity, vUv).xy;\n        velocity.xy -= vec2(R - L, T - B);\n    gl_FragColor = vec4(velocity, 0.0, 1.0);\n}";
},{}],"src/Fluid/shaders/pressure.frag":[function(require,module,exports) {
module.exports = "precision mediump float;\nprecision mediump sampler2D;\n#define GLSLIFY 1\nvarying highp vec2 vUv;\nvarying highp vec2 vL;\nvarying highp vec2 vR;\nvarying highp vec2 vT;\nvarying highp vec2 vB;\nuniform sampler2D uPressure;\nuniform sampler2D uDivergence;\nvoid main () {\n    float L = texture2D(uPressure, vL).x;\n    float R = texture2D(uPressure, vR).x;\n    float T = texture2D(uPressure, vT).x;\n    float B = texture2D(uPressure, vB).x;\n    float C = texture2D(uPressure, vUv).x;\n    float divergence = texture2D(uDivergence, vUv).x;\n    float pressure = (L + R + B + T - divergence) * 0.25;\n    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n}";
},{}],"src/Fluid/shaders/splat.frag":[function(require,module,exports) {
module.exports = "precision highp float;\nprecision highp sampler2D;\n#define GLSLIFY 1\n\n    varying vec2 vUv;\n    uniform sampler2D uTarget;\n    uniform float aspectRatio;\n    uniform sampler2D color;\n    // uniform vec2 point;\n    // uniform float radius;\n    \n    void main () {\n        // vec2 p = vUv - point.xy;\n        // p.x *= aspectRatio;\n        // vec3 splat = exp(-dot(p, p) / radius) * color; //replace this with optical flow\n        vec3 splat = texture2D(color, vUv).xyz; //replace this with optical flow\n        vec3 base = texture2D(uTarget, vUv).xyz;\n        gl_FragColor = vec4(base + splat, 1.0);\n}";
},{}],"src/Fluid/shaders/vorticity.frag":[function(require,module,exports) {
module.exports = "precision highp float;\nprecision highp sampler2D;\n#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uVelocity;\nuniform sampler2D uCurl;\nuniform float curl;\nuniform float dt;\nvoid main () {\n    float L = texture2D(uCurl, vL).x;\n    float R = texture2D(uCurl, vR).x;\n    float T = texture2D(uCurl, vT).x;\n    float B = texture2D(uCurl, vB).x;\n    float C = texture2D(uCurl, vUv).x;\n    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\n    force /= length(force) + 0.0001;\n    force *= curl * C;\n    force.y *= -1.0;\n    vec2 vel = texture2D(uVelocity, vUv).xy;\n    gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);\n}";
},{}],"src/Fluid/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Program = require("../../vendors/ogl/src/core/Program");

var _Texture = require("../../Vendors/ogl/src/core/Texture");

var _Mesh = require("../../Vendors/ogl/src/core/Mesh");

var _RenderTarget = require("../../Vendors/ogl/src/core/RenderTarget");

var _Vec = require("../../Vendors/ogl/src/math/Vec2");

var _Geometry = require("../../Vendors/ogl/src/core/Geometry");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var base = require("./shaders/baseVertex.vert");

var advectionShader = require("./shaders/advection.frag");

var advectionManualFilterShader = require("./shaders/advectionManualFiltering.frag");

var clearShader = require("./shaders/clear.frag");

var curlShader = require("./shaders/curl.frag");

var divergenceShader = require("./shaders/divergence.frag");

var gradientSubtractShader = require("./shaders/gradientSubtract.frag");

var pressureShader = require("./shaders/pressure.frag");

var splatShader = require("./shaders/splat.frag");

var vorticityShader = require("./shaders/vorticity.frag");
/**
 * Based on OGL post fluid example: https://github.com/oframe/ogl/blob/master/examples/post-fluid-distortion.html by Nathan Gordon
 */


var Fluid = /*#__PURE__*/function () {
  function Fluid(gl) {
    _classCallCheck(this, Fluid);

    this.gl = gl;
    this.initSimParams();
    this.initSimulationPrograms();
  }

  _createClass(Fluid, [{
    key: "initSimParams",
    value: function initSimParams() {
      this.simRes = 256.0;
      this.dyeRes = 512.0;
      this.texelSize = new _Vec.Vec2(1.0 / this.simRes);
      this.simParams = {
        iterations: 4,
        densityDissipation: 0.98,
        velocityDissipation: 0.99,
        pressureDissipation: 0.9,
        curlStrength: 0.01,
        radius: 0.2 // iterations: 4,
        // densityDissipation: 0.98,
        // velocityDissipation: 0.99,
        // pressureDissipation: 0.9,
        // curlStrength: 0.01,
        // radius: 0.2
        // }
        //very gooey!
        // this.simParams = {
        //     iterations: 4,
        //     densityDissipation: 0.99,
        //     velocityDissipation: 0.98,
        //     pressureDissipation: 0.99,
        //     curlStrength: 0.1,
        //     radius: 0.2

      };
    }
  }, {
    key: "initSimulationPrograms",
    value: function initSimulationPrograms() {
      // Get supported formats and types for FBOs
      var supportLinearFiltering = this.gl.renderer.extensions["OES_texture_".concat(this.gl.renderer.isWebgl2 ? "" : "half_", "float_linear")];
      var halfFloat = this.gl.renderer.isWebgl2 ? this.gl.HALF_FLOAT : this.gl.renderer.extensions["OES_texture_half_float"].HALF_FLOAT_OES;
      var filtering = supportLinearFiltering ? this.gl.LINEAR : this.gl.NEAREST;
      var rgba, rg, r;

      if (this.gl.renderer.isWebgl2) {
        rgba = this.getSupportedFormat(this.gl, this.gl.RGBA16F, this.gl.RGBA, halfFloat);
        rg = this.getSupportedFormat(this.gl, this.gl.RG16F, this.gl.RG, halfFloat);
        r = this.getSupportedFormat(this.gl, this.gl.R16F, this.gl.RED, halfFloat);
      } else {
        rgba = this.getSupportedFormat(this.gl, this.gl.RGBA, this.gl.RGBA, halfFloat);
        rg = rgba;
        r = rgba;
      }

      this.densityFBO = this.createPingPongBuffer({
        width: this.dyeRes,
        height: this.dyeRes,
        type: halfFloat,
        format: rgba.format,
        internalFormat: rgba.internalFormat,
        minFilter: filtering,
        depth: false
      });
      this.velocityFBO = this.createPingPongBuffer({
        width: this.simRes,
        height: this.simRes,
        type: halfFloat,
        format: rg.format,
        internalFormat: rg.internalFormat,
        minFilter: filtering,
        depth: false
      });
      this.pressureFBO = this.createPingPongBuffer({
        width: this.simRes,
        height: this.simRes,
        type: halfFloat,
        format: r.format,
        internalFormat: r.internalFormat,
        minFilter: this.gl.NEAREST,
        depth: false
      });
      this.divergence = new _RenderTarget.RenderTarget(this.gl, {
        width: this.simRes,
        height: this.simRes,
        type: halfFloat,
        format: r.format,
        internalFormat: r.internalFormat,
        minFilter: this.gl.NEAREST,
        depth: false
      });
      this.curl = new _RenderTarget.RenderTarget(this.gl, {
        width: this.simRes,
        height: this.simRes,
        type: halfFloat,
        format: r.format,
        internalFormat: r.internalFormat,
        minFilter: this.gl.NEAREST,
        depth: false
      });
      var triangle = new _Geometry.Geometry(this.gl, {
        position: {
          size: 2,
          data: new Float32Array([-1, -1, 3, -1, -1, 3])
        },
        uv: {
          size: 2,
          data: new Float32Array([0, 0, 2, 0, 0, 2])
        }
      });
      var clearUniforms = {
        texelSize: {
          value: this.texelSize
        },
        uTexture: {
          value: null
        },
        value: {
          value: this.simParams.pressureDissipation
        }
      };
      this.clearProgram = new _Mesh.Mesh(this.gl, {
        geometry: triangle,
        program: new _Program.Program(this.gl, {
          vertex: base,
          fragment: clearShader,
          uniforms: clearUniforms,
          depthTest: false,
          depthWrite: false
        })
      }); //for texture input

      var splatUniforms = {
        texelSize: {
          value: this.texelSize
        },
        uTarget: {
          value: null
        },
        aspectRatio: {
          value: 1.0
        },
        color: {
          value: new _Texture.Texture(this.gl)
        }
      }; //for mouse/touch input
      // const splatUniforms = {
      //     texelSize: {
      //         value: this.texelSize
      //     },
      //     uTarget: {
      //         value: null
      //     },
      //     aspectRatio: {
      //         value: 1.0
      //     },
      //     color: {
      //         value: new Color()
      //     },
      //     point: {
      //         value: new Vec2()
      //     },
      //     radius: {
      //         value: 1.0
      //     }
      // }

      this.splatProgram = new _Mesh.Mesh(this.gl, {
        geometry: triangle,
        program: new _Program.Program(this.gl, {
          vertex: base,
          fragment: splatShader,
          uniforms: splatUniforms,
          depthTest: false,
          depthWrite: false
        })
      });
      var advectionUniforms = {
        texelSize: {
          value: this.texelSize
        },
        dyeTexelSize: {
          value: new _Vec.Vec2(1.0 / this.dyeRes)
        },
        uVelocity: {
          value: null
        },
        uSource: {
          value: null
        },
        dt: {
          value: 0.016
        },
        dissipation: {
          value: 1.0
        }
      };
      this.advectionProgram = new _Mesh.Mesh(this.gl, {
        geometry: triangle,
        program: new _Program.Program(this.gl, {
          vertex: base,
          fragment: supportLinearFiltering ? advectionShader : advectionManualFilterShader,
          uniforms: advectionUniforms,
          depthTest: false,
          depthWrite: false
        })
      });
      var divergenceUniforms = {
        texelSize: {
          value: this.texelSize
        },
        uVelocity: {
          value: null
        }
      };
      this.divergenceProgram = new _Mesh.Mesh(this.gl, {
        geometry: triangle,
        program: new _Program.Program(this.gl, {
          vertex: base,
          fragment: divergenceShader,
          uniforms: divergenceUniforms,
          depthTest: false,
          depthWrite: false
        })
      });
      var curlUniforms = {
        texelSize: {
          value: this.texelSize
        },
        uVelocity: {
          value: null
        }
      };
      this.curlProgram = new _Mesh.Mesh(this.gl, {
        geometry: triangle,
        program: new _Program.Program(this.gl, {
          vertex: base,
          fragment: curlShader,
          uniforms: curlUniforms,
          depthTest: false,
          depthWrite: false
        })
      });
      var vorticityUniforms = {
        texelSize: {
          value: this.texelSize
        },
        uVelocity: {
          value: null
        },
        uCurl: {
          value: null
        },
        curl: {
          value: this.simParams.curlStrength
        },
        dt: {
          value: 0.016
        }
      };
      this.vorticityProgram = new _Mesh.Mesh(this.gl, {
        geometry: triangle,
        program: new _Program.Program(this.gl, {
          vertex: base,
          fragment: vorticityShader,
          uniforms: vorticityUniforms,
          depthTest: false,
          depthWrite: false
        })
      });
      var pressureUniforms = {
        texelSize: {
          value: this.texelSize
        },
        uPressure: {
          value: null
        },
        uDivergence: {
          value: null
        }
      };
      this.pressureProgram = new _Mesh.Mesh(this.gl, {
        geometry: triangle,
        program: new _Program.Program(this.gl, {
          vertex: base,
          fragment: pressureShader,
          uniforms: pressureUniforms,
          depthTest: false,
          depthWrite: false
        })
      });
      var gradientSubtractUniforms = {
        texelSize: {
          value: this.texelSize
        },
        uPressure: {
          value: null
        },
        uVelocity: {
          value: null
        }
      };
      this.gradientSubtractProgram = new _Mesh.Mesh(this.gl, {
        geometry: triangle,
        program: new _Program.Program(this.gl, {
          vertex: base,
          fragment: gradientSubtractShader,
          uniforms: gradientSubtractUniforms,
          depthTest: false,
          depthWrite: false
        })
      });
    }
  }, {
    key: "splat",
    value: function splat(_ref) {
      var flowVectorTexture = _ref.flowVectorTexture;
      this.splatProgram.program.uniforms.uTarget.value = this.velocityFBO.read.texture;
      this.splatProgram.program.uniforms.aspectRatio.value = this.gl.renderer.width / this.gl.renderer.height;
      this.splatProgram.program.uniforms.color.value = flowVectorTexture;
      this.gl.renderer.render({
        scene: this.splatProgram,
        target: this.velocityFBO.write,
        sort: false,
        update: false
      });
      this.velocityFBO.swap();
      this.splatProgram.program.uniforms.uTarget.value = this.densityFBO.read.texture;
      this.gl.renderer.render({
        scene: this.splatProgram,
        target: this.densityFBO.write,
        sort: false,
        update: false
      });
      this.densityFBO.swap();
    }
  }, {
    key: "update",
    value: function update(_ref2) {
      var flowVectorTexture = _ref2.flowVectorTexture;
      this.gl.renderer.autoClear = false;
      this.splat({
        flowVectorTexture: flowVectorTexture
      });
      this.curlProgram.program.uniforms.uVelocity.value = this.velocityFBO.read.texture;
      this.gl.renderer.render({
        scene: this.curlProgram,
        target: this.curl,
        sort: false,
        update: false
      });
      this.vorticityProgram.program.uniforms.uVelocity.value = this.velocityFBO.read.texture;
      this.vorticityProgram.program.uniforms.uCurl.value = this.curl.texture;
      this.gl.renderer.render({
        scene: this.vorticityProgram,
        target: this.velocityFBO.write,
        sort: false,
        update: false
      });
      this.velocityFBO.swap();
      this.divergenceProgram.program.uniforms.uVelocity.value = this.velocityFBO.read.texture;
      this.gl.renderer.render({
        scene: this.divergenceProgram,
        target: this.divergence,
        sort: false,
        update: false
      });
      this.clearProgram.program.uniforms.uTexture.value = this.pressureFBO.read.texture;
      this.clearProgram.program.uniforms.value.value = this.simParams.pressureDissipation;
      this.gl.renderer.render({
        scene: this.clearProgram,
        target: this.pressureFBO.write,
        sort: false,
        update: false
      });
      this.pressureFBO.swap();
      this.pressureProgram.program.uniforms.uDivergence.value = this.divergence.texture;

      for (var i = 0; i < this.simParams.iterations; i++) {
        this.pressureProgram.program.uniforms.uPressure.value = this.pressureFBO.read.texture;
        this.gl.renderer.render({
          scene: this.pressureProgram,
          target: this.pressureFBO.write,
          sort: false,
          update: false
        });
        this.pressureFBO.swap();
      }

      this.gradientSubtractProgram.program.uniforms.uPressure.value = this.pressureFBO.read.texture;
      this.gradientSubtractProgram.program.uniforms.uVelocity.value = this.velocityFBO.read.texture;
      this.gl.renderer.render({
        scene: this.gradientSubtractProgram,
        target: this.velocityFBO.write,
        sort: false,
        update: false
      });
      this.velocityFBO.swap();
      this.advectionProgram.program.uniforms.dyeTexelSize.value.set(1 / this.simRes);
      this.advectionProgram.program.uniforms.uVelocity.value = this.velocityFBO.read.texture;
      this.advectionProgram.program.uniforms.uSource.value = this.velocityFBO.read.texture;
      this.advectionProgram.program.uniforms.dissipation.value = this.simParams.velocityDissipation;
      this.gl.renderer.render({
        scene: this.advectionProgram,
        target: this.velocityFBO.write,
        sort: false,
        update: false
      });
      this.velocityFBO.swap();
      this.advectionProgram.program.uniforms.dyeTexelSize.value.set(1 / this.dyeRes);
      this.advectionProgram.program.uniforms.uVelocity.value = this.velocityFBO.read.texture;
      this.advectionProgram.program.uniforms.uSource.value = this.densityFBO.read.texture;
      this.advectionProgram.program.uniforms.dissipation.value = this.simParams.densityDissipation;
      this.gl.renderer.render({
        scene: this.advectionProgram,
        target: this.densityFBO.write,
        sort: false,
        update: false
      });
      this.densityFBO.swap();
      this.gl.renderer.autoClear = true;
    }
  }, {
    key: "createPingPongBuffer",
    value: function createPingPongBuffer(_ref3) {
      var width = _ref3.width,
          height = _ref3.height,
          wrapS = _ref3.wrapS,
          wrapT = _ref3.wrapT,
          _ref3$minFilter = _ref3.minFilter,
          minFilter = _ref3$minFilter === void 0 ? this.gl.LINEAR : _ref3$minFilter,
          _ref3$magFilter = _ref3.magFilter,
          magFilter = _ref3$magFilter === void 0 ? minFilter : _ref3$magFilter,
          type = _ref3.type,
          format = _ref3.format,
          internalFormat = _ref3.internalFormat,
          depth = _ref3.depth;
      var params = {
        width: width,
        height: height,
        wrapS: wrapS,
        wrapT: wrapT,
        minFilter: minFilter,
        magFilter: magFilter,
        type: type,
        format: format,
        internalFormat: internalFormat,
        depth: depth
      };
      var fbo = {
        read: new _RenderTarget.RenderTarget(this.gl, params),
        write: new _RenderTarget.RenderTarget(this.gl, params),
        swap: function swap() {
          var tmp = fbo.read;
          fbo.read = fbo.write;
          fbo.write = tmp;
        }
      };
      return fbo;
    }
  }, {
    key: "supportRenderTextureFormat",
    value: function supportRenderTextureFormat(gl, internalFormat, format, type) {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      var fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      if (status != gl.FRAMEBUFFER_COMPLETE) return false;
      return true;
    } // Helper functions for larger device support

  }, {
    key: "getSupportedFormat",
    value: function getSupportedFormat(gl, internalFormat, format, type) {
      if (!this.supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return this.getSupportedFormat(gl, gl.RG16F, gl.RG, type);

          case gl.RG16F:
            return this.getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);

          default:
            return null;
        }
      }

      return {
        internalFormat: internalFormat,
        format: format
      };
    }
  }, {
    key: "FluidOutput",
    get: function get() {
      return this.densityFBO.read.texture;
    }
  }]);

  return Fluid;
}();

exports.default = Fluid;
},{"../../vendors/ogl/src/core/Program":"vendors/ogl/src/core/Program.js","../../Vendors/ogl/src/core/Texture":"Vendors/ogl/src/core/Texture.js","../../Vendors/ogl/src/core/Mesh":"Vendors/ogl/src/core/Mesh.js","../../Vendors/ogl/src/core/RenderTarget":"Vendors/ogl/src/core/RenderTarget.js","../../Vendors/ogl/src/math/Vec2":"Vendors/ogl/src/math/Vec2.js","../../Vendors/ogl/src/core/Geometry":"Vendors/ogl/src/core/Geometry.js","./shaders/baseVertex.vert":"src/Fluid/shaders/baseVertex.vert","./shaders/advection.frag":"src/Fluid/shaders/advection.frag","./shaders/advectionManualFiltering.frag":"src/Fluid/shaders/advectionManualFiltering.frag","./shaders/clear.frag":"src/Fluid/shaders/clear.frag","./shaders/curl.frag":"src/Fluid/shaders/curl.frag","./shaders/divergence.frag":"src/Fluid/shaders/divergence.frag","./shaders/gradientSubtract.frag":"src/Fluid/shaders/gradientSubtract.frag","./shaders/pressure.frag":"src/Fluid/shaders/pressure.frag","./shaders/splat.frag":"src/Fluid/shaders/splat.frag","./shaders/vorticity.frag":"src/Fluid/shaders/vorticity.frag"}],"src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Renderer = require("../vendors/ogl/src/core/Renderer");

var _Camera = require("../Vendors/ogl/src/core/Camera.js");

var _Transform = require("../Vendors/ogl/src/core/Transform.js");

var _Orbit = require("../Vendors/ogl/src/extras/Orbit.js");

var _index = _interopRequireDefault(require("./Quad/index.js"));

var _index2 = _interopRequireDefault(require("./Flow/index.js"));

var _index3 = _interopRequireDefault(require("./Fluid/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OpticalFlow = /*#__PURE__*/function () {
  function OpticalFlow() {
    var _this = this;

    _classCallCheck(this, OpticalFlow);

    _defineProperty(this, "onResize", function () {
      var w = window.innerWidth;
      var h = window.innerHeight;
      var aspect = w / h;

      _this.renderer.setSize(w, h);

      _this.camera.perspective({
        aspect: aspect
      });
    });

    this.renderer = new _Renderer.Renderer({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: false
    });
    this.gl = this.renderer.gl;
    this.gl.canvas.style.position = "absolute";
    this.gl.clearColor(0.96, 0.96, 0.96, 1.0);
    this.gl.canvas.style.top = "0";
    this.gl.canvas.style.left = "0";
    this.gl.canvas.style.width = "100%";
    this.gl.canvas.style.height = "100%";
    this.gl.canvas.style.overflow = "hidden";
    this.gl.canvas.style.zIndex = "-1";
    document.body.appendChild(this.gl.canvas);
    this.scene = new _Transform.Transform();
    this.camera = new _Camera.Camera(this.gl, {
      fov: 35,
      far: 10,
      aspect: window.innerWidth / window.innerHeight
    });
    this.orbitCamera = new _Orbit.Orbit(this.camera, {
      element: this.gl.canvas
    });
    this.camera.position.z = 5;
    this.initVideo();
    this.initOpticalFlow();
    this.initFluidSim();
    this.initQuad();
    this.initEvents();
    this.start();
  }

  _createClass(OpticalFlow, [{
    key: "initVideo",
    value: function initVideo() {
      var _this2 = this;

      this.streamAvailable = false;
      this.video = document.createElement("video");
      var options = {
        audio: false,
        video: {
          width: 640,
          height: 480
        }
      };
      navigator.mediaDevices.getUserMedia(options).then(function (stream) {
        _this2.video.srcObject = stream;

        _this2.video.play();

        _this2.streamAvailable = true;
      }).catch(function (error) {
        console.error("no camera found");
      });
    }
  }, {
    key: "initOpticalFlow",
    value: function initOpticalFlow() {
      this.flow = new _index2.default(this.gl, {
        width: 640,
        height: 480
      });
    }
  }, {
    key: "initFluidSim",
    value: function initFluidSim() {
      this.fluidSim = new _index3.default(this.gl);
    }
  }, {
    key: "initQuad",
    value: function initQuad() {
      this.quad = new _index.default(this.gl);
      this.quad.Output = this.flow.flowVectorTextureRead.texture;
      this.quad.setParent(this.scene);
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      window.addEventListener("resize", this.onResize);
    }
  }, {
    key: "start",
    value: function start() {
      this.update();
    }
  }, {
    key: "render",
    value: function render() {
      this.renderer.render({
        scene: this.scene,
        camera: this.camera
      });
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      window.requestAnimationFrame(function () {
        return _this3.update();
      });

      if (this.streamAvailable) {
        this.flow.update({
          inputVideo: this.video
        });
        this.fluidSim.update({
          flowVectorTexture: this.flow.flowVectorTextureRead.texture
        });
        this.quad.update({
          inputVideo: this.video
        });
        this.quad.Output = this.fluidSim.FluidOutput; // this.quad.Output = this.flow.flowVectorTextureRead.texture;
      }

      this.render();
    }
  }]);

  return OpticalFlow;
}();

exports.default = OpticalFlow;
},{"../vendors/ogl/src/core/Renderer":"vendors/ogl/src/core/Renderer.js","../Vendors/ogl/src/core/Camera.js":"Vendors/ogl/src/core/Camera.js","../Vendors/ogl/src/core/Transform.js":"Vendors/ogl/src/core/Transform.js","../Vendors/ogl/src/extras/Orbit.js":"Vendors/ogl/src/extras/Orbit.js","./Quad/index.js":"src/Quad/index.js","./Flow/index.js":"src/Flow/index.js","./Fluid/index.js":"src/Fluid/index.js"}],"src/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App() {
  _classCallCheck(this, App);

  console.log('◕_◕ this can\'t be...real? ◕_◕');
  console.log('douglas@adventureclub.io');
  console.log('douglas.lilliequist@gmail.com');
  new _index.default();
};

exports.default = App;

window.onload = function () {
  return new App();
};
},{"./index":"src/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54162" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map