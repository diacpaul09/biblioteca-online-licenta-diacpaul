import React from "react";
import { Button } from "@mui/material";
import FormInput from "../form-input/form-input.component";
import { auth, createUserProfileDocumet } from "../../firebase/firebase.utils";
import './sign-up.styles.scss'
import { Link, Navigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";


class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            emailSent: false
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)



            await createUserProfileDocumet(user, { displayName })


            const authx = getAuth();
            sendEmailVerification(authx.currentUser)
                .then(() => {
                    
                    this.setState({
                        displayName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        emailSent: true
                    })
                });



        } catch (error) {
            console.error(error)
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value })
    }

    render() {
        const { displayName, email, password, confirmPassword, emailSent } = this.state
        return (
            emailSent ? <Navigate to={'/email-confirm'} />
                :
                <div className="sign-up">
                    <h2 className="title"> I do not have an account</h2>
                    <span>Sign up with your email and password</span>
                    <form className="sign-up-form" onSubmit={this.handleSubmit}>
                        <FormInput type='text' name='displayName' value={displayName} onChange={this.handleChange} label='Display name' required></FormInput>
                        <FormInput type='email' name='email' value={email} onChange={this.handleChange} label='Email' required></FormInput>
                        <FormInput type='password' name='password' value={password} onChange={this.handleChange} label='Password' required></FormInput>
                        <FormInput type='password' name='confirmPassword' value={confirmPassword} onChange={this.handleChange} label='Confirm Password' required></FormInput>
                        <Button variant="contained" type='submit'> Sign Up</Button>
                    </form>
                    <div className="has-account">
                        <Link to={'/signin'}>I already have an account</Link>
                    </div>
                </div>

        )
    }
}

export default SignUp

