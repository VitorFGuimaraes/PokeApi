import React from 'react';
import '../Pagination/pagination.css';

const Pagination = (props) => {
    const {page, totalPages, onLeftClick, onRightClick} = props
    return (
        <div className='pagination_container'>
            <button className='pagination_button' onClick={onLeftClick}><div>⏪</div></button>
            <div>{page} de {totalPages}</div>
            <button className='pagination_button' onClick={onRightClick}><div>⏩</div></button>
    </div>
    )
} 

export default Pagination;