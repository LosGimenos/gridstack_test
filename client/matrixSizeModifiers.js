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

  calculateIncrements(.38, 'height');
}

if (windowHeight < 750) {
  console.log('750 it!')

  calculateIncrements(.34, 'height');
}

if (windowHeight < 700) {
  console.log('700 it!')

  calculateIncrements(.33, 'height');
}

if (windowHeight < 650) {
  console.log('650 it!')

  calculateIncrements(.3, 'height');
}

if (windowHeight <= 625) {
  console.log('625 it!')

  calculateIncrements(.29, 'height');
}

if (windowHeight <= 600) {
  console.log('600 it!')

  calculateIncrements(.28, 'height');
}

if (windowHeight <= 575) {
  console.log('575 it!')

  calculateIncrements(.27, 'height');
}

calculateIncrements(calcSizeDifference(windowWidth, 'width'), 'width')

// Calc the size differential based on the percentage difference.

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

//tests values against established percent difference

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

//calc base size differential from current size against max size

function calcSizeDifference(currentSize, widthOrHeight) {
  const baseWidth = 1440;
  const baseHeight = 803;
  let sizeDifferential;

  switch (widthOrHeight) {
    case 'width':
    sizeDifferential = .34 - Math.round((baseWidth - currentSize) / 10) * .00231;
    console.log(sizeDifferential)
    break;
  }

  return sizeDifferential;
}

export default matrixSizeModifier;
