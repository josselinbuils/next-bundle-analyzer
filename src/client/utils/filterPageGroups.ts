import { ClientGroup } from '../interfaces/ClientGroup';

export function filterPageGroups(groups: ClientGroup[]): ClientGroup[] {
  return groups.filter((group) => group.label.startsWith('/'));
}
