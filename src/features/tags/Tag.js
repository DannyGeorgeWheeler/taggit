import './Tags.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCommunityTag, selectTags } from './TagsSlice';

export default function Tag({tagId, communityId = undefined}) {
    const dispatch = useDispatch();
    const tags = useSelector(selectTags);

    const handleClick = (event) => {
        //console.log(`tagId: ${tagId} communityId: ${communityId}`)
        dispatch(removeCommunityTag({tagId, communityId}))
    }

    const renderDeleteButton = () => {
        return communityId !== undefined ? <button className='deleteButton' onClick={handleClick}>X</button> : '';
    }

    return (
        <span className='tag' key={tagId}>
            {tags[tagId].name} {renderDeleteButton()}
        </span>
    );
}