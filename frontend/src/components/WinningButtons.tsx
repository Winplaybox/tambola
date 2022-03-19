import _ from "lodash";
import * as React from "react";
import { Component } from "react";
import { Award } from "./Config";
import settings from './utils/settings';

interface WinningButtonsProps {
  awards: Award[];
  winCallBack: (callWinType: string) => void;
}

interface WinningButtonsState { }

class WinningButtons extends Component<
  WinningButtonsProps,
  WinningButtonsState
> {
  awardButtons: JSX.Element[];
  constructor(props: WinningButtonsProps) {
    super(props);
    this.awardButtons = [];
    for (let i = 0; i < this.props.awards.length; ++i) {
      this.awardButtons.push(
        <li key={i}
          className={'item'}
          onClick={() => {
            this.props.winCallBack(this.props.awards[i].nameAward);
          }}
        >
          <a href="#" className="link">
            <span className="icon-img">
              <img src={require(`../images/rules/rule-${this.props.awards[i].keyAward}.svg`)} />
            </span>
            <div className="content">
              <div className="text"><span className="text-uppercase">{this.props.awards[i].nameAward}</span> - {this.props.awards[i].ptsAward} pts</div>
              {/* {
                rule.participantDetails &&
                <div className="claimed-info">
                  <div className="claim-user">{rule.participantDetails.name}</div>
                </div>
              } */}
            </div>
          </a>
        </li>
        // <button
        //   className="btn btn__primary"
        //   key={i}
        //   onClick={() => {
        //     this.props.winCallBack(this.props.awards[i].nameAward);
        //   }}
        // >
        //   {this.props.awards[i].nameAward}
        // </button>
      );
    }
  }


  render() {
    return <div className={"winning-buttons"}>
      <ul className="popup-list grid">
        {this.awardButtons}
      </ul>
    </div>;
  }
}

export default WinningButtons;
