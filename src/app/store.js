import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/PostsSlice';
import tagsReducer from '../features/tags/TagsSlice';
import communitiesReducer from '..//features/communities/CommunitiesSlice';
import searchReducer from '../features/search/SearchSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { 
  persistReducer} from 'redux-persist';

const reducers = combineReducers({
  posts: postsReducer,
  tags: tagsReducer,
  communities: communitiesReducer,
  search: searchReducer,
});

const persistConfig = {
  key: 'posts',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});
