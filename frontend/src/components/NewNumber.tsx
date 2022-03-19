import * as React from "react";
import { Component } from "react";
import _ from 'lodash';
import GoneNumbers from "./GoneNumbers";
import { Award, CurrentUser } from "./Config";
import settings from './utils/settings';

interface NewNumberProps {
  socket: any;
  name: string;
  players: any;
  currentUser: CurrentUser[];
  handleClaim: any;
  awards: Award[]
}

interface NewNumberState {
  newNumber: number;
  selectedSpeaker: any;
  audio: any;
  play: boolean;
}

export interface newNumberObj_t {
  newNumber: number;
}

class NewNumber extends Component<NewNumberProps, NewNumberState> {
  goneNumbers: Array<number>;
  constructor(props: NewNumberProps) {
    super(props);
    this.state = { newNumber: 0, selectedSpeaker: _.first(settings.availableSpeakersList), audio: '', play: false };
    this.goneNumbers = [];
  }

  componentDidMount() {
    const { audio } = this.state;
    this.props.socket.on(
      "newNumberFromHost",
      (newNumberObj: newNumberObj_t) => {
        this.goneNumbers.push(newNumberObj.newNumber);
        this.setState({ newNumber: newNumberObj.newNumber });
        this.speakNumber(newNumberObj.newNumber);

        console.log(`${newNumberObj.newNumber}.mp3`);
      }
    );
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        isPortrait: false
      }));
    }
    //ads footer
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        footerAds: false,
      }));
    }
    if(window.innerHeight > window.innerWidth){
      alert('Please rotate/view in landscape')
      }
    console.log("players List: ", this.props.players, this.state.selectedSpeaker, this.state.selectedSpeaker['path'])
  }

  onEndCallback = () => {
    console.log("The audio has ended.")
  }

  speakNumber = (num: number) => {
    let audio = new Audio(settings.audio(this.state.selectedSpeaker['path'], num));
    audio.onended = this.onEndCallback;

    let playedPromise = audio.play();
    console.log('playedPromise: ', playedPromise)
    if (playedPromise !== undefined) {
      playedPromise.then(function () {
        // Automatic playback started!
        console.log('started audio')
      }).catch(function (error) {
        console.log('audio', error)
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
      });
    }

    return audio;
  }

  // For generating random key for every render so that dom is manipulated every
  // single time for new render to display the animation
  generateRandomKey = () => {
    return Math.random() * 10000;
  };
  playersComp = () => {
    console.log('currentUser Array: ', this.props.currentUser, this.props.awards)
    let arryplayersComp = [];
    for (let i = 0; i < this.props.players.length; ++i) {
      arryplayersComp.push(
        <div key={i} className={`userlist${this.props.name === this.props.players[i].user.username ? ' me' : ''}`}>
          <div className="img-box" >
            <img src={`${this.props.players[i].avatars}`} />
          </div>
          <div className="text-box">
            <small>{this.props.name === this.props.players[i].user.username ? 'You' : this.props.players[i].user.username}</small>
            <span className="score-box">{this.props.players[i].pointsEarned}</span>
          </div>
        </div>
      );
    }
    return arryplayersComp;
  }

  awardsCount = () => {
    let array = this.props.awards
    let newarry = array.filter(function (el) {
      return el.numAward !== '0';
    });
    return newarry.length;
  }

  render() {

    let newNumberComponent = (
      <>
        <section className="connected-participants">
          <div className="homeclick">
            <a href="/" style={{ color: "#000000", textDecoration: 'none' }} title="exit">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10.79 16.29c.39.39 1.02.39 1.41 0l3.59-3.59c.39-.39.39-1.02 0-1.41L12.2 7.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L12.67 11H4c-.55 0-1 .45-1 1s.45 1 1 1h8.67l-1.88 1.88c-.39.39-.38 1.03 0 1.41zM19 3H5c-1.11 0-2 .9-2 2v3c0 .55.45 1 1 1s1-.45 1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v3c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" /></svg>
            </a>
          </div>
          <div className="playerlist-rewards">
            <div className="ready-players">
              {this.playersComp()}
            </div>
          </div>
          <div className="claim-btn-holder">
            <button className="btn btn_primary" onClick={() => this.props.handleClaim(true)}>
              <i className="fa fa-trophy"></i>
              <span className="text">Claim</span>
            </button>
            <div className="claims-left">{this.awardsCount()}</div>
          </div>
        </section>
        {
          this.state.newNumber ?
            <div className="rowofGonenumber">
              <div
                key={this.generateRandomKey()}
                className="new-number-wrap"
              >
                <p className="only-new-number-player">
                  {this.state.newNumber ? this.state.newNumber : ""}
                </p>
              </div>
              <GoneNumbers numbers={this.goneNumbers} sameNumberinCurrent={this.state.newNumber} />
            </div> : null
        }

      </>
    );
    return newNumberComponent;
  }
}

export default NewNumber;
