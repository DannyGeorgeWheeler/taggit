import './Posts.css';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPosts, fetchPost } from './PostsSlice';
import { useParams } from 'react-router-dom';
import { selectCommunities } from '../communities/CommunitiesSlice';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


export default function Post() {
    const posts = useSelector(selectPosts);
    const communities = useSelector(selectCommunities)
    let { postId } = useParams();
    const { author, community, title, content, comments } = posts[postId];
    const communityName = communities[community].name;
    const dispatch = useDispatch();

    useEffect(() => {
        const test = dispatch(fetchPost(posts[postId]));
        console.log(test);
    }, []);

    return (
        <section>
            <header className='pageHeader'>
                <h1>{title}</h1>
                <Link to='/' className='closePage'><button>X</button></Link>
            </header>
            <div className='postDetailed'>
                <h3 className='postMeta'>Posted by <span className='author'>{author}</span> in <span className='metaHighlight'>r/{communityName}</span></h3>
                <p className='postContent'>{content}</p>
                <div className='comments'>
                    <h2>Comments</h2>
                    {comments.map(comment => {
                        return (
                            <div className='comment' key={comment.id}>
                                <h3><span className='author'>{comment.author}</span> says:</h3>
                                <ReactMarkdown children={comment.body} remarkPlugins={[remarkGfm]}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}