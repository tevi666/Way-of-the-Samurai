import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import s from "./Dialogs.module.css";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/Preloader/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";

const Dialogs = (props) => {

  let state = props.dialogsPage;

  let newMessageBody = state.newMessageBody;

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);

  };

  if (!props.isAuth) {
    return <Navigate to='/login' />
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {state.dialogs.map((d) =>
          <div key={d.id}>
            <DialogItem name={d.name} id={d.id} />
          </div>
        )}

      </div>
      <div className={s.messages}>
        {state.messages.map((m, i) =>
          <Message key={i} messageText={m.message} />
        )}
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  );
};

const addMessageForm = (props) => {
  const maxLength50 = maxLengthCreator(50)
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea} validate={[required, maxLength50]} name={"newMessageBody"} placeholder='Enter your message...' />
      <div className="">
        <button>Send</button>
      </div>
    </form>
  )
}
const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(addMessageForm)

export default Dialogs;