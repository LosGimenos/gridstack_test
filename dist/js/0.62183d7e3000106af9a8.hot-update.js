webpackHotUpdate(0,{

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
window.onresize = function () {
  location.reload();
};

var matrixSizeModifier = void 0;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

matrixSizeModifier = {
  'columns': {
    1: .35,
    2: .77,
    3: 1.18,
    4: 1.6,
    5: 2,
    6: 2.42,
    7: 2.84,
    8: 3.25
  },
  'rows': {
    1: .4,
    2: .83,
    3: 1.27,
    4: 1.7,
    5: 2.15,
    6: 2.6
  }
};

calculateIncrements(calcSizeDifference(windowWidth, 'width'), 'width');
calculateIncrements(calcSizeDifference(windowHeight, 'height'), 'height');

// Calc the size differential based on the percentage difference.

function calculateIncrements(baseModifier, widthOrHeight) {
  var rowTwo = void 0;
  var rowThree = void 0;
  var rowFour = void 0;
  var rowFive = void 0;
  var rowSix = void 0;
  var rowSeven = void 0;
  var rowEight = void 0;

  switch (widthOrHeight) {
    case 'width':
      rowTwo = getValForPercentDifference(baseModifier, 75);
      rowThree = getValForPercentDifference(rowTwo, 43);
      rowFour = getValForPercentDifference(rowThree, 30);
      rowFive = getValForPercentDifference(rowFour, 24);
      rowSix = getValForPercentDifference(rowFive, 19);
      rowSeven = getValForPercentDifference(rowSix, 15);
      rowEight = getValForPercentDifference(rowSeven, 13);

      matrixSizeModifier['columns'] = {
        1: baseModifier,
        2: rowTwo,
        3: rowThree,
        4: rowFour,
        5: rowFive,
        6: rowSix,
        7: rowSeven,
        8: rowEight
      };
      break;

    case 'height':
      rowTwo = getValForPercentDifference(baseModifier, 70);
      rowThree = getValForPercentDifference(rowTwo, 42);
      rowFour = getValForPercentDifference(rowThree, 29);
      rowFive = getValForPercentDifference(rowFour, 23);
      rowSix = getValForPercentDifference(rowFive, 19);

      matrixSizeModifier['rows'] = {
        1: baseModifier,
        2: rowTwo,
        3: rowThree,
        4: rowFour,
        5: rowFive,
        6: rowSix
      };
      break;
  }
}

//tests values against established percent difference

function getValForPercentDifference(val1, percent) {
  var value = val1;
  var val2 = void 0;
  var finalPercent = void 0;
  var counter = 0;

  while (Math.floor(finalPercent) != percent && counter < 500) {
    val2 = value + .001;
    finalPercent = Math.abs(val2 - val1) / ((val1 + val2) / 2) * 100;

    value = val2;
    counter += 1;
  }

  return val2;
}

//calc base size differential from current size against max size

function calcSizeDifference(currentSize, widthOrHeight) {
  var baseWidth = 1440;
  var baseHeight = 803;
  var sizeDifferential = void 0;
  var paddingModifier = void 0;

  switch (widthOrHeight) {
    case 'width':
      {
        paddingModifier = .00231;
        sizeDifferential = .34 - Math.round((baseWidth - currentSize) / 10) * paddingModifier;
        break;
      }

    case 'height':
      {
        paddingModifier = .00500009;
        sizeDifferential = .4 - Math.round((baseHeight - currentSize) / 10) * paddingModifier;
        break;
      }
  }

  return sizeDifferential;
}

exports.default = matrixSizeModifier;

/***/ })

})