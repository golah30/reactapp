import { createActions } from 'redux-actions';

const { setAhpMenu, setAhpTarget, setAhpStage, setAhpPurpose } = createActions(
  'SET_AHP_MENU',
  'SET_AHP_TARGET',
  'SET_AHP_STAGE',
  'SET_AHP_PURPOSE'
);

export { setAhpMenu, setAhpTarget, setAhpStage, setAhpPurpose };
