window.onresize = () => {location.reload()};

let matrixSizeModifier;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

console.log(windowHeight, windowWidth)

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
}

if (windowHeight < 800) {
  console.log('800 it!')
  // matrixSizeModifier['rows'] = {
  //   1: .38,
  //   2: .8,
  //   3: 1.23,
  //   4: 1.66,
  //   5: 2.1,
  //   6: 2.55
  // }
  calculateIncrements(.38, 'height');
}

if (windowHeight < 750) {
  console.log('750 it!')
  // matrixSizeModifier['rows'] = {
  //   1: .34,
  //   2: .73,
  //   3: 1.13,
  //   4: 1.52,
  //   5: 1.93,
  //   6: 2.33
  // }
  calculateIncrements(.34, 'height');
}

if (windowHeight < 700) {
  console.log('700 it!')
  // matrixSizeModifier['rows'] = {
  //   1: .33,
  //   2: .69,
  //   3: 1.08,
  //   4: 1.45,
  //   5: 1.84,
  //   6: 2.21
  // }
  calculateIncrements(.33, 'height');
}

if (windowHeight < 650) {
  console.log('650 it!')

  // matrixSizeModifier['rows'] = {
  //   1: .28,
  //   2: .62,
  //   3: .95,
  //   4: 1.29,
  //   5: 1.64,
  //   6: 1.98
  // }
  calculateIncrements(.3, 'height');
}

if (windowHeight <= 625) {
  console.log('625 it!')

  // matrixSizeModifier['rows'] = {
  //   1: .29,
  //   2: .63,
  //   3: .97,
  //   4: 1.32,
  //   5: 1.67,
  //   6: 2.04
  // }
  calculateIncrements(.29, 'height');
}

if (windowHeight <= 600) {
  console.log('600 it!')

  // matrixSizeModifier['rows'] = {
  //   1: .28,
  //   2: .62,
  //   3: .95,
  //   4: 1.28,
  //   5: 1.62,
  //   6: 1.96
  // }
  calculateIncrements(.28, 'height');
}

if (windowHeight <= 575) {
  console.log('575 it!')

  // matrixSizeModifier['rows'] = {
  //   1: .28,
  //   2: .6,
  //   3: .91,
  //   4: 1.22,
  //   5: 1.56,
  //   6: 1.88
  // }
  calculateIncrements(.27, 'height');
}

if (windowWidth < 1440) {
  console.log('Width less than 1430')

  // matrixSizeModifier['columns'] = {
  //   1: .33,
  //   2: .73,
  //   3: 1.12,
  //   4: 1.52,
  //   5: 1.92,
  //   6: 2.3,
  //   7: 2.7,
  //   8: 3.1
  // }
  calculateIncrements(.34, 'width');
}

if (windowWidth < 1425) {
  console.log('Width less than 1425')

  // matrixSizeModifier['columns'] = {
  //   1: .33,
  //   2: .73,
  //   3: 1.12,
  //   4: 1.52,
  //   5: 1.92,
  //   6: 2.3,
  //   7: 2.7,
  //   8: 3.1
  // }
  calculateIncrements(.338, 'width');
}

if (windowWidth < 1400) {
  console.log('Width less than 1400')

  // matrixSizeModifier['columns'] = {
  //   1: .33,
  //   2: .73,
  //   3: 1.12,
  //   4: 1.52,
  //   5: 1.92,
  //   6: 2.3,
  //   7: 2.7,
  //   8: 3.1
  // }
  calculateIncrements(.33, 'width');
}

if (windowWidth < 1350) {
  console.log('Width less than 1350')

  // matrixSizeModifier['columns'] = {
  //   1: .32,
  //   2: .71,
  //   3: 1.09,
  //   4: 1.46,
  //   5: 1.85,
  //   6: 2.25,
  //   7: 2.59,
  //   8: 2.97
  // }
  calculateIncrements(.32, 'width');
}

if (windowWidth < 1300) {
  console.log('Width less than 1300')

  // matrixSizeModifier['columns'] = {
  //   1: .32,
  //   2: .71,
  //   3: 1.09,
  //   4: 1.46,
  //   5: 1.85,
  //   6: 2.25,
  //   7: 2.59,
  //   8: 2.97
  // }
  calculateIncrements(.31, 'width');
}

if (windowWidth < 1275) {
  console.log('Width less than 1275')

  // matrixSizeModifier['columns'] = {
  //   1: .3,
  //   2: .67,
  //   3: 1.04,
  //   4: 1.4,
  //   5: 1.75,
  //   6: 2.1,
  //   7: 2.5,
  //   8: 2.85
  // }
  calculateIncrements(.3, 'width');
}

if (windowWidth < 1235) {
  console.log('Width less than 1235')

  // matrixSizeModifier['columns'] = {
  //   1: .27,
  //   2: .62,
  //   3: .95,
  //   4: 1.3,
  //   5: 1.62,
  //   6: 1.98,
  //   7: 2.3,
  //   8: 2.65
  // }
  calculateIncrements(.27, 'width');
}

if (windowWidth < 1125) {
  console.log('Width less than 1125')

  // matrixSizeModifier['columns'] = {
  //   1: .26,
  //   2: .62,
  //   3: .95,
  //   4: 1.22,
  //   5: 1.55,
  //   6: 1.85,
  //   7: 2.19,
  //   8: 2.5
  // }
  calculateIncrements(.26, 'width');
}

if (windowWidth < 1055) {
  console.log('Width less than 1055')

  // matrixSizeModifier['columns'] = {
  //   1: .24,
  //   2: .55,
  //   3: .84,
  //   4: 1.15,
  //   5: 1.45,
  //   6: 1.74,
  //   7: 2.05,
  //   8: 2.35
  // }
  calculateIncrements(.24, 'width');
}

if (windowWidth <= 1025) {
  console.log('Width less than 1025')

  // matrixSizeModifier['columns'] = {
  //   1: .24,
  //   2: .54,
  //   3: .84,
  //   4: 1.12,
  //   5: 1.42,
  //   6: 1.71,
  //   7: 2.01,
  //   8: 2.31
  // }
  calculateIncrements(.34, 'width');
}

if (windowWidth <= 1010) {
  console.log('Width less than 1000')

  // matrixSizeModifier['columns'] = {
  //   1: .22,
  //   2: .51,
  //   3: .8,
  //   4: 1.08,
  //   5: 1.36,
  //   6: 1.65,
  //   7: 1.93,
  //   8: 2.22
  // }
  calculateIncrements(.23, 'width');
}

function calculateIncrements(baseModifier, widthOrHeight) {
  let rowTwo;
  let rowThree;
  let rowFour;
  let rowFive;
  let rowSix;
  let rowSeven;
  let rowEight;

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
      }
      break;

    case 'height':
      rowTwo = getValForPercentDifference(baseModifier, 75);
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
      }
      break;
  }
}

function getValForPercentDifference(val1, percent) {
  let value = val1;
  let val2;
  let finalPercent;
  let counter = 0;

  while (Math.floor(finalPercent) != percent && counter < 500) {
    val2 = value + .001;
    finalPercent = (Math.abs(val2 - val1)/((val1 + val2)/2)) * 100;

    value = val2;
    counter += 1;
  }

  return val2
}

export default matrixSizeModifier;
