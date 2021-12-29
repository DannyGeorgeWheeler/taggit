import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts/PostsSlice';
import tagsReducer from '../features/tags/TagsSlice';
import communitiesReducer from '..//features/communities/CommunitiesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    tags: tagsReducer,
    communities: communitiesReducer,
  },
});
