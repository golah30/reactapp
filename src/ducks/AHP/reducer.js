import { handleActions } from 'redux-actions';
import {
  setAhpMenu,
  setAhpStage,
  setAhpTarget,
  setAhpPurpose,
  setAhpCriterias,
  setAhpAlternatives
} from './actions';

export default handleActions(
  {
    [setAhpMenu]: (state, action) => ({
      ...state,
      menu: action.payload
    }),
    [setAhpStage]: (state, action) => ({
      ...state,
      stage: action.payload
    }),
    [setAhpTarget]: (state, action) => ({ ...state, target: action.payload }),
    [setAhpPurpose]: (state, action) => ({ ...state, purpose: action.payload }),
    [setAhpCriterias]: (state, action) => ({
      ...state,
      criterias: action.payload
    }),
    [setAhpAlternatives]: (state, action) => ({
      ...state,
      alternatives: action.payload
    })
  },
  {
    target: '',
    purpose: { target: '', comment: '' },
    criterias: [],
    alternatives: [],
    stage: 0,
    menu: [
      {
        title: 'Начало',
        route: '/ahp/begin',
        childrens: [],
        isAvailable: true,
        isSubItem: false
      },
      {
        title: 'Ввод данных',
        route: '/ahp/input',
        childrens: [],
        isAvailable: false,
        isSubItem: false
      },
      {
        title: 'Парные сравнения критериев',
        route: '/ahp/compare-criteria',
        childrens: [],
        isAvailable: false,
        isSubItem: false
      },
      {
        title: 'Парные сравнения альтернатив',
        route: '',
        childrens: [],
        isAvailable: false,
        isSubItem: false
      },
      {
        title: 'Результат',
        route: '/ahp/result',
        childrens: [],
        isAvailable: false,
        isSubItem: false
      }
    ]
  }
);
