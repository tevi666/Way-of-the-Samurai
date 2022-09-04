import React from 'react';
import { Link } from 'react-router-dom';
import userPhoto from '../../assets/images/users.png';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import styles from './users.module.css';

const Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} />
            <div className="">
                {users.map(u => <User key={u.id} followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow} user={u} />)}
            </div>
        </div>
    );
};

export default Users;