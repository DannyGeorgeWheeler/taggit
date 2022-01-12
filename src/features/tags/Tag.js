import './Tags.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCommunityTag, selectTags, deleteTag } from './TagsSlice';

export default function Tag({tagId, communityId = undefined}) {
    const dispatch = useDispatch();
    const tags = useSelector(selectTags);

    const handleClick = (event) => {
        if (tags[tagId].communityIds.length === 1) {
            dispatch(deleteTag(tagId));
        } else {
            dispatch(removeCommunityTag({tagId, communityId}));
        }
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

