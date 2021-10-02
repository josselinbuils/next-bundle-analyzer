import debounce from 'lodash/debounce';
import { FunctionComponent } from 'preact';
import { useEffect, useMemo, useRef } from 'preact/compat';
import styles from './Search.module.scss';

const SEARCH_DEBOUNCE_DELAY_MS = 400;

interface Props {
  autofocus: boolean;
  label: string;
  query: string;
  onQueryChange(value: string): unknown;
}

export const Search: FunctionComponent<Props> = ({
  autofocus,
  label,
  onQueryChange,
  query,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValueChange = useMemo(
    () =>
      debounce((event: Event) => {
        onQueryChange((event.target as HTMLInputElement).value);
      }, SEARCH_DEBOUNCE_DELAY_MS),
    [onQueryChange]
  );

  function handleKeyDown(event: KeyboardEvent) {
    let handled = true;

    switch (event.key) {
      case 'Escape':
        handleValueChange.cancel();
        onQueryChange('');
        break;
      case 'Enter':
        handleValueChange.flush();
        break;
      default:
        handled = false;
    }

    if (handled) {
      event.stopPropagation();
    }
  }

  useEffect(
    () => () => {
      handleValueChange.cancel();
    },
    [handleValueChange]
  );

  useEffect(() => {
    if (autofocus) {
      inputRef.current?.focus();
    }
  }, [autofocus]);

  return (
    <div className={styles.search}>
      <div className={styles.label}>{label}:</div>
      <div className={styles.row}>
        <input
          ref={inputRef}
          className={styles.input}
          type="search"
          value={query}
          placeholder="Enter regexp"
          onInput={handleValueChange}
          onBlur={handleValueChange.flush}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};
