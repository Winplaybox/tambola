import * as React from "react";
import { Component } from "react";
import "../css/Snackbar.css";

interface ToastProps {
  message: string; // "Click to copy the join link to your game"
  isShown: boolean;
  initiallyHidden: boolean;
  handleClose: () => void;
}

interface ToastState { }

class Toast extends Component<ToastProps, ToastState> {
  constructor(props: ToastProps) {
    super(props);
    this.state = { isShown: this.props.isShown };
  }

  render() {
    let animation,
      displayStyle = "flex";
    if (this.props.isShown === false) {
      animation = "animated bounceOutRight";
    } else {
      animation = "animated bounceInRight";
    }
    if (this.props.initiallyHidden) displayStyle = "none";
    return (
      <div className={animation}>
        <div className="snackbar" style={{ display: displayStyle }}>
          <p className="snackbar-text">{this.props.message}</p>
          <button
            className="btn"
            onClick={() => {
              this.props.handleClose();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon s-ion-icon" viewBox="0 0 512 512"><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path></svg>
          </button>
        </div>
      </div>
    );
  }
}

export default Toast;
