webpackHotUpdate(0,{

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _chart = __webpack_require__(226);

var _chart2 = _interopRequireDefault(_chart);

var _row = __webpack_require__(231);

var _row2 = _interopRequireDefault(_row);

var _button = __webpack_require__(105);

var _button2 = _interopRequireDefault(_button);

var _core_api = __webpack_require__(65);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Matrix = function (_Component) {
  _inherits(Matrix, _Component);

  function Matrix(props) {
    _classCallCheck(this, Matrix);

    var _this = _possibleConstructorReturn(this, (Matrix.__proto__ || Object.getPrototypeOf(Matrix)).call(this, props));

    _this.state = {
      cells: _this.props.cells,
      chartList: _this.props.chartList,
      charts: _this.props.charts,
      rows: _this.props.rows,
      rowList: _this.props.rowList,
      columnCount: _this.props.columnCount,
      rowCount: _this.props.rowCount
    };
    _this.hasRendered = false;
    _this.columnLimit = 8;
    _this.rowLimit = 6;
    _this.slideID = _this.props.slideID;
    _this.domainPrefix = _this.props.domainPrefix;
    _this.userID = _this.props.userID;

    _this.addChart = _this.addChart.bind(_this);
    _this.setChartObjectId = _this.setChartObjectId.bind(_this);
    _this.addColumn = _this.addColumn.bind(_this);
    _this.addRow = _this.addRow.bind(_this);
    _this.setStartingDOMLocation = _this.setStartingDOMLocation.bind(_this);
    _this._isCellOccupied = _this._isCellOccupied.bind(_this);
    _this._getDOMLocationOfCell = _this._getDOMLocationOfCell.bind(_this);
    _this._occupyCell = _this._occupyCell.bind(_this);
    _this._unoccupyCell = _this._unoccupyCell.bind(_this);
    _this._removeChart = _this._removeChart.bind(_this);
    _this._getColumnAndRowCount = _this._getColumnAndRowCount.bind(_this);
    _this._findPositionInRow = _this._findPositionInRow.bind(_this);
    _this._findPositionInColumn = _this._findPositionInColumn.bind(_this);
    _this._getCellRect = _this._getCellRect.bind(_this);
    _this._swapChartId = _this._swapChartId.bind(_this);
    _this._swapLocation = _this._swapLocation.bind(_this);
    _this._resetCloneStatus = _this._resetCloneStatus.bind(_this);
    _this._getStartingCell = _this._getStartingCell.bind(_this);
    return _this;
  }

  _createClass(Matrix, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.hasRendered = true;
      this.renderCharts();
    }
  }, {
    key: 'updateCellLocations',
    value: function updateCellLocations() {
      var cells = this.state.cells;
      var matrixCells = document.querySelectorAll('.matrix-cell');

      matrixCells.forEach(function (cell) {
        var cellId = cell.getAttribute('name');
        var cellLocation = cell.getBoundingClientRect();
        cells[cellId]['startingX'] = cellLocation.left;
        cells[cellId]['startingY'] = cellLocation.top;
      });

      this.setState({ cells: cells });
    }
  }, {
    key: 'addChart',
    value: function addChart(cellId) {
      var row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var column = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var clonedTo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var originalObjectId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      var highestId = void 0;
      var chartList = this.state.chartList;
      var charts = this.state.charts;
      var cells = this.state.cells;

      if (chartList.length == 0) {
        highestId = 0;
      } else {
        highestId = Math.max.apply(null, Object.keys(this.state.charts));
      }

      charts[highestId + 1] = {
        id: highestId + 1,
        startingCell: cellId,
        startingRowSpan: row,
        startingColumnSpan: column
      };

      if (clonedTo) {
        charts[highestId + 1]['clonedTo'] = highestId + 1;
      }

      chartList.push(highestId + 1);
      cells[cellId]['canAddChart'] = false;

      var newChartId = highestId + 1;

      if (clonedTo) {
        (0, _core_api.replicate_chart)(this.setChartObjectId, this.domainPrefix, this.slideID, cellId, originalObjectId, newChartId, this.userID, cells, charts, chartList);
      } else {
        (0, _core_api.add_chart)(this.setChartObjectId, this.domainPrefix, this.slideID, cellId, newChartId, this.userID, cells, charts, chartList);
      }
      // this.setState({ cells });
      // this.setState({ charts });
      // this.setState({ chartList });

      var chartId = highestId + 1;
      return { chartId: chartId };
    }

    // Callback to add backend objectId to chart once ajax call has completed

  }, {
    key: 'setChartObjectId',
    value: function setChartObjectId(newChartId, objectId, chartName, cells, charts, chartList) {
      // const charts = this.state.charts;
      // const chartList = this.state.chartList;
      charts[newChartId]['objectID'] = objectId;
      charts[newChartId]['chartName'] = chartName;
      this.setState({ charts: charts });
      this.setState({ chartList: chartList });
      this.setState({ cells: cells });
      (0, _core_api.refreshChartList)();
    }
  }, {
    key: 'addCell',
    value: function addCell(rowId) {
      var rows = this.state.rows;
      var cells = this.state.cells;

      var highestId = Math.max.apply(null, rows[rowId]['cellsInRow']);
      var cellId = parseInt(highestId + 1);
      cells[cellId] = {
        id: cellId,
        canAddChart: true,
        startingX: null,
        startingY: null
      };
      rows[rowId].cellsInRow.push(highestId + 1);

      this.setState({ cells: cells });
      this.setState({ rows: rows });
    }
  }, {
    key: 'addColumn',
    value: function addColumn() {
      var _this2 = this;

      if (this.state.columnCount + 1 <= this.columnLimit) {
        this.state.rowList.forEach(function (row) {
          while (_this2.state.rows[row]['cellsInRow'].length < _this2.state.columnCount + 1) {
            _this2.addCell(row);
          }
        });
        this.setState(function (prevState, props) {
          return { columnCount: prevState.columnCount + 1 };
        });
      }

      (0, _core_api.add_col)(this.domainPrefix, this.slideID);
      this.updateCellLocations();
    }
  }, {
    key: 'addRow',
    value: function addRow() {
      if (this.state.rowList.length + 1 <= this.rowLimit) {
        var rows = this.state.rows;
        var rowList = this.state.rowList;
        var cells = this.state.cells;
        var highestId = Math.max.apply(null, Object.keys(this.state.rows));
        var cellId = parseInt(highestId + 1 + '1');
        cells[cellId] = {
          id: cellId,
          canAddChart: true,
          startingX: null,
          startingY: null
        };

        rows[highestId + 1] = {
          id: highestId + 1,
          cellsInRow: [cellId]
        };
        rowList.push(highestId + 1);

        while (rows[highestId + 1]['cellsInRow'].length < this.state.columnCount) {
          var highestCellIdInRow = Math.max.apply(null, rows[highestId + 1]['cellsInRow']);
          var rowNewCellId = highestCellIdInRow + 1;

          var newCell = cells[rowNewCellId] = {
            id: rowNewCellId,
            canAddChart: true,
            startingX: null,
            startingY: null
          };

          rows[highestId + 1]['cellsInRow'].push(rowNewCellId);
        }

        this.setState({ cells: cells });
        this.setState({ rows: rows });
        this.setState({ rowList: rowList });
        this.setState({ rowCount: this.state.rowCount + 1 });
      }

      (0, _core_api.add_row)(this.domainPrefix, this.slideID);
      this.updateCellLocations();
    }
  }, {
    key: 'addToRowCount',
    value: function addToRowCount() {
      this.setState({ rowCount: this.state.rowCount + 1 });
    }
  }, {
    key: 'setStartingDOMLocation',
    value: function setStartingDOMLocation(cellId, x, y) {
      var cells = this.state.cells;
      cells[cellId]['startingX'] = x;
      cells[cellId]['startingY'] = y;

      this.setState({ cells: cells });
    }
  }, {
    key: '_isCellOccupied',
    value: function _isCellOccupied(cellId) {
      return this.state.cells[cellId]['canAddChart'] ? false : true;
    }
  }, {
    key: '_getDOMLocationOfCell',
    value: function _getDOMLocationOfCell(cellId) {
      var el = document.getElementsByName(cellId)[0];
      var elRect = el.getBoundingClientRect();
      var top = elRect.top,
          left = elRect.left;

      var x = left;
      var y = top;

      return { x: x, y: y };
    }
  }, {
    key: '_occupyCell',
    value: function _occupyCell(cellId) {
      var cells = this.state.cells;
      var cell = cells[cellId];
      cell['canAddChart'] = false;

      this.setState({ cells: cells });
    }
  }, {
    key: '_unoccupyCell',
    value: function _unoccupyCell(cellId) {
      var cells = this.state.cells;
      var cell = cells[cellId];
      cell['canAddChart'] = true;

      this.setState({ cells: cells });
    }
  }, {
    key: '_removeChart',
    value: function _removeChart(chartId) {
      var charts = this.state.charts;
      var chartList = this.state.chartList;
      var indexOfChartId = void 0;
      var chartToDelete = charts[chartId];

      var current_chart = charts[chartId];
      if (current_chart.objectID) {
        (0, _core_api.remove_chart)(this.domainPrefix, current_chart.objectID, this.userID);
      }

      delete charts[chartId];
      indexOfChartId = chartList.indexOf(chartId);
      chartList.splice(indexOfChartId, 1);

      this.setState({ charts: charts });
      this.setState({ chartList: chartList });
    }
  }, {
    key: '_getColumnAndRowCount',
    value: function _getColumnAndRowCount() {
      return {
        columnCount: this.state.columnCount,
        rowCount: this.state.rowList.length
      };
    }
  }, {
    key: '_findPositionInRow',
    value: function _findPositionInRow(cellId) {
      var rowPosition = cellId.toString().split('')[0];
      var cellsInRow = this.state.rows[rowPosition]['cellsInRow'];
      var cellPosition = cellsInRow.indexOf(cellId);
      var lastIndexOfRow = cellsInRow.length - 1;
      return parseInt(lastIndexOfRow) - parseInt(cellPosition);
    }
  }, {
    key: '_findPositionInColumn',
    value: function _findPositionInColumn(cellId) {
      var rowPosition = cellId.toString().split('')[0];
      var cellPosition = this.state.rowList.indexOf(parseInt(rowPosition));
      var lastIndexOfColumn = this.state.rowList.length - 1;
      return parseInt(lastIndexOfColumn) - parseInt(cellPosition);
    }
  }, {
    key: '_getCellRect',
    value: function _getCellRect(cellId) {
      var cell = document.getElementsByName(cellId)[0];
      var cellRect = cell.getBoundingClientRect();

      return cellRect;
    }
  }, {
    key: '_swapChartId',
    value: function _swapChartId(newerChartId, olderChartId) {
      var charts = this.state.charts;
      // charts[olderChartId]['id'] = newerChartId;
      // charts[newerChartId]['id'] = olderChartId;

      charts[olderChartId]['clonedFrom'] = olderChartId;

      this.setState({ charts: charts });
    }
  }, {
    key: '_getStartingCell',
    value: function _getStartingCell(chartId) {
      var charts = this.state.charts;
      var startingCellToSwap = charts[chartId]['startingCell'];

      return startingCellToSwap;
    }
  }, {
    key: '_swapLocation',
    value: function _swapLocation(x, y, cloneId, originCell, originCells) {
      var charts = this.state.charts;

      charts[cloneId]['startingX'] = x;
      charts[cloneId]['startingY'] = y;
      charts[cloneId]['startingCell'] = originCell;
      charts[cloneId]['originCells'] = originCells;

      charts[cloneId]['cloned'] = true;

      this.setState({ charts: charts });
    }
  }, {
    key: '_resetCloneStatus',
    value: function _resetCloneStatus(cloneId) {
      var charts = this.state.charts;

      delete charts[cloneId]['cloned'];

      this.setState({ charts: charts });
    }
  }, {
    key: 'renderRows',
    value: function renderRows() {
      var _this3 = this;

      var rowArray = this.state.rowList;
      return rowArray.map(function (row, index) {
        var rowData = _this3.state.rows[row];
        return _react2.default.createElement(_row2.default, {
          matrixCells: _this3.state.cells,
          key: index,
          rowId: rowData.id,
          cellsInRow: rowData.cellsInRow,
          addChart: _this3.addChart,
          setStartingDOMLocation: _this3.setStartingDOMLocation,
          updateMatrixCell: _this3._updateMatrixCell
        });
      });
    }
  }, {
    key: 'renderCharts',
    value: function renderCharts() {
      var _this4 = this;

      return this.state.chartList.map(function (chartId, index) {
        var chartInfo = _this4.state.charts[chartId];
        var originCell = chartInfo['startingCell'];
        var originCells = chartInfo['originCells'];

        var _getDOMLocationOfCell2 = _this4._getDOMLocationOfCell(originCell),
            x = _getDOMLocationOfCell2.x,
            y = _getDOMLocationOfCell2.y;

        var startingColumnSpan = 1;
        var startingRowSpan = 1;
        var startingWidth = void 0;
        var startingHeight = void 0;

        if (chartInfo.startingColumnSpan != 1) {
          startingColumnSpan = chartInfo.startingColumnSpan;
          var width = _this4._getCellRect(chartInfo.startingCell).width;
          var paddingInWidth = width * .13;

          startingWidth = width * chartInfo.startingColumnSpan - paddingInWidth;
        } else {
          startingWidth = _this4._getCellRect(chartInfo.startingCell).width * chartInfo.startingColumnSpan * .88;
        }

        if (chartInfo.startingRowSpan != 1) {
          startingRowSpan = chartInfo.startingRowSpan;
          var height = _this4._getCellRect(chartInfo.startingCell).height;
          var paddingInHeight = height * .08;

          startingHeight = height * chartInfo.startingRowSpan - paddingInHeight;
        } else {
          startingHeight = _this4._getCellRect(chartInfo.startingCell).height * chartInfo.startingRowSpan * .91;
        }

        if (chartInfo.cloned) {
          x = chartInfo.startingX;
          y = chartInfo.startingY;
        }

        return _react2.default.createElement(_chart2.default, {
          key: chartId,
          id: chartInfo.id,
          originCell: originCell,
          originCells: originCells,
          startingX: x,
          startingY: y,
          startingWidth: startingWidth,
          startingHeight: startingHeight,
          startingColumnSpan: startingColumnSpan,
          startingRowSpan: startingRowSpan,
          getCellRect: _this4._getCellRect,
          isOccupied: _this4._isCellOccupied,
          getDOMLocationOfCell: _this4._getDOMLocationOfCell,
          occupyCell: _this4._occupyCell,
          unoccupyCell: _this4._unoccupyCell,
          removeChart: _this4._removeChart,
          findPositionInRow: _this4._findPositionInRow,
          findPositionInColumn: _this4._findPositionInColumn,
          rowCount: _this4.state.rowCount,
          columnCount: _this4.state.columnCount,
          addChart: _this4.addChart,
          swapChartId: _this4._swapChartId,
          swapLocation: _this4._swapLocation,
          cloned: chartInfo.cloned,
          resetCloneStatus: _this4._resetCloneStatus,
          getStartingCell: _this4._getStartingCell,
          objectID: chartInfo.objectID,
          chartName: chartInfo.chartName,
          domainPrefix: _this4.domainPrefix
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'matrix' },
        _react2.default.createElement(_button2.default, {
          style: 'button__addRow',
          buttonText: 'Add Row',
          buttonAction: this.addRow
        }),
        _react2.default.createElement(_button2.default, {
          style: 'button__addColumn',
          buttonText: 'Add Col',
          buttonAction: this.addColumn
        }),
        this.renderRows(),
        this.hasRendered ? this.renderCharts() : null
      );
    }
  }]);

  return Matrix;
}(_react.Component);

exports.default = Matrix;

/***/ })

})