import getRandomTheme from '../utils/get-random-theme';

export default function mapOldThemeToNewTheme(oldTheme: string): string {
  let newTheme: string;
  do {
    newTheme = getRandomTheme();
  } while (newTheme === oldTheme);
  return newTheme;
}
