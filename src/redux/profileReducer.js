import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


const initialState = {
    posts: [
        { id: 1, message: "Hello, Neo!", likesCount: 12 },
        { id: 2, message: "Choose wisely...", likesCount: 10 }
    ],
    profile: null,
    status: ''
};
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(post => post.id != action.id) };
        case SAVE_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photos } };
        default: return state;
    }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });
export const getUserProfile = (userId) => async (dispatch) => {
    let res = await usersAPI.userId(userId);
    dispatch(setUserProfile(res.data));
};
export const getStatus = (userId) => async (dispatch) => {
    let res = await profileAPI.getStatus(userId);
    dispatch(setStatus(res.data));
};
export const updateStatus = (status) => async (dispatch) => {
    try {
        let res = await profileAPI.updateStatus(status);
        if (res.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (e) {
        //
    }
};
export const savePhoto = (file) => async (dispatch) => {
    try {
        let res = await profileAPI.savePhoto(file);
        if (res.data.resultCode === 0) {
            dispatch(savePhotoSuccess(res.data.data.photos));
        }
    } catch (e) {
        //
    }
};
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
        let res = await profileAPI.saveProfile(profile);
        if (res.data.resultCode === 0) {
            dispatch(getUserProfile(userId));
        } else {
            dispatch(stopSubmit('login', {_error: res.data.messages[0]}));
        }
    } catch (e) {
        //
    }
};

export default profileReducer;