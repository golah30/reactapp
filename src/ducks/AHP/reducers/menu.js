import { handleActions } from 'redux-actions';
import { setAhpMenu } from '../actions';

export default handleActions(
  {
    [setAhpMenu]: (state, action) => action.payload
  },
  [
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
      route: '/ahp/compare/0',
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
);
