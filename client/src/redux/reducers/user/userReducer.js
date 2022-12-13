const initialState = {
    myblogs: [],
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_USER_BLOGS":
            return {
                ...state,
                myblogs: payload,
            };
        default:
            return state;
    }
};
export default userReducer;
