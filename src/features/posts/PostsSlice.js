import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (data, {rejectWithValue}) => {
    try {
        const posts = {};
        const limit = Math.floor(30 / data.length);

        console.log(`limit: ${limit}`);

        let response = await data.map(async community => {
            return await fetch(`https://www.reddit.com/r/${community}/.json?limit=${limit}`);
        });

        response = await Promise.all(response);

        let json = await response.map(async community => {
            return await community.json();
        })
        json = await Promise.all(json);

        json.forEach(community => {
            if (community.data) {
                console.log(community.data);
                community.data.children.forEach(post => {
                    console.log(post);
                    const images = [];
                    let video = '';
        
                    if(post.data['is_video']) {
                        video = post.data.media['reddit_video']['fallback_url'];
        
                    } else if(post.data['is_gallery'] || post.data['media_metadata'] !== undefined){
                        Object.keys(post.data['media_metadata']).forEach(img => {
                            if (post.data['media_metadata'][img].e !== 'RedditVideo') {
                                images.push({
                                    source: fixImgUrl(post.data['media_metadata'][img].s.u),
                                })
                            }
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
                });
            }
        });

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
        comments: 'idle'
    },
    reducers: {
        addPost: (state, action) => {
            const { id } = action.payload;
            state.posts[id] = action.payload;
        },
        setIdle: (state) => {
            state.status = 'idle';
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.status = 'loading';
            state.posts = {};
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'loaded';
            // const newPosts = action.payload;
            // Object.keys(newPosts).map(id => {
            //     return state.posts[id] = newPosts[id];
            // });

            state.posts = action.payload;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'rejected';
            console.log(`rejected`, action.payload);
        },
        [fetchComments.pending]: (state) => {
            state.comments = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments = 'loaded';
            const { postId, messages } = action.payload;
            state.posts[postId].comments = messages;
        },
        [fetchComments.rejected]: (state, action) => {
            state.comments = 'rejected';
            console.log(`rejected`, action.payload);
        }

    }
})


export const { addPost, setIdle } = postsSlice.actions;
export const selectPosts = state => state.posts.posts;
export const selectStatus = state => state.posts.status;
export default postsSlice.reducer;