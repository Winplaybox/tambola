import * as React from "react";
import { Component } from "react";

interface NextNumberProps {
  callOut: (newNumber: number) => void;
}

interface NextNumberState {
  sentinel: boolean;
}

class NextNumber extends Component<NextNumberProps, NextNumberState> {
  constructor(props: NextNumberProps) {
    super(props);
  }

  componentDidMount() { }

  componentWillMount() { }

  render() {
    this.props.callOut(47);
    return (
      <>
        <div className="btn btn__primary">
          <button onClick={() => this.setState({ sentinel: false })}>
            Ready
          </button>
        </div>
        <p>Next Number:</p>
        <p>47</p>
      </>
    );
  }
}

export default NextNumber;
