import React from 'react';
import styled from './Paginator.module.css';

const Paginator = ({ totalUsersCount, pageSize, currentPage, slice, onPageChanged }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let curP = currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = curP + 5;
    let slicedPages = pages.slice(curPF, curPL);
    return (
        <div>
            {slicedPages.map((p, i) => {
                return <span onClick={(e) => { onPageChanged(p) }} key={i} className={currentPage === p && styled.selectedPage}>{p}</span>
            })}
        </div>
    );
};

export default Paginator;