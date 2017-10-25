import React, { Component } from 'react';
import Test from './test.jsx';
import ReactGridLayout from 'react-grid-layout';
// import Chart from '../chart.jsx';
// import { Resizable, ResizableBox } from 'react-resizable';
// import ResizableBox from 'react-resizable-component';

export default class JqRoot extends Component {
  render() {
    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minH: 2 },
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];

    return (
      <div >
        <ReactGridLayout
          className='layout'
          layout={layout}
          cols={8}
          rowHeight={30}
          width={800}
        >
          <div key={'a'}>a</div>
          <div key={'b'}>b</div>
          <div key={'c'}>c</div>
        </ReactGridLayout>
      </div>
    );
  }
}
