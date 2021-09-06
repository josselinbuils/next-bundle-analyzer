import { FunctionComponent } from 'preact';
import { useEffect, useRef } from 'preact/compat';
import {
  EventHandler,
  GroupColorDecoratorFunction,
} from '../../../interfaces/Foamtree';
import { ClientData } from '../../interfaces/ClientState';
import { createTreemap } from './createTreemap';

interface Props {
  className: string;
  data: ClientData;
  groupColorDecorator?: GroupColorDecoratorFunction;
  onGroupDoubleClick?: EventHandler;
  onGroupClick?: EventHandler;
  onGroupHover?: EventHandler;
  onGroupLeave?: EventHandler;
}

export const Treemap: FunctionComponent<Props> = ({
  className,
  data,
  groupColorDecorator,
  onGroupDoubleClick,
  onGroupClick,
  onGroupHover,
  onGroupLeave,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const treemapRef = useRef<any>();
  const zoomOutDisabledRef = useRef(false);

  useEffect(() => {
    const resizeListener = () => treemapRef.current?.resize();
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  useEffect(() => {
    if (elementRef.current) {
      const map = createTreemap({
        element: elementRef.current,
        dataObject: data,
        groupColorDecorator,
        onGroupDoubleClick: (event) => {
          event.preventDefault();

          if (!event.group?.label) {
            return;
          }
          onGroupDoubleClick?.(event);
        },
        onGroupClick(event) {
          event.preventDefault();

          if (!event.group?.label) {
            return;
          }
          onGroupClick?.(event);
        },
        onGroupHover(event) {
          event.preventDefault();

          if (event.group.label) {
            onGroupHover?.(event);
          } else {
            onGroupLeave?.(event);
          }
        },
        onGroupMouseWheel(event) {
          const { scale } = map.get('viewport');
          const isZoomOut = event.delta < 0;

          if (isZoomOut) {
            if (zoomOutDisabledRef.current) {
              event.preventDefault();
            } else if (scale < 1) {
              zoomOutDisabledRef.current = true;
              event.preventDefault();
            }
          } else {
            zoomOutDisabledRef.current = false;
          }
        },
      });

      treemapRef.current = map;

      return () => {
        map.dispose();
        treemapRef.current = undefined;
      };
    }
  }, [
    data,
    groupColorDecorator,
    onGroupClick,
    onGroupDoubleClick,
    onGroupHover,
    onGroupLeave,
  ]);

  return <div className={className} ref={elementRef} />;
};
