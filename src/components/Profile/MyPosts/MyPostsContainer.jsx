import { connect } from "react-redux";
import { addPostActionCreator } from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";

const DialogsContainer = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(addPostActionCreator(newPostText));
    }
  };
};

const MyPostsContainer = connect(DialogsContainer, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;