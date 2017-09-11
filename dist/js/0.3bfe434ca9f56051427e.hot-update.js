webpackHotUpdate(0,{

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactDragula = __webpack_require__(337);

var _reactDragula2 = _interopRequireDefault(_reactDragula);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.selections = [];
    _this.dragulaDecorator = function (componentBackingInstance) {
      if (componentBackingInstance) {
        var options = {};
        (0, _reactDragula2.default)([componentBackingInstance], options);
      }
    };
    return _this;
  }

  _createClass(App, [{
    key: 'addSelection',
    value: function addSelection(columnName) {
      this.selections.push(columnName);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'main-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'choice-page__wrapper' },
          _react2.default.createElement(
            'h2',
            null,
            'Which Columns Do You Want on the Report?'
          ),
          _react2.default.createElement(
            'div',
            { className: 'choice-wrapper' },
            _react2.default.createElement(
              'div',
              { className: 'choice' },
              _react2.default.createElement(
                'p',
                null,
                'URL'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'choice' },
              _react2.default.createElement(
                'p',
                null,
                'Date'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'choice' },
              _react2.default.createElement(
                'p',
                null,
                'Total Reviews'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'choice' },
              _react2.default.createElement(
                'p',
                null,
                'Review Average'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'choice' },
              _react2.default.createElement(
                'p',
                null,
                'Number of 1 Star Reviews'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'choice' },
              _react2.default.createElement(
                'p',
                null,
                'Number of 5 Star Reviews'
              )
            )
          ),
          _react2.default.createElement('input', { className: 'submit-choices', type: 'submit' })
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

/***/ })

})