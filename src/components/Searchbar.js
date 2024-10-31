import React from 'react';
import {useState} from 'react';

const Searchbar = (props) => {
    const {onSearch} = props
    const [search, setSearch] = useState('')

    const onChangeHandler = (e) => {
        console.log('pokemon: ', e.target.value)
       setSearch(e.target.value)
    }
   
    const onButtonClickHandler = () => {
        onSearch(search)
        console.log('pokemon: ',search)
    }
    return (
        <div className='searchbar-container'>
            <div className='searchbar'>
                <input placeholder='Buscar Pokemon' onChange={onChangeHandler}/>
            </div>
            <div className='searchbar-btn'>
                <button onClick={onButtonClickHandler} >Buscar</button>
            </div>
        </div>
    )
}

export default Searchbar;