import { MutableRefObject, useCallback, useRef, useState } from 'react';
import toggle from '../../utils/toggle';

interface State {
  handleAudioMount(audio: HTMLAudioElement): void;
  handleMainClick(): void;
  muted: boolean;
}

export default function useApp(): State {
  const audioRef: MutableRefObject<HTMLAudioElement | null> = useRef(null);
  const [muted, setMuted] = useState(false);

  return {
    muted,

    handleAudioMount: useCallback((audio: HTMLAudioElement): void => {
      audioRef.current = audio;
    }, []),

    handleMainClick: useCallback((): void => {
      if (audioRef.current === null) {
        return;
      }
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        setMuted(toggle);
      }
    }, []),
  };
}
