import './Tags.css';
import React from 'react';
import Tag from './Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { toggleActive } from './TagsSlice';

export default function TagListItem({tag}) {
    const dispatch = useDispatch();

    const handleClick = (event) => {
        dispatch(toggleActive(tag.id))
    }

    return (
        <div className='tagListItem' onClick={handleClick}>
            <Tag tagId={tag.id} />
            {tag.active ? <FontAwesomeIcon className='toggle' icon={faCheckCircle} /> : <FontAwesomeIcon className='toggle' name={tag.id} icon={faCircle} />}
        </div>
    )
}