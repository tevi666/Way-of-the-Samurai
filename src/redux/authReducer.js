import { stopSubmit } from "redux-form";
import { authAPI, securityApi } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};


export const setAuthUserData = (id, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: { id, login, email, isAuth }
});
export const getCaptchUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl }
});
export const getAuthUserData = () => async (dispatch) => {
    let res = await authAPI.me();
    if (res.data.resultCode === 0) {
        let { id, login, email } = res.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
};
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let res = await authAPI.login(email, password, rememberMe, captcha);
    if (res.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (res.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error';
        dispatch(stopSubmit("login", { _error: message }));
    }
};
export const getCaptchaUrl = () => async (dispatch) => {
    let res = await securityApi.getCaptchaUrl();
    const captchUrl = res.data.url;
    dispatch(getCaptchUrlSuccess(captchUrl));
};
export const logout = () => async (dispatch) => {
    let res = await authAPI.logout();
    if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export default authReducer;