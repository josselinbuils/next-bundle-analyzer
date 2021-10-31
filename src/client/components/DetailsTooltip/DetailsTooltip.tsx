import cn from 'classnames';
import { FunctionComponent } from 'preact';
import { useEffect, useRef } from 'preact/compat';
import { ClientGroup } from '../../interfaces/ClientGroup';
import styles from './DetailsTooltip.module.scss';

const MARGIN = 20;

interface Props {
  group: ClientGroup;
}

export const DetailsTooltip: FunctionComponent<Props> = ({ group }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const {
    gzipSize,
    inaccurateSizes,
    issuer,
    label,
    parsedSize,
    path,
    statSize,
  } = group;

  useEffect(() => {
    function mouseMoveListener(event: MouseEvent) {
      requestAnimationFrame(() => {
        const element = elementRef.current;

        if (!element) {
          return;
        }

        const boundingRect = element.getBoundingClientRect();
        let x = event.pageX;
        let y = event.pageY;

        if (x + boundingRect.width + MARGIN > window.innerWidth) {
          x -= boundingRect.width + MARGIN;
        } else {
          x += MARGIN;
        }

        if (y + boundingRect.height + MARGIN > window.innerHeight) {
          y -= boundingRect.height + MARGIN;
        } else {
          y += MARGIN;
        }

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
      });
    }

    window.addEventListener('mousemove', mouseMoveListener, true);
    return () =>
      window.removeEventListener('mousemove', mouseMoveListener, true);
  }, []);

  return (
    <div
      className={cn(styles.detailsTooltip, { [styles.hidden]: !group })}
      ref={elementRef}
    >
      <p className={styles.label}>
        <strong>{label}</strong>
      </p>
      <p>Stat size: {formatSize(statSize)} ko</p>
      {parsedSize > 0 && !inaccurateSizes && (
        <p>
          Parsed size: <strong>{formatSize(parsedSize)} ko</strong>
        </p>
      )}
      {gzipSize > 0 && !inaccurateSizes && (
        <p>
          Gzip size: <strong>{formatSize(gzipSize)} ko</strong>
        </p>
      )}
      {!!path && (
        <p>
          Path: <strong>{path}</strong>
        </p>
      )}
      {!!issuer && (
        <p>
          Issuer: <strong>{issuer}</strong>
        </p>
      )}
    </div>
  );
};

function formatSize(size: number): number {
  return Math.round(size / 10) / 100;
}
