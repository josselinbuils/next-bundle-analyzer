import { FunctionComponent } from 'preact';
import { ClientGroup } from '../../interfaces/ClientGroup';
import { ModuleItem } from './ModuleItem';

interface Props {
  className: string;
  highlightedText: string | RegExp;
  moduleGroups: ClientGroup[];
  onModuleClick(moduleGroup: ClientGroup): unknown;
}

export const ModuleList: FunctionComponent<Props> = ({
  className,
  highlightedText,
  moduleGroups,
  onModuleClick,
}) => (
  <div className={className}>
    {moduleGroups.map((moduleGroup) => (
      <ModuleItem
        key={module.id}
        moduleGroup={moduleGroup}
        highlightedText={highlightedText}
        onClick={() => onModuleClick(moduleGroup)}
      />
    ))}
  </div>
);
