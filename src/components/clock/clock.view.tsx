import { ReactElement } from 'react';
import useClock from './clock.hook';
import styles from './clock.module.scss';

export default function Clock(): ReactElement {
  const { displayRef, time } = useClock();

  return (
    <div className={styles.root}>
      <span ref={displayRef}>
        <span className={styles.time}>{time}</span>
      </span>
    </div>
  );
}
