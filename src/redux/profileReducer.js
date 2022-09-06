import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';


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
        default: return state;
    }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
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
}

export default profileReducer;