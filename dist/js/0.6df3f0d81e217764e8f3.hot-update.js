webpackHotUpdate(0,{

/***/ 196:
false,

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(197)(undefined);
// imports


// module
exports.push([module.i, ".__resizable_base {\n  display: none;\n}\n\n.chart {\n  margin: 0;\n  padding: 0;\n}\n\n.selector {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #FDE3A7;\n  cursor: pointer;\n  height: 35%;\n  width: 50%;\n  font-size: 10px;\n  font-weight: 600;\n  line-height: 1.4;\n  white-space: nowrap;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n\n.selector:hover {\n  background-color: #337ab7;\n  color: #fff;\n}\n\n.selector span {\n  height: 10px;\n}\n\n.selector span p {\n  height: 10px;\n  margin: 0;\n}\n\n.button__cell--clone {\n  background-color: #2ecc71;\n}\n\n.button__cell--clear {\n  position: absolute;\n  top: 2%;\n  left: 2%;\n  border-radius: 10px;\n  border: 1px solid #d43f3a;\n  background-color: #E82C57;\n  font-size: 10px;\n  font-weight: 400;\n  /*line-height: 1.42;*/\n  white-space: nowrap;\n}\n\n.button__cell--import {\n  position: absolute;\n  right: 0;\n  background-color: green;\n}\n\n.button__addRow {\n  position: absolute;\n  cursor: pointer;\n  bottom: -7%;\n  width: 100%;\n  color: #fff;\n  background-color: #337ab7;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 1.42;\n  white-space: nowrap;\n  border: 1px solid #2e6da4;\n  border-radius: 4px;\n}\n\n.button__addColumn {\n  position: absolute;\n  width: 6%;\n  right: -6.5%;\n  height: 100%;\n  cursor: pointer;\n  color: #fff;\n  background-color: #337ab7;\n  font-size: .55em;\n  font-weight: 400;\n  line-height: 1.42;\n  border: 1px solid #2e6da4;\n  border-radius: 4px;\n}\n\n.not-selectable {\n  user-select: none;\n}\n\n.matrix-row {\n  border: 1px solid black;\n  display: flex;\n  justify-content: space-between;\n  height: 100%;\n  padding: 0;\n  margin: 0;\n}\n\n.matrix-cell {\n  padding: 0;\n  margin: 0;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  border: 1px solid #000;\n  text-align: center;\n  user-select: none;\n}\n\n#root {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n.matrix {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  border: 1px solid black;\n  width: 722px;\n  height: 403.5px;\n  user-select: none;\n}\n", ""]);

// exports


/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(200);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(198)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(200, function() {
			var newContent = __webpack_require__(200);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 51:
false,

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(21);

var _matrix = __webpack_require__(187);

var _matrix2 = _interopRequireDefault(_matrix);

__webpack_require__(201);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_matrix2.default, null), document.querySelector('#root'));

if (true) {
  module.hot.accept();
}

/***/ })

})