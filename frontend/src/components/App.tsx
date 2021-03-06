import React from "react";
import { Component } from "react";
import "../css/App.css";
import io from "socket.io-client";
import EnterName from "./EnterName";

interface AppState {
  socket: any;
}

interface AppProps { }
declare global {
  interface Window {
    FB: any;
  }
}
let FB = window.FB;
class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      socket: io(),
    };

    console.log(this.state.socket)
  }
  loopfun = (val: number) => {
    const array = [];
    for (let i = 0; i < val; i++) {
      array.push(<li></li>)
    }
    return array;
  }

  componentDidMount() {
    window.addEventListener('contextmenu', function (window) { window.preventDefault(); });
    window.addEventListener('dragover', function (e) { e.preventDefault(); }, false);

    if (window && window.parent) {
      window.parent.postMessage({
        message: JSON.stringify({
          isPortrait: true
        })
      }, '*');
    } else {
      console.log('Your browser doesn\'t support web workers.');
    }
  }

  render() {
    return (
      <>
        <div className="area" >
          <ul className="circles">
            {this.loopfun(10)}
          </ul>
        </div>
        <div className="App">
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
          <EnterName socket={this.state.socket} />
        </div>
      </>
    );
  }
}

export default App;
