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
        <div className="searchbar">
            <div className="searchbar__input-container">
                <input
                    placeholder="Buscar Pokemon"
                    value={search}
                    onChange={onChangeHandler}
                    className="searchbar__input"
                />
            </div>
            <div className="searchbar__button-container">
                <button onClick={onButtonClickHandler} className="searchbar__button">
                    Buscar
                </button>
            </div>
        </div>
    );
};

export default Searchbar;
