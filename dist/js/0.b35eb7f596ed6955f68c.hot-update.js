webpackHotUpdate(0,{

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _cell = __webpack_require__(285);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_Component) {
  _inherits(Row, _Component);

  function Row(props) {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, props));
  }

  _createClass(Row, [{
    key: 'renderCells',
    value: function renderCells() {
      var _this2 = this;

      return this.props.cellsInRow.map(function (cell) {
        return _react2.default.createElement(_cell2.default, {
          title: cell.title,
          formula: cell.formula,
          id: cell.id,
          chart: cell.chartType,
          addCell: _this2.props.addCell,
          deleteCell: _this2.props.deleteCell
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'row' },
        this.renderCells()
      );
    }
  }]);

  return Row;
}(_react.Component);

exports.default = Row;

/***/ }),

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
      row_position = _ref.row_position,
      column_position = _ref.column_position,
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
      _react2.default.createElement(
        'h2',
        null,
        row_position.toString() + column_position.toString()
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

exports.default = Cell;

/***/ })

})