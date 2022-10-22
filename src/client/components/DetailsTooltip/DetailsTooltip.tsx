import debounce from 'lodash/debounce';
import type { FunctionComponent, VNode } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/compat';
import type { ClientGroup } from '../../interfaces/ClientGroup';
import styles from './DetailsTooltip.module.scss';

const MARGIN_PX = 20;
const DISPLAY_GROUP_DEBOUNCE_DELAY_MS = 50;

interface Props {
  group: ClientGroup | undefined;
}

export const DetailsTooltip: FunctionComponent<Props> = ({ group }) => {
  const [displayedGroup, setDisplayedGroup] = useState<ClientGroup>();
  const elementRef = useRef<HTMLDivElement>(null);
  const softlySetDisplayedGroup = useMemo(
    () => debounce(setDisplayedGroup, DISPLAY_GROUP_DEBOUNCE_DELAY_MS),
    []
  );

  useEffect(() => {
    function mouseMoveListener(event: MouseEvent) {
      if (elementRef.current) {
        requestAnimationFrame(() => {
          setTooltipPosition(elementRef.current, event.pageX, event.pageY);
        });
      }
    }

    if (displayedGroup) {
      window.addEventListener('mousemove', mouseMoveListener, true);

      return () => {
        window.removeEventListener('mousemove', mouseMoveListener, true);
      };
    }
  }, [displayedGroup]);

  useEffect(() => {
    softlySetDisplayedGroup(group);
  }, [group, softlySetDisplayedGroup]);

  if (displayedGroup === undefined) {
    return null;
  }

  const {
    gzipSize,
    inaccurateSizes,
    issuers,
    label,
    parsedSize,
    path,
    sharedByPages,
    statSize,
  } = displayedGroup;

  return (
    <div className={styles.detailsTooltip} ref={elementRef}>
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

function setTooltipPosition(
  element: HTMLDivElement | null,
  x: number,
  y: number
): void {
  if (!element) {
    return;
  }

  const boundingRect = element.getBoundingClientRect();
  const xDelta = boundingRect.width + MARGIN_PX;
  const yDelta = boundingRect.height + MARGIN_PX;

  if (x + xDelta > window.innerWidth) {
    if (x - xDelta > 0) {
      x -= xDelta;
    } else {
      x = 0;
    }
  } else {
    x += MARGIN_PX;
  }

  if (y + yDelta > window.innerHeight) {
    if (y - yDelta > 0) {
      y -= yDelta;
    } else {
      y = 0;
    }
  } else {
    y += MARGIN_PX;
  }

  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  element.style.visibility = 'visible';
}

function formatSize(size: number): number {
  return Math.round(size / 10) / 100;
}
