imperio.desktopRoomSetup(imperio.socket, imperio.room);

imperio.desktopTapHandler(imperio.socket, alterFocus);

function alterFocus() {
  console.log('alterFocus invoked');
  // generate random hex
  const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);

  // update color of header with generated random hex
  const focusHeader = document.getElementById('header');
  focusHeader.style.color = randomColor;
}
