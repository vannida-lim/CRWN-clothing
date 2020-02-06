import React, { Component } from 'react'

import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import { isGoogleSignIn, signInWithGoogle } from '../../firebase/firebase.utilis'

import './sign-in.styles.scss'

class SignIn extends Component {
    state = {
        email: "",
        password: ""
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({
            email: '',
            password: ''
        })
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        value={this.state.email} 
                        handleChange={this.handleChange} 
                        label='email'
                        required/>

                    <FormInput 
                        name='password' 
                        type='password'
                        value={this.state.password} 
                        handleChange={this.handleChange} 
                        label='password'
                        required/>
                    <div className='buttons'>
                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }

}

export default SignIn;