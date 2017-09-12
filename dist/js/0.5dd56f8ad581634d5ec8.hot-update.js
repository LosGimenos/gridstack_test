webpackHotUpdate(0,{

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(16);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  copyCell: _propTypes2.default.func
};

var Cell = function Cell(_ref) {
  var title = _ref.title,
      chart = _ref.chart,
      cellId = _ref.cellId,
      rowId = _ref.rowId,
      formula = _ref.formula,
      copyCell = _ref.copyCell,
      cellsInRow = _ref.cellsInRow;
  return _react2.default.createElement(
    'div',
    {
      className: 'cell',
      value: cellId,
      onClick: function onClick() {
        copyCell(cellsInRow, rowId, cellId);
      },
      draggable: 'true',
      onDragStart: function onDragStart(event) {
        var name = event.dataTransfer.setData('name', event.target.class);
        console.log(name, event.target);
      }
    },
    _react2.default.createElement(
      'button',
      { className: 'button__cell' },
      'X'
    ),
    _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(
        'h2',
        null,
        cellId
      )
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

Cell.propTypes = propTypes;
exports.default = Cell;

/***/ })

})