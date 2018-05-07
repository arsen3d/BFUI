import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import Edge from "./containers/Edge";
//ReactDOM.render(<Edge/>, document.getElementById('render-target'));

import MaterialAdmin from './materialAdmin';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MaterialAdmin />, document.getElementById('render-target'));


// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./materialAdmin.js', () => {
    const NextApp = require('./materialAdmin').default;
    ReactDOM.render(<NextApp />, document.getElementById('render-target'));
  });
}
registerServiceWorker();
