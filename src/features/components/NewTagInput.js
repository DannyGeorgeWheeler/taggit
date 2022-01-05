import './NewTagInput.css';
import React, { useEffect, useState } from 'react';
import { addCommunityTag, createTag, selectTags } from '../tags/TagsSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function NewTagInput({id}) {
    const [inputText, setInputText] = useState('');
    const [buttonText, setButtonText] = useState('+');
    const [hidden, setHidden] = useState(true);
    const dispatch = useDispatch();
    const tags = useSelector(selectTags);


    const handleClick = () => {
        if (buttonText === 'Go') {
            addNewTag();
        } else {
            toggleHidden();
        }
    }

    const changeHandler = ({target}) => {
        setInputText(target.value);
    }

    const toggleHidden = () => {
        document.getElementById('input'+id).classList.toggle('hide');
        setHidden(!hidden);
    }

    useEffect(() => {
        if (hidden) {
            setButtonText('+');
        } else if (inputText.length > 0) {
            setButtonText('Go');
        } else {
            setButtonText('-');
        }
    }, [buttonText, inputText, hidden])

    const addNewTag = () => {
        const newTag = inputText.toLowerCase();
        const tag = Object.values(tags).find(tag => tag.name === newTag);
        if (tag !== undefined) {
            dispatch(addCommunityTag({tagId: tag.id, communityId: id}));
        } else {
            dispatch(createTag({id: newTag, name: newTag, communityIds: [id]}));
        }
        setInputText('');
        toggleHidden();
    }

    return (
        <div>
            <input id={'input'+id} type='text' name='newTag' value={inputText} className='newTagInput hide' onChange={changeHandler}/>
            <button name={id} onClick={handleClick}>{buttonText}</button>
        </div>
    )
}