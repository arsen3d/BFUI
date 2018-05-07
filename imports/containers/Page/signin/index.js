import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import signinImg from '../../../images/hub.png';
import Button from '../../../components/uielements/button';
import authAction from '../../../redux/auth/actions';
import TextField from '../../../components/uielements/textfield';
import Scrollbars from '../../../components/utility/customScrollBar';
import SignInStyleWrapper from './signin.style';
import abcui from "airbitz-core-js-ui";

const {login} = authAction;

class SignIn extends Component {
    constructor() {//'assetsPath': '/packages/node_modules/airbitz-core-js-ui/', bundlePath: '/packages/node_modules/airbitz-core-js-ui',
        super();
        this.handleEdgeLogin = this.handleEdgeLogin.bind(this);
        _abcUi = abcui.makeABCUIContext({'apiKey': 'c0f8c038bd10d138288ff2bd56dbcb999d22801f',
            'appId': 'com.blockfreight.dashboard',

            'vendorName': 'Blockfreight Dashboard',
            'vendorImageUrl': 'https://mydomain.com/mylogo.png'});
    }
    state = {
        redirectToReferrer: false,
        username: 'demo@gmail.com',
        password: 'demodemo',
    };

    componentWillReceiveProps(nextProps) {
        if (
            this.props.isLoggedIn !== nextProps.isLoggedIn &&
            nextProps.isLoggedIn === true
        ) {
            this.setState({redirectToReferrer: true});
        }
    }

    handleEdgeLogin()  {

        _abcUi.openLoginWindow((error, account)=> {
            Meteor.call('GetEdgeToken', account.id, (error, result) => {
                if (error) {
                    alert(error);
                } else {
                    LoginLinks.loginWithToken(result.authorizationToken, (e, r) => {
                        if (e) {
                            //todo:add material ui notification
                            return;
                        }
                        this.props.history.push("/dashboard");
                        // logged in!
                    });
                }
            })
        });
    }
    handleLogin = () => {
        const {login} = this.props;
        const {username, password} = this.state;
        login({username, password});
        this.props.history.push('/dashboard');
    };
    onChangeUsername = event => this.setState({username: event.target.value});
    onChangePassword = event => this.setState({password: event.target.value});

    render() {
        const from = {pathname: '/dashboard'};
        const {redirectToReferrer, username, password} = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from}/>;
        }
        return (
            <SignInStyleWrapper className="mateSignInPage">
                <div className="mateSignInPageImgPart">
                    <div className="mateSignInPageImg">
                        <img src={signinImg} alt="Kiwi standing on oval"/>
                    </div>
                </div>

                <div className="mateSignInPageContent">
                    <div className="mateSignInPageLink">
                        <Link to="/signup">
                            <button className="mateSignInPageLinkBtn" type="button">
                                Register
                            </button>
                        </Link>
                        <Link to="#">
                            <button className="mateSignInPageLinkBtn active" type="button">
                                Login
                            </button>
                        </Link>
                    </div>
                    <Scrollbars style={{height: '100%'}}>
                        <div className="mateSignInPageGreet">
                            <h1>Hello,</h1>
                            <p>
                                Welcome to Blockfreight, Please Login with your organization email account
                                information.
                            </p>
                        </div>
                        <div className="mateSignInPageForm">
                            <div className="mateInputWrapper">
                                <TextField
                                    label="Username"
                                    placeholder="Username"
                                    margin="normal"
                                    value={username}
                                    onChange={this.onChangeUsername}
                                />
                            </div>
                            <div className="mateInputWrapper">
                                <TextField
                                    label="Password"
                                    placeholder="Password"
                                    margin="normal"
                                    type="Password"
                                    value={password}
                                    onChange={this.onChangePassword}
                                />
                            </div>
                            <div className="mateLoginSubmit">
                                <Button type="primary" onClick={this.handleLogin}>
                                    Login
                                </Button>
                            </div>
                        </div>
                        <div className="mateLoginSubmitText">
              <span>
                * Username: demo@gmail.com , Password: demodemo or click on any
                button.
              </span>
                        </div>
                        <div className="mateLoginOtherBtn">
                            <div className="mateLoginSubmit">
                                <Button
                                    onClick={this.handleEdgeLogin}


                                >Edge
                                </Button>
                            </div>
                        </div>
                        {/*<div className="mateLoginOtherBtn">*/}
                        {/*<div className="mateLoginOtherBtnWrap">*/}
                        {/*<Button*/}
                        {/*onClick={this.handleLogin}*/}
                        {/*type="primary btnFacebook"*/}
                        {/*className="btnFacebook"*/}
                        {/*>*/}
                        {/*<div className="mateLoginOtherIcon">*/}
                        {/*<img src={fbBtnSvg} alt="facebook Btn" />*/}
                        {/*</div>*/}
                        {/*<IntlMessages id="page.signInFacebook" />*/}
                        {/*</Button>*/}
                        {/*</div>*/}
                        {/*<div className="mateLoginOtherBtnWrap">*/}
                        {/*<Button*/}
                        {/*onClick={this.handleLogin}*/}
                        {/*type="primary btnGooglePlus"*/}
                        {/*className="btnGooglePlus"*/}
                        {/*>*/}
                        {/*<div className="mateLoginOtherIcon">*/}
                        {/*<img src={gpBtnSvg} alt="Google Plus Btn" />*/}
                        {/*</div>*/}
                        {/*<IntlMessages id="page.signInGooglePlus" />*/}
                        {/*</Button>*/}
                        {/*</div>*/}
                        {/*<div className="mateLoginOtherBtnWrap">*/}
                        {/*{Auth0.isValid ? (*/}
                        {/*<Button*/}
                        {/*type="primary btnAuthZero"*/}
                        {/*className="btnAuthZero"*/}
                        {/*onClick={() => {*/}
                        {/*Auth0.login(this.handleLogin);*/}
                        {/*}}*/}
                        {/*>*/}
                        {/*<div className="mateLoginOtherIcon">*/}
                        {/*<img src={authBtnSvg} alt="Authentication Btn" />*/}
                        {/*</div>*/}
                        {/*<IntlMessages id="page.signInAuth0" />*/}
                        {/*</Button>*/}
                        {/*) : (*/}
                        {/*<Button*/}
                        {/*type="primary btnAuthZero"*/}
                        {/*className="btnAuthZero"*/}
                        {/*onClick={this.handleLogin}*/}
                        {/*>*/}
                        {/*<div className="mateLoginOtherIcon">*/}
                        {/*<img src={authBtnSvg} alt="Authentication Btn" />*/}
                        {/*</div>*/}
                        {/*<IntlMessages id="page.signInAuth0" />*/}
                        {/*</Button>*/}
                        {/*)}*/}
                        {/*</div>*/}
                        {/*<div className="mateLoginOtherBtnWrap">*/}
                        {/*{Firebase.isValid && <FirebaseLogin login={this.handleLogin} />}*/}
                        {/*</div>*/}
                        {/*</div>*/}
                    </Scrollbars>
                </div>
            </SignInStyleWrapper>
        );
    }
}

export default connect(
    state => ({
        isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
    }),
    {login}
)(SignIn);
