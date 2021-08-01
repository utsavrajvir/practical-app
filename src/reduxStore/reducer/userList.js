import * as types from '../types/userList';

const initialState = {
    userList: [],
    editInformation: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER_LIST:
            return {
                ...state,
                userList: action.payload.userList,
            };
        case types.SET_EDIT_INFORMATION:
            return{
                ...state,
                editInformation: action.payload.editInformation
            }
        default:
            return state;
    }
};
