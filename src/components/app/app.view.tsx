import { ReactElement } from 'react';
import Audio from '../../components/audio';
import Clock from '../../components/clock';
import useApp from './app.hook';
import styles from './app.module.scss';

export default function App(): ReactElement {
  const { handleAudioMount, handleMainClick, muted } = useApp();

  return (
    <>
      <Audio muted={muted} onMount={handleAudioMount} />
      <main className={styles.main} onClick={handleMainClick}>
        <Clock />
      </main>
    </>
  );
}
