import { FunctionComponent } from 'preact';
import { useCallback, useMemo, useReducer, useRef } from 'preact/compat';
import styles from './Client.module.scss';
import { ArrowIcon } from './components/ArrowIcon';
import { Button } from './components/Button/Button';
import { Search } from './components/Search/Search';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Treemap } from './components/Treemap/Treemap';
import {
  EventHandler,
  GroupColorDecoratorFunction,
} from '../interfaces/Foamtree';
import { clientReducer } from './utils/clientReducer';
import { ClientGroup } from './interfaces/ClientGroup';
import { DetailsTooltip } from './components/DetailsTooltip/DetailsTooltip';
import { ClientAction } from './interfaces/ClientAction';
import { ClientData, ClientState } from './interfaces/ClientState';
import { getInitialState } from './utils/getInitialState';
import { findModulesByChunk } from './utils/findModulesByChunk';
import { FoundModulesInfo } from './components/FoundModulesInfo/FoundModulesInfo';
import { ModuleList } from './components/ModuleList/ModuleList';
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
  const { activeGroup, data, overflewGroup, searchQuery, sidebarPinned } =
    state;
  const colorMapRef = useRef(new Map<string, any>());
  const treemapRef = useRef<any>();
  const queryRegex = useMemo(() => getQueryRegex(searchQuery), [searchQuery]);
  const foundModulesByChunk = useMemo(
    () => findModulesByChunk(data.current.groups, searchQuery),
    [data, searchQuery]
  );
  const foundModules = useMemo(
    () =>
      foundModulesByChunk.reduce(
        (arr, chunk) => [...arr, ...chunk.moduleGroups],
        [] as ClientGroup[]
      ),
    [foundModulesByChunk]
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
          data={data.current}
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
