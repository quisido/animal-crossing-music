import {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
// import durations from '../../constants/durations';
import mapOldThemeToNewTheme from '../../map/map-old-theme-to-new-theme';
import getRandomTheme from '../../utils/get-random-theme';
import leftPad from '../../utils/left-pad';

interface Props {
  onMount(audio: HTMLAudioElement): void;
}

interface State {
  handleEnded(): void;
  ref: MutableRefObject<HTMLAudioElement | null>;
  src: string;
}

export default function useAudio({ onMount }: Props): State {
  // Constants
  const hours: number = new Date().getHours();

  // States
  const ref: MutableRefObject<HTMLAudioElement | null> = useRef(null);
  const [theme, setTheme] = useState(getRandomTheme);

  useLayoutEffect((): void => {
    if (ref.current === null) {
      return;
    }
    onMount(ref.current);
  }, [onMount]);

  return {
    ref,
    src: `./music/${theme}/${leftPad(hours)}.ogg`,

    handleEnded: useCallback((): void => {
      setTheme(mapOldThemeToNewTheme);
    }, []),
  };
}
