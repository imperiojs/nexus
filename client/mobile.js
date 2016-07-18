imperio.mobileRoomSetup(function(socket) {
  var rooms = imperio.socket.rooms || 'no rooms';
  console.log('ROOMS AFTER MOBILE ROOM SETUP: ', rooms);
});
imperio.mobileAccelShare.gravity();
imperio.webRTCConnect();

function buttonTap() {
  console.log('buttonTap invoked');
  imperio.mobileTapShare();
}

var connectType = document.getElementById('connectionType');
setInterval(() => {
  connectType.innerHTML = `connected via ${imperio.connectionType}`;
}, 500);

function killCookies() {
  function delete_cookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  console.log('killing cookies');
  delete_cookie('nonce');
  delete_cookie('roomId');
  delete_cookie('session');
}
