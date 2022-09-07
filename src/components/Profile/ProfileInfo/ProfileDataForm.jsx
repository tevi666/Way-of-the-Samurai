import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/Preloader/FormsControls/FormsControls';
import s from "./ProfileInfo.module.css";
import styles from '../../common/Preloader/FormsControls/FormsControls.module.css';



const ProfileDataForm = ({handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button onClick={() => { }}>save</button>
            </div>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <b>Full name</b>: {createField('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>: {createField('', 'lookingForJob', [], Input, { type: 'checkbox' })}
            </div>
            <div>
                <b>My professional skills</b>:
                {createField('My professional skills', 'lookingForJobDescription', [], Textarea )}
            </div>
            <div>
                <b>About me</b>:
                {createField('About me', 'aboutMe', [], Textarea )}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={s.contact}>
                        <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
                    </div>
                })}
            </div>
        </form>
    )
}
const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile", enableReinitialize: true, destroyOnUnmount: false })(ProfileDataForm);
export default ProfileDataFormReduxForm;