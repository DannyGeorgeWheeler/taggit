import './Posts.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "./PostsSlice.js";
import { Link } from 'react-router-dom';
import { selectActiveTags, selectTags } from "../tags/TagsSlice";
import Tag from '../tags/Tag';
import { selectCommunities } from '../communities/CommunitiesSlice';

export default function Posts() {
    const posts = useSelector(selectPosts);
    const tags = useSelector(selectTags);
    const currentTags = useSelector(selectActiveTags);
    const communities = useSelector(selectCommunities);
    const dispatch = useDispatch();

    useEffect(() => {
        const activeCommunities = [];
        currentTags.forEach(tag => {
            tag.communityIds.forEach(community => {
                !activeCommunities.includes(community) && activeCommunities.push(community);
            });
        });
        console.log(activeCommunities);
        dispatch(fetchPosts(activeCommunities));
    }, []);


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
            // console.log(post);
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
                                <span className='summaryPostedBy'>Posted by <span className='author'>{post.author}</span> in <span className='metaHighlight'>{communities[post.community].name}</span></span>
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