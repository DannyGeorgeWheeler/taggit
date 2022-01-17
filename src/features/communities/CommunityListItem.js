import './Communities.css';
import React, { useEffect, useState } from 'react';
import Tag from '../tags/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { selectTags } from '../tags/TagsSlice';
import NewTagInput from './NewTagInput';
import { addCommunity, removeCommunity, selectCommunities } from './CommunitiesSlice';
import { removeCommunityFromAllTags } from '../tags/TagsSlice';

export default function CommunityListItem({community}) {
    const tags = useSelector(selectTags);
    const communities = useSelector(selectCommunities);
    const dispatch = useDispatch();
    let { id, name, icon, description } = community;
    const [following, setFollowing] = useState(Object.keys(communities).includes(id));
    const [buttonText, setButtonText] = useState('');

    useEffect(() => {
        following ? setButtonText('Unfollow') : setButtonText('Follow');
    }, [following]);

    const handleClick = () => {
        toggleFollowing();
    }

    const toggleFollowing = () => {
        if (following) {
            dispatch(removeCommunity(community));
            dispatch(removeCommunityFromAllTags(community));
            setFollowing(false);
        } else {
            dispatch(addCommunity(community));
            setFollowing(true);
        }
    }

    const getTagElements = () => {
        const tagElements = Object.values(tags)
            .filter(tag => tag.communityIds.includes(id))
            .map(tag => <Tag key={tag.id} tagId={tag.id} communityId={id}/>);

        return (
            <div className='communityTags'>
                {tagElements.length > 0 ? tagElements : <p className='needTag'>Add at least one tag for this community to show up in the post feed.</p>}
            </div>
        );
    }


    return (
        <div key={id} className='communities'>
            <div className='communityHeader'>
                <img className='communityIcon' src={icon} alt='' />
                <span>r/{id}</span>
                <button onClick={handleClick} className='unfollowButton'>
                    {buttonText}
                </button>
            </div>
            <h2>{name}</h2>
            <p className='communityDescription'>{description}</p>
            {following && <NewTagInput id={id} />}
            {following && getTagElements()}
        </div>
    )
}