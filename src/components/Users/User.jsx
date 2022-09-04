import React from 'react';
import { Link } from 'react-router-dom';
import userPhoto from '../../assets/images/users.png';
import Paginator from '../common/Paginator/Paginator';
import styles from './users.module.css';

const User = ({ user, followingInProgress, unfollow, follow }) => {
    let u = user;
    return (
        <div>
            <div className="mt-2 text-green-500">
                <span>
                    <div className="">
                        <Link to={'/profile/' + u.id}><img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                        </Link>
                    </div>
                    <div>
                        {u.followed ?
                            <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => { unfollow(u.id) }}
                            >
                                UnFollow
                            </button> :
                            <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => { follow(u.id) }}
                            >
                                Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div className="">
                            {u.name}
                        </div>
                        <div className="">
                            {u.status}
                        </div>
                    </span>
                    <span>
                        <div className="">
                            {'u.location.city'}
                        </div>
                        <div className="">
                            {'u.location.country'}
                        </div>
                    </span>
                </span>
            </div>
        </div>
    );
};

export default User;