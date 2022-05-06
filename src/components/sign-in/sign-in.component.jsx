import React from "react";
import './sign-in.styles.scss'
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { Button } from "@mui/material";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' })

        } catch (error) {

            const code = error.code;
            console.log(code)

            switch (code) {
                case "auth/user-not-found":
                    return (window.alert("User not found"))
                case "auth/wrong-password":
                    return (window.alert("Wrong password for this username"))
                default: return;
            }



        }
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }


    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        value={this.state.email}
                        required
                        label="email"
                        handleChange={this.handleChange} />

                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        required
                        label="password"
                        handleChange={this.handleChange} />


                    <div className="buttons">
                        <Button variant="contained" type="submit">
                            Sign In
                        </Button>
                        <Button variant="contained" onClick={() => {
                            this.setState({ email: '', password: '' })
                                ; signInWithGoogle()
                        }}>
                            Sign in with Google
                        </Button>
                    </div>
                </form>

            </div>
        )
    }


}


export default SignIn