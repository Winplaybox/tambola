import * as React from "react";
import { Component } from "react";
import ConfigTable from "./ConfigTable";
import Player from "./Player";
import ReadyPlayers from "./ReadyPlayers";
import Snackbar from "./Snackbar";
import Walkthrough from "./Walkthrough";
import Modal from "react-modal";
import Toast from "./Toast";
import settings from "./utils/settings";

export interface Award {
  // Actual type information:
  // {
  //    nameAward: string;
  //    numAward: string;
  // }
  [index: string]: string;
}

export interface PcStatus {
  user: User;
  ready: boolean;
  pointsEarned: number;
  numTickets: number;
  avatars: string;
}

export interface User {
  username: string;
  id: string;
  room: string;
}

export interface CurrentUser {
  username: string;
  id: string;
  avatars: string;
}

interface ConfigProps {
  socket: any;
  name: string;
}

interface ConfigState {
  type: string;

  // Config
  readyHost: boolean;
  readyClient: boolean;

  //  Host Config State options
  awards: Award[];

  //  PC Config State options
  numHouses: number;

  // List of players who are ready to play
  PcsStatus: PcStatus[];
  currentUser: CurrentUser[]

  // notification for host disconnected
  hostDisconnected: boolean;

  // For warning modal which opens when host hits start game if some player is not ready
  isModalOpen: boolean;

  // When host tries to start game when there is no one in the game room
  isToastOpen: boolean;

  // when arrive on host screen, ask the user if they want to see tutorial or not
  watchTutorialModal: boolean

  // passed to child components to let them know if user selected to watch the tutorial or not
  runWalkthrough: boolean
  //
  hasGameAlreadyStarted: boolean;
}


// Extracting roomID from the URL
let roomID = window.location.pathname.substr(
  window.location.pathname.lastIndexOf("/") + 1
);
class Config extends Component<ConfigProps, ConfigState> {
  // For the toast component to hide initially and not add animation on initial render
  hideToastInitially: boolean;
  constructor(props: ConfigProps) {
    super(props);
    this.state = {
      type: "",
      numHouses: 1,
      readyHost: false,
      readyClient: false,
      PcsStatus: [],
      currentUser: [],
      isModalOpen: false,
      isToastOpen: false,
      watchTutorialModal: true,
      runWalkthrough: false,
      hasGameAlreadyStarted: false,
      awards: [
        {
          nameAward: settings.awards.house.name,
          numAward: settings.awards.house.count,
          ptsAward: settings.awards.house.pts
        },
        {
          nameAward: settings.awards.star.name,
          numAward: settings.awards.star.count,
          ptsAward: settings.awards.star.pts
        },
        {
          nameAward: settings.awards.corner.name,
          numAward: settings.awards.corner.count,
          ptsAward: settings.awards.corner.pts
        },
        {
          nameAward: settings.awards.lastline.name,
          numAward: settings.awards.lastline.count,
          ptsAward: settings.awards.lastline.pts
        },
        {
          nameAward: settings.awards.middleline.name,
          numAward: settings.awards.middleline.count,
          ptsAward: settings.awards.middleline.pts
        },
        {
          nameAward: settings.awards.firstline.name,
          numAward: settings.awards.firstline.count,
          ptsAward: settings.awards.firstline.pts
        },
        {
          nameAward: settings.awards.earlyseven.name,
          numAward: settings.awards.earlyseven.count,
          ptsAward: settings.awards.earlyseven.pts
        },
        {
          nameAward: settings.awards.earlyfive.name,
          numAward: settings.awards.earlyfive.count,
          ptsAward: settings.awards.earlyfive.pts
        }
      ],
      hostDisconnected: false,
    };
    this.hideToastInitially = true;
  }

  // Only handles on host's config when he presses start game button.
  handlleHostConfigDone = () => {
    if (this.state.isModalOpen) {
      this.setState({ isModalOpen: false });
    }
    this.props.socket.emit("HostConfigDone", this.state.awards);
    console.log("config submitted from host", this.state.awards);
  };

  componentDidMount() {


    // asking server to join room
    this.props.socket.emit("joinRoom", {
      room: roomID,
      username: this.props.name,
    });

    // check if the game has already started or not
    this.props.socket.on("gameHasAlreadyStarted", () => {
      this.setState({ hasGameAlreadyStarted: true });
    });

    // server response: player gets know if he is host or pc
    this.props.socket.on("userConnected", (playerTypeObj: any, user: User) => {
      // let currentUsern = this.state.currentUser;
      // let newcurrentUsern: CurrentUser = {
      //   username: user.username,
      //   id: user.id,
      //   avatars: settings.botts(user.username)
      // };
      // currentUsern.push(newcurrentUsern);
      this.setState({
        type: playerTypeObj.type, // pass this type to player as well
        // currentUser: currentUsern
      });
      console.log('user: ', user)

      // Receiving event on Host from new PC who has joined and sending them
      // the list of readyPlayers
      if (playerTypeObj.type === "Host") {
        this.props.socket.on("notifyHostConnection", (user: User) => {
          let PcsStatus = this.state.PcsStatus;
          let newPcStatus: PcStatus = {
            user: user,
            ready: false,
            numTickets: 0,
            pointsEarned: 0,
            avatars: settings.botts(user.username)
          };
          PcsStatus.push(newPcStatus);



          this.setState({ PcsStatus: PcsStatus });
          this.props.socket.emit("PcsStatus", user, PcsStatus);
        });

        this.props.socket.on("PcReady", (user: User, numTickets: number) => {
          // Find user in array and make him ready
          let PcsStatus = this.state.PcsStatus;
          for (let i = 0; i < PcsStatus.length; ++i) {
            if (PcsStatus[i].user.id === user.id) {
              PcsStatus[i].ready = true;
              PcsStatus[i].numTickets = numTickets;
            }
          }
          this.setState({ PcsStatus: PcsStatus });
          this.props.socket.emit("PcsStatus", user, PcsStatus);
        });

        this.props.socket.on("userDisconnect", (user: User) => {
          // dealing with ready/not ready
          let PcsStatus = this.state.PcsStatus;
          for (let i = 0; i < PcsStatus.length; ++i) {
            if (PcsStatus[i].user.id === user.id) {
              // Remove this user from PcsStatus
              PcsStatus.splice(i, 1);
            }
          }
          this.setState({ PcsStatus: PcsStatus });
          this.props.socket.emit("PcsStatus", user, PcsStatus);
        });
      }
    });

    // server sending awards from Host as Host is ready
    this.props.socket.on("HostConfigDone", (awards: any, user: User) => {
      this.setState({
        awards: awards,
        readyHost: true
      });
    });

    // Know the status of all the players if someone new joined or got ready
    this.props.socket.on("PcsStatus", (PcsStatus: PcStatus[]) => {

      console.log('PcsStatus', PcsStatus)
      this.setState({ PcsStatus: PcsStatus });
    });

    // Host disconnect
    this.props.socket.on("HostDisconnected", (userHost: User) => {
      console.log(userHost, ": host disconnected");
      this.setState({
        hostDisconnected: true,
      });
    });
  }

  // For Host Config
  handleChangeHost = (idx: number) => (e: any) => {
    const eTarget = e.target;
    let name: string = eTarget.name;
    let value: string = eTarget.value;

    const awards = this.state.awards;

    awards[idx][name] = value;

    this.setState({
      awards,
    });
  };
  handleAddRow = () => {
    const item = {
      nameAward: "",
      numAward: "",
      ptsAward: "",
    };
    this.setState({
      awards: [...this.state.awards, item],
    });
  };
  handleRemoveRow = () => {
    this.setState({
      awards: this.state.awards.slice(0, -1),
    });
  };
  handleRemoveSpecificRow = (idx: number) => () => {
    const awards = [...this.state.awards];
    awards.splice(idx, 1);
    this.setState({ awards });
  };

  // For PC Config
  handleChangePC = (event: any) => {
    const { value } = event.target;
    if (this.state.type === "PC") {
      // sanity check
      this.setState({
        numHouses: value,
      });
    }
  };

  // common function for Host and PC Config
  handleSubmit = (event: any) => {
    this.setState({
      readyClient: true,
    });
    if (this.state.type === "Host") {
      // start the game only when there are actual players in the game
      if (this.state.PcsStatus.length > 0) {
        // checking if all the players are ready
        let isEveryOneReady = true;
        for (let i = 0; i < this.state.PcsStatus.length; ++i) {
          if (!this.state.PcsStatus[i].ready) {
            isEveryOneReady = false;
            continue;
          }
        }
        if (isEveryOneReady) {
          this.handlleHostConfigDone();
        } else {
          this.setState({ isModalOpen: true });
        }
      } else {
        // To make the toast visible
        this.hideToastInitially = false;
        this.setState({ isToastOpen: true });
      }
    } else if (this.state.type === "PC") {
      //let everyone know that i am ready. Backend knows who I am by socket.id
      this.props.socket.emit("PcReady", this.state.numHouses);
    }
    event.preventDefault();
  };

  loopfun = (val: number) => {
    const array = [];
    for (let i = 0; i < val; i++) {
      array.push(<li></li>)
    }
    return array;
  }

  // copyLinkToClipboard = () => {
  //   let copyInput = document.createElement('input');
  //   copyInput.setAttribute('value', settings.shartext(roomID));
  //   document.body.appendChild(copyInput);
  //   copyInput.select();
  //   let copyResult = document.execCommand('copy');
  //   document.body.removeChild(copyInput);
  //   return copyResult;
  // }

  // shareInviteLink = () => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: 'Share Invite Code',
  //       text: settings.shartext(roomID)
  //     }).then(() => {
  //       console.log('Thanks for sharing!');
  //     })
  //   } else {
  //     console.log('Sharing failed!');
  //     this.copyLinkToClipboard();
  //   }
  // }

  render() {
    // game is over if there is no host
    if (this.state.hostDisconnected) {
      return (
        <div className="nohostleft">
          <h1 className="host-configuration">
            Host left the game. Please close this tab. Generate a new room if
            you want to play more.
          </h1>
          <a href="/" className="linkbtn">
            <button className="btn">Back</button>
          </a>
        </div>
      );
    }

    // If new playerjoins in already started game or host becomes ready (starts the game)
    // this pc is not ready, let him know that he cannot play now in this game
    if (
      this.state.hasGameAlreadyStarted ||
      (this.state.readyHost && !this.state.readyClient)
    ) {
      return (
        <div className="gamestartedplaynext">
          <h1 className="host-configuration">
            This game was started without you. You can play in the next game.
            Meanwhile you can go back to the home screen and play another game
            :)
          </h1>
          <a href="/" className="linkbtn">
            <button className="btn">Home</button>
          </a>
        </div>
      );
    }

    let mainComponent = null;
    if (this.state.readyHost && this.state.readyClient) {
      // display player
      mainComponent = (
        <Player
          socket={this.props.socket}
          numHouses={this.state.numHouses}
          name={this.props.name}
          type={this.state.type}
          awards={this.state.awards}
          players={this.state.PcsStatus}
          runWalkthrough={this.state.runWalkthrough}
          currentUser={this.state.currentUser}
        />
      );
    } else if (this.state.type === "Host") {
      // form for host configuration
      //    Choosing Awards
      // pass handleSubmit as a prop

      mainComponent = (
        <div className="config-container">
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
          <Walkthrough playerType="Host" type="config" runWalkthrough={this.state.runWalkthrough} />
          <Snackbar
            message="Share this 'join code' with other players"
            actionText="Copy code"
          />
          <Toast
            message={"There are no players in the game right now"}
            isShown={this.state.isToastOpen}
            handleClose={() => {
              this.setState({ isToastOpen: false });
            }}
            initiallyHidden={this.hideToastInitially}
          />
          {
            this.state.isModalOpen ? <div modal-status={this.state.watchTutorialModal} className="modalpoppup">
              <div className="area" >
                <ul className="circles">
                  {this.loopfun(10)}
                </ul>
              </div >
              <div className="modalpoppupcontent">
                <h3 style={{ color: "#000000" }}>Some players are still not ready.</h3>
                <h3 style={{ color: "#000000" }}>Are you sure you want to start the game?</h3>
                <div className="modal-buttons">
                  <button style={{ margin: 5 }} className="btn btn__primary" onClick={this.handlleHostConfigDone}>Yes</button>
                  <button
                    style={{ margin: 5 }}
                    className="btn"
                    onClick={() => {
                      this.setState({ isModalOpen: false });
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div> : null
          }
          <h1 className="host-configuration">Game Setup</h1>
          <ConfigTable
            awards={this.state.awards}
            handleChangeHost={this.handleChangeHost}
            handleAddRow={this.handleAddRow}
            handleRemoveRow={this.handleRemoveRow}
            handleRemoveSpecificRow={this.handleRemoveSpecificRow}
            handleSubmit={this.handleSubmit}
          />
          <ReadyPlayers players={this.state.PcsStatus} name={this.props.name} currentUser={this.state.currentUser} />
        </div>
      );
    } else if (this.state.type === "PC") {
      // form for PC configuration
      //    Number of Tickets
      mainComponent = (
        <div className="config-container">
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
          <Walkthrough playerType="PC" type="config" runWalkthrough={this.state.runWalkthrough} />
          <div className="pc-configuration">
            <div className="game-room-name">Invite Code: <span>{roomID}</span></div>
          </div>
          <div className="form-holder">
            <p className="m--0"><strong>Welcome, {this.props.name}</strong></p>
            <p className="mb--0 mt--5 opacity-half">
              <small className="lh-1">
                <i className="fa fa-spin fa-refresh mr--10"></i>Waiting for host to start the Game...<br />Please keep your screen turned on till the game starts</small>
            </p>
          </div>
          {
            this.state.readyClient ?
              <div className='letstart-wrap'>
                <div className="ready btn btn__primary">
                  <i className="fa fa-spin fa-refresh mr--10"></i>Ready
                </div>
              </div>
              :
              <form onSubmit={this.handleSubmit} className='letstart-wrap'>
                <button className="btn btn__primary" type="submit">
                  Ready?
                </button>
              </form>

          }

          <ReadyPlayers players={this.state.PcsStatus} name={this.props.name} currentUser={this.state.currentUser} />
        </div>
      );
    }
    return (
      <>

        {mainComponent}
        {
          this.state.watchTutorialModal ? <div modal-status={this.state.watchTutorialModal} className="modalpoppup">
            <div className="area" >
              <ul className="circles">
                {this.loopfun(10)}
              </ul>
            </div >
            <div className="modalpoppupcontent">
              <h3 style={{ color: "#000000" }}>Would you like to watch tutorial?</h3>
              <div className="modal-buttons">
                <button style={{ margin: 5 }} className="btn btn__primary" onClick={() => {
                  this.setState({ runWalkthrough: true, watchTutorialModal: false })
                  console.log("clicked yes");
                }
                }>Yes</button>
                <button
                  style={{ margin: 5 }}
                  className="btn"
                  onClick={() => {
                    console.log("clicked No");
                    this.setState({ runWalkthrough: false, watchTutorialModal: false });
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div> : null
        }

      </>
    );
  }
}

export default Config;