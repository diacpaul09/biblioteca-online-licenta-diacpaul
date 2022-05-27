import React from "react";
import './my-profile.scss'

import { selectCurrentUser } from "../../redux/user/user.selector";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { InputUnstyled } from "@mui/base";

const MyProfile = ({ currentUser }) => {



    return (

        currentUser ? <div className="profile-info">
            <div className="name">
                Display name :
                <InputUnstyled className="input" value={currentUser.displayName} />
            </div>
            <div className="email">
                Email:
                <InputUnstyled className="input" value={currentUser.email} />
            </div>
        </div> : <div>none</div>
    );

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});



export default connect(mapStateToProps)(MyProfile);