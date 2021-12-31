import './Communities.css';
import React from 'react';
import Tag from '../tags/Tag';
import { useSelector } from 'react-redux';
import { selectTags } from '../tags/TagsSlice';
import NewTagInput from '../components/NewTagInput';

export default function CommunityListItem({community}) {
    const tags = useSelector(selectTags);
    let { id, name } = community;

    return (
        <div key={id} id='communities'>
            <h3>r/{name}</h3>
            <div className='communityTags'>
                {Object.values(tags)
                    .filter(tag => tag.communityIds.includes(id))
                    .map(tag => <Tag key={tag.id} tagId={tag.id} communityId={id}/>)
                }
                <NewTagInput id={id} />
            </div>
        </div>
    )
}