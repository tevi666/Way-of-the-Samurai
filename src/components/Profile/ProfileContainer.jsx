import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profileReducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { usersAPI } from "../../api/api";


class ProfileContainer extends React.Component {

    componentDidMount() {

        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 2;
        }

        usersAPI.userId(this.props.userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} />
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
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {
    setUserProfile
})(withRouter(ProfileContainer));