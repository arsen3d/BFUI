import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { VoiceSearch, MicIcon } from './algoliaComponent.style';

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
};
const options = {
  autoStart: false,
};
class VoiceRecognition extends Component {
  state = {
    listening: false,
  };
  render() {
    const {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition,
      startListening,
      stopListening,
      onSearchChange,
    } = this.props;
    if (!browserSupportsSpeechRecognition) {
      return <div />;
    }
    return (
      <VoiceSearch>
        {!this.state.listening ? (
          <div className="voiceSearchStart">
            <button
              onClick={() => {
                startListening();
                this.setState({ listening: true });
              }}
            >
              <MicIcon>mic</MicIcon>
            </button>
            <span>Start Speaking</span>
          </div>
        ) : (
          <div className="voiceSearchRunning">
            <button
              onClick={() => {
                onSearchChange({ query: transcript });
                resetTranscript();
                stopListening();
                this.setState({ listening: false });
              }}
            >
              <MicIcon>pause</MicIcon>
            </button>
            <span>{transcript}</span>
          </div>
        )}
      </VoiceSearch>
    );
  }
}
VoiceRecognition.propTypes = propTypes;
export default SpeechRecognition(options)(VoiceRecognition);
