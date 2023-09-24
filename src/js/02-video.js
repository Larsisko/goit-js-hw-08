import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');

const player = new Player(iframe);

function saveTimeToLocalStorage() {
  player.getCurrentTime().then(currentTime => {
    localStorage.setItem('videoplayer-current-time', currentTime);
  });
}

function setTimeFromLocalStorage() {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    player.setCurrentTime(parseFloat(currentTime));
  }
}

player.on('timeupdate', throttle(saveTimeToLocalStorage, 1000));

player.ready().then(() => {
  setTimeFromLocalStorage();
  player.play();
});
