import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css";
import { useRef } from "react";

const MyPosts = (props) => {

  let ref = useRef(null);

  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = ref.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea
            onChange={onPostChange}
            ref={ref}
            value={props.newPostText}
          />
        </div>
        <div>
          <button onClick={onAddPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>{
        props.posts.map((p) => <Post key={p.id} message={p.message} likesCount={p.likesCount} />)
      }
      </div>
    </div>
  );
};

export default MyPosts;
