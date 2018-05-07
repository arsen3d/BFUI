import { Map } from "immutable";
import clone from "clone";
import { getDefaultPath } from "../../helpers/urlSync";
import actions, { getView } from "./actions";
import { themeConfig } from "../../settings";

const preKeys = getDefaultPath();
const topbarHeight = 65;
const initState = new Map({
  // collapsed: window.innerWidth > 1220 ? false : true,
  collapsed: true,
  current: preKeys,
  showBreadCrumb: themeConfig.showBreadCrumb,
  fixedNavbar: themeConfig.fixedNavbar,
  view: getView(window.innerWidth),
  height: window.innerHeight,
  bredHeight: 0,
  scrollHeight: window.innerHeight - topbarHeight,
  openKeys: preKeys
});

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case actions.COLLPSE_CHANGE:
      return state.set("collapsed", !state.get("collapsed"));
    case actions.TOGGLE_ALL:
      if (state.get("view") !== action.view || action.height !== state.height) {
        const height = action.height ? action.height : state.height;
        const bredHeight = state.get("bredHeight");
        const scrollHeight = height - bredHeight - topbarHeight;
        return (
          state
            // .set('collapsed', action.collapsed)
            .set("view", action.view)
            .set("height", height)
            .set("scrollHeight", scrollHeight)
        );
      }
      break;
    case actions.CHANGE_OPEN_KEYS:
      return state.set("openKeys", clone(action.openKeys));
    case actions.CHANGE_CURRENT: {
      const fixedNavbar = state.get("fixedNavbar");
      const view = state.get("view");
      let collapsed = state.get("collapsed");
      if (fixedNavbar && view !== "DesktopView") {
        collapsed = true;
      }
      return state.set("current", action.current).set("collapsed", collapsed);
    }
    case actions.TOGLLE_SHOW_BREADCRUMB:
      return state.set("showBreadCrumb", !state.get("showBreadCrumb"));
    case actions.TOGLLE_FIXED_NAVBAR:
      return state.set("fixedNavbar", !state.get("fixedNavbar"));
    case actions.CHANGE_BRED_HEIGHT: {
      const height = state.get("height");
      const scrollHeight = height - action.bredHeight - topbarHeight;
      return state
        .set("bredHeight", action.bredHeight)
        .set("scrollHeight", scrollHeight);
    }
    default:
      return state;
  }
  return state;
}
