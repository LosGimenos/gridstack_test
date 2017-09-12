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
          cellId: cell.id,
          chart: cell.chartType,
          chartId: cell.chartId,
          hasChart: cell.hasChart,
          addCell: _this2.props.addCell,
          cellsInRow: _this2.props.cellsInRow,
          rowId: _this2.props.rowId,
          copyCell: _this2.props.copyCell,
          collectHoveredCells: _this2.props.collectHoveredCells,
          copyFromHover: _this2.props.copyFromHover,
          clearCell: _this2.props.clearCell,
          addChart: _this2.props.addChart,
          setChartToCell: _this2.props.setChartToCell
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

/***/ })

})