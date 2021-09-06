import { ClientData, ClientState } from '../interfaces/ClientState';

export function getInitialState(data: ClientData): ClientState {
  return {
    activeGroup: undefined,
    overflewGroup: undefined,
    data: {
      past: [],
      current: data,
    },
  };
}
