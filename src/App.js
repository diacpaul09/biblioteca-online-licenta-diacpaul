import React from "react";
import "./App.css";
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
        <Header />
        <Routes>
          <Route exact path="/*" element={<HomePage />} />
          <Route
            path="/successful"
            element={<SuccessfulSignIn currentUser={this.props.currentUser} />}
          />
          <Route
            exact
            path="/signin"
            element={
              this.props.currentUser ? (
                <Navigate to="/successful" replace />
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
                <Navigate to="/successful" replace />
              ) : (
                <SignUpPage />
              )
            }
          />
          <Route exact path="/bookpage/*" element={<BookPage />} />
          <Route path="/myProfile" element={<MyProfilePage />} />
          <Route path="/myBooks" element={<MyBooksPage />} />
          <Route path="/reading/*" element={<MyBook />} />
          <Route path="/subscribe" element={<SubscribePage />} />
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
