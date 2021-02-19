import themes from '../constants/themes';
import getRandomInteger from '../utils/get-random-integer';

export default function getRandomThemeIndex(): number {
  return getRandomInteger(0, themes.length - 1);
}
