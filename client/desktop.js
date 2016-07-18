imperio.desktopRoomSetup(createSatelliteBox);
imperio.desktopRoomUpdate(createSatelliteBox);
imperio.nonceTimeoutUpdate(updateTimeouts);
let dataPoints;
let chart;

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
  imperio.requestNonceTimeout();
  setInterval(() => {
    imperio.requestNonceTimeout();
  }, 1000);
});

var connectType = document.getElementById('connectionType');
setInterval(() => {
  connectType.innerHTML = `connected via ${imperio.connectionType}`;
}, 500);

imperio.webRTCConnect();
imperio.desktopTapHandler(alterFocus);
imperio.desktopAccelHandler(updateChart);

window.onload = function () {
// initial values of dataPoints
  dataPoints = [
    { label: 'X', y: 0 },
    { label: 'Y', y: 0 },
    { label: 'Z', y: 0 },
  ];
  chart = new CanvasJS.Chart("chartContainer",{
    theme: 'theme2',
    title: {
      text: 'Device Acceleration Data',
    },
    axisY: {
      title: 'Accleration Including Gravity',
    },
    legend: {
      verticalAlign: 'top',
      horizontalAlign: 'centre',
      fontSize: 18,
    },
    data: [{
      type: 'column',
      showInLegend: true,
      legendMarkerType: 'none',
      legendText: 'Acceleration Data from connected device',
      indexLabel: '{y}',
      dataPoints,
    }],
  });
// renders initial chart
  chart.render();
};

function updateChart(accelObject) {
  dataPoints[0].y = accelObject.x;
  dataPoints[1].y = accelObject.y;
  dataPoints[2].y = accelObject.z;
  chart.render();
}
