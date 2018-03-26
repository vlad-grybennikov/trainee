import { createStore } from 'redux';

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

const initialState = {
    users: []
};

const store = createStore((state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_NEW_USER: {
            return {
                users: [...state.users, {
                    name: action.name,
                    age: action.age,
                    id: action.id
                }]
            }
        }

        case ACTIONS.UPDATE_USERS : {
            return {
                users: action.users
            }
        }

            case ACTIONS.DELETE_USER: {
                return {
                    users: [...state.users.filter(user => action.id !== user.id)]
                }
            }

        default:
            return state;
    }
});

export default store;