import './Communities.css';
import React from 'react';
import Tag from '../tags/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { selectTags } from '../tags/TagsSlice';
import NewTagInput from './NewTagInput';
import { removeCommunity } from './CommunitiesSlice';

export default function CommunityListItem({community}) {
    const tags = useSelector(selectTags);
    const dispatch = useDispatch();
    let { id, name, icon, description } = community;

    const handleClick = () => {
        dispatch(removeCommunity(community));
    }

    return (
        <div key={id} className='communities'>
            <div className='communityHeader'>
                <img className='communityIcon' src={icon} alt='' />
                <span>r/{id}</span>
                <button onClick={handleClick} className='unfollowButton'>
                    Unfollow
                </button>
            </div>
            <h2>{name}</h2>
            <p className='communityDescription'>{description}</p>
            <NewTagInput id={id} />
            <div className='communityTags'>
                {Object.values(tags)
                    .filter(tag => tag.communityIds.includes(id))
                    .map(tag => <Tag key={tag.id} tagId={tag.id} communityId={id}/>)
                }
            </div>
        </div>
    )
}