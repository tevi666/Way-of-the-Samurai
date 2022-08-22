import React from 'react';
import styled from './Preloader.module.css';
import loader from '../../../assets/images/loader.gif'
const Preloader = () => {
    return (
        <div>
            <img className={styled.loader} src={loader} />
        </div>
    );
};

export default Preloader;