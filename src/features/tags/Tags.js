import './Tags.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTags, toggleActive } from './TagsSlice';
import { Link } from 'react-router-dom';

export default function Tags() {
    const tags = useSelector(selectTags);
    const dispatch = useDispatch();

    const handleClick = ({target}) => {
        dispatch(toggleActive(target.name));
    }

    return (
        <section>
            <h1>Tags <Link to='/' className='closePage'><button>X</button></Link></h1>
            {Object.values(tags).map(tag => {
                return (
                    <p key={tag.id}>{tag.name} <button name={tag.id} onClick={handleClick}>{tag.active ? 'remove' : 'add'}</button></p>
                )
            })}
        </section>
    )
}