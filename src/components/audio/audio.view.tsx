import { ReactElement } from 'react';
import useAudio from './audio.hook';

interface Props {
  muted: boolean;
  onMount(audio: HTMLAudioElement): void;
}

export default function Audio({ muted, onMount }: Props): ReactElement | null {
  const { handleEnded, ref, src } = useAudio({ onMount });

  return (
    <audio
      autoPlay
      controls={false}
      loop={false}
      muted={muted}
      onEnded={handleEnded}
      ref={ref}
      src={src}
    />
  );
}
