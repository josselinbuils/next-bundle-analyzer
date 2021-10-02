import cn from 'classnames';
import filesize from 'filesize';
import { FunctionComponent, JSX } from 'preact';
import { useMemo } from 'preact/compat';
import { MAIN_SIZE_PROPERTY, MIN_SEARCH_CHARACTERS } from '../../constants';
import styles from './FoundModulesInfo.module.scss';
import { ClientGroup } from '../../interfaces/ClientGroup';

interface Props {
  foundModules: ClientGroup[];
  searchQuery: string;
}

export const FoundModulesInfo: FunctionComponent<Props> = ({
  foundModules,
  searchQuery,
}) => {
  const foundModuleSize = useMemo(
    () => computeFoundModuleSize(foundModules),
    [foundModules]
  );
  let content: JSX.Element | string = '';

  if (searchQuery) {
    if (foundModules.length > 0) {
      content = (
        <>
          <div className={styles.foundModulesInfoItem}>
            Count: <strong>{foundModules.length}</strong>
          </div>
          <div className={styles.foundModulesInfoItem}>
            Total size: <strong>{foundModuleSize}</strong>
          </div>
        </>
      );
    } else if (searchQuery.length < MIN_SEARCH_CHARACTERS) {
      content = `Minimum ${MIN_SEARCH_CHARACTERS} characters.`;
    } else {
      content = 'Nothing found';
    }
  }

  return (
    <div className={cn(styles.foundModulesInfo, { [styles.hidden]: !content })}>
      {content}
    </div>
  );
};

function computeFoundModuleSize(foundModules: ClientGroup[]): string {
  return filesize(
    foundModules.reduce((sum, group) => sum + group[MAIN_SIZE_PROPERTY], 0)
  );
}
