import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });
        const res = await axios.get(`${server}/user/getuser`, {
            withCredentials: true,
        });
        dispatch({
            type: "LoadUserSuccess",
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error.res,
        });
    }
};


// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllUsersRequest",
        });

        const res = await axios.get(`${server}/user/getAlluser`, {
            withCredentials: true,
        });

        dispatch({
            type: "getAllUsersSuccess",
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: "getAllUsersFailed",
            payload: error.res,
        });
    }
};
