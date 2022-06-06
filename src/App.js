import React from "react";
import { GlobalStyle } from "./global.styles";
import Header from "./components/header/header";
import SignInPage from "./pages/sign-in-page/sign-in-page";
import SignUpPage from "./pages/sign-up-page/sign-up-page";
import { auth, createUserProfileDocumet } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomePage from "./pages/home-page/home-page";
import SuccessfulSignIn from "./components/successful-sign-in/successfull-sign-in";
import MyProfilePage from "./pages/my-profile/my-profile-page";
import BookPage from "./pages/book-page/book-page";
import MyBook from "./pages/reading-page/reading-page";
import SubscribePage from "./pages/subscribe-page/subscribe-page";
import MyBooksPage from "./pages/my-books-page/my-books-page";
import AudioBooksPage from "./pages/audio-books-page/audio-books-page";
import AudioPage from "./pages/audio-page/audio-page";
import EmailConfirm from "./pages/emailconfirm-page/emailconfirm";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocumet(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,

            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <GlobalStyle/>
        <Header />
        <Routes>
          <Route exact path="/*" element={<HomePage />} />
          <Route exact path="/bookpage/*" element={<BookPage />} />
          <Route path="/audio-books" element={<AudioBooksPage />} />

          <Route
            path="/successful"
            element={<SuccessfulSignIn currentUser={this.props.currentUser} />}
          />
          <Route
            exact
            path="/signin"
            element={
              this.props.currentUser ? (
                <Navigate to="/email-confirm" replace />
              ) : (
                <SignInPage />
              )
            }
          />
          <Route
            exact
            path="/signup"
            element={
              this.props.currentUser ? (
                <Navigate to="/email-confirm" replace />
              ) : (
                <SignUpPage />
              )
            }
          />
          <Route
            path="/myProfile"
            element={
              this.props.currentUser ? (
                this.props.currentUser.emailVerified ? (
                  <MyProfilePage />
                ) : (
                  <Navigate to="/email-confirm" replace />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/myBooks"
            element={
              this.props.currentUser ? (
                this.props.currentUser.emailVerified ? (
                  <MyBooksPage />
                ) : (
                  <Navigate to="/email-confirm" replace />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/reading/*"
            element={
              this.props.currentUser ? (
                this.props.currentUser.emailVerified ? (
                  <MyBook />
                ) : (
                  <Navigate to="/email-confirm" replace />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/subscribe"
            element={
              this.props.currentUser ? (
                this.props.currentUser.emailVerified ? (
                  <SubscribePage />
                ) : (
                  <Navigate to="/email-confirm" replace />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/audio-page"
            element={
              this.props.currentUser ? (
                this.props.currentUser.emailVerified ? (
                  <AudioPage />
                ) : (
                  <Navigate to="/email-confirm" />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/email-confirm"
            element={
              this.props.currentUser ? (
                this.props.currentUser.emailVerified ? (
                  <Navigate to="/successful" replace />
                ) : (
                  <EmailConfirm />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
