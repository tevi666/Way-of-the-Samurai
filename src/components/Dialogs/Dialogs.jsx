import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import s from "./Dialogs.module.css";

const Dialogs = (props) => {

  let state = props.dialogsPage;

  let newMessageBody = state.newMessageBody;

  let onSendMessageClick = () => {
    props.sendMessage();
  };

  let onNewMessageChange = (e) => {
    let body = e.target.value;
    props.updateNewMessageBody(body);
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
        <div className="">
          <div className="">
            <textarea value={newMessageBody} onChange={onNewMessageChange} placeholder='Enter your message...'></textarea>
          </div>
          <div className="">
            <button onClick={onSendMessageClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
