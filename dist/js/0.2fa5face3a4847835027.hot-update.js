webpackHotUpdate(0,{

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(14);

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
      cellsInRow = _ref.cellsInRow,
      collectHoveredCells = _ref.collectHoveredCells,
      copyFromHover = _ref.copyFromHover,
      clearCell = _ref.clearCell;
  return _react2.default.createElement(
    'div',
    {
      className: 'cell',
      name: cellId,
      onDoubleClick: function onDoubleClick() {
        copyCell(cellsInRow, rowId, cellId);
      },
      draggable: 'true',
      onDragStart: function onDragStart(event) {
        event.dataTransfer.setData('masterCell', cellId);
      },
      onDragOver: function onDragOver(event) {
        event.preventDefault();
      },
      onDragEnter: function onDragEnter(event) {
        event.preventDefault();
        collectHoveredCells(cellId);
      },
      onDrop: function onDrop(event) {
        event.preventDefault();
        var masterCell = event.dataTransfer.getData('masterCell');
        copyFromHover(masterCell);
      }
    },
    _react2.default.createElement(
      'select',
      { className: 'button__cell--import', name: 'add-chart', defaultValue: 'Add' },
      _react2.default.createElement(
        'option',
        null,
        'ADD'
      ),
      _react2.default.createElement(
        'option',
        { value: 'pie' },
        'Pie Chart'
      ),
      _react2.default.createElement(
        'option',
        { value: 'bar' },
        'Bar Graph'
      )
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