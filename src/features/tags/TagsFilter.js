import './Tags.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectTags } from './TagsSlice';
import { Link } from 'react-router-dom';
import TagListItem from './TagListItem';

export default function TagsFilter() {
    const tags = useSelector(selectTags);

    return (
        <section>
            <header className='pageHeader'>
                <h1>Filter by Tags </h1>
                <Link to='/' className='closePage'><button>X</button></Link>
            </header>
            <div className='tagList'>
                {Object.values(tags).map(tag => <TagListItem key={tag.id} tag={tag} />)}
            </div>
        </section>
    )
}