import './Posts.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPosts } from './PostsSlice';
import { useParams } from 'react-router-dom';
import { selectCommunities } from '../communities/CommunitiesSlice';

export default function Post() {
    const posts = useSelector(selectPosts);
    const communities = useSelector(selectCommunities)
    let { postId } = useParams();
    const { author, community, title, content } = posts[postId];
    const communityName = communities[community].name;

    return (
        <section>
            <header className='pageHeader'>
                <h1>{title}</h1>
                <Link to='/' className='closePage'><button>X</button></Link>
            </header>
            <div className='postDetailed'>
                <p className='postMeta'>Posted by {author} in <span className='metaHighlight'>r/{communityName}</span></p>
                <p className='postContent'>{content}</p>
            </div>
        </section>
    )
}