import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// import InputName from '../../components/chat/inputName';
import ChatRooms from './chatrooms';
import Messages from './messages';
import ComposeMessage from './composMessage';
import ViewProfile from '../../components/chat/viewProfile';
import Loader from '../../components/utility/Loader';
import Icon from '../../components/uielements/icon';
import {
  ChatWindow,
  ChatBox,
  InputName,
  ChatSidebar,
  ToggleViewProfile,
  LayoutWrapper,
  Dialog,
} from './message.style';

import actions from '../../redux/chat/actions';

const { chatInit, toggleCompose, setComposedId, toggleViewProfile } = actions;

const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      root: {
        zIndex: 1500,
      },
      paperWidthSm: {
        maxWidth: '80vw',
        width: '100%',
      },
    },
  },
});

class DesktopView extends Component {
  componentDidMount() {
    const { users, userId, chatInit } = this.props;
    if (!users) {
      chatInit(userId);
    }
  }
  render() {
    const {
      loading,
      users,
      toggleCompose,
      openCompose,
      setComposedId,
      selectedChatRoom,
      viewProfile,
      toggleViewProfile,
    } = this.props;
    if (loading) {
      return <Loader />;
    }
    return (
      <LayoutWrapper style={{ height: '100%' }}>
        <ChatWindow>
          <ChatSidebar>
            <ChatRooms />
          </ChatSidebar>
          <ChatBox>
            <MuiThemeProvider theme={theme}>
              <Dialog open={openCompose} onClose={toggleCompose}>
                <div className="MessageDialog">
                  <Icon onClick={toggleCompose}>close</Icon>
                  <h5>Starting your chat with...</h5>
                  <InputName
                    users={users}
                    setComposedId={setComposedId}
                    fullWidth
                  />
                  <ComposeMessage showButton rows={8} />
                </div>
              </Dialog>
            </MuiThemeProvider>
            <ToggleViewProfile>
              <span
                onClick={() =>
                  toggleViewProfile(selectedChatRoom.otherUserInfo)
                }
              >
                {selectedChatRoom.otherUserInfo.name}
              </span>
            </ToggleViewProfile>
            <Messages />

            <ComposeMessage
              InputProps={{
                disableUnderline: true,
              }}
            />
          </ChatBox>
          {viewProfile !== false ? (
            <ViewProfile
              user={selectedChatRoom.otherUserInfo}
              toggleViewProfile={toggleViewProfile}
              viewProfile={viewProfile}
            />
          ) : (
            ''
          )}
        </ChatWindow>
      </LayoutWrapper>
    );
  }
}
function mapStateToProps(state) {
  return state.Chat.toJS();
}
export default connect(mapStateToProps, {
  chatInit,
  toggleCompose,
  setComposedId,
  toggleViewProfile,
})(DesktopView);
