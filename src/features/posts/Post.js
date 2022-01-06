import './Posts.css';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPosts, fetchComments } from './PostsSlice';
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
        const test = dispatch(fetchComments(posts[postId]));
    }, []);

    const getReply = (reply, level = 0) => {
        const hasReplies = reply.replies.length > 0;

        return (
            <details className='reply' key={reply.id} open>
                <summary>
                    <h4><span className='author'>{reply.author}</span> says:</h4>
                    <ReactMarkdown children={reply.body} remarkPlugins={[remarkGfm]}/>
                </summary>
                {hasReplies && reply.replies.map(reReply => getReply(reReply, level + 1))}
            </details>
        );
    }

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
                            <details className='comment' key={comment.id} open>
                                <summary>
                                    <h3><span className='author'>{comment.author}</span> says:</h3>
                                    <ReactMarkdown children={comment.body} remarkPlugins={[remarkGfm]}/>
                                </summary>
                                {comment.replies.length > 0 && comment.replies.map(reply => getReply(reply))}
                            </details>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

//{comment.replies.length > 0 ? <ReactMarkdown children={comment.replies[0].body} remarkPlugins={[remarkGfm]}/> : <p>no replies</p>}
