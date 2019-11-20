import auth0 from 'auth0-js';
import Cookies from 'universal-cookie';
import history from '../context/History';
import Logger from '../context/Logger';
import { config } from '../context/config';

export default class Auth {
    userProfile;
    auth0 = new auth0.WebAuth({
        domain: 'bywhish.auth0.com',
        clientID: 'OlXk8kUjCFU3DNYt6129nMCRxwOXGMAh',
        redirectUri: config.authCallbackUri,
        responseType: 'token id_token',
        scope: 'openid profile email',
        audience: 'https://mybackend.com',
    });
    accessToken;
    idToken;
    expiresAt;

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getIdToken = this.getIdToken.bind(this);
        this.renewSession = this.renewSession.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    static isLoggedIn() {
        // return process.env.NODE_ENV === 'development' ? true : this.accessToken;
        // return this.accessToken;
        return sessionStorage.getItem('isLoggedIn') === 'true';
    }

    getProfile(callBack) {
        this.auth0.client.userInfo(this.accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
                Logger.of('getProfile').trace('result:', profile);
            }
            callBack(err, profile);
        });
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                Logger.of('handleAuthentication').trace('result:', authResult);
                history.replace('/home');
            } else if (err) {
                Logger.of('handleAuthentication').error('error:', err);
                history.replace('/login');
            }
        });
    }

    getAccessToken() {
        return this.accessToken;
    }

    getIdToken() {
        return `Bearer ${this.accessToken}`;
    }

    setSession(authResult) {
        // Set isLoggedIn flag in localStorage
        sessionStorage.setItem('isLoggedIn', 'true');

        // Set the time that the Access Token will expire at
        const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;

        const cookie = new Cookies();
        cookie.set('id_token', this.accessToken);
        // navigate to the home route
        history.replace('/home');
    }

    renewSession() {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.logout();
                Logger.of('renewSession').error('error:', err);
            }
        });
    }

    logout() {
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;

        // Remove isLoggedIn flag from localStorage
        sessionStorage.removeItem('isLoggedIn');

        this.auth0.logout({
            returnTo: window.location.origin,
        });

        // navigate to the home route
        history.replace('/home');
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        const { expiresAt } = this;
        return new Date().getTime() < expiresAt;
    }
}
