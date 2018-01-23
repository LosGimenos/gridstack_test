webpackHotUpdate(0,{

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(30);

var _reactRnd = __webpack_require__(227);

var _reactRnd2 = _interopRequireDefault(_reactRnd);

var _matrixSizeModifiers = __webpack_require__(230);

var _matrixSizeModifiers2 = _interopRequireDefault(_matrixSizeModifiers);

var _core_api = __webpack_require__(65);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chart = function (_Component) {
  _inherits(Chart, _Component);

  function Chart(props) {
    _classCallCheck(this, Chart);

    var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this, props));

    _this.state = {
      x: _this.props.startingX,
      y: _this.props.startingY,
      w: _this.props.startingWidth,
      h: _this.props.startingHeight,
      columnCount: _this.props.columnCount,
      rowCount: _this.props.rowCount,
      onCloneDrag: false
      // rowSpan: this.props.startingRowSpan,
      // colSpan: this.props.startingColumnSpan,
    };
    _this.id = _this.props.id;
    _this.originCell = _this.props.originCell;
    _this.originCells = [_this.originCell];
    _this.baseWidth = _this.props.getCellRect(_this.props.originCell).width;
    _this.baseHeight = _this.props.getCellRect(_this.props.originCell).height;
    _this.heightCorrected = true;
    _this.clonedChartId = null;

    _this.objectID = _this.props.objectID;
    _this.chartName = _this.props.chartName;
    _this.domainPrefix = _this.props.domainPrefix;
    _this.rowSpan = _this.props.startingRowSpan;
    _this.colSpan = _this.props.startingColumnSpan;
    return _this;
  }

  _createClass(Chart, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.columnCount != this.state.columnCount) {
        var _props$getCellRect = this.props.getCellRect(this.originCell),
            width = _props$getCellRect.width,
            height = _props$getCellRect.height,
            top = _props$getCellRect.top,
            left = _props$getCellRect.left;

        var chartWidthDifference = this.state.w * this._getCellSizeDifference(this.baseWidth, width);
        var chartHeightDifference = this.state.h * this._getCellSizeDifference(this.baseHeight, height);
        var chartWidth = this.state.w - chartWidthDifference;
        var chartHeight = this.state.h - chartHeightDifference;

        this.setState({ columnCount: nextProps.columnCount });
        this.setState({ w: chartWidth });
        this.setState({ h: chartHeight });
        this.setState({ x: left });
        this.setState({ y: top });

        this.baseWidth = width;
        this.baseHeight = height;
      } else if (nextProps.rowCount != this.state.rowCount) {
        this.setState({ rowCount: nextProps.rowCount });
        this.heightCorrected = false;
      }

      if (nextProps.cloned && nextProps.x != this.state.x || nextProps.cloned && nextProps.y != this.state.y) {
        console.log('clone swap', this.originCells);
        this.originCell = nextProps.originCell;
        this.originCells = nextProps.originCells;
        this.props.resetCloneStatus(this.id);
        this._resetPosition(nextProps.startingX, nextProps.startingY);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props$getCellRect2 = this.props.getCellRect(this.originCell),
          width = _props$getCellRect2.width,
          height = _props$getCellRect2.height,
          top = _props$getCellRect2.top,
          left = _props$getCellRect2.left;

      if (prevProps.rowCount != this.state.rowCount && !this.heightCorrected) {
        var chartWidthDifference = this.state.w * this._getCellSizeDifference(this.baseWidth, width);
        var chartHeightDifference = this.state.h * this._getCellSizeDifference(this.baseHeight, height);

        var chartWidth = this.state.w - chartWidthDifference;
        var chartHeight = this.state.h - chartHeightDifference;

        this.setState({ x: left });
        this.setState({ y: top });
        this.setState({ w: chartWidth });
        this.setState({ h: chartHeight });
        this.heightCorrected = true;

        this.baseWidth = width;
        this.baseHeight = height;
      }

      if (prevState.y != top || prevState.x != left) {
        this.setState({ y: top });
        this.setState({ x: left });
      }
    }
  }, {
    key: '_getCellSizeDifference',
    value: function _getCellSizeDifference(baseCellSize, newCellSize) {
      var cellSizeDifference = (baseCellSize - newCellSize) / baseCellSize;
      return cellSizeDifference;
    }
  }, {
    key: '_checkCollision',
    value: function _checkCollision(x, y) {
      var _this2 = this;

      var chartLocation = {
        right: x + this.state.w,
        top: y,
        bottom: y + this.state.h,
        left: x + 5
      };

      var cells = document.querySelectorAll('.matrix-cell');
      var overlappedCells = [];
      var onOccupiedCell = false;

      cells.forEach(function (cell) {
        var cellLocation = cell.getBoundingClientRect();
        var overlap = !(chartLocation.right < cellLocation.left || chartLocation.left > cellLocation.right || chartLocation.bottom < cellLocation.top || chartLocation.top > cellLocation.bottom);

        if (overlap) {
          var cellId = cell.getAttribute('name');
          overlappedCells.push(cellId);
          var isOccupied = _this2.props.isOccupied(cellId);

          if (isOccupied && _this2._checkIsOriginCell(cellId.toString(), _this2.originCells) == false) {
            onOccupiedCell = true;
          }
        }
      });

      return { 'onOccupiedCellOnRelocate': onOccupiedCell, 'overlappedCellsOnRelocate': overlappedCells };
    }
  }, {
    key: '_checkCloneDropCollision',
    value: function _checkCloneDropCollision() {

      this._checkCollision(x, y);
    }
  }, {
    key: '_clearClonedChartOnError',
    value: function _clearClonedChartOnError() {
      this.props.removeChart(this.clonedChartId);
      this.clonedChartId = null;
    }
  }, {
    key: '_checkForOverlap',
    value: function _checkForOverlap(e) {
      var _this3 = this;

      var chart = e.target;
      var chartLocation = void 0;

      if (chart.tagName == 'HTML' || chart.tagName == 'document' || chart.tagName == 'BUTTON') {
        return;
      }

      if (chart.className == 'not-selectable') {
        chart = e.target.parentElement.parentElement.parentElement;
      }

      try {
        chartLocation = chart.getBoundingClientRect();
      } catch (err) {
        return;
      }

      var cells = document.querySelectorAll('.matrix-cell');
      var overlappedCells = [];
      var onOccupiedCell = false;

      cells.forEach(function (cell) {
        var cellLocation = cell.getBoundingClientRect();
        var overlap = !(chartLocation.right < cellLocation.left || chartLocation.left > cellLocation.right || chartLocation.bottom < cellLocation.top || chartLocation.top > cellLocation.bottom);

        if (overlap) {
          var cellId = cell.getAttribute('name');
          overlappedCells.push(cellId);
          var isOccupied = _this3.props.isOccupied(cellId);

          if (isOccupied && _this3._checkIsOriginCell(cellId.toString(), _this3.originCells) == false) {
            onOccupiedCell = true;
          }
        }
      });

      // chart must be same size as cells it collides with
      if (overlappedCells.length > this.originCells.length) {
        return;
      }

      if (!onOccupiedCell && overlappedCells.length >= 2 && this._checkForDefaultSize()) {
        return;
      }

      if (!onOccupiedCell && overlappedCells.length >= 2) {
        var remainingOriginCells = this.originCells;
        var _anchorCell = Math.min.apply(null, overlappedCells);

        if (!this._checkAvailableMatrixSize(_anchorCell)) {
          return;
        }

        var _props$getDOMLocation = this.props.getDOMLocationOfCell(_anchorCell),
            _x = _props$getDOMLocation.x,
            _y = _props$getDOMLocation.y;

        this._resetPosition(_x, _y);

        var _checkCollision2 = this._checkCollision(_x, _y),
            onOccupiedCellOnRelocate = _checkCollision2.onOccupiedCellOnRelocate,
            overlappedCellsOnRelocate = _checkCollision2.overlappedCellsOnRelocate;

        overlappedCellsOnRelocate.forEach(function (cell) {
          if (!_this3._checkIsOriginCell(cell, _this3.originCells)) {
            _this3.props.occupyCell(cell);
          } else {
            remainingOriginCells = remainingOriginCells.filter(function (value) {
              return value != cell;
            });
          }
        });
        remainingOriginCells.forEach(function (cell) {
          _this3.props.unoccupyCell(cell);
        });
        this.originCell = _anchorCell;
      } else if (!onOccupiedCell && overlappedCells.length <= 1) {
        try {
          var _anchorCell2 = Math.min.apply(null, overlappedCells);

          if (!this._checkAvailableMatrixSize(_anchorCell2)) {
            return;
          }

          var _props$getDOMLocation2 = this.props.getDOMLocationOfCell(_anchorCell2),
              _x2 = _props$getDOMLocation2.x,
              _y2 = _props$getDOMLocation2.y;

          this._resetPosition(_x2, _y2);
          this.props.unoccupyCell(this.originCell);
          this.props.occupyCell(_anchorCell2);
          this.originCell = _anchorCell2;
        } catch (err) {
          var _props$getDOMLocation3 = this.props.getDOMLocationOfCell(this.originCell),
              _x3 = _props$getDOMLocation3.x,
              _y3 = _props$getDOMLocation3.y;

          this._resetPosition(_x3, _y3);
          return;
        }
      }
      var anchorCell = Math.min.apply(null, overlappedCells);
      this.originCell = anchorCell;
    }
  }, {
    key: '_checkForDefaultSize',
    value: function _checkForDefaultSize() {
      return this.state.w == this.baseWidth && this.state.h == this.baseHeight ? true : false;
    }
  }, {
    key: '_checkAvailableMatrixSize',
    value: function _checkAvailableMatrixSize(cellId) {
      var availableWidthIndex = this.props.findPositionInRow(cellId) + 1;
      var availableHeightIndex = this.props.findPositionInColumn(cellId) + 1;

      var currentWidthIndex = Math.ceil(this.state.w / this.baseWidth);
      var currentHeightIndex = Math.ceil(this.state.h / this.baseHeight);

      return availableWidthIndex < currentWidthIndex || availableHeightIndex < currentHeightIndex ? false : true;
    }
  }, {
    key: '_checkResizeOverlap',
    value: function _checkResizeOverlap(e, delta) {
      var _this4 = this;

      var startingWidth = this.state.w;
      var startingHeight = this.state.h;
      var chart = void 0;

      try {
        chart = e.target.parentElement.parentElement;
      } catch (err) {
        return;
      }

      if (!chart.className.match('draggable')) {
        return;
      }

      var chartLocation = chart.getBoundingClientRect();
      var cells = document.querySelectorAll('.matrix-cell');
      var overlappedCells = [];
      var onOccupiedCell = false;

      cells.forEach(function (cell) {
        var cellId = cell.getAttribute('name');
        var cellLocation = cell.getBoundingClientRect();
        var overlap = !(chartLocation.right < cellLocation.left || chartLocation.left > cellLocation.right || chartLocation.bottom < cellLocation.top || chartLocation.top > cellLocation.bottom);

        if (overlap) {
          overlappedCells.push(cellId);
          var isOccupied = _this4.props.isOccupied(cellId);

          if (isOccupied && _this4._checkIsOriginCell(cellId.toString(), _this4.originCells) == false) {
            onOccupiedCell = true;
          }
        }
      });

      var remainingOriginCells = this.originCells;
      var anchorCell = Math.min.apply(null, overlappedCells);

      if (!onOccupiedCell && overlappedCells.length >= 1) {
        if (startingWidth == this.state.w + delta.width) {
          if (this.state.h + delta.height > startingHeight) {
            this._setHeight(overlappedCells, 'bigger');
          } else if (this.state.h + delta.height < startingHeight) {
            this._setHeight(overlappedCells, 'smaller');
          }
          this.setState({ w: this.state.w + delta.width });
        } else if (startingHeight == this.state.h + delta.height) {
          if (this.state.w + delta.width > startingWidth) {
            this._setWidth(overlappedCells, 'bigger');
          } else if (this.state.w + delta.width < startingWidth) {
            this._setWidth(overlappedCells, 'smaller');
          }
          this.setState({ h: this.state.h + delta.height });
        }
        overlappedCells.forEach(function (cell) {
          _this4.props.occupyCell(cell);
          remainingOriginCells = remainingOriginCells.filter(function (value) {
            return value != cell;
          });
        });
        remainingOriginCells.forEach(function (cell) {
          _this4.props.unoccupyCell(cell);
        });
      }
      this.originCell = anchorCell;
    }
  }, {
    key: '_checkCloneOverlap',
    value: function _checkCloneOverlap(e) {
      var _this5 = this;

      var chart = e.target;
      var chartLocation = void 0;

      if (chart.tagName == 'HTML' || chart.tagName == 'document' || chart.tagName == 'BUTTON') {
        this._clearClonedChartOnError();
        return;
      }

      if (chart.className == 'not-selectable') {
        chart = e.target.parentElement.parentElement.parentElement;
      }

      try {
        chartLocation = chart.getBoundingClientRect();
      } catch (err) {
        this._clearClonedChartOnError;
        return;
      }

      var cells = document.querySelectorAll('.matrix-cell');
      var overlappedCells = [];
      var onOccupiedCell = false;

      cells.forEach(function (cell) {
        var cellLocation = cell.getBoundingClientRect();
        var overlap = !(chartLocation.right < cellLocation.left || chartLocation.left > cellLocation.right || chartLocation.bottom < cellLocation.top || chartLocation.top > cellLocation.bottom);

        if (overlap) {
          var cellId = cell.getAttribute('name');
          overlappedCells.push(cellId);
          var isOccupied = _this5.props.isOccupied(cellId);

          if (isOccupied) {
            onOccupiedCell = true;
          }
        }
      });

      if (onOccupiedCell) {
        var renderedClonedChart = document.getElementsByName(this.clonedChartId)[0];

        if (renderedClonedChart) {
          console.log('we cleared immeditately');
          this._clearClonedChartOnError();
        } else {
          console.log('had to set timeout');
          setTimeout(function () {
            console.log('timeout done');
            _this5._clearClonedChartOnError();
          }, 700);
        }
        console.log('this one here');
        return;
      } else {
        try {
          var remainingOriginCells = this.originCells;
          var anchorCell = Math.min.apply(null, overlappedCells);

          if (!this._checkAvailableMatrixSize(anchorCell)) {
            this._clearClonedChartOnError();
            return;
          }

          var _props$getDOMLocation4 = this.props.getDOMLocationOfCell(anchorCell),
              _x4 = _props$getDOMLocation4.x,
              _y4 = _props$getDOMLocation4.y;

          var cloneStartingCell = this.props.getStartingCell(this.clonedChartId);
          this.props.swapLocation(_x4, _y4, this.clonedChartId, anchorCell, this.originCells);

          var cloneStartingCellLocation = this.props.getDOMLocationOfCell(cloneStartingCell);
          var cloneLocationX = cloneStartingCellLocation['x'];
          var cloneLocationY = cloneStartingCellLocation['y'];
          this._resetPosition(cloneLocationX, cloneLocationY);

          var _checkCollision3 = this._checkCollision(_x4, _y4),
              onOccupiedCellOnRelocate = _checkCollision3.onOccupiedCellOnRelocate,
              overlappedCellsOnRelocate = _checkCollision3.overlappedCellsOnRelocate;

          overlappedCellsOnRelocate.forEach(function (cell) {
            if (!_this5._checkIsOriginCell(cell, _this5.originCells)) {
              _this5.props.occupyCell(cell);
            }
          });
          this.originCell = cloneStartingCell;
        } catch (err) {
          this._clearClonedChartOnError();
          return;
        }
      }
    }
  }, {
    key: '_startDragEvent',
    value: function _startDragEvent(e) {
      this.originCells = [];
      var chart = e.target;

      if (chart.className == 'not-selectable') {
        chart = e.target.parentElement.parentElement.parentElement;
      } else if (chart.className == 'button__cell--clear' || chart.className == 'button__cell--clone') {
        chart = e.target.parentElement.parentElement;
      }

      var chartLocation = chart.getBoundingClientRect();
      var cells = document.querySelectorAll('.matrix-cell');
      var overlappedCells = [];

      cells.forEach(function (cell) {
        var cellId = cell.getAttribute('name');
        var cellLocation = cell.getBoundingClientRect();
        var overlap = !(chartLocation.right < cellLocation.left || chartLocation.left > cellLocation.right || chartLocation.bottom < cellLocation.top || chartLocation.top > cellLocation.bottom);

        if (overlap) {
          overlappedCells.push(cellId);
        }
      });
      this.originCells = overlappedCells;
    }
  }, {
    key: '_startResizeEvent',
    value: function _startResizeEvent(e) {
      this.originCells = [];
      // const chart = e.target.parentElement.parentElement;
      // const chart = e.target.parentElement.parentElement.firstChild;
      var chart = e;

      var chartLocation = chart.getBoundingClientRect();

      var cells = document.querySelectorAll('.matrix-cell');
      var overlappedCells = [];

      cells.forEach(function (cell) {
        var cellId = cell.getAttribute('name');
        var cellLocation = cell.getBoundingClientRect();
        var overlap = !(chartLocation.right < cellLocation.left || chartLocation.left > cellLocation.right || chartLocation.bottom < cellLocation.top || chartLocation.top > cellLocation.bottom);

        if (overlap) {
          overlappedCells.push(cellId);
        }
      });
      this.originCells = overlappedCells;
    }
  }, {
    key: '_checkIsOriginCell',
    value: function _checkIsOriginCell(cellId, originCells) {
      return originCells.includes(cellId);
    }
  }, {
    key: '_resetPosition',
    value: function _resetPosition(x, y) {
      this.setState({ x: x, y: y });
    }
  }, {
    key: '_setWidth',
    value: function _setWidth(overlappedCells, smallerOrBigger) {
      var _checkPositionInRowAn = this._checkPositionInRowAndColumn(overlappedCells),
          columns = _checkPositionInRowAn.columns;

      var minWidthModifier = columns;

      switch (smallerOrBigger) {
        case 'smaller':
          {
            if (minWidthModifier == 0) {
              minWidthModifier = 1;
            }
            break;
          }
        case 'bigger':
          {
            if (minWidthModifier == 0 || minWidthModifier == 1) {
              minWidthModifier = 2;
            }
          }
      }

      var paddingInWidth = this.baseWidth * .13;
      var maxWidthModifier = this.props.findPositionInRow(this.originCell);

      if (maxWidthModifier == 0) {
        return;
      } else if (minWidthModifier > maxWidthModifier) {
        minWidthModifier = maxWidthModifier + 1;
      }

      var minWidth = this.baseWidth * minWidthModifier - paddingInWidth;

      // this.setState({ colSpan: minWidthModifier });
      this.colSpan = minWidthModifier;

      this.setState({ w: minWidth });
    }
  }, {
    key: '_setHeight',
    value: function _setHeight(overlappedCells, smallerOrBigger) {
      var _checkPositionInRowAn2 = this._checkPositionInRowAndColumn(overlappedCells),
          rows = _checkPositionInRowAn2.rows;

      var minHeightModifier = rows;
      switch (smallerOrBigger) {
        case 'smaller':
          {
            if (minHeightModifier == 0) {
              minHeightModifier = 1;
            }
            break;
          }
        case 'bigger':
          {
            if (minHeightModifier == 0 || minHeightModifier == 1) {
              minHeightModifier = 2;
            }
          }
      }

      var paddingInHeight = this.baseHeight * .08;
      var maxHeightModifier = this.props.findPositionInColumn(this.originCell);

      if (maxHeightModifier == 0) {
        return;
      } else if (minHeightModifier > maxHeightModifier) {
        minHeightModifier = maxHeightModifier + 1;
      }

      var minHeight = this.baseHeight * minHeightModifier - paddingInHeight;

      // this.setState({ rowSpan: minHeightModifier });
      this.rowSpan = minHeightModifier;

      this.setState({ h: minHeight });
    }
  }, {
    key: '_checkPositionInRowAndColumn',
    value: function _checkPositionInRowAndColumn(overlappedCells) {
      var columnsAndRows = {
        columns: 0,
        rows: 0
      };

      var columnMatcher = void 0;
      var rowMatcher = void 0;

      overlappedCells.forEach(function (cellId) {
        var rowIndex = parseInt(cellId.toString().split('')[0]);

        if (!rowMatcher || rowMatcher == rowIndex) {
          if (columnsAndRows['columns']) {
            columnsAndRows['columns'] = columnsAndRows['columns'] + 1;
          } else {
            rowMatcher = rowIndex;
            columnsAndRows['columns'] = 1;
          }
        }

        if (rowIndex != columnMatcher) {
          columnMatcher = rowIndex;
          if (columnsAndRows['rows']) {
            columnsAndRows['rows'] = columnsAndRows['rows'] + 1;
          } else {
            columnsAndRows['rows'] = 1;
          }
        }
      });

      return columnsAndRows;
    }
  }, {
    key: '_copyChart',
    value: function _copyChart(e) {
      this.setState({ onCloneDrag: true });
      this._startDragEvent(e);

      var _checkPositionInRowAn3 = this._checkPositionInRowAndColumn(this.originCells),
          columns = _checkPositionInRowAn3.columns,
          rows = _checkPositionInRowAn3.rows;

      var _props$addChart = this.props.addChart(this.originCell, rows, columns, true, this.objectID),
          chartId = _props$addChart.chartId;

      this.clonedChartId = chartId;
    }
  }, {
    key: '_style',
    value: function _style() {
      return {
        postion: 'absolute',
        // border: '2px solid white',
        // backgroundColor: '#4C99E8',
        backgroundColor: '#d9edf7',
        border: '2px solid white',
        opacity: '.97',
        // opacity: '1',
        width: '100%',
        height: '100%',
        borderRadius: '30px',
        textAlign: 'center'
      };
    }
  }, {
    key: '_cloneDragStyle',
    value: function _cloneDragStyle() {
      return {
        postion: 'absolute',
        border: '2px solid white',
        // backgroundColor: 'yellow',
        // backgroundColor: '#dff0d8',
        backgroundColor: '#337ab7',
        opacity: '.97',
        width: '100%',
        height: '100%',
        borderRadius: '30px',
        textAlign: 'center'
      };
    }
  }, {
    key: '_clearChart',
    value: function _clearChart(e) {
      var _this6 = this;

      var chartIdToRemove = this.id;
      this.props.removeChart(chartIdToRemove);
      this.originCells.forEach(function (cell) {
        _this6.props.unoccupyCell(cell);
      });
    }

    // deprecated modifiers for responsive scaling.
    // - (this.baseWidth * matrixSizeModifiers['columns'][this.state.columnCount])
    // - (this.baseHeight * matrixSizeModifiers['rows'][this.state.rowCount])

  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var matrix = document.querySelector('.matrix');
      var cell = document.getElementsByName(this.originCell)[0];

      // center chart within selected grid. offset css padding
      var cellMarginWidthAdjustment = cell.offsetWidth * .065;
      var cellMarginHeightAdjustment = cell.offsetHeight * .04;

      var containerRect = document.querySelector('.matrix').getBoundingClientRect();
      var newXPosition = this.state.x - containerRect.x;
      var newYPosition = this.state.y - containerRect.y;

      return _react2.default.createElement(
        _reactRnd2.default,
        {
          size: { width: this.state.w, height: this.state.h },
          position: {
            x: newXPosition + cellMarginWidthAdjustment,
            // - (cell.offsetWidth),
            y: newYPosition + cellMarginHeightAdjustment
            // + (cell.offsetHeight / 32)

          },
          onDragStart: function onDragStart(e, d) {
            !e.shiftKey ? _this7._startDragEvent(e) : _this7._copyChart(e);
          },
          onDragStop: function onDragStop(e, d) {
            _this7.state.onCloneDrag ? _this7._checkCloneOverlap(e) : _this7._checkForOverlap(e);
            console.log(e);
            if (e['target']['className'] == "chart") {
              (0, _core_api.refresh_chart_position)(_this7.domainPrefix, _this7.objectID, _this7.originCell, _this7.rowSpan, _this7.colSpan);
            }
            _this7.setState({ onCloneDrag: false });
          },
          onResizeStart: function onResizeStart(e, direction, ref, delta, position) {
            _this7._startResizeEvent(ref);
          },
          onResizeStop: function onResizeStop(e, direction, ref, delta, position) {
            _this7._checkResizeOverlap(e, delta);
            (0, _core_api.refresh_chart_position)(_this7.domainPrefix, _this7.objectID, _this7.originCell, _this7.rowSpan, _this7.colSpan);
          },
          enableResizing: {
            bottom: true,
            bottomLeft: false,
            bottomRight: false,
            left: false,
            right: true,
            top: false,
            topLeft: false,
            topRight: false
          },
          resizeHandleStyles: {
            right: { 'width': '20px' },
            bottom: { 'height': '20px' }
          },
          z: this.state.onCloneDrag ? 100 : 1,
          bounds: 'parent'
        },
        _react2.default.createElement(
          'div',
          {
            className: 'chart',
            style: this.state.onCloneDrag ? this._cloneDragStyle() : this._style(),
            name: this.id,
            onDoubleClick: function onDoubleClick() {
              return (0, _core_api.goToChart)(_this7.domainPrefix, _this7.objectID);
            }
          },
          _react2.default.createElement(
            'span',
            { className: 'chart-name-info' },
            _react2.default.createElement(
              'button',
              {
                className: 'button__cell--clear',
                onClick: function onClick(e) {
                  _this7._clearChart(e);
                } },
              _react2.default.createElement(
                'p',
                { className: 'not-selectable' },
                'x'
              )
            ),
            _react2.default.createElement(
              'label',
              { className: 'chart-name-label', onMouseDown: _core_api.handleClickToEdit },
              this.chartName
            ),
            _react2.default.createElement('input', { className: 'chart-name-input', onBlur: function onBlur(e) {
                return (0, _core_api.endEditName)(e, _this7.objectID);
              },
              onKeyUp: function onKeyUp(e) {
                return (0, _core_api.handleKeyup)(e, _this7.objectID);
              }, onMouseDown: _core_api.turnOffDraggingForChart, type: 'text' })
          )
        )
      );
    }
  }]);

  return Chart;
}(_react.Component);

exports.default = Chart;

/***/ })

})