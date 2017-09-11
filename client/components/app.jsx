import React, { Component } from 'react';
import Dragula from 'react-dragula';

export default class App extends Component {
  constructor() {
    super();
    this.selections =[];
    this.state = {
      selected: false
    };
    this.dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
          let options = {};
          Dragula([componentBackingInstance], options);
        }
      };
  }

  addSelection(columnName) {
    console.log(columnName)
    this.selections.push(columnName);
  }

  render() {
      if (this.state.selected == false) {
        return (
          <div className="main-wrapper">
            <div className="choice-page__wrapper">
              <h2>Which Columns Do You Want on the Report?</h2>
                <div className="choice-wrapper">
                  <div className="choice" onClick={(e) => {this.addSelection(e.target.innerHTML)}}>
                    <p>URL</p>
                  </div>
                  <div className="choice" onClick={(e) => {this.addSelection(e.target.innerHTML)}}>
                    <p>Date</p>
                  </div>
                  <div className="choice" onClick={(e) => {this.addSelection(e.target.innerHTML)}}>
                    <p>Total Reviews</p>
                  </div>
                  <div className="choice" onClick={(e) => {this.addSelection(e.target.innerHTML)}}>
                    <p>Review Average</p>
                  </div>
                  <div className="choice" onClick={(e) => {this.addSelection(e.target.innerHTML)}}>
                    <p>Number of 1 Star Reviews</p>
                  </div>
                  <div className="choice" onClick={(e) => {this.addSelection(e.target.innerHTML)}}>
                    <p>Number of 5 Star Reviews</p>
                  </div>
                </div>
              <input className="submit-choices" type="submit" onClick={() => {this.setState({ selected: true })}}/>
            </div>
          </div>
        )
      } else {
          const generateFills = () => {
            return this.selections.map((selection) => {
              return (
                 <div className="fill">
                  <p>{ selection.replace(/<\/?p>/g, '') }</p>
                 </div>
              );
            })
          }

          return (
            <div className="wrapper">
              <h2>What Order Would You Like Your Columns?</h2>
              <div id="left" ref={this.dragulaDecorator}>
                { generateFills() }
              </div>
              <input className=" submit-choices" type="submit" />
            </div>
          )
      }
    }
}
