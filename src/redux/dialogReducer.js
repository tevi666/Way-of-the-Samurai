const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Andrew" },
        { id: 3, name: "Sveta" },
    ],
    messages: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Wellcome to a brand new React world!" },
    ]
};

const dialogReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 5, message: body }]
            };
        default:
            return state;
    }
};

export const sendMessageActionCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });

export default dialogReducer;