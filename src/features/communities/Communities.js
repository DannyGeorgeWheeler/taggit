import './Communities.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCommunities } from './CommunitiesSlice';
import CommunityListItem from './CommunityListItem';

export default function Communities() {
    const communities = useSelector(selectCommunities);

    return (
        <section>
            <header className='pageHeader'>
                <h1>Communities </h1>
                <Link to='/' className='closePage'><button>X</button></Link>
            </header>
            {Object.values(communities).map(community => <CommunityListItem key={community.id} community={community} />)}
        </section>
    )
}