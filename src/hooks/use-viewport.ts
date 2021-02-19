/// <reference types="resize-observer-browser" />
import { useEffect, useMemo } from 'react';
import useForceUpdate from 'use-force-update';

export default function useViewport(): [number, number] {
  const forceUpdate: VoidFunction = useForceUpdate();

  // TODO: Trigger when viewport expands or shrinks. Currently, does not
  //   trigger. We especially want to know if the window got smaller even though
  //   the contents may be stretching the document body's width.
  useEffect((): VoidFunction => {
    const observer: ResizeObserver = new ResizeObserver(forceUpdate);
    observer.observe(document.body);
    return (): void => {
      observer.disconnect();
    };
  }, [forceUpdate]);

  return [
    useMemo((): number => {
      return Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
      );
    }, []),

    useMemo((): number => {
      return Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0,
      );
    }, []),
  ];
}
