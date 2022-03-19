import * as React from "react";
import { Component } from "react";
import Config from "./Config";

interface EnterNameProps {
  socket: any;
}

interface EnterNameState {
  isEmpty: boolean;
  name: string;
  submitted: boolean;
}

class EnterName extends Component<EnterNameProps, EnterNameState> {
  constructor(props: EnterNameProps) {
    super(props);
    this.state = { isEmpty: true, name: "", submitted: false };
  }

  handleChange = (event: any) => {
    const { value } = event.target;
    if (value !== "") {
      this.setState({ isEmpty: false, name: value });
    } else {
      this.setState({ isEmpty: true, name: value });
    }
  };

  handleKeyPress = (event: any) => {
    const { value } = event.target;
    if (event.key === "Enter" && value !== "") {
      console.log("enter press here!");
      this.setState({
        submitted: true,
      });
    }
  };

  handleSubmit = (event: any) => {
    this.setState({
      submitted: true,
    });
    event.preventDefault();
  };

  render() {
    if (!this.state.submitted) {
      let myStyles: React.CSSProperties = {};
      if (!this.state.isEmpty) {
        myStyles = { visibility: "visible" };
      } else {
        myStyles = { visibility: "hidden" };
      }
      let submitButton = (
        <div style={myStyles}>
          <button className="btn btn__primary" onClick={this.handleSubmit}><p>OK</p></button>

        </div>
      )

      return (
        <>
          <div className="homeclick">
            <a href="/" style={{ color: "#000000", textDecoration: 'none' }} title="home">
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon s-ion-icon" viewBox="0 0 512 512">
                <path
                  d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z">
                </path>
                <path
                  d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z">
                </path>
              </svg>
            </a>
          </div>
          <div className="enter-name-container">
            <div className="enter-name">
              <p className="enter-name-question">Hi. What's your name?</p>
              <input
                id="enter-name"
                type="text"
                value={this.state.name}
                placeholder="Type your answer here..."
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                spellCheck="false"
                autoFocus
                maxLength={10}
              />
              <br />
              <br />
              <br />
              {submitButton}
            </div>
          </div>
        </>
      );
    } else {
      return <Config socket={this.props.socket} name={this.state.name} />;
    }
  }
}

export default EnterName;
