import './Posts.css';
import React from "react";
import { useSelector } from "react-redux";
import { selectPosts } from "./PostsSlice";
import { Link } from 'react-router-dom';
import { selectActiveTags, selectTags } from "../tags/TagsSlice";
import Tag from '../tags/Tag';
import { selectCommunities } from '../communities/CommunitiesSlice';

export default function Posts() {
    const posts = useSelector(selectPosts);
    const tags = useSelector(selectTags);
    const currentTags = useSelector(selectActiveTags);
    const communities = useSelector(selectCommunities);

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
                <article key={post.id} className='postSummary'>
                    <Link key={post.id} to={`/post/${post.id}`} >
                        <div className='postCard'>
                            <h2 className='summaryTitle'>{post.title}</h2>
                            <p className='summaryContent'>{post.content}</p>
                            <div className="summaryMeta">
                                <span className='summaryPostedBy'>Posted by {post.author} in <span className='metaHighlight'>{communities[post.community].name}</span></span>
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