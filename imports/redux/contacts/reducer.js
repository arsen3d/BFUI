import { Map } from 'immutable';
import clone from 'clone';
import fakeData from '../../containers/Contact/fakeData';
import actions, { ascendingSort } from './actions';

const contacts = new fakeData(100).getAll();

const initState = new Map({
  searchText: '',
  contacts: contacts.sort(ascendingSort),
  filteredContacts: contacts.sort(ascendingSort),
  seletedContact: null
});

const filterContacts = (contacts, searchText) => {
  if (searchText.length === 0) {
    return contacts;
  }
  searchText = searchText.toLowerCase();
  const newContacts = [];
  contacts.forEach(contact => {
    if (contact.name.toLowerCase().indexOf(searchText) > -1) {
      newContacts.push(contact);
    }
  });
  return newContacts;
};
export default function contactReducer(state = initState, action) {
  switch (action.type) {
    case actions.CONTACT_SET_SELECTED:
      return state.set('seletedContact', clone(action.seletedContact));
    case actions.UPDATE_CONATCTS:
      return state
        .set('seletedContact', null)
        .set('contacts', action.contacts)
        .set('filteredContacts', action.contacts)
        .set('searchText', '');
    case actions.SEARCH_CONTACT:
      return state
        .set(
          'filteredContacts',
          filterContacts(state.get('contacts'), action.searchText)
        )
        .set('searchText', action.searchText);
    default:
      return state;
  }
}

export { contacts };
