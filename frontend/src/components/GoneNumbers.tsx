import * as React from "react";
import { Component } from "react";

interface GoneNumbersProps {
  numbers: Array<number>;
}

interface GoneNumbersState { }

class GoneNumbers extends Component<GoneNumbersProps, GoneNumbersState> {
  constructor(props: GoneNumbersProps) {
    super(props);
    this.state = {
      isShown: false,
    };
  }

  render() {
    let mainComp = [];
    for (let i = this.props.numbers.length - 1; i >= 0; --i) {
      mainComp.push(<p key={i}>{this.props.numbers[i]}</p>);
    }

    return (
      <>
        {
          mainComp.length > 0 ?
            <div className="gone-numbers-container">
              <button
                className={`btn ${mainComp.length > 0 ? 'fillmaincomp' : 'emptymaincomp'}`}
                id="gone-numbers-button"
                onClick={() => {
                  let goneNumbers = document.getElementById("gone-numbers-menu");
                  let button = document.getElementById("gone-numbers-button");
                  if (goneNumbers !== null && button !== null) {
                    if (
                      window
                        .getComputedStyle(goneNumbers)
                        .getPropertyValue("display") !== "none"
                    ) {
                      goneNumbers.style.display = "none";
                      button.innerHTML = "Gone Numbers";
                    } else {
                      goneNumbers.style.display = "block";
                      goneNumbers.classList.add("animated", "fadeIn");
                      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" className="ionicon s-ion-icon" viewBox="0 0 512 512"><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path></svg>`;
                    }
                  }
                }}
              >
                Gone Numbers
              </button>
              <div id="gone-numbers-menu">{mainComp}</div>
            </div> : null
        }

      </>
    );
  }
}

export default GoneNumbers;
