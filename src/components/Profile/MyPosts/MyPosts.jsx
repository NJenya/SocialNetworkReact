import React from 'react';
import s from './MyPosts.module.scss';
import Post from './Post/Post';

const MyPosts = (props) => {
  let postElement = props.postsData //stateProfile.postsData
    .map (p => <Post message={p.message} key={p.id} />);

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
    //props.dispatch(addPostActionCreator()); //return {type: ADD_POST}
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
    //props.dispatch(updateNewPostTextActionCreator(text)); //return {type: UPDATE_NEW_POST_TEXT, newText: text}
  }
  return (
    <div className={s.MyPosts}>
      <div className={s.newPostInput}>
        <textarea 
          onChange={onPostChange} 
          ref={newPostElement} 
          value={props.newPostText} 
          placeholder="Что у вас нового?"
        />
        <button onClick={onAddPost}>Send</button>
      </div>
      <div className={s.posts}>
        {postElement}
      </div>
    </div>

  );
};

export default MyPosts;