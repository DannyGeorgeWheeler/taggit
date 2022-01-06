import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (data, {rejectWithValue}) => {
    try {
        const posts = {};

        console.log(`data: ${data}`);

        let response = await data.map(async community => {
            return await fetch(`https://www.reddit.com/r/${community}/.json`);
        });

        console.log(response);

        response = await Promise.all(response);

        console.log(response);

        let json = await response.map(async community => {
            return await community.json();
        })
        json = await Promise.all(json);

        json.forEach(community => community.data.children.forEach(post => {
            posts[post.data.id] = {
                id: post.data.id,
                author: post.data.author,
                community: post.data.subreddit,
                title: post.data.title,
                content: post.data.selftext,
                permalink: `https://www.reddit.com${post.data.permalink}.json`,
                comments: [],
            }
        }));

        // const test = await data.map(async community => {
        //     console.log(`community: ${community}`);
        //     const response = await fetch(`https://www.reddit.com/r/${community}/.json`);
        //     const json = await response.json();
        //     json.data.children.forEach(post => {
        //         posts[post.data.id] = {
        //             id: post.data.id,
        //             author: post.data.author,
        //             community: post.data.subreddit,
        //             title: post.data.title,
        //             content: post.data.selftext,
        //             permalink: `https://www.reddit.com${post.data.permalink}.json`,
        //             comments: [],
        //         }
        //     });
        //     return true;    
        // })
        console.log(posts);
        return posts;    

    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchComments = createAsyncThunk('posts/fetchComments', async (post, {rejectWithValue}) => {
    console.log('fetching comments');
    try {
        const response = await fetch(post.permalink);
        const json = await response.json();
        const comments = [];
        json[1].data.children.forEach(comment => {
            comments.push(processComment(comment));
        });
        return {postId: post.id, messages: comments};  

    } catch (error) {
        return rejectWithValue(error);
    }
});

const processComment = comment => {
    const obj = {
        id: comment.data.id,
        author: comment.data.author,
        body: comment.data.body,
        replies: [],
    };
    if (comment.data.replies !== '' && comment.kind === 't1') {
        console.log(comment.data.replies);
        comment.data.replies.data.children.forEach(reply => obj.replies.push(processComment(reply)));
        console.log('processed replies');
    };
    return obj;
}


const tempPosts = {
    id1: {
        id: 'id1',
        author: 'Danny',
        community: 'giantbomb',
        title: 'Giant Bomb is doing weird stuff...',
        content: 'This is a block of text about how giant bomb has changed man, and is doing really weird stuff lately.',
        comments: []    
    },
}


export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: {},
        status: 'idle',
    },
    reducers: {
        addPost: (state, action) => {
            const { id } = action.payload;
            state.posts[id] = action.payload;
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            const newPosts = action.payload;
            console.log('newposts');
            console.log(Object.keys(newPosts));
            Object.keys(newPosts).map(id => {
                console.log(`id: ${id}`);
                state.posts[id] = newPosts[id];
            });
            console.log(current(state.posts));
            //action.payload.map(post => state.posts[post.id] = post);
            // console.log(current(state.posts));
            // console.log('got the posts');
        },
        [fetchPosts.rejected]: (state, action) => {
            console.log(`rejected`, action.payload);
        },
        [fetchComments.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            const { postId, messages } = action.payload;
            state.posts[postId].comments = messages;
            console.log(current(state.posts));
        },
        [fetchComments.rejected]: (state, action) => {
            console.log(`rejected`, action.payload);
        }

    }
})


export const { addPost } = postsSlice.actions;
export const selectPosts = state => state.posts.posts;
export default postsSlice.reducer;