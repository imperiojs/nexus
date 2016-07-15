imperio.mobileRoomSetup(function(socket) {
  var rooms = imperio.socket.rooms || 'no rooms';
  console.log('ROOMS AFTER MOBILE ROOM SETUP: ', rooms);
});

imperio.webRTCConnect();

function buttonTap() {
  console.log('buttonTap invoked');
  imperio.mobileTapShare(imperio.socket, imperio.room);
}

function killCookies() {
  function delete_cookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  console.log('killing cookies');
  delete_cookie('nonce');
  delete_cookie('roomId');
  delete_cookie('session');
}
