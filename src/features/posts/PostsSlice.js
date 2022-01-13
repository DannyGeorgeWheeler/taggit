import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (data, {rejectWithValue}) => {
    try {
        const posts = {};

        let response = await data.map(async community => {
            return await fetch(`https://www.reddit.com/r/${community}/.json`);
        });

        response = await Promise.all(response);

        let json = await response.map(async community => {
            return await community.json();
        })
        json = await Promise.all(json);

        json.forEach(community => community.data.children.forEach(post => {
            const images = [];
            let video = '';

            if(post.data['is_video']) {
                video = post.data.media['reddit_video']['fallback_url'];

            } else if(post.data['is_gallery'] || post.data['media_metadata'] !== undefined){
                Object.keys(post.data['media_metadata']).forEach(img => {
                    images.push({
                        source: fixImgUrl(post.data['media_metadata'][img].s.u),
                    })
                });

            } else if(post.data['is_reddit_media_domain']) {
                images.push({
                    source: fixImgUrl(post.data.url),
                });
            }


            posts[post.data.id] = {
                id: post.data.id,
                author: post.data.author,
                community: post.data.subreddit,
                title: post.data.title,
                content: post.data.selftext,
                permalink: `https://www.reddit.com${post.data.permalink}.json`,
                comments: [],
                numComments: post.data['num_comments'],
                ups: post.data.ups,
                time: post.data.created,
                images: images,
                video: video,
            }
        }));

        return posts;    

    } catch (error) {
        return rejectWithValue(error);
    }
});

const fixImgUrl = url => {
    const newUrl = url.replace(/&amp;/g, '&');
    return newUrl;
}

export const fetchComments = createAsyncThunk('posts/fetchComments', async (post, {rejectWithValue}) => {
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
        comment.data.replies.data.children.forEach(reply => obj.replies.push(processComment(reply)));
    };
    return obj;
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
        [fetchPosts.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            const newPosts = action.payload;
            Object.keys(newPosts).map(id => {
                return state.posts[id] = newPosts[id];
            });
        },
        [fetchPosts.rejected]: (state, action) => {
            console.log(`rejected`, action.payload);
        },
        [fetchComments.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            const { postId, messages } = action.payload;
            state.posts[postId].comments = messages;
        },
        [fetchComments.rejected]: (state, action) => {
            console.log(`rejected`, action.payload);
        }

    }
})


export const { addPost } = postsSlice.actions;
export const selectPosts = state => state.posts.posts;
export default postsSlice.reducer;