imperio.desktopRoomSetup(imperio.socket, imperio.room, createSatelliteBox);
imperio.desktopRoomUpdate(imperio.socket, createSatelliteBox);
imperio.nonceTimeoutUpdate(imperio.socket, updateTimeouts);

function alterFocus() {
  console.log('alterFocus invoked');
  // generate random hex
  const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);

  // update color of header with generated random hex
  const focusHeader = document.getElementById('header');
  focusHeader.style.color = randomColor;
}

function updateTimeouts(nonceTimeouts) {
  var html = '';
  if (nonceTimeouts.length === 0) {
    html += "<p>No active connect requests.</p>"
  } else {
    for (let timeoutString of nonceTimeouts) {
      html += '<ul>';
      html += '<li>'+timeoutString+'</li>';
      html += '</ul>';
    }
  }
  var openConnections = document.getElementById('open-connections');
  openConnections.innerHTML = html;
}

function createSatelliteBox(roomData) {
  var html = '';

  if (roomData && roomData.hasOwnProperty('sockets')) {
    for (var socket in roomData.sockets) {
      html += "<div class='satellite'>";
      html += "<p>"+socket+"</p>";
      html += "<p>"+roomData.sockets[socket]+"</p>";
      html += "</div>";
    }
  }

  var satellites = document.getElementById('satellites');
  satellites.innerHTML = html;
  console.log('satellite created: ', roomData)
}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log('request nonce setInterval called');
  imperio.requestNonceTimeout(imperio.socket, imperio.room);
  setInterval(() => {
    imperio.requestNonceTimeout(imperio.socket, imperio.room);
  }, 1000);
});

imperio.webRTCConnect();
imperio.desktopTapHandler(imperio.socket, alterFocus);
imperio.desktopAccelHandler(accelObject => {
  if (accelObject) {
    var accData = document.getElementById('acceleration');
    accData.innerHTML = `x: ${accelObject.x}, y: ${accelObject.y}, z: ${accelObject.z}`;
  }
});
