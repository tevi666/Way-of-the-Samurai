import { sendMessageActionCreator, updateNewMessageBodyActionCreator } from "../../redux/dialogReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageActionCreator());
    },
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyActionCreator(body));
    }
  };
};

let AuthNavigateComponent = withAuthNavigate(Dialogs);


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthNavigateComponent);

export default DialogsContainer;
