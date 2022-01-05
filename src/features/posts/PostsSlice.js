import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (data, thunkAPI) => {
    const response = await fetch('https://www.reddit.com/r/giantbomb/.json');
    const json = await response.json();
    const posts = {};
    json.data.children.forEach(post => {
        posts[post.data.id] = {
            id: post.data.id,
            author: post.data.author,
            community: post.data.subreddit,
            title: post.data.title,
            content: post.data.selftext,
            permalink: `https://www.reddit.com${post.data.permalink}.json`,
            comments: [],
        }
    });
    return posts;
});

export const fetchPost = createAsyncThunk('posts/fetchPost', async (post, thunkAPI) => {
    const response = await fetch(post.permalink);
    const json = await response.json();
    const messages = [];
    json[1].data.children.forEach(message => {
        messages.push({
            id: message.data.id,
            author: message.data.author,
            body: message.data.body,
        });
    });
    return {postId: post.id, messages: messages};
})


const tempPosts = {
    id1: {
        id: 'id1',
        author: 'Danny',
        community: 'giantbomb',
        title: 'Giant Bomb is doing weird stuff...',
        content: 'This is a block of text about how giant bomb has changed man, and is doing really weird stuff lately.'    
    },

    id2: {
        id: 'id2',
        author: 'Tulu',
        community: 'babiesId',
        title: 'I\'m feeling so full',
        content: 'Lately it feels like i will pop if im not careful about it.  Does anyone else get this feeling or is it just me? I hope my baby atlas doesn\'t get too big for his little home in my tummy.'    
    }
}


export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: tempPosts,
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
            state.posts = action.payload;
            console.log(state.posts);
        },
        [fetchPosts.rejected]: (state, action) => {
            console.log('rejected');
        },
        [fetchPost.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchPost.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            const { postId, messages } = action.payload;
            state.posts[postId].comments = messages;
            console.log(current(state.posts));
            //state.posts = action.payload;
        },
        [fetchPost.rejected]: (state, action) => {
            console.log('rejected');
        }

    }
})


export const { addPost } = postsSlice.actions;
export const selectPosts = state => state.posts.posts;
export default postsSlice.reducer;