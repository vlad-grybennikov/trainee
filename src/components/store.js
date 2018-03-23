import {createStore} from 'react-redux';

const chatStore = {
    rooms: [{
        users: [{
            message: {
                time: 222222222,
                comments: [
                    {
                        text: 'fafafa',
                        user: {
                            //...
                        }
                    }
                ]
            }
        }],
    }]
}

const initialStore = {
    messages: [
        {
            author: '',
            message: '',
            image: '',
        }
    ]
};


// Action Creator - возвращает action
const actionMessage = (data) => {
    return {
        type: "ADD_NEW_MESSAGE",
        message: data.message,
        author: data.author,
        image: data.image,
        time: data.time
    }
}

let store = {
    users: [{
        name: "Piter",
        posts: [{
            comments: [{
                user: {
                    name: "Bob"
                }
            }]

        }]
    }]
}
// Store
const store = createStore(initialStore, (action, store) => {
    switch(action.type){

        // Reducer
        case "ADD_NEW_MESSAGE": {
            store.messages.push(action.message);
            return Object.assign(store, {
                messages: store.messages
            })
        }
        //Reducer

        default: {
            return store;
        }
    }
})

store.dispatch(actionMessage({
    message: "afafafafa",
    time: '10:00'
}))

this.unsubscribe = store.subscribe(() => {
    let store = store.getStore();
    this.setState({
        // ...
    })
});