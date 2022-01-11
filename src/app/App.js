import React from 'react';
import { BrowserRouter as Router, Route, Outlet, NavLink, Routes } from 'react-router-dom';
import './App.css';
import { faTag, faHome } from '@fortawesome/free-solid-svg-icons';
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Posts from '../features/posts/Posts';
import TagsFilter from '../features/tags/TagsFilter';
import Communities from '../features/communities/Communities';
import Post from '../features/posts/Post';
import SearchBar from '../features/search/SearchBar';
import SearchResults from '../features/search/SearchResults';

function App() {
  return (
    <Router>
      <nav>
        <div className='navInner'>
          <NavLink to='/' className='linkButton' id='homeButton'><FontAwesomeIcon icon={faHome} /></NavLink>
          <NavLink to='/tags' className='linkButton' id='tagsButton'><FontAwesomeIcon icon={faTag} /></NavLink>
          <NavLink to='/communities' className='linkButton' id='communitiesButton'><FontAwesomeIcon icon={faReddit} /></NavLink>
          <SearchBar />
        </div>
      </nav>
      <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/tags' element={<TagsFilter />} />
          <Route path='/communities' element={<Communities />} />
          <Route path='/post/:postId' element={<Post />} />
          <Route path='/search' element={<SearchResults />} />
      </Routes>
      <Outlet />
    </Router>
  );
}

export default App;
