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
      },
      '12': {
        id: 12,
        chartType: 'Graph',
        formula: 'woot',
        title: 'Graph Thing'
      }
    };
    _this.rows = {
      '1': {
        row_id: 1,
        cellsInRow: [_this.cells['11'], _this.cells['12']]
      }
    };
    _this.state = {
      cells: _this.cells,
      row_array: [_this.rows['1']],
      matrix: [_this.rows['1']],
      columnCount: 2
    };
    _this.addCell = _this.addCell.bind(_this);
    _this.copyCell = _this.copyCell.bind(_this);
    // this.deleteCell = this.deleteCell.bind(this);
    return _this;
  }

  _createClass(Matrix, [{
    key: 'addRow',
    value: function addRow() {
      console.log('clicked');
      var rowArray = this.state.row_array;
      var row_index = rowArray.length;
      this.rows[(row_index + 1).toString()] = {
        row_id: row_index + 1,
        cellsInRow: []
      };
      while (this.rows[(row_index + 1).toString()]['cellsInRow'].length < this.state.columnCount) {
        this.rows[(row_index + 1).toString()]['cellsInRow'].push('');
      }
      var row = this.rows[(row_index + 1).toString()];
      rowArray.push(row);
      this.setState({ row_array: rowArray });
      console.log(this.state.row_array);
    }
  }, {
    key: 'addColumn',
    value: function addColumn() {
      var _this2 = this;

      if (this.state.columnCount < 8) {
        this.state.row_array.forEach(function (row) {
          while (row['cellsInRow'].length < _this2.state.columnCount + 1) {
            row['cellsInRow'].push('');
          }
        });
      }
      this.setState({ columnCount: this.state.columnCount + 1 });
    }
  }, {
    key: 'addCell',
    value: function addCell(cellsInRow, row_id) {
      console.log('added cell');
      var cells = this.cells;
      var positionInRow = cellsInRow.length + 1;
      var cell_id = row_id.toString() + positionInRow.toString();
      cells[cell_id] = {
        id: parseInt(cell_id),
        chartType: '',
        formula: '',
        title: ''
      };
      this.cells = cells;
      var rowToPush = this.rows[row_id];
      this.rows[row_id.toString()]['cellsInRow'].push(this.cells[cell_id]);
    }
  }, {
    key: 'copyCell',
    value: function copyCell(cellsInRow, rowId, cellId) {
      console.log('cell copied');
      var cells = this.cells;
      var cellIndex = this.rows[rowId]['cellsInRow'].findIndex(function (cell) {
        return cell.id == cellId;
      });

      var idValues = [];
      this.rows[rowId]['cellsInRow'].forEach(function (cell) {
        if (cell['id']) {
          idValues.push(parseInt(cell['id']));
        }
      });

      var highestIdValue = Math.max.apply(null, idValues);
      var cellToBeCopied = this.rows[rowId]['cellsInRow'][cellIndex + 1];
      console.log(cellToBeCopied);
      if (!cellToBeCopied && idValues.length < this.state.columnCount) {
        console.log('went ot first if');
        cells[highestIdValue + 1] = {
          id: highestIdValue + 1,
          chartType: cells[cellId]['chartType'],
          formula: cells[cellId]['formula'],
          title: cells[cellId]['title']
        };
        this.rows[rowId]['cellsInRow'][cellIndex + 1] = cells[highestIdValue + 1];
        console.log(cells);
      } else if (cellToBeCopied && idValues.length <= this.state.columnCount) {
        console.log('made it to else if');
        cells[cellToBeCopied['id']]['chartType'] = cells[cellId]['chartType'];
        cells[cellToBeCopied['id']]['formula'] = cells[cellId]['formula'];
        cells[cellToBeCopied['id']]['title'] = cells[cellId]['title'];
      }

      this.cells = cells;
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
      var _this3 = this;

      var rowArray = this.state.row_array;
      console.log('Render Rows', rowArray);
      return rowArray.map(function (row) {
        return _react2.default.createElement(_row2.default, {
          allCells: _this3.cells,
          cellsInRow: row['cellsInRow'],
          rowId: row['row_id'],
          addCell: _this3.addCell,
          copyCell: _this3.copyCell
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        { className: 'matrix__container' },
        _react2.default.createElement(
          'div',
          { className: 'button__addRow', onClick: function onClick() {
              return _this4.addRow();
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
              return _this4.addColumn();
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