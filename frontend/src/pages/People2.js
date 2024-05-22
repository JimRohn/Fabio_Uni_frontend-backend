import React, { useState } from 'react';
import axios from 'axios';

const People2 = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ semantic_results: '', database_results: [] });
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/search?query=${query}`);
            const data = response.data;
            setResults({
                semantic_results: data.semantic_results,
                database_results: Array.isArray(data.database_results) ? data.database_results : []
            });
            setError('');
        } catch (err) {
            setError('Error fetching data. Please try again.');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>People Search</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter search term"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>Semantic Search Results</h2>
            <p>{results.semantic_results}</p>
            <h2>Database Search Results</h2>
            {results.database_results.length > 0 ? (
                results.database_results.map((result, index) => (
                    <div key={index}>
                        <p>ID: {result[0]}</p>
                        <p>First Name: {result[1]}</p>
                        <p>Last Name: {result[2]}</p>
                        <p>Department: {result[3]}</p>
                        <p>Expertise: {result[4]}</p>
                        <p>Email: {result[5]}</p>
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default People2;
