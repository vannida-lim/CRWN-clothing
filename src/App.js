import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/HomePage'
import ShopPage from './pages/shop/ShopPage'
import Header from './components/header/Header'
import LoginSignupPage from './pages/login-signup/LoginSignupPage'
import { auth, createUserProfileDocument } from './firebase/firebase.utilis'
import { setCurrentUser } from './redux/user/UserActions'

class App extends Component {
  
  unsubscribeFromAuth = null

  componentDidMount(){
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div >
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/signin' 
                render={()=> this.props.currentUser ? 
                (<Redirect to='/'/>) : (<LoginSignupPage/>)}/>
        </Switch>
      </div>
    );

  }
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
