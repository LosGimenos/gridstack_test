webpackHotUpdate(0,{

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(243);

var _app = __webpack_require__(271);

var _app2 = _interopRequireDefault(_app);

var _matrix = __webpack_require__(283);

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
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _app2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/matrix-test', component: _matrix2.default })
      )
    )
  );
};

exports.default = Routes;

/***/ })

})