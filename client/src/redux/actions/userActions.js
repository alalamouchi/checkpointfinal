import axios from "axios";
export const getMyBlogs = (payload) => (dispatch) => {
    axios
        .get(`/api/user/myBlogs/${payload.id}`, {
            headers: {
                jwt: payload.token,
            },
        })
        .then((res) => {
            dispatch({ type: "GET_USER_BLOGS", payload: res.data.blogs });
        })
        .catch((err) => console.log(err));
};
