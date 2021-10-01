import { FunctionComponent } from 'preact';
import { useCallback, useMemo, useReducer, useRef } from 'preact/compat';
import styles from './Client.module.scss';
import { ArrowIcon } from './components/ArrowIcon';
import { Button } from './components/Button/Button';
import { DetailsTooltip } from './components/DetailsTooltip/DetailsTooltip';
import { FoundModulesInfo } from './components/FoundModulesInfo/FoundModulesInfo';
import { ModuleList } from './components/ModuleList/ModuleList';
import { PageFilter } from './components/PageFilter/PageFilter';
import { Search } from './components/Search/Search';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Treemap } from './components/Treemap/Treemap';
import { ClientAction } from './interfaces/ClientAction';
import { ClientGroup } from './interfaces/ClientGroup';
import { ClientData, ClientState } from './interfaces/ClientState';
import {
  EventHandler,
  GroupColorDecoratorFunction,
} from '../interfaces/Foamtree';
import { clientReducer } from './utils/clientReducer';
import { filterPageGroups } from './utils/filterPageGroups';
import { ChunkModules, findModulesByChunk } from './utils/findModulesByChunk';
import { getInitialState } from './utils/getInitialState';
import { getQueryRegex } from './utils/getQueryRegex';

interface Props {
  data: ClientData;
}

export const Client: FunctionComponent<Props> = ({ data: baseData }) => {
  const [state, dispatch] = useReducer<ClientState, ClientAction, ClientData>(
    clientReducer,
    baseData,
    getInitialState
  );
  const {
    activeGroup,
    data,
    overflewGroup,
    searchQuery,
    selectedPageGroups,
    sidebarPinned,
  } = state;
  const colorMapRef = useRef(new Map<string, any>());
  const treemapRef = useRef<any>();
  const currentData = useMemo(
    () => filterCurrentData(data.current, selectedPageGroups),
    [data, selectedPageGroups]
  );
  const queryRegex = useMemo(() => getQueryRegex(searchQuery), [searchQuery]);
  const foundModulesByChunk = useMemo(
    () => findModulesByChunk(currentData.groups, searchQuery),
    [currentData, searchQuery]
  );
  const foundModules = useMemo(
    () => getFoundModules(foundModulesByChunk),
    [foundModulesByChunk]
  );
  const pageGroups = useMemo(
    () => filterPageGroups(baseData.groups),
    [baseData.groups]
  );
  const isSearching = !!searchQuery;

  const groupColorDecorator = useCallback<GroupColorDecoratorFunction>(
    (_, { group }, variables) => {
      const colorMap = colorMapRef.current;
      const { id } = group as ClientGroup;

      if (colorMap.has(id)) {
        variables.groupColor = { ...colorMap.get(id) };
      } else {
        colorMap.set(id, { ...variables.groupColor });
      }
    },
    []
  );

  const handleQueryChange = useCallback((query: string) => {
    dispatch({ type: 'SetSearchQueryAction', payload: query });
  }, []);

  const handleSidebarToggle = useCallback(() => {
    if (sidebarPinned) {
      setTimeout(() => treemapRef.current?.resize());
    }
  }, [sidebarPinned]);

  const handleSidebarPinStateChange = useCallback((pinned: boolean) => {
    dispatch({ type: 'SetSidebarPinnedAction', payload: pinned });
    setTimeout(() => treemapRef.current?.resize());
  }, []);

  const handleSidebarResize = useCallback(() => {
    treemapRef.current?.resize();
  }, []);

  const onGroupClick = useCallback(
    ({ group }: { group: ClientGroup }) => {
      if (group === activeGroup) {
        return;
      }
      dispatch({
        type: 'SetActiveGroupAction',
        payload: group as ClientGroup,
      });
      dispatch({
        type: 'SetDataAction',
        payload: { groups: [group] as ClientGroup[] },
      });
    },
    [activeGroup]
  );

  const onGroupHover = useCallback<EventHandler>(({ group }) => {
    dispatch({
      type: 'SetOverflewGroupAction',
      payload: group as ClientGroup,
    });
  }, []);

  const onGroupLeave = useCallback(() => {
    dispatch({
      type: 'SetOverflewGroupAction',
      payload: undefined,
    });
  }, []);

  return (
    <div className={styles.client}>
      <Sidebar
        className={styles.sidebar}
        pinned={sidebarPinned}
        onToggle={handleSidebarToggle}
        onPinStateChange={handleSidebarPinStateChange}
        onResize={handleSidebarResize}
      >
        <Search
          label="Search modules"
          query={state.searchQuery}
          autofocus
          onQueryChange={handleQueryChange}
        />
        <FoundModulesInfo
          foundModules={foundModules}
          isSearching={isSearching}
        />
        {isSearching && foundModules.length > 0 && (
          <div className={styles.foundModulesContainer}>
            {foundModulesByChunk.map(
              ({ chunkGroup, moduleGroups, parentGroups }) => (
                <div key={chunkGroup.id} className={styles.foundModulesChunk}>
                  <div
                    className={styles.foundModulesChunkName}
                    onClick={() => onGroupClick({ group: chunkGroup })}
                  >
                    {[...parentGroups, chunkGroup]
                      .map(({ label }) => label)
                      .join(' > ')}
                  </div>
                  <ModuleList
                    className={styles.foundModulesList}
                    moduleGroups={moduleGroups}
                    highlightedText={queryRegex as RegExp}
                    onModuleClick={(group) => onGroupClick({ group })}
                  />
                </div>
              )
            )}
          </div>
        )}
        <PageFilter
          pages={pageGroups}
          selectedPages={selectedPageGroups}
          onChange={(selectedPages) =>
            dispatch({
              type: 'SetSelectedPageGroupsAction',
              payload: selectedPages,
            })
          }
        />
      </Sidebar>
      <div className={styles.mapContainer}>
        {data.past.length > 0 && (
          <Button
            className={styles.backButton}
            onClick={() => dispatch({ type: 'BackAction' })}
            onMouseEnter={onGroupLeave}
          >
            <ArrowIcon orientation="left" />
          </Button>
        )}
        <Treemap
          className={styles.map}
          data={currentData}
          groupColorDecorator={groupColorDecorator}
          onGroupClick={onGroupClick as unknown as EventHandler}
          onGroupHover={onGroupHover}
          onGroupLeave={onGroupLeave}
          treemapRef={treemapRef}
        />
      </div>
      {!!overflewGroup && <DetailsTooltip group={overflewGroup} />}
    </div>
  );
};

function filterCurrentData(
  data: ClientData,
  selectedPageGroups: ClientGroup[]
): ClientData {
  return {
    groups: data.groups.filter(
      (group) =>
        !group.label.startsWith('/') || selectedPageGroups.includes(group)
    ),
  };
}

function getFoundModules(foundModulesByChunk: ChunkModules[]): ClientGroup[] {
  return foundModulesByChunk.reduce(
    (groups, chunk) => [...groups, ...chunk.moduleGroups],
    [] as ClientGroup[]
  );
}
