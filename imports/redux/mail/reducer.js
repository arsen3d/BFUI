import { Map } from 'immutable';
import clone from 'clone';
import allMails, { currentUser } from '../../containers/Mail/fakeData';
import actions from './actions';

const initState = new Map({
  allMails,
  currentUser,
  tag: undefined,
  selectedMail: -1,
  filterAttr: { bucket: 'Inbox' },
  composeMail: false,
  replyMail: false,
  activeAddress: false,
  openDrawer: false,
  mobileSearchView: false,
  searchString: '',
  checkedMails: {}
});

export default function mailReducer(state = initState, action) {
  switch (action.type) {
    case actions.FILTER_ATTRIBUTE:
      return state
        .set('filterAttr', { ...action.filterAttr })
        .set('selectedMail', -1)
        .set('composeMail', false)
        .set('activeAddress', false)
        .set('replyMail', false)
        .set('openDrawer', false);
    case actions.SELECTED_MAIL:
      return state
        .set('selectedMail', action.selectedMail)
        .set('allMails', action.allMails)
        .set('activeAddress', false)
        .set('replyMail', false)
        .set('openDrawer', false)
        .set('mobileSearchView', false);
    case actions.COMPOSE_MAIL:
      return state
        .set('composeMail', action.composeMail)
        .set('activeAddress', false)
        .set('replyMail', false)
        .set('openDrawer', false);
    case actions.REPLY_MAIL:
      return state
        .set('replyMail', action.replyMail)
        .set('mobileSearchView', false);

    case actions.SEARCH_STRING:
      return state.set('searchString', action.searchString);
    case actions.UPDATE_CHECKED_MAIL:
      return state
        .set('checkedMails', clone(action.checkedMails))
        .set('mobileSearchView', false);

    case actions.BULK_ACTIONS:
      return state
        .set('checkedMails', {})
        .set('selectedMail', -1)
        .set('mobileSearchView', false);

    case actions.TOGGLE_ADDRESS:
      return state.set('activeAddress', !state.get('activeAddress'));
    case actions.TOGGLE_DRAWER:
      return state.set('openDrawer', action.openDrawer);
    case actions.TOGGLE_SEARCH:
      return state.set('mobileSearchView', !state.get('mobileSearchView'));
    default:
      return state;
  }
}
