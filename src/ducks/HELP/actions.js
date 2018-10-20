import { createActions } from 'redux-actions';

const { helpRequest, helpSuccess, helpFailure } = createActions(
  'HELP_REQUEST',
  'HELP_SUCCESS',
  'HELP_FAILURE'
);

export { helpRequest, helpSuccess, helpFailure };
