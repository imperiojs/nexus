imperio.mobileRoomSetup(imperio.socket, imperio.room, function(socket) {
  var rooms = socket.rooms || 'no rooms';
  console.log('ROOMS AFTER MOBILE ROOM SETUP: ', socket.rooms);
});

function buttonTap() {
  console.log('buttonTap invoked');
  return imperio.mobileTapShare(imperio.socket, imperio.room);
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
