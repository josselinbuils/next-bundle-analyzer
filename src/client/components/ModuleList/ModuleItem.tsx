import filesize from 'filesize';
import escape from 'lodash/escape';
import escapeRegExp from 'lodash/escapeRegExp';
import { FunctionComponent, JSX } from 'preact';
import { MAIN_SIZE_PROPERTY } from '../../constants';
import { ClientGroup } from '../../interfaces/ClientGroup';
import { ChunkIcon } from './icons/ChunkIcon';
import { FolderIcon } from './icons/FolderIcon';
import { ModuleIcon } from './icons/ModuleIcon';
import styles from './ModuleItem.module.scss';

interface Props {
  highlightedText: string | RegExp;
  moduleGroup: ClientGroup;
  onClick(moduleGroup: ClientGroup): unknown;
}

export const ModuleItem: FunctionComponent<Props> = ({
  highlightedText,
  moduleGroup,
  onClick,
}) => {
  const ItemIcon = getItemIcon(moduleGroup);

  return (
    <div className={styles.container} onClick={() => onClick(moduleGroup)}>
      <ItemIcon className={styles.icon} />
      <span
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: getTitleHtml(moduleGroup, highlightedText),
        }}
      />
      {' ('}
      <strong>{filesize(moduleGroup[MAIN_SIZE_PROPERTY])}</strong>)
    </div>
  );
};

function getItemIcon({
  groups,
  path,
}: ClientGroup): FunctionComponent<JSX.SVGAttributes> {
  if (!path) {
    return ChunkIcon;
  }
  return groups ? FolderIcon : ModuleIcon;
}

function getTitleHtml(
  moduleGroup: ClientGroup,
  highlightedText: string | RegExp
) {
  let html;
  const title = moduleGroup.path || moduleGroup.label;

  if (highlightedText) {
    const regexp =
      highlightedText instanceof RegExp
        ? new RegExp(highlightedText.source, 'igu')
        : new RegExp(`(?:${escapeRegExp(highlightedText)})+`, 'iu');

    let match: RegExpExecArray | null = null;
    let lastMatch: RegExpExecArray | null = null;

    do {
      lastMatch = match;
      match = regexp.exec(title);
    } while (match);

    if (lastMatch) {
      html = `${escape(title.slice(0, lastMatch.index))}<strong>${escape(
        lastMatch[0]
      )}</strong>${escape(title.slice(lastMatch.index + lastMatch[0].length))}`;
    }
  }

  if (!html) {
    html = escape(title);
  }

  return html;
}
