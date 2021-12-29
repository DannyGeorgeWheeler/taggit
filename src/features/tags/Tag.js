import './Tags.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectTags } from './TagsSlice';

export default function Tag({tagId, deleteButton = false}) {
    const tags = useSelector(selectTags);

    const renderDeleteButton = () => {
        return deleteButton ? <button className='deleteButton'>X</button> : '';
    }

    return (
        <span className='tag' key={tagId}>
            {tags[tagId].name} {renderDeleteButton()}
        </span>
    );
}