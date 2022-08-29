import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile, getStatus, updateStatus } from "../../redux/profileReducer";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";
import { compose } from "redux";


class ProfileContainer extends React.Component {

    componentDidMount() {

        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                return <Navigate to='/login' />
            }
        }
        this.props.getUserProfile(userId);
        setTimeout(() => {
            this.props.getStatus(userId);
        }, 1000);
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                profile={this.props.profile} 
                status={this.props.status} 
                updateStatus={this.props.updateStatus} />
            </div>
        )
    }
}

// wrapper to use react router's v6 hooks in class component (to use HOC pattern, like in router v5)
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

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth

})

export default compose(
    connect(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus
    }),
    withRouter,
    withAuthNavigate
)(ProfileContainer);