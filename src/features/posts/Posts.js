import './Posts.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "./PostsSlice.js";
import { Link } from 'react-router-dom';
import { selectActiveTags, selectTags } from "../tags/TagsSlice";
import Tag from '../tags/Tag';
import { selectCommunities } from '../communities/CommunitiesSlice';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { faComment, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        dispatch(fetchPosts(activeCommunities));
    }, [communities]);


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
        }).sort((a,b) => {
            if (a.time > b.time) {
                return -1;
            } else {
                return 1;
            }
        });
    }
    
    return (
        <section>
            <h1 className='activeTagsHeader'>Active Tags: {getTitleTags()}</h1>
            {filterPosts().map(post => {
                const d = new Date(0);
                d.setUTCSeconds(post.time);
                return (
                <article key={post.id} className='postSummary'>
                    <Link key={post.id} to={`/post/${post.id}`} >
                        <div className='postCard'>
                            <div className='summaryHeader'>
                                <img className='communityIcon' src={communities[post.community].icon} alt=''/>
                                <span className='summaryPostedBy'>
                                    Posted by <span className='author'>{post.author}</span> in <span className='metaHighlight'>{communities[post.community].name}</span> on {d.toLocaleString()}
                                </span>
                            </div>
                            <h2 className='summaryTitle'>{post.title}</h2>
                            {post.images.length === 1 && <img className='summaryImage' src={post.images[0].source} alt='' />}
                            {post.images.length > 1 && <div className='summaryGallery'><img className='summaryImage' src={post.images[0].source} alt='' /><span className='galleryText'>Gallery</span></div>}
                            {post.video.length > 0 && <video className='summaryImage' src={post.video} type='video/mp4' alt='' controls/>}
                            <ReactMarkdown className='summaryContent' children={post.content} />
                            <div className="summaryMeta">
                                <span className='summaryMetaText'>
                                <FontAwesomeIcon icon={faComment} /> {post.numComments} Comments &nbsp; <FontAwesomeIcon icon={faArrowAltCircleUp} /> {post.ups} Votes
                                </span>
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