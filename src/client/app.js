/* eslint-disable no-console */

import 'babel-polyfill';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';

document.querySelector('.app').innerText = 'hello redux';

const data = {
  todos: [{
    text: 'Eat food',
    completed: true,
  }, {
    text: 'Exercise',
    completed: false,
  }],
  visibilityFilter: 'SHOW_COMPLETED',
};

function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

function todos(state = data.todos, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true,
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

const reducer = combineReducers({ visibilityFilter, todos });
const logger = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(logger)
);

store.dispatch({ type: 'ADD_TODO', text: 'foobar' });
