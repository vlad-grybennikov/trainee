import { createStore } from 'redux';

const ACTIONS = {
    ADD_NEW_EX: 'ADD_NEW_EX',
    UPDATE_EX: 'UPDATE_EX',
    DELETE_EX: 'DELETE_EX'
};

const initialState = {
    exercises : [{
        name: 'exercise 1',
        checked: false,
        time:null
    },{
        name: 'exercise 2',
        checked: false,
        time:null
    },{
        name: 'exercise 3',
        checked: false,
        time:null
    }]
};

const store = createStore((state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_NEW_EX: {
            return {
                exercises: [...state.exercises, {
                    name: action.name
                }]
            }
        }

        case ACTIONS.UPDATE_EX : {
            return {
                exercises: action.checked
            }
        }

        case ACTIONS.DELETE_EX: {
            return {
                exercises: state.exercises.filter(exercise => action.name !== exercise.name)
            }
        }

        default:
            return state;
    }
});

export default store;