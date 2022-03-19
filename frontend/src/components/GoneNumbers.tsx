import * as React from "react";
import { Component } from "react";

interface GoneNumbersProps {
  numbers: Array<number>;
  sameNumberinCurrent: number;
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
    let numberslist = this.props.numbers
    let newarry = numberslist.filter((el) => el !== this.props.sameNumberinCurrent);

    for (let i = newarry.length - 1; i >= 0; --i) {
      mainComp.push(<p key={i}>{newarry[i]}</p>);
    }

    console.log('this.props.numbers', numberslist, newarry)

    return (
      <>
        {
          mainComp.length > 0 ?
            <div className="gone-numbers-container">
              <div id="gone-numbers-menu">{mainComp}</div>
            </div> : null
        }

      </>
    );
  }
}

export default GoneNumbers;
