import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/Preloader/FormsControls/FormsControls";

const MyPosts = React.memo((props) => {

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>{
        [...props.posts]
        .reverse()
        .map((p) => <Post key={p.id} message={p.message} likesCount={p.likesCount} />)
      }
      </div>
    </div>
  );
});
const maxLength10 = maxLengthCreator(10);

const addNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name='newPostText' component={Textarea} placeholder='Post message' validate={[required, maxLength10]} />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}
const AddNewPostFormRedux = reduxForm({ form: 'profileAddNewPostForm' })(addNewPostForm)

export default MyPosts;