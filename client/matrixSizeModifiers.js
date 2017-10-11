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
    1: .45,
    2: .83,
    3: 1.27,
    4: 1.7,
    5: 2.15,
    6: 2.6
  }
}

if (windowHeight < 800) {
  console.log('800 it!')
  matrixSizeModifier['rows'] = {
    1: .45,
    2: .81,
    3: 1.2,
    4: 1.65,
    5: 2.1,
    6: 2.5
  }
}

if (windowHeight < 685) {
  console.log('675 it!')
  matrixSizeModifier['rows'] = {
    1: .45,
    2: .69,
    3: 1.05,
    4: 1.4,
    5: 1.78,
    6: 2.15
  }
}

if (windowHeight < 650) {
  console.log('650 it!')

  matrixSizeModifier['rows'] = {
    1: .45,
    2: .62,
    3: .95,
    4: 1.29,
    5: 1.64,
    6: 1.98
  }
}

if (windowWidth < 1400) {
  console.log('Width less than 1400')

  matrixSizeModifier['columns'] = {
    1: .45,
    2: .62,
    3: .95,
    4: 1.52,
    5: 1.92,
    6: 2.3,
    7: 2.7,
    8: 3.1
  }
}

console.log('checking to get to width')

if (windowWidth < 1345) {
  console.log('Width less than 1345')

  matrixSizeModifier['columns'] = {
    1: .45,
    2: .62,
    3: .95,
    4: 1.46,
    5: 1.85,
    6: 2.25,
    7: 2.59,
    8: 2.97
  }
}

if (windowWidth < 1275) {
  console.log('Width less than 1275')

  matrixSizeModifier['columns'] = {
    1: .45,
    2: .62,
    3: .95,
    4: 1.4,
    5: 1.75,
    6: 2.1,
    7: 2.5,
    8: 2.85
  }
}

if (windowWidth < 1235) {
  console.log('Width less than 1235')

  matrixSizeModifier['columns'] = {
    1: .45,
    2: .62,
    3: .95,
    4: 1.3,
    5: 1.65,
    6: 2,
    7: 2.34,
    8: 2.68
  }
}

if (windowWidth < 1125) {
  console.log('Width less than 1125')

  matrixSizeModifier['columns'] = {
    1: .45,
    2: .62,
    3: .95,
    4: 1.22,
    5: 1.55,
    6: 1.85,
    7: 2.19,
    8: 2.5
  }
}

if (windowWidth < 1055) {
  console.log('Width less than 1055')

  matrixSizeModifier['columns'] = {
    1: .45,
    2: .62,
    3: .95,
    4: 1.15,
    5: 1.45,
    6: 1.74,
    7: 2.05,
    8: 2.35
  }
}

if (windowWidth < 1000) {
  console.log('Width less than 1000')

  matrixSizeModifier['columns'] = {
    1: .45,
    2: .62,
    3: .95,
    4: 1.08,
    5: 1.36,
    6: 1.65,
    7: 1.93,
    8: 2.2
  }
}





export default matrixSizeModifier;
