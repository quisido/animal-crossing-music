import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';
import useForceUpdate from 'use-force-update';
import useViewport from '../../hooks/use-viewport';
import leftPad from '../../utils/left-pad';

interface State {
  displayRef: MutableRefObject<HTMLElement | null>;
  time: string;
}

const MILLISECONDS_PER_SECOND = 1000;

export default function useClock(): State {
  // Constants
  const date: Date = new Date();
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const seconds: number = date.getSeconds();

  // States
  const forceUpdate: VoidFunction = useForceUpdate();
  const displayRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const [viewportWidth, viewportHeight] = useViewport();

  useEffect((): VoidFunction => {
    const interval: number = window.setInterval(
      forceUpdate,
      MILLISECONDS_PER_SECOND,
    );
    return (): void => {
      window.clearInterval(interval);
    };
  }, [forceUpdate]);

  useLayoutEffect((): void => {
    const el: HTMLElement | null = displayRef.current;
    if (el === null) {
      return;
    }

    const isSmallerThanViewport = (): boolean => {
      const rect: DOMRect = el.getBoundingClientRect();
      return (
        rect.height < viewportHeight * 0.85 && rect.width < viewportWidth * 0.85
      );
    };

    let fontSize = 0;
    while (isSmallerThanViewport()) {
      fontSize++;
      el.style.setProperty('font-size', `${fontSize}px`);
    }
    el.style.setProperty('font-size', `${fontSize - 1}px`);
  }, [viewportHeight, viewportWidth]);

  return {
    displayRef,
    time: `${[hours, minutes, seconds].map(leftPad).join(':')}`,
  };
}
