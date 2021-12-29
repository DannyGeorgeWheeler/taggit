import React from 'react';
import { BrowserRouter as Router, Route, Outlet, NavLink, Routes } from 'react-router-dom';
import './App.css';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Posts from '../features/posts/Posts';

function App() {
  return (
    <Router>
      <nav>
        <NavLink to='/tags' className='linkButton' id='tagsButton'><FontAwesomeIcon icon={faTag} /></NavLink>
        <input type='text' id='search' placeholder='Search Reddit'/>
        <NavLink to='/communities' className='linkButton' id='communitiesButton'><FontAwesomeIcon icon={faReddit} /></NavLink>
      </nav>
      <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/tags' element={<h1>Tags</h1>} />
          <Route path='/communities' element={<h1>Communities</h1>} />
          <Route path='/post' element={<h1>Post</h1>} />
      </Routes>
      <Outlet />
    </Router>
  );
}

export default App;
