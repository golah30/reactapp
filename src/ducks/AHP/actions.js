import { createActions } from 'redux-actions';

const {
  setAhpMenu,
  setAhpTarget,
  setAhpStage,
  setAhpPurpose,
  setAhpCriterias,
  setAhpAlternatives,
  ahpLprRequest,
  ahpLprSuccess,
  ahpLprFailure
} = createActions(
  'SET_AHP_MENU',
  'SET_AHP_TARGET',
  'SET_AHP_STAGE',
  'SET_AHP_PURPOSE',
  'SET_AHP_CRITERIAS',
  'SET_AHP_ALTERNATIVES',
  'AHP_LPR_REQUEST',
  'AHP_LPR_SUCCESS',
  'AHP_LPR_FAILURE'
);

export {
  setAhpMenu,
  setAhpTarget,
  setAhpStage,
  setAhpPurpose,
  setAhpCriterias,
  setAhpAlternatives,
  ahpLprRequest,
  ahpLprSuccess,
  ahpLprFailure
};
