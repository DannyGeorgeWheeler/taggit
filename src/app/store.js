import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer, PERSIST } from 'redux-persist';

import postsReducer from '../features/posts/PostsSlice';
import tagsReducer from '../features/tags/TagsSlice';
import communitiesReducer from '../features/communities/CommunitiesSlice';
import searchReducer from '../features/search/SearchSlice';


const reducers = combineReducers({
  posts: postsReducer,
  tags: tagsReducer,
  communities: communitiesReducer,
  search: searchReducer,
});

const persistConfig = {
  key: 'posts',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST]
    }
  })
});
