webpackHotUpdate(0,{

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(243);

var _app = __webpack_require__(271);

var _app2 = _interopRequireDefault(_app);

var _matrix = __webpack_require__(338);

var _matrix2 = _interopRequireDefault(_matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Header from '../components/header.jsx';
// import Results from '../components/results.jsx';

var Routes = function Routes() {
  return _react2.default.createElement(
    _reactRouterDom.HashRouter,
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _app2.default })
      )
    )
  );
};

exports.default = Routes;

/***/ }),

/***/ 338:
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token (14:30)\n\n\u001b[0m \u001b[90m 12 | \u001b[39m\n \u001b[90m 13 | \u001b[39m  addRow() {\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 14 | \u001b[39m    \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39msetState({ rowCount\u001b[33m:\u001b[39m \u001b[33m+=\u001b[39m\u001b[35m1\u001b[39m})\u001b[33m;\u001b[39m\n \u001b[90m    | \u001b[39m                              \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 15 | \u001b[39m  }\n \u001b[90m 16 | \u001b[39m\n \u001b[90m 17 | \u001b[39m  addColumn() {\u001b[0m\n");

/***/ })

})