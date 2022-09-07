import React, { useEffect } from 'react';
import { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';

const ProfileStatusWithHooks = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };
    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status: </b><span onDoubleClick={activateEditMode}>{props.status || 'Статуса нет!'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status} />
                </div>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;