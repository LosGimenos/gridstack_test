webpackHotUpdate(0,{

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cell = function Cell(_ref) {
  var title = _ref.title,
      chart = _ref.chart,
      id = _ref.id,
      formula = _ref.formula,
      addCell = _ref.addCell,
      deleteCell = _ref.deleteCell;
  return _react2.default.createElement(
    'div',
    { className: 'cell', onDoubleClick: function onDoubleClick() {
        return addCell(row_position);
      } },
    _react2.default.createElement(
      'button',
      { className: 'button__cell', onClick: function onClick() {
          return deleteCell(row_position, column_position);
        } },
      'X'
    ),
    _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement('h2', null)
    ),
    _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(
        'p',
        null,
        title
      )
    ),
    _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(
        'p',
        null,
        'render: ',
        chart
      )
    )
  );
};

exports.default = Cell;

/***/ })

})