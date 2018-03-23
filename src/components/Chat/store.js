import {createStore} from 'redux';


const initialState = {
    messages: [{
        name: 'Author',
        image: '../../assets/img/bg-login.jpg',
        message: 'Quickly! Nigga!',
        sender: false
    }, {
        name: 'Author',
        image: '../../assets/img/ava.png',
        message: 'Where is my internet?',
        sender: true
    }, {
        name: 'Author',
        image: '../../assets/img/bg-login.jpg',
        message: "Hello! I'll looking it...",
        sender: false
    }]
};


// Store
const store = createStore((state = initialState, action) => {
    switch(action.type){

        // Reducer
        case "ADD_NEW_MESSAGE": {
            state.messages.push({
                message: action.message,
                sender: action.sender,
                image: action.image
            });
            return Object.assign(state, {
                messages: state.messages
            })
        }
        //Reducer

        default: {
            return state;
        }
    }
});

export default store;