import cn from 'classnames';
import { FunctionComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/compat';
import { Button } from '../Button/Button';
import styles from './Sidebar.module.scss';
import { PinIcon } from './PinIcon';

const toggleTime = parseInt(styles.toggleTime, 10);

interface Props {
  className?: string;
  pinned?: boolean;
  onPinStateChange(pinned: boolean): unknown;
  onResize(): unknown;
  onToggle(flag: boolean): unknown;
}

export const Sidebar: FunctionComponent<Props> = ({
  children,
  className,
  onPinStateChange,
  onResize,
  onToggle,
  pinned = false,
}) => {
  const [allowHide, setAllowHide] = useState(true);
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const hideTimeoutIdRef = useRef<number | null>(null);
  const togglingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeInfoRef = useRef<any>({});

  useEffect(
    () => () => {
      if (hideTimeoutIdRef.current) {
        clearTimeout(hideTimeoutIdRef.current);
      }
    },
    []
  );

  function handleMouseEnter(): void {
    if (!togglingRef.current && !pinned) {
      if (hideTimeoutIdRef.current) {
        window.clearTimeout(hideTimeoutIdRef.current);
        hideTimeoutIdRef.current = null;
      }
      toggleVisibility(true);
    }
  }

  function handleMouseLeave(): void {
    if (allowHide && !togglingRef.current && !pinned) {
      toggleVisibility(false);
    }
  }

  function handlePinButtonClick() {
    if (containerRef.current) {
      setWidth(
        pinned ? null : containerRef.current.getBoundingClientRect().width
      );
      onPinStateChange(!pinned);
    }
  }

  function handleResize(event: MouseEvent): void {
    const { initialWidth, startPageX } = resizeInfoRef.current;
    setWidth(initialWidth + event.pageX - startPageX);
  }

  function handleResizeEnd() {
    document.body.classList.remove('resizing', 'col');
    document.removeEventListener('mousemove', handleResize, true);
    document.removeEventListener('mouseup', handleResizeEnd, true);
    onResize();
  }

  function handleResizeStart(event: MouseEvent): void {
    resizeInfoRef.current = {
      startPageX: event.pageX,
      initialWidth: width,
    };
    document.body.classList.add('resizing');
    document.addEventListener('mousemove', handleResize, true);
    document.addEventListener('mouseup', handleResizeEnd, true);
  }

  function toggleVisibility(flag?: boolean): void {
    if (hideTimeoutIdRef.current) {
      window.clearTimeout(hideTimeoutIdRef.current);
      hideTimeoutIdRef.current = null;
    }

    if (flag === undefined) {
      flag = !visible;
    } else if (flag === visible) {
      return;
    }

    setVisible(flag);
    togglingRef.current = true;

    setTimeout(() => {
      togglingRef.current = false;
    }, toggleTime);

    if (pinned && !flag) {
      setWidth(null);
    }

    if (flag || pinned) {
      onToggle(flag);
    } else if (!flag) {
      // Waiting for the CSS animation to finish and hiding content
      hideTimeoutIdRef.current = window.setTimeout(() => {
        hideTimeoutIdRef.current = null;
        onToggle(false);
      }, toggleTime);
    }
  }

  return (
    <div
      className={cn(styles.sidebar, className, {
        [styles.hidden]: !visible,
        [styles.pinned]: pinned,
      })}
      onClick={() => setAllowHide(false)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={() => setAllowHide(true)}
      ref={containerRef}
      style={width ? { width } : undefined}
    >
      {visible && (
        <>
          <Button
            active={pinned}
            className={styles.pinButton}
            onClick={handlePinButtonClick}
            title="Pin"
            toggle
          >
            <PinIcon />
          </Button>
          {pinned && (
            <div className={styles.resizer} onMouseDown={handleResizeStart} />
          )}
          {children}
        </>
      )}
    </div>
  );
};
