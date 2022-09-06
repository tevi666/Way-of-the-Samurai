import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { initializeApp } from './redux/appReducer';
import { connect, Provider } from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import { compose } from "redux";
import store from './redux/reduxStore'

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className="app-wrapper" >
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Suspense fallback={<div><Preloader /></div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <img
                    src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2018%2F05%2F12170411%2Fcat-kitten-138468381.jpg&q=60"
                    style={{ maxWidth: "100%" }}
                  />
                }
              />
              <Route
                path="/dialogs/*"
                element={<DialogsContainer />}
              />
              <Route path='/profile/:userId'
                element={<ProfileContainer />}
              />
              <Route path='/profile/' element={<ProfileContainer />} />
              <Route
                path="/users"
                element={<UsersContainer />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  };
}
const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})
function withRouter(Component) {

  function ComponentWithRouterProp(props) {

    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJsApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}
export default SamuraiJsApp