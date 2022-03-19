function uniqueid() {
  // always start with a letter (for DOM friendlyness)
  var idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
  do {
    // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
    var ascicode = Math.floor(Math.random() * 42 + 48);
    if (ascicode < 58 || ascicode > 64) {
      // exclude all chars between : (58) and @ (64)
      idstr += String.fromCharCode(ascicode);
    }
  } while (idstr.length < 6);

  return idstr;
}

window.onload = function () {
  var newRoomBtn = document.getElementById("generate-new-room");
  var joinRoomBtn = document.getElementById("join-room");
  var enterNameInput = document.getElementById("enter-name");
  var joinRoomBtnsubmit = document.getElementById("join-game-submit");
  newRoomBtn.onclick = () => {
    let uniqueRoomId = "game/" + uniqueid();
    location.href = location.href + uniqueRoomId;
  };

  joinRoomBtn.onclick = () => {
    document.getElementById('new-home').style.display = 'none';
    document.getElementById('join-room-code').style.display = 'block';
  };
  enterNameInput.onchange = (e) => {
    let txtinput = e.target.value;
    if (txtinput.length > 0) {
      document.getElementById('join-game-submit-wap').style.visibility = 'visible';
    } else {
      document.getElementById('join-game-submit-wap').style.visibility = 'hidden';
    }
  };
  enterNameInput.onkeydown = (e) => {
    let txtinput = e.target.value;
    if (txtinput.length > 0) {
      document.getElementById('join-game-submit-wap').style.visibility = 'visible';
    } else {
      document.getElementById('join-game-submit-wap').style.visibility = 'hidden';
    }
  };

  enterNameInput.onkeyup = (e) => {
    let txtinput = e.target.value;
    // let cuUrl = window.location.pathname.split('/game/')[1];
    // console.log(cuUrl, typeof cuUrl)
    if (txtinput.length > 0) {
      // if (cuUrl === 'undefined' || typeof cuUrl === 'undefined') {
      //   document.getElementById('join-game-submit').classList.add("disabled");
      // } else {
      //   document.getElementById('join-game-submit').classList.remove("disabled");
      // }
      document.getElementById('join-game-submit-wap').style.visibility = 'visible';
    } else {
      document.getElementById('join-game-submit-wap').style.visibility = 'hidden';
    }
  };

  joinRoomBtnsubmit.onclick = () => {
    let uniqueRoomId = "game/" + enterNameInput.value;
    location.href = location.href + uniqueRoomId;
  };

  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({
      isPortrait: true
    }));
  }
  //Check Update
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({
      updateVersion: 1,
      appUrl:'www.google.com'
    }));
  }
};
