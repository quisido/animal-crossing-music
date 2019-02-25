const audio = document.getElementsByTagName('audio').item(0);

const durations = Object.create(null);

const lastPlayedCache = {
  hour: null,
  themes: new Set(),
};

const themes = [
  'animal-crossing',
  'animal-crossing/cherry-blossom-festival',
  'animal-crossing/snow',
  'animal-crossing-new-leaf',
  'animal-crossing-new-leaf/rain',
  'animal-crossing-new-leaf/snow',
  'animal-crossing-wild-world',
  'animal-crossing-wild-world/rain',
  'animal-crossing-wild-world/snow',
];



const randomThemeId = () => {
  return Math.floor(Math.random() * themes.length);
};

const resetCache = () => {
  for (const theme of lastPlayedCache.themes) {
    themes.push(theme);
  }
  lastPlayedCache.themes.clear();
};



const play = () => {
  const now = new Date().getHours();

  // If the hour has changed, clear the cache from the previous hour.
  if (lastPlayedCache.hour !== now) {
    lastPlayedCache.hour = now;
    resetCache();
  }

  // If we've played every song, clear the cache.
  if (themes.length === 0) {
    resetCache();
  }

  // Randomly grab a song not in the cache.
  const themeId = randomThemeId();
  const theme = themes.splice(themeId, 1);
  lastPlayedCache.themes.add(theme);

  // Play.
  const hour = now < 10 ? `0${now}` : now;
  const src = `music/${theme}/${hour}.ogg`;

  audio.setAttribute('src', src);
};

audio.addEventListener('canplay', () => {
  audio.play();
});
audio.addEventListener('ended', play);



const handleClick = () => {
  const link = document.getElementsByTagName('a').item(0);
  if (audio.paused) {
    document.body.classList.add('playing');
    document.body.classList.remove('muted');
    play();
    audio.volume = 1;
    link.setAttribute('title', 'Mute');
    link.removeChild(link.firstChild);
    link.appendChild(document.createTextNode('🔊'));
  }
  else if (audio.volume === 0) {
    document.body.classList.add('playing');
    document.body.classList.remove('muted');
    audio.volume = 1;
    link.setAttribute('title', 'Unmute');
    link.removeChild(link.firstChild);
    link.appendChild(document.createTextNode('🔊'));
  }
  else {
    document.body.classList.add('muted');
    document.body.classList.remove('playing');
    audio.volume = 0;
    link.setAttribute('title', 'Mute');
    link.removeChild(link.firstChild);
    link.appendChild(document.createTextNode('🔈'));
  }
};



const setDurations = d => {
  Object.assign(durations, d);
  const play = document.createElement('a');
  play.setAttribute('href', '#');
  play.addEventListener('click', handleClick);
  play.appendChild(document.createTextNode('🔈'));
  document.getElementsByTagName('div').item(0).appendChild(play);
};
