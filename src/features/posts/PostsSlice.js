import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: {}
    },
    reducers: {
        getPosts: (state, action) => {
            console.log('get posts from reddit api.')
        }
    }
})

const posts = {
    0: {
        id: 0,
        author: 'Danny',
        community: 'giantbombId',
        title: 'Giant Bomb is doing weird stuff...',
        content: 'This is a block of text about how giant bomb has changed man, and is doing really weird stuff lately.'    
    },

    1: {
        id: 1,
        author: 'Tulu',
        community: 'babiesId',
        title: 'I\'m feeling so full',
        content: 'Lately it feels like i will pop if im not careful about it.  Does anyone else get this feeling or is it just me? I hope my baby atlas doesn\'t get too big for his little home in my tummy.'    
    }
}

export const selectPosts = state => posts;
export default postsSlice.reducer;