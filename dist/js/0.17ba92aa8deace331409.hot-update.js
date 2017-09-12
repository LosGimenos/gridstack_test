webpackHotUpdate(0,{

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _row = __webpack_require__(284);

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Matrix = function (_Component) {
  _inherits(Matrix, _Component);

  function Matrix() {
    _classCallCheck(this, Matrix);

    var _this = _possibleConstructorReturn(this, (Matrix.__proto__ || Object.getPrototypeOf(Matrix)).call(this));

    _this.cells = {
      '11': {
        id: 11,
        chartType: 'Pie',
        formula: '',
        title: 'Chart Thing'
      }
    };
    _this.rows = {
      '0': {
        cellsInRow: [_this.cells['11']]
      }
    };
    _this.state = {
      row_array: [_this.rows['0']],
      matrix: [_this.rows['0']],
      columnCount: 1
    };
    // this.addCell = this.addCell.bind(this);
    // this.deleteCell = this.deleteCell.bind(this);
    return _this;
  }

  // addRow() {
  //   console.log('clicked')
  //   const rows = this.state.rows
  //   const rowValue = rows[rows.length-1] + 1
  //   console.log(rows.length)
  //   rows.push(rowValue)
  //   console.log(rows)
  //   this.addCell(rowValue)
  //   console.log(this.state.cells)
  //   this.setState({ rows: rows });
  // }

  _createClass(Matrix, [{
    key: 'addColumn',
    value: function addColumn() {
      this.setState({ columnCount: this.state.columnCount + 1 });
    }
  }, {
    key: 'addCell',
    value: function addCell(row, row_id) {
      console.log('added cell');
      var cells = this.cells;
      var row_position = row['cells_in_row'].length - 1;
      var cell_id = row_id.toString() + row_position.toString();
      cells[cell_id] = {
        id: cell_id.toInteger(),
        chartType: '',
        formula: '',
        title: ''
      };
      this.setState({ cells: cells });
    }

    // deleteCell(row, column) {
    //   const cells = this.state.cells;
    //   cells.forEach((cell, index) => {
    //     if (cell.row_position == row && cell.column_position == column) {
    //       cells.splice(index, 1);
    //     } else {
    //     }
    //   })
    //   this.setState({ cells: cells });
    // }

  }, {
    key: 'renderRows',
    value: function renderRows() {
      var _this2 = this;

      return this.state.row_array.map(function (row) {
        return _react2.default.createElement(_row2.default, {
          allCells: _this2.cells,
          cellsInRow: row['cellsInRow']
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'matrix__container' },
        _react2.default.createElement(
          'div',
          { className: 'button__addRow' },
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
              return _this3.addColumn();
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
          this.renderRows()
        )
      );
    }
  }]);

  return Matrix;
}(_react.Component);

exports.default = Matrix;

/***/ })

})