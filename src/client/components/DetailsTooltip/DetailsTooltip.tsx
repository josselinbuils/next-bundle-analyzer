import cn from 'classnames';
import { FunctionComponent, VNode } from 'preact';
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
    issuers,
    label,
    parsedSize,
    path,
    sharedByPages,
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
        const xDelta = boundingRect.width + MARGIN;
        const yDelta = boundingRect.height + MARGIN;
        let x = event.pageX;
        let y = event.pageY;

        if (x + xDelta > window.innerWidth) {
          if (x - xDelta > 0) {
            x -= xDelta;
          } else {
            x = 0;
          }
        } else {
          x += MARGIN;
        }

        if (y + yDelta > window.innerHeight) {
          if (y - yDelta > 0) {
            y -= yDelta;
          } else {
            y = 0;
          }
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
      {!!sharedByPages && (
        <p className={styles.sharedByPages}>
          Shared by:{' '}
          {sharedByPages === 'all' ? (
            'all pages'
          ) : (
            <ul>
              {sharedByPages.map((page) => (
                <li key={page}>{page}</li>
              ))}
            </ul>
          )}
        </p>
      )}
      {!!issuers && (
        <p className={styles.issuers}>Issuers: {formatIssuers(issuers)}</p>
      )}
    </div>
  );
};

function formatIssuers(issuers: string[]): VNode {
  return (
    <>
      {issuers
        .slice()
        .reverse()
        .map((issuer, index) => (
          <p className={styles.issuer} key={issuer}>
            {index === 0 ? (
              <strong>{issuer}</strong>
            ) : (
              <>
                <span className={styles.arrow}>↳ </span>
                {issuer}
              </>
            )}
          </p>
        ))}
    </>
  );
}

function formatSize(size: number): number {
  return Math.round(size / 10) / 100;
}
