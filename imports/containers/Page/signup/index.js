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
var crypto = require("crypto");
const { login } = authAction;

var _account = null
var _wallet = null
var _abcUi = null
var _key = null

const walletType = 'wallet:dashboard:blockfreight.com'

class SignUp extends Component {
  state = {
    redirectToReferrer: false,
      stage:"scan"

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

    getAccountId = async (account)=>
    {
        let user = await account.folder.folder("com.blockfreight").file("user").getText();
        console.log(user);
        return user;
    }
    handlEdgeReg =  () => {
        _abcUi = abcui.makeABCUIContext({'apiKey': 'c0f8c038bd10d138288ff2bd56dbcb999d22801f',
            'appId': 'com.blockfreight.dashboard',
            'accountType': 'account:repo:com.blockfreight.dashboard',
            'vendorName': 'Blockfreight Dashboard',
            'vendorImageUrl': 'https://blockfreight.com/wp-content/uploads/2017/04/blockfreight_logo_grey.svg'});
        _abcUi.openLoginWindow((error, account) => {

            //console.log(this.getAccountId(account));
            if (error) {
                console.log(error)
            }
            _account = account

            this.abcWallet = account.getFirstWallet(walletType)
            let options= {};
            if (this.abcWallet == null) {
                // Create an ethereum wallet if one doesn't exist:
                const keys = {
                    blockfreightKey: Base64.encode(crypto.randomBytes(32).toString("hex"))
                }
                account.createWallet(walletType, keys, function (e, id) {
                    if (e) {
                        console.log(e)
                    } else {
                        this._wallet = id;
                        this._key = keys.blockfreightKey;
                        this.setState({stage:"confirm"});
                    }
                })
            } else {
                this._wallet = this.abcWallet.id;
                this._key = this.abcWallet.keys.blockfreightKey;
                this.setState({stage:"confirm"})

            }
        });
    }
    ConfirmEmail = () =>
    {
        var options = {username:this._wallet,password:this._key,email:this.state.email}
        Accounts.createUser(options,(err)=> {
            if (err) {
                console.log(err)
            }
            Meteor.call( 'sendVerificationLink', ( error, response ) => {
                if ( error ) {
                    alert( error.reason, 'danger' );
                } else {
                  //  Bert.alert( 'Welcome!', 'success' );
                }
            });
            this.setState({stage:"thankyou"})
        })
    }
    onChangeEmail = event => this.setState({email: event.target.value});
    renderScan = () =>{
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
                            </p>
                        </div>

                        <div className="mateLoginSubmit">
                            <Button type="primary" onClick={this.handlEdgeReg}>
                                Edge Signup
                            </Button>
                        </div>
                    </Scrollbars>
                </div>
            </SignUpStyleWrapper>
        )
    }
    renderConfirm = () =>{
        return (
            <SignUpStyleWrapper className="mateSignInPage">
                <div className="mateSignInPageImgPart">
                    <div className="mateSignInPageImg">
                        <img src={signinImg} alt="Kiwi standing on oval"/>
                    </div>
                </div>

                <div className="mateSignInPageContent">
                    <div className="mateSignInPageGreet">
                        <h1>
                            Confirm Email
                        </h1>
                        <p>
                            Enter your email and we send you a confirmation link.
                        </p>
                    </div>
                    <div className="mateSignInPageForm">
                        <div className="mateInputWrapper">
                            <TextField label="Enter your email" margin="normal" onChange={this.onChangeEmail}/>
                        </div>
                        <div className="mateLoginSubmit">
                            <Button type="primary" onClick={this.ConfirmEmail}>
                                Confirm Email
                            </Button>
                        </div>
                    </div>

                    <p className="homeRedirection">
                        Or go back to{' '}
                        <Link to="/">
                            <Button color="primary">Homepage</Button>
                        </Link>
                    </p>
                </div>
            </SignUpStyleWrapper>
        );
    }
    renderThankyou = () =>
    {
        return (
            <SignUpStyleWrapper className="mateSignInPage">
                <div className="mateSignInPageImgPart">
                    <div className="mateSignInPageImg">
                        <img src={signinImg} alt="Kiwi standing on oval"/>
                    </div>
                </div>

                <div className="mateSignInPageContent">
                    <div className="mateSignInPageGreet">
                        <h1>
                            Thank you
                        </h1>
                        <p>
                            Check your email for confirmation link
                        </p>
                    </div>
                </div>
            </SignUpStyleWrapper>)
    }
  render() {
        switch(this.state.stage)
        {
            case "scan":
                return this.renderScan();
            case "confirm":
                return this.renderConfirm();
            case "thankyou":
                return this.renderThankyou();
        }
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
  }),
  { login }
)(SignUp);


// var e = Meteor.loginWithPassword(_wallet,_key,(e,r)=>{
//     if(e.error = "403"){
//         Accounts.createUser(options,(err)=>{
//             if(err){
//                 console.log(err)
//             }
//             Meteor.loginWithPassword(_wallet,_key,()=>{
//                 this.props.history.push("/confirm-email");
//                 return;
//             })
//     })
//      this.props.history.push("/confirm-email");
//  }
//
//  console.log(_wallet + " " +_key)
//
//  })

// _wallet = account.getWallet(id)
// _key = _wallet.keys.blockfreightKey
// options.username =_wallet.id;
// options.password =_key.blockfreightKey;
// updateUi()
// Accounts.createUser(options,(err)=>{
//     if(err){
//         console.log(err)
//     }
//     Meteor.loginWithPassword(_wallet,_key,()=>{
//         this.props.history.push("/confirm-email");
//     })
//
// })

//this.props.history.push("/confirm-email");
// Meteor.call('RegisterEdgeToken', account, (error, result) => {
//     if (error) {
//         alert(error);
//     } else {
//         LoginLinks.loginWithToken(result.authorizationToken, (e, r) => {
//             if (e) {
//                 //todo:add material ui notification
//                 return;
//             }
//             this.props.history.push("/confirm-email");
//             // logged in!
//         });
//     }
// })
// Accounts.createUser(options,(err)=>{
//     if(err){
//         console.log(err)
//     }
//     Meteor.call('RegisterEdgeToken', account, (error, result) => {
//         if (error) {
//             alert(error);
//         } else {
//             LoginLinks.loginWithToken(result.authorizationToken, (e, r) => {
//                 if (e) {
//                     //todo:add material ui notification
//                     return;
//                 }
//                 this.props.history.push("/confirm-email");
//                 // logged in!
//             });
//         }
//     })
// })

//let options= {};
// options.username = account.id
// options.password = ""+ crypto.randomBytes(32).toString("hex");
// Accounts.createUser(options,(err)=>{
//     if(err){
//       console.log(err)
//     }
//     Meteor.call('RegisterEdgeToken', account, (error, result) => {
//         if (error) {
//             alert(error);
//         } else {
//             LoginLinks.loginWithToken(result.authorizationToken, (e, r) => {
//                 if (e) {
//                     //todo:add material ui notification
//                     return;
//                 }
//                 this.props.history.push("/confirm-email");
//                 // logged in!
//             });
//         }
//     })
// })
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