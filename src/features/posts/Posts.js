import './Posts.css';
import React from "react";
import { useSelector } from "react-redux";
import { selectPosts } from "./PostsSlice";
import { Link } from 'react-router-dom';
import { selectActiveTags, selectTags } from "../tags/TagsSlice";
import Tag from '../tags/Tag';

export default function Posts() {
    const posts = useSelector(selectPosts);
    const tags = useSelector(selectTags);
    const currentTags = useSelector(selectActiveTags);

    // console.log('tags:' + tags['id1'].name);
    // console.log(currentTags[0]);

    const getTitleTags = () => {
        if (currentTags.length === 0) {
            return <em>none</em>;
        } else {
            return currentTags.map(tag => {
                return <span className='tag' key={tag.id}>{tag.name}</span>;
            });
        }
    }

    const filterPosts = () => {
        return Object.values(posts).filter(post => {
            let includes = false;
            for (let i = 0; i < currentTags.length; i++) {
                if(currentTags[i].communityIds.includes(post.community)) {
                    includes = true;
                };
            }
            return includes;
        });
    }

    return (
        <section>
            <h1 className='activeTagsHeader'>Active Tags: {getTitleTags()}</h1>
            {filterPosts().map(post => {
                return (
                <article key={post.id}>
                    <Link key={post.id} to={post.id}>
                        <div className='postCard'>
                            <h2 className='postTitle'>{post.title}</h2>
                            <p className='postContent'>{post.content}</p>
                            <div className="postMeta">
                                <span className='postedBy'>Posted by {post.author} in {post.community}</span>
                                <div className="postTags">
                                    {Object.values(tags)
                                    .filter(tag => tag.communityIds.includes(post.community))
                                    .map(tag => <Tag key={tag.id} tagId={tag.id} />)}
                                </div>
                            </div>
                        </div>
                    </Link>
                </article>
            )})}

        </section>
    )
}