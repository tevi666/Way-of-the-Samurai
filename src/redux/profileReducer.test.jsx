import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

let state = {
    posts: [
        { id: 1, message: "Hello, Neo!", likesCount: 12 },
        { id: 2, message: "Choose wisely...", likesCount: 10 }
    ],
};

it('length of posts should be incremented', () => {
    //1. test data
    let action = addPostActionCreator('hello friend');
    // 2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(3);
});
it('message of new post should be correct', () => {
    //1. test data
    let action = addPostActionCreator('hello friend');
    // 2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts[2].message).toBe('hello friend');
});
it('after deleting length of messages should be decremented', () => {
    //1. test data
    let action = deletePost(1);
    // 2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(2);
});
it(`after deleting length of messages shouldn't be decremented if id is incorrect`, () => {
    //1. test data
    let action = deletePost(1000);
    // 2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(2);
});
