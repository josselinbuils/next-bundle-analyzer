import { FunctionComponent } from 'preact';
import { useEffect, useRef } from 'preact/compat';
import { Ref } from 'preact/hooks';
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
  treemapRef: Ref<any>;
}

export const Treemap: FunctionComponent<Props> = ({
  className,
  data,
  groupColorDecorator,
  onGroupDoubleClick,
  onGroupClick,
  onGroupHover,
  onGroupLeave,
  treemapRef,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const zoomOutDisabledRef = useRef(false);

  useEffect(() => {
    const resizeListener = () => treemapRef.current?.resize();
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, [treemapRef]);

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
    treemapRef,
  ]);

  return <div className={className} ref={elementRef} />;
};
