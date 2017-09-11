webpackHotUpdate(0,{

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(154);

var _routes = __webpack_require__(240);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dragula = __webpack_require__(270);

dragula([document.querySelector('#left'), document.querySelector('#right')]);
console.log('connected');

(0, _reactDom.render)(_react2.default.createElement(_routes2.default, null), document.querySelector('#root'));

if (true) {
  module.hot.accept();
}

/***/ })

})