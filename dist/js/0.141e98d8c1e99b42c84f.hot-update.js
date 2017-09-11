webpackHotUpdate(0,{

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Matrix = function (_Component) {
  _inherits(Matrix, _Component);

  function Matrix() {
    _classCallCheck(this, Matrix);

    var _this = _possibleConstructorReturn(this, (Matrix.__proto__ || Object.getPrototypeOf(Matrix)).call(this));

    _this.state = {
      cells: ['A1'],
      rowCount: 1,
      columnCount: 1
    };
    return _this;
  }

  _createClass(Matrix, [{
    key: 'addRow',
    value: function addRow() {
      this.setState({ rowCount: this.state.rowCount + 1 });
    }
  }, {
    key: 'addColumn',
    value: function addColumn() {
      this.setState({ columnCount: this.state.columnCount + 1 });
    }
  }, {
    key: 'renderCell',
    value: function renderCell() {
      return this.state.cells.map(function (cell) {
        return _react2.default.createElement(
          'div',
          { className: 'cell', ref: cell },
          console.log(cell),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              'p',
              null,
              cell
            )
          )
        );
      });
    }
  }, {
    key: 'renderRowsOrColumns',
    value: function renderRowsOrColumns(rowOrColumn) {
      var _this2 = this;

      if (rowOrColumn == 'row') {
        return this.state.cells.map(function (row) {
          return _react2.default.createElement(
            'div',
            { className: 'row' },
            _this2.renderCell()
          );
        });
      } else {
        return this.state.cells.map(function (column) {
          return _react2.default.createElement('div', { className: 'column' });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      console.log('mounted');
      return _react2.default.createElement(
        'div',
        { className: 'matrix__container' },
        _react2.default.createElement(
          'div',
          { className: 'button__addRow', onClick: function onClick() {
              return _this3.addRow;
            } },
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              'p',
              null,
              '+'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'button__addColumn', onClick: function onClick() {
              return _this3.addColumn;
            } },
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              'p',
              null,
              '+'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'matrix' },
          this.renderRowsOrColumns('row'),
          this.renderRowsOrColumns('column')
        )
      );
    }
  }]);

  return Matrix;
}(_react.Component);

exports.default = Matrix;

/***/ })

})