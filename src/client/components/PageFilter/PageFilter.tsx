import cn from 'classnames';
import { FunctionComponent } from 'preact';
import { ClientGroup } from '../../interfaces/ClientGroup';
import { Checkbox } from './Checkbox/Checkbox';
import styles from './PageFilter.module.scss';

interface Props {
  className?: string;
  pages: ClientGroup[];
  selectedPages: ClientGroup[];
  onChange(selectedPages: ClientGroup[]): unknown;
}

export const PageFilter: FunctionComponent<Props> = ({
  className,
  onChange,
  pages,
  selectedPages,
}) => {
  const areAllPagesSelected = selectedPages.length === pages.length;

  function handlePageCheck(page: ClientGroup, checked: boolean): void {
    const newSelectedPages = new Set(selectedPages);

    if (checked) {
      newSelectedPages.add(page);
    } else {
      newSelectedPages.delete(page);
    }

    onChange([...newSelectedPages]);
  }

  return (
    <div className={cn(styles.pageFilter, className)}>
      <div className={styles.label}>Show pages:</div>
      <div>
        <Checkbox
          checked={areAllPagesSelected}
          onChange={() => onChange(areAllPagesSelected ? [] : [...pages])}
        >
          All
        </Checkbox>
        {pages.map((page) => (
          <Checkbox
            checked={selectedPages.includes(page)}
            className={styles.page}
            key={page.label}
            onChange={(event) =>
              handlePageCheck(page, event.currentTarget.checked)
            }
          >
            {page.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
