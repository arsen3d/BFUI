import { Map } from 'immutable';
import { GoogleMapSkins } from '../../containers/Map/Google/config';

const initState = new Map({
  mapSkins: GoogleMapSkins,
  mapSkinsForBasicDemo: 'silver',
  mapSkinsForCustomDemo: 'standard',
});

export default function mapReducer(state = initState, action) {
  switch (action.type) {
    case 'CHANGE_MAP_SKINS':
      return action.demoType === 'basic' ?  state 
      .set('mapSkinsForBasicDemo', action.selectedSkin) : state 
      .set('mapSkinsForCustomDemo', action.selectedSkin);
    default:
      return state;
  }
}
