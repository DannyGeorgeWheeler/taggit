import './Search.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectResults } from './SearchSlice';
import { Link } from 'react-router-dom';
import SearchItem from './SearchItem';

export default function SearchResults() {
    const results = useSelector(selectResults);

    return (
        <section>
            <header className='pageHeader'>
                <h1>Search for Communities</h1>
                <Link to='/' className='closePage'><button>X</button></Link>
            </header>
            <div id='searchResults'>
                {results.map(result => <SearchItem key={result.name} result={result} />)}
            </div>
        </section>
    )
}