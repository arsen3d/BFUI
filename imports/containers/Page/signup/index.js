import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import signinImg from '../../../images/map.png';
import fbBtnSvg from '../../../images/facebook-app-symbol.svg';
import gpBtnSvg from '../../../images/google-plus.svg';
import authBtnSvg from '../../../images/auth0.svg';
import TextField from '../../../components/uielements/textfield';
import Scrollbars from '../../../components/utility/customScrollBar';
import Button from '../../../components/uielements/button';
import authAction from '../../../redux/auth/actions';
import IntlMessages from '../../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';
import Auth0 from '../../../helpers/auth0/index';
import Firebase from '../../../helpers/firebase';
import FirebaseLogin from '../../../components/firebase';
import { Checkbox } from './signup.style';
import abcui from "airbitz-core-js-ui";

const { login } = authAction;

class SignUp extends Component {
  state = {
    redirectToReferrer: false,
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { login } = this.props;
    login();
    this.props.history.push('/dashboard');
  };

    handlEdgeReg = () => {
        _abcUi = abcui.makeABCUIContext({'apiKey': 'c0f8c038bd10d138288ff2bd56dbcb999d22801f',
            'appId': 'com.blockfreight.dashboard',

            'vendorName': 'Blockfreight Dashboard',
            'vendorImageUrl': 'https://mydomain.com/mylogo.png'});
        _abcUi.openLoginWindow((error, account)=> {
            let options= {};
            options.username = account.id
            options.password = ""+ Math.random();
            Accounts.createUser(options,(err)=>{
                if(err){
                  console.log(err)
                }
                Meteor.call('RegisterEdgeToken', account, (error, result) => {
                    if (error) {
                        alert(error);
                    } else {
                        LoginLinks.loginWithToken(result.authorizationToken, (e, r) => {
                            if (e) {
                                //todo:add material ui notification
                                return;
                            }
                            this.props.history.push("/confirm-email");
                            // logged in!
                        });
                    }
                })
            })
        });
    }
  render() {
    return (
      <SignUpStyleWrapper className="mateSignUpPage">
        <div className="mateSignInPageImgPart">
          <div className="mateSignInPageImg">
            <img src={signinImg} alt="Kiwi standing on oval" />
          </div>
        </div>

        <div className="mateSignInPageContent">
          <div className="mateSignInPageLink">
            <Link to="#">
              <button className="mateSignInPageLinkBtn active" type="button">
                Register
              </button>
            </Link>
            <Link to="/signin">
              <button className="mateSignInPageLinkBtn " type="button">
                Login
              </button>
            </Link>
          </div>
          <Scrollbars style={{ height: '100%' }}>
            <div className="mateSignInPageGreet">
              <h1>Join Blockfreight, it's free</h1>
              <p>
                  Welcome to Blockfreight, Please SignUp with <a href="https://edgesecure.co/">Edge Wallet</a> Authenticator
                  {/*your */}
                  {/*organization email account*/}
                {/*information.*/}
              </p>
            </div>
            {/*<div className="mateSignInPageForm">*/}
              {/*<div className="mateInputWrapper">*/}
                {/*<TextField*/}
                  {/*label="Username"*/}
                  {/*placeholder="Username"*/}
                  {/*margin="normal"*/}
                {/*/>*/}
              {/*</div>*/}
              {/*<div className="mateInputWrapper">*/}
                {/*<TextField*/}
                  {/*label="Email"*/}
                  {/*placeholder="Email"*/}
                  {/*margin="normal"*/}
                  {/*type="Email"*/}
                {/*/>*/}
              {/*</div>*/}
              {/*<div className="mateInputWrapper">*/}
                {/*<TextField*/}
                  {/*label="Password"*/}
                  {/*placeholder="Password"*/}
                  {/*margin="normal"*/}
                  {/*type="Password"*/}
                {/*/>*/}
              {/*</div>*/}
              {/*<div className="mateInputWrapper">*/}
                {/*<TextField*/}
                  {/*label="Confirm Password"*/}
                  {/*placeholder="Confirm Password"*/}
                  {/*margin="normal"*/}
                  {/*type="Password"*/}
                {/*/>*/}
              {/*</div>*/}
            {/*</div>*/}
            {/*<div className="mateAgreement">*/}
              {/*<div className="mateLoginSubmitCheck">*/}
                {/*<Checkbox color="primary" className="mateTermsCheck" />*/}
                {/*<span className="mateTermsText">*/}
                  {/*<IntlMessages id="page.signUpTermsConditions" />*/}
                {/*</span>*/}
              {/*</div>*/}
              {/*<div className="mateLoginSubmit">*/}
                {/*<Button type="primary" onClick={this.handleLogin}>*/}
                  {/*Sign Up*/}
                {/*</Button>*/}
              {/*</div>*/}
            {/*</div>*/}
            {/*<div className="mateLoginSubmitText">*/}
              {/*<span>or Sign Up with </span>*/}
            {/*</div>*/}
              <div className="mateLoginSubmit">
                  <Button type="primary" onClick={this.handlEdgeReg}>
                      Edge Signup
                  </Button>
              </div>
          </Scrollbars>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
  }),
  { login }
)(SignUp);
