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
const walletType = 'wallet:dashboard:blockfreight.com'
class SignIn extends Component {
    constructor(props) {//'assetsPath': '/packages/node_modules/airbitz-core-js-ui/', bundlePath: '/packages/node_modules/airbitz-core-js-ui',
        super(props);
        this.handleEdgeLogin = this.handleEdgeLogin.bind(this);
        _abcUi = abcui.makeABCUIContext({'apiKey': 'c0f8c038bd10d138288ff2bd56dbcb999d22801f',
            'appId': 'com.blockfreight.dashboard',

            'vendorName': 'Blockfreight Dashboard',
            'vendorImageUrl': 'https://blockfreight.com/wp-content/uploads/2017/04/blockfreight_logo_grey.svg'});

    }

    state = {
        redirectToReferrer: false,
        username: '',
        password: '',
    };

    componentWillReceiveProps(nextProps) {
        if (
            this.props.isLoggedIn !== nextProps.isLoggedIn &&
            nextProps.isLoggedIn === true
        ) {
            this.setState({redirectToReferrer: true});
        }
        if(this.props !=undefined && this.props.match !=undefined && this.props.match.params.edge=="edge") {
            handleEdgeLogin();
        }
    }

     handleEdgeLogin  =  () =>{
        abcUi = abcui.makeABCUIContext({'apiKey': 'c0f8c038bd10d138288ff2bd56dbcb999d22801f',
            'appId': 'com.blockfreight.dashboard',
            'accountType': 'account:repo:com.blockfreight.dashboard',
            'vendorName': 'Blockfreight Dashboard',
            'vendorImageUrl': 'https://blockfreight.com/wp-content/uploads/2017/04/blockfreight_logo_grey.svg'});
        _abcUi.openLoginWindow((error, account) => {
            if (error) {
                console.log(error)
            }
            _account = account

            this.abcWallet = account.getFirstWallet(walletType)
            let options= {};
            if (this.abcWallet == null) {
                rops.history.push("/signup");
            }else {
                const {login} = this.props;
                info = {username:this.abcWallet.id,password:this.abcWallet.keys.blockfreightKey,token:""}
                info = login(info)
                setTimeout(()=>{ this.ToDashboard(info)  },250)
            }
        });
    }
    ToDashboard = (info) =>
    {
        if(info.token.length)
        {
            this.props.history.push('/dashboard');
        }else {
            setTimeout(()=>{ this.ToDashboard(info)  },250)
        }
    }

    handleLogin = () => {
        const {login} = this.props;
        const {username, password} = this.state;
        login({username, password});
        setInterval(()=>{
            console.log(this.state)
            this.props.history.push('/dashboard');
        },250)

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
                                Welcome to Blockfreight, Please Login
                                with <a href="https://edgesecure.co/">Edge Wallet</a> Authenticator
                                {/*organization email account*/}
                                {/*information.*/}
                            </p>
                        </div>

                        <div className="mateLoginOtherBtn">
                            <div className="mateLoginSubmit">
                                <Button
                                    onClick={this.handleEdgeLogin}
                                >Edge Login
                                </Button>
                            </div>
                        </div>

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
