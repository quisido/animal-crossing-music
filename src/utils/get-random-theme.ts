import themes from '../constants/themes';
import getRandomThemeIndex from '../utils/get-random-theme-index';

export default function getRandomTheme(): string {
  const themeIndex: number = getRandomThemeIndex();
  return themes[themeIndex];
}
