import { url } from "inspector";
import * as React from "react";
import { PcStatus,CurrentUser } from "./Config";

interface ReadyPlayersProps {
  players: PcStatus[];
  name: string;
  currentUser:CurrentUser[]
}

function ReadyPlayers(props: ReadyPlayersProps) {
  let checkMark = <span className="checkmark"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" /></svg></span>;
  let playersComp = [];
  let waitingMessage = null;

  console.log('props.players: ', props.players,props.currentUser)

  for (let i = 0; i < props.players.length; ++i) {
    playersComp.push(
      <li key={i} className={`user${props.name === props.players[i].user.username ? ' me' : ''}`}>
        <div className="wrapperusername">
          <div className="user-avatar">
            <img src={`${props.players[i].avatars}`} />
          </div>
          <span className="user-name">{props.players[i].user.username}</span>
        </div>
        <span className="user-name-ready">{props.players[i].ready ? checkMark : <svg xmlns="http://www.w3.org/2000/svg" className="ionicon s-ion-icon" viewBox="0 0 512 512"><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path></svg>}</span>
      </li>
    );
  }

  if (playersComp.length === 0) {
    waitingMessage = (
      <p style={{ color: "#000000", marginLeft: "0.75rem" }}>
        Waiting for other players to join...
      </p>
    );
  } else {
    waitingMessage = null;
  }

  return (
    <div className="ready-players-container">
      <h1 className="players-in-game"><i className="fa fa-spin fa-refresh mr--10"></i>participants ({props.players.length})</h1>
      <ul className="ready-players">
        {playersComp}
      </ul>
      {waitingMessage}
    </div>
  );
}

export default ReadyPlayers;
