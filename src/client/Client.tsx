import { FunctionComponent } from 'preact';
import { useCallback, useReducer, useRef } from 'preact/compat';
import styles from './Client.module.scss';
import { BackButton } from './components/BackButton/BackButton';
import { Treemap } from './components/Treemap/Treemap';
import {
  BACK_ACTION,
  SET_ACTIVE_GROUP_ACTION,
  SET_DATA_ACTION,
  SET_OVERFLEW_GROUP_ACTION,
} from './interfaces/ClientAction';
import {
  EventHandler,
  GroupColorDecoratorFunction,
} from '../interfaces/Foamtree';
import { clientReducer } from './utils/clientReducer';
import { ClientGroup } from './interfaces/ClientGroup';
import { DetailsTooltip } from './components/DetailsTooltip/DetailsTooltip';
import { ClientData } from './interfaces/ClientState';
import { getInitialState } from './utils/getInitialState';

interface Props {
  data: ClientData;
}

export const Client: FunctionComponent<Props> = ({ data: baseData }) => {
  const [state, dispatch] = useReducer(
    clientReducer,
    baseData,
    getInitialState
  );
  const { activeGroup, data, overflewGroup } = state;
  const colorMapRef = useRef(new Map<string, any>());

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

  const onGroupClick = useCallback<EventHandler>(
    ({ group }) => {
      if (group === activeGroup) {
        return;
      }
      dispatch({
        type: SET_ACTIVE_GROUP_ACTION,
        payload: group as ClientGroup,
      });
      dispatch({
        type: SET_DATA_ACTION,
        payload: { groups: [group] as ClientGroup[] },
      });
    },
    [activeGroup]
  );

  const onGroupHover = useCallback<EventHandler>(({ group }) => {
    dispatch({
      type: SET_OVERFLEW_GROUP_ACTION,
      payload: group as ClientGroup,
    });
  }, []);

  const onGroupLeave = useCallback(() => {
    dispatch({
      type: SET_OVERFLEW_GROUP_ACTION,
      payload: undefined,
    });
  }, []);

  return (
    <>
      {data.past.length > 0 && (
        <BackButton
          className={styles.backButton}
          onClick={() => dispatch({ type: BACK_ACTION })}
          onMouseEnter={onGroupLeave}
        />
      )}
      <Treemap
        className={styles.map}
        data={data.current}
        groupColorDecorator={groupColorDecorator}
        onGroupClick={onGroupClick}
        onGroupHover={onGroupHover}
        onGroupLeave={onGroupLeave}
      />
      {!!overflewGroup && <DetailsTooltip group={overflewGroup} />}
    </>
  );
};
