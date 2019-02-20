const audio = document.getElementsByTagName('audio').item(0);

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
