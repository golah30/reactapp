import { createActions } from 'redux-actions';

const {
  setAhpMenu,
  setAhpTarget,
  setAhpStage,
  setAhpPurpose,
  setAhpCriterias,
  setAhpAlternatives
} = createActions(
  'SET_AHP_MENU',
  'SET_AHP_TARGET',
  'SET_AHP_STAGE',
  'SET_AHP_PURPOSE',
  'SET_AHP_CRITERIAS',
  'SET_AHP_ALTERNATIVES'
);

export {
  setAhpMenu,
  setAhpTarget,
  setAhpStage,
  setAhpPurpose,
  setAhpCriterias,
  setAhpAlternatives
};
