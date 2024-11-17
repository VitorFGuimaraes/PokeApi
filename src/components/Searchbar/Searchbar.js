import React, { useState } from 'react';
import '../Searchbar/searchbar.css';

const Searchbar = (props) => {
    const { onSearch } = props;
    const [search, setSearch] = useState('');

    const onChangeHandler = (e) => {
        setSearch(e.target.value);
        if (e.target.value.length === 0) {
            onSearch(undefined);
        }
    };

    const onButtonClickHandler = () => {
        onSearch(search);
    };

    return (
        <div className='searchbar-container'>
            <div className='searchbar'>
                <input
                    placeholder='Buscar Pokemon'
                    value={search}
                    onChange={onChangeHandler}
                />
            </div>
            <div className='searchbar-btn'>
                <button onClick={onButtonClickHandler}>Buscar</button>
            </div>
        </div>
    );
};

export default Searchbar;
