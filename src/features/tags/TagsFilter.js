import './Tags.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTags } from './TagsSlice';
import TagListItem from './TagListItem';
import { setIdle } from '../posts/PostsSlice';

export default function TagsFilter() {
    const tags = useSelector(selectTags);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIdle());
    }, [tags]);


    const sortedTags = () => {
        return Object.values(tags).sort((a,b) => {
            if (a.name < b.name) {
                return -1;
            } else {
                return 1;
            }
        });
    }


    return (
        <section>
            <header className='pageHeader'>
                <h1>Filter by Tags </h1>
            </header>
            <div className='tagList'>
                {sortedTags().map(tag => <TagListItem key={tag.id} tag={tag} />)}
            </div>
        </section>
    )
}