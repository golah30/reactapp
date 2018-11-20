import { handleActions } from 'redux-actions';
import { setAhpStage } from '../actions';

export default handleActions(
  {
    [setAhpStage]: (state, action) => ({
      main: action.payload.main,
      isSub: action.payload.isSub,
      sub: action.payload.sub
    })
  },
  {
    main: 0,
    isSub: false,
    sub: 0
  }
);
