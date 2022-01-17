import React from "react";
import { useNavigate } from "react-router-dom";
import { searchReddit } from "./SearchSlice";
import { useDispatch } from "react-redux";

export default function SearchBar() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = ({target}) => {
        const term = target.value;
        search(term);
    }

    const search = term => {
        if (term.length > 2) {
            navigate('/search', {replace: true});
            dispatch(searchReddit(term));
        } 
    }

    return (
        <input 
            type='text'
            id='searchBar'
            placeholder="Search for new communities"
            onChange={handleChange}
        />
    )
}