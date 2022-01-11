import './Posts.css';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Comment({comment}) {
    // const comment = comment;

    const constructComment = item => {
        const { id, author, body, replies } = item;

        const handleClick = event => {
            console.log(id);
            const repliesElement = document.getElementById(`replies${id}`);
            repliesElement.classList.toggle('hideReplies');
        }
    

        return (
            <div className='comment' key={id}>
                <h3><span className='author'>{author}</span> says:</h3>
                <ReactMarkdown className='replyContent' children={body} remarkPlugins={[remarkGfm]}/>
                <button className='repliesButton' onClick={handleClick}>
                    {replies.length > 0 ? `Replies: ${replies.length}` : 'No Replies'}
                </button>
                <div id={`replies${id}`} className='replies hideReplies'>
                    {replies.length > 0 && replies.map(reply => constructComment(reply))}
                </div>
            </div>
        )
    }


    return (
        <div>
            {constructComment(comment)}
        </div>
    )
}