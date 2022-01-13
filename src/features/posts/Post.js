import './Posts.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPosts, fetchComments } from './PostsSlice';
import { useParams } from 'react-router-dom';
import { selectCommunities } from '../communities/CommunitiesSlice';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Comment from './Comments';
import Gallery from '../gallery/Gallery';

export default function Post() {
    const posts = useSelector(selectPosts);
    const communities = useSelector(selectCommunities)
    let { postId } = useParams();
    const { author, community, title, content, comments, images, video } = posts[postId];
    const communityName = communities[community].name;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchComments(posts[postId]));
    }, []);

    return (
        <section>
            <div className='postDetailed'>
                <h1>{title}</h1>
                <h3 className='postMeta'>Posted by <span className='author'>{author}</span> in <span className='metaHighlight'>r/{communityName}</span></h3>
                {images.length === 1 && <a href={images[0].source} target='_blank' rel='noopener noreferrer'><img className='detailedImage' src={images[0].source} alt='' /></a>}
                {images.length > 1 && <Gallery images={images}/>}
                {video.length > 0 && <video className='summaryImage' src={video} alt='' controls/>}
                <ReactMarkdown className='postContent' children={content} remarkPlugins={[remarkGfm]}/>
                <div className='comments'>
                    <h2>Comments</h2>
                    {comments.length > 0 ? comments.map(comment => <Comment comment={comment} />) : <em>Empty</em>}
                </div>
            </div>
        </section>
    )
}