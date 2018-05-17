import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/uielements/button';
import signinImg from '../../../images/flow.png';
import TextField from '../../../components/uielements/textfield';
import IntlMessages from '../../../components/utility/intlMessages';
import SignInStyleWrapper from './verifyEmail.style';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
       // alert(props.match.params.token)
        Accounts.verifyEmail(props.match.params.token, (err) =>{
            if (err) {
                console.log(err.reason, 'danger');
            } else {
                //FlowRouter.go('/sign-up');
                this.props.history.push("/dashboard");
            }
        });
    }

     state = {
         email:"",
         done:false
    };
    onChangeEmail = event => this.setState({email: event.target.value});
    ConfirmEmail = () =>
    {
        this.setState({done: true})
        Meteor.call('VerifyEmail', this.state.email, (error, result) => {
            if (error) {
                alert(error);
            } else {

                // LoginLinks.loginWithToken(result.authorizationToken, (e, r) => {
                //     if (e) {
                //         //todo:add material ui notification
                //         return;
                //     }
                //     this.props.history.push("/confirm-email");
                //     // logged in!
                // });
            }
        })
    }
    render() {
        if(this.state.done) {
            return (
                <SignInStyleWrapper className="mateSignInPage">
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
                </SignInStyleWrapper>)

        }else {
            return (
                <SignInStyleWrapper className="mateSignInPage">
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
                </SignInStyleWrapper>
            );
        }


    }
}

export default VerifyEmail;
