import React from 'react';
import { Link } from 'react-router-dom';
import userPhoto from '../../assets/images/users.png';
import styles from './users.module.css';

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = curP + 5;
    let slicedPages = pages.slice(curPF, curPL);
    return (
        <div>
            {slicedPages.map((p, i) => {
                return <span onClick={(e) => { props.onPageChanged(p) }} key={i} className={props.currentPage === p && styles.selectedPage}>{p}</span>
            })}
            {props.users.map(u => <div key={u.id} className="mt-2 text-green-500">
                <span>
                    <div className="">
                        <Link to={'/profile/' + u.id}><img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                        </Link>
                    </div>
                    <div>
                        {u.followed ?
                            <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => { props.unfollow(u.id) }}
                            >
                                UnFollow
                            </button> :
                            <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => { props.follow(u.id) }}
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
            </div>)}
        </div>
    );
};

export default Users;