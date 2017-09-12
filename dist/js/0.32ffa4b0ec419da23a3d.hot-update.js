webpackHotUpdate(0,{

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chart = function Chart(_ref) {
  var charts = _ref.charts,
      id = _ref.id;
  return _react2.default.createElement(
    'div',
    { className: 'object' },
    _react2.default.createElement(
      'button',
      { className: 'button__cell--clear' },
      'X'
    ),
    _react2.default.createElement('div', { className: 'sizer-nodule', draggable: 'true' }),
    _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(
        'p',
        null,
        charts[id]['chartType']
      )
    ),
    _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(
        'p',
        null,
        'id: ',
        id
      )
    )
  );
};

exports.default = Chart;

/***/ })

})