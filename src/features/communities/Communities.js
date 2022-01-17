import './Communities.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCommunities } from './CommunitiesSlice';
import CommunityListItem from './CommunityListItem';
import { setIdle } from '../posts/PostsSlice';

export default function Communities() {
    const communities = useSelector(selectCommunities);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIdle());
    }, [communities]);


    return (
        <section>
            <header className='pageHeader'>
                <h1>Communities </h1>
            </header>
            {Object.values(communities).map(community => <CommunityListItem key={community.id} community={community} />)}
        </section>
    )
}