import filesize from 'filesize';
import { FunctionComponent, JSX } from 'preact';
import { useMemo } from 'preact/compat';
import { MAIN_SIZE_PROPERTY } from '../../constants';
import styles from './FoundModulesInfo.module.scss';
import { ClientGroup } from '../../interfaces/ClientGroup';

interface Props {
  foundModules: ClientGroup[];
  isSearching: boolean;
}

export const FoundModulesInfo: FunctionComponent<Props> = ({
  foundModules,
  isSearching,
}) => {
  const foundModuleSize = useMemo(
    () => computeFoundModuleSize(foundModules),
    [foundModules]
  );
  // `&nbsp;` to reserve space
  let content: JSX.Element | string = '\u00A0';

  if (isSearching) {
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
    } else {
      content = 'Nothing found';
    }
  }

  return <div className={styles.foundModulesInfo}>{content}</div>;
};

function computeFoundModuleSize(foundModules: ClientGroup[]): string {
  return filesize(
    foundModules.reduce((sum, group) => sum + group[MAIN_SIZE_PROPERTY], 0)
  );
}
