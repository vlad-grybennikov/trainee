import { createStore, combineReducers } from 'redux';

const users = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.ADD_NEW_USER: {
            return [...state, {
                    name: action.name,
                    age: action.age,
                    id: action.id
                }]
        }

        case ACTIONS.UPDATE_USERS : {
            return action.users
        }

        case ACTIONS.DELETE_USER: {
            return [...state.filter(
                user => action.id !== user.id
            )]
        }
            //case TOGGLE: {
            //    return state.exercise.map((ex) => {
            //        if(action.id === ex.id) ex.checked = !ex.checked;
            //    })
            //}

        default:
            return state;
    }
};

const ACTIONS = {
    "ADD_NEW_USER": "ADD_NEW_USER",
    'UPDATE_USERS': 'UPDATE_USERS',
    DELETE_USER: 'DELETE_USER'
};


export const getUsers = () => {
    return fetch('https://test-users-api.herokuapp.com/users')
        .then((res) => res.json())
        .then((data) => {
            store.dispatch({
                type: ACTIONS.UPDATE_USERS,
                users: data.data
            });
        })
}


const store = createStore(combineReducers({
    users,
    //exercises
}));


export default store;

