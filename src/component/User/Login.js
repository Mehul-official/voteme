import React from 'react';
import {
    LoginSocialFacebook,
    LoginSocialGoogle,
} from "reactjs-social-login";
import * as User from '../../services/User';
import google from '../../assets/images/google.svg';
import facebook from '../../assets/images/facebook.svg';
import twitter from '../../assets/images/twitter.svg';

export default class Copyright extends React.Component {
    constructor () {
        super();
    }

    verifylogin(type, data) {
        var profile = data.getBasicProfile();
        var auth = data.getAuthResponse();
        var name = profile.getName().split(" ");
        
        var login_info = {
            "Email": profile.getEmail(),
            "FirstName": name[0],
            "LastName": name[1],
            "Token": data.getId(),
            "Type":"1"
        };
        User.signup(login_info).then(
            result => {
                localStorage.setItem('userDetails',JSON.stringify(result));
                window.location.href = process.env.REACT_APP_SITE_URL+'queries';
            }
        );
    }
    loginFailed(data) {
        console.log('data',data);
    }
    render() {
        return(
            <section className="login-page">
                <div className="login-block">
                    <div className="login-block-inner">
                        <div className="main-logo">
                            <img src={require('../../assets/images/logo.png').default} />
                            <span>Where you ask your query and also vote...</span>
                        </div>
                    </div>
                    <div className="login-title">LOGIN</div>
                    <div className="welcome-text"> Welcome! Please click on the button below to sign-in to VoteME with your <a routerlink="/signin" className="google"> Google </a> OR <a routerlink="/signin" className="fb"> Facebook </a> OR <a routerlink="/signin" className="twitter"> Twitter </a> Account. </div>
                    <div className="login-btn-group">
                        <LoginSocialGoogle
                            client_id={process.env.REACT_APP_GG_APP_ID || ''}
                            onResolve={({ provider, data }) => {
                                this.verifylogin('google', data)
                            }}
                            onReject={({ data }) => {
                                this.loginFailed(data)
                            }}
                            className={'storybook-button storybook-button--primary'}
                        >
                            <span className="login-with-google"><a><img src={google} /> Login With Google </a></span>
                        </LoginSocialGoogle>
                        
                        <LoginSocialFacebook
                            appId={process.env.REACT_APP_FB_APP_ID || ''}
                            onResolve={({ data }) => {
                                this.verifylogin('facebook', data)
                            }}
                            onReject={({data}) => {
                                this.loginFailed(data)
                            }}
                            className={'storybook-button storybook-button--primary'}
                        >
                            <span className="login-with-fb"><a><img src={facebook} /> Login With Facebook </a></span>
                        </LoginSocialFacebook>
                        <div className="storybook-button storybook-button--primary"> 
                            <span className="login-with-twitter"><a routerlink="/signin"><img src={twitter} /> Login With Twitter </a></span>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}