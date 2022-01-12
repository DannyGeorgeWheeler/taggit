import './NewTagInput.css';
import React, { useState } from 'react';
import { addCommunityTag, createTag, selectTags } from '../tags/TagsSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function NewTagInput({id}) {
    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();
    const tags = useSelector(selectTags);


    const handleClick = () => {
        addNewTag();
    }

    const changeHandler = ({target}) => {
        setInputText(target.value);
    }

    const addNewTag = () => {
        const newTag = inputText.toLowerCase();
        const tag = Object.values(tags).find(tag => tag.name === newTag);
        if (tag !== undefined) {
            dispatch(addCommunityTag({tagId: tag.id, communityId: id}));
        } else {
            dispatch(createTag({id: newTag, name: newTag, communityIds: [id]}));
        }
        setInputText('');
    }

    return (
        <div className='tagInputContainer'>
            <input 
                id={'input'+id}
                type='text' 
                value={inputText} 
                className='tagInput' 
                onChange={changeHandler} />
            <button name={id} onClick={handleClick} className='addButton'>Add Tag</button>
        </div>
    )
}