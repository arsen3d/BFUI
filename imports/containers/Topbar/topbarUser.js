import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import IntlMessages from '../../components/utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';
import gravatar from "gravatar"
import {
  IconButtons,
  TopbarDropdown,
  UserInformation,
  SettingsList,
  Icon,
} from './topbarDropdown.style';
import authAction from '../../redux/auth/actions';
import Image from '../../images/julian.smith.jpg';

const { logout } = authAction;

const theme = createMuiTheme({
  overrides: {
    MuiModal: {
      root: {
        zIndex: 1800,
      },
    },
    MuiPopover: {
      paper: {
        maxWidth: 290,
      },
    },
  },
});



class TopbarUser extends Component {

    state = {
    visible: false,
    anchorEl: null,
    secureProfileUrl:"",
    email:""
  };
    constructor(props) {//'assetsPath': '/packages/node_modules/airbitz-core-js-ui/', bundlePath: '/packages/node_modules/airbitz-core-js-ui',
        super(props);
        //if(Meteor.user()){
        Meteor.subscribe('myuser',(r)=>{
                this.setState({
                    secureProfileUrl: gravatar.url(Meteor.user().emails["0"].address, {s: '100', r: 'x', d: 'retro'}, true),
                    email:Meteor.user().emails["0"].address
                });

            });
        //}
    }
  hide = () => {
    this.setState({ visible: false });
  };
  handleVisibleChange = () => {
    this.setState({
      visible: !this.state.visible,
      anchorEl: findDOMNode(this.button),
    });
  };
  render() {
    const content = (
      <TopbarDropdown>
        <UserInformation>
          <div className="userImage">
            <img src={this.state.secureProfileUrl} alt="user" />
          </div>

          <div className="userDetails">
            <h3>&nbsp;</h3>
              <p>{this.state.email}</p>
            {/*<p>CEO</p>*/}
          </div>
        </UserInformation>

        <SettingsList>
            <Link to="/dashbaord/settings" onClick={this.props.settings} className="dropdownLink">
            <Icon>settings</Icon>
            <IntlMessages id="themeSwitcher.settings" />
            </Link>
          <a className="dropdownLink">
            <Icon>help</Icon>
            <IntlMessages id="sidebar.feedback" />
          </a>
          <a className="dropdownLink">
            <Icon>feedback</Icon>
            <IntlMessages id="topbar.help" />
          </a>
          <Link to="/" onClick={this.props.logout} className="dropdownLink">
            <Icon>input</Icon>
            <IntlMessages id="topbar.logout" />
          </Link>
        </SettingsList>
      </TopbarDropdown>
    );
    return (
      <div id="topbarUserIcon">
        <IconButtons
          ref={node => {
            this.button = node;
          }}
          onClick={this.handleVisibleChange}
        >
          <div className="userImgWrapper">
            <img src={this.state.secureProfileUrl} alt="#" />
          </div>
        </IconButtons>

        <MuiThemeProvider theme={theme}>
          <TopbarDropdownWrapper
            open={this.state.visible}
            anchorEl={this.state.anchorEl}
            onClose={this.hide}
            // marginThreshold={66}
            className="userPopover"
            anchorOrigin={{
              horizontal: 'right',
            }}
            transformOrigin={{
              horizontal: 'right',
            }}
          >
            {content}
          </TopbarDropdownWrapper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().topbarTheme,
  }),
  { logout }
)(TopbarUser);
