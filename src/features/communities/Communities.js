import './Communities.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCommunities } from './CommunitiesSlice';
import Tag from '../tags/Tag';

export default function Communities() {
    const communities = useSelector(selectCommunities);

    const handleAddTag = ({target}) => {
        console.log(target.name);
    }


    return (
        <section>
            <h1>Communities <Link to='/' className='closePage'><button>X</button></Link></h1>
            <h2>Following</h2>
            {Object.values(communities).map(community => {
                return (
                    <div key={community.id} id='communities'>
                        <div>{community.name} <button name={community.id} onClick={handleAddTag}>Add Tag</button></div>
                        <Tag tagId={'id1'} deleteButton={true} />
                    </div>
                );
            })}
        </section>
    )
}