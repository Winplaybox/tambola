import * as React from "react";
import { Component } from "react";
import GoneNumbers from "./GoneNumbers";

interface NewNumberProps {
  socket: any;
  name: string;
}

interface NewNumberState {
  newNumber: number;
}

export interface newNumberObj_t {
  newNumber: number;
}

declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}
class NewNumber extends Component<NewNumberProps, NewNumberState> {
  goneNumbers: Array<number>;
  constructor(props: NewNumberProps) {
    super(props);
    this.state = { newNumber: 0 };
    this.goneNumbers = [];
  }

  componentDidMount() {
    this.props.socket.on(
      "newNumberFromHost",
      (newNumberObj: newNumberObj_t) => {
        this.goneNumbers.push(newNumberObj.newNumber);
        this.setState({ newNumber: newNumberObj.newNumber });
      }
    );
    
    window.ReactNativeWebView.postMessage((
      JSON.stringify({
        isPortrait:false
      })
    ));

  }

  // For generating random key for every render so that dom is manipulated every
  // single time for new render to display the animation
  generateRandomKey = () => {
    return Math.random() * 10000;
  };

  render() {
    let newNumberComponent = (
      <>
        <div className="homeclick">
          <a href="/" style={{ color: "#000000", textDecoration: 'none' }} title="exit">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10.79 16.29c.39.39 1.02.39 1.41 0l3.59-3.59c.39-.39.39-1.02 0-1.41L12.2 7.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L12.67 11H4c-.55 0-1 .45-1 1s.45 1 1 1h8.67l-1.88 1.88c-.39.39-.38 1.03 0 1.41zM19 3H5c-1.11 0-2 .9-2 2v3c0 .55.45 1 1 1s1-.45 1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v3c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" /></svg>
          </a>
        </div>
        <span className="usernamehead">Hi, {this.props.name}</span>
        <p className="new-number-player">New Number </p>
        <div className="wrapgennumber">
          <div
            key={this.generateRandomKey()}
            className="new-number-player-container custom-pulse"
          >
            <p className="only-new-number-player">
              {this.state.newNumber ? this.state.newNumber : ""}
            </p>
          </div>
          <span className="circle__back-1"></span>
          <span className="circle__back-2"></span>
        </div>
        <GoneNumbers numbers={this.goneNumbers} />
      </>
    );
    return newNumberComponent;
  }
}

export default NewNumber;
