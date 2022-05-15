import React, { useState, useEffect } from "react";
import './my-profile.scss'

import { selectCurrentUser } from "../../redux/user/user.selector";
import { setCurrentUser } from "../../redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const MyProfile = ({ currentUser }) => {

   

    return (

        currentUser ? <div>
            {currentUser.displayName}
        </div> : <div>none</div>
    );

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});



export default connect(mapStateToProps)(MyProfile);