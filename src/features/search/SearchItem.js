import './Search.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCommunities, addCommunitiy, removeCommunity } from '../communities/CommunitiesSlice';

export default function SearchItem({result}) {
    const communities = useSelector(selectCommunities);
    const dispatch = useDispatch();
    const [following, setFollowing] = useState(Object.keys(communities).includes(result.id));
    const [buttonText, setButtonText] = useState('');

    useEffect(() => {
        following ? setButtonText('Unfollow') : setButtonText('Follow');
    }, [following]);

    const handleClick = (event) => {
        toggleFollowing();
    }

    const toggleFollowing = () => {
        if (following) {
            dispatch(removeCommunity(result.id));
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
                <h2>{result.name}</h2>
            </div>
            <p className='searchDescription'>{result.description}</p>
            <div className='searchItemBottom'>
                <button onClick={handleClick}>{buttonText}</button>
                <span>r/{result.id}</span>
            </div>
        </div>
    )
}