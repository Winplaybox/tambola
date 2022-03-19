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
    ReactNativeWebView: any;
  }
}
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
    // window.addEventListener('contextmenu', function (window) { window.preventDefault(); });
    // window.addEventListener('dragover', function (e) { e.preventDefault(); }, false);

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        isPortrait: true
      }));
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
          <EnterName socket={this.state.socket} />
        </div>
      </>
    );
  }
}

export default App;
