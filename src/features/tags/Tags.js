import './Tags.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectTags } from './TagsSlice';

export default function Tags() {
    const tags = useSelector(selectTags);

    
}