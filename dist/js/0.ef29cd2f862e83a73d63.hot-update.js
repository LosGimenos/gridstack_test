webpackHotUpdate(0,{

/***/ 283:
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token (8:2)\n\n\u001b[0m \u001b[90m  6 | \u001b[39m\n \u001b[90m  7 | \u001b[39m\u001b[36mconst\u001b[39m \u001b[33mRoutes\u001b[39m \u001b[33m=\u001b[39m () \u001b[33m=>\u001b[39m (\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m  8 | \u001b[39m  \u001b[33m<\u001b[39m\u001b[33mRouter\u001b[39m\u001b[33m>\u001b[39m\n \u001b[90m    | \u001b[39m  \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m  9 | \u001b[39m    \u001b[33m<\u001b[39m\u001b[33mdiv\u001b[39m\u001b[33m>\u001b[39m\n \u001b[90m 10 | \u001b[39m      \u001b[33m<\u001b[39m\u001b[33mHeader\u001b[39m \u001b[33m/\u001b[39m\u001b[33m>\u001b[39m\n \u001b[90m 11 | \u001b[39m      \u001b[33m<\u001b[39m\u001b[33mSwitch\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n");

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(181);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(197);

var _routes = __webpack_require__(283);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dragula = __webpack_require__(39);

dragula([document.querySelector('#left'), document.querySelector('#right')]);
console.log('connected');

(0, _reactDom.render)(_routes2.default, document.querySelector('#root'));

if (true) {
  module.hot.accept();
}

/***/ })

})