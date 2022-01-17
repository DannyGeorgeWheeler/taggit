import './Search.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCommunities, addCommunitiy, removeCommunity } from '../communities/CommunitiesSlice';
import { removeCommunityFromAllTags } from '../tags/TagsSlice';

export default function SearchItem({result}) {
    const communities = useSelector(selectCommunities);
    const dispatch = useDispatch();
    const [following, setFollowing] = useState(Object.keys(communities).includes(result.id));
    const [buttonText, setButtonText] = useState('');

    useEffect(() => {
        following ? setButtonText('Unfollow') : setButtonText('Follow');
    }, [following]);

    const handleClick = () => {
        toggleFollowing();
    }

    const toggleFollowing = () => {
        if (following) {
            dispatch(removeCommunity(result.id));
            dispatch(removeCommunityFromAllTags(result.id));
            setFollowing(false);
        } else {
            dispatch(addCommunitiy(result));
            setFollowing(true);
        }
    }

    return (
        <div className='searchItem'>
            <div className='searchItemHeader'>
                <img className='communityIcon' src={result.icon} alt='' />
                <span>r/{result.id}</span>
                <button onClick={handleClick}>{buttonText}</button>
            </div>
            <h2>{result.name}</h2>
            <p className='searchDescription'>{result.description}</p>
        </div>
    )
}