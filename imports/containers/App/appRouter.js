import React, { Component } from "react";
import asyncComponent from "../../helpers/AsyncFunc";
import Route from "../../components/utility/customRoute";
import customRoutes from "../../customApp/router";

const routes = [
  {
    path: "",
    component: asyncComponent(() => import("../Widgets"))
  },
  {
    path: "redux-forms",
    component: asyncComponent(() => import("../Forms/ReduxForm"))
  },
  {
    path: "formik",
    component: asyncComponent(() => import("../Forms/Formik"))
  },
  {
    path: "button",
    component: asyncComponent(() => import("../UiElements/Button/"))
  },
  {
    path: "savedCards",
    component: asyncComponent(() => import("../Ecommerce/Cards/"))
  },
  {
    path: "cart",
    component: asyncComponent(() => import("../Ecommerce/Cart/"))
  },
  {
    path: "checkout",
    component: asyncComponent(() => import("../Ecommerce/Checkout/"))
  },
  {
    path: "contact",
    component: asyncComponent(() => import("../Contact"))
  },
  {
    path: "input",
    component: asyncComponent(() => import("../UiElements/Input"))
  },
  {
    path: "chat",
    component: asyncComponent(() => import("../Chat"))
  },
  {
    path: "calendar",
    component: asyncComponent(() => import("../Calendar"))
  },
  {
    path: "shuffle",
    component: asyncComponent(() => import("../Shuffle"))
  },
  {
    path: "popover",
    component: asyncComponent(() => import("../UiElements/Popover"))
  },
  {
    path: "badges",
    component: asyncComponent(() => import("../UiElements/Badges"))
  },
  {
    path: "lists",
    component: asyncComponent(() => import("../UiElements/Lists"))
  },
  {
    path: "menus",
    component: asyncComponent(() => import("../UiElements/Menus"))
  },
  {
    path: "cards",
    component: asyncComponent(() => import("../UiElements/Cards/index"))
  },
  {
    path: "chips",
    component: asyncComponent(() => import("../UiElements/Chips"))
  },
  {
    path: "avatars",
    component: asyncComponent(() => import("../UiElements/Avatars/index"))
  },
  {
    path: "autocomplete",
    component: asyncComponent(() => import("../UiElements/Autocomplete/"))
  },
  {
    path: "picker",
    component: asyncComponent(() => import("../UiElements/Picker"))
  },
  {
    path: "selection-control",
    component: asyncComponent(() => import("../UiElements/SelectionControl"))
  },
  {
    path: "dividers",
    component: asyncComponent(() => import("../UiElements/Dividers/index"))
  },
  {
    path: "select",
    component: asyncComponent(() => import("../UiElements/Select"))
  },
  {
    path: "stepper",
    component: asyncComponent(() => import("../UiElements/Stepper"))
  },
  {
    path: "textFields",
    component: asyncComponent(() => import("../UiElements/TextFields"))
  },
  {
    path: "uppy",
    component: asyncComponent(() => import("../AdvancedModules/Uppy"))
  },
  {
    path: "dropzone",
    component: asyncComponent(() => import("../AdvancedModules/Dropzone"))
  },
  {
    path: "code-mirror",
    component: asyncComponent(() => import("../AdvancedModules/CodeMirror"))
  },
  {
    path: "github-search",
    component: asyncComponent(() => import("../GithubSearch"))
  },
  {
    path: "youtube-search",
    component: asyncComponent(() => import("../YoutubeSearch"))
  },
  {
    path: "shop",
    component: asyncComponent(() => import("../Ecommerce/Algolia"))
  },
  {
    path: "material-ui-tables",
    component: asyncComponent(() => import("../Tables/MaterialUiTables"))
  },
  {
    path: "googlemap",
    component: asyncComponent(() => import("../Map/Google"))
  },
  {
    path: "leafletmap",
    component: asyncComponent(() => import("../Map/Leaflet"))
  },
  {
    path: "google-chart",
    component: asyncComponent(() => import("../Charts/googleChart"))
  },
  {
    path: "rechart",
    component: asyncComponent(() => import("../Charts/recharts/"))
  },
  {
    path: "notes",
    component: asyncComponent(() => import("../Notes/index"))
  },
  {
    path: "react-trend",
    component: asyncComponent(() => import("../Charts/reactTrend"))
  },
  //  {
  //   path:`${url}/todos',
  //   component:asyncComponent(() => import('../Todos/Todo')),
  // },
  // {
  //   path: 'reactVis',
  //   component: asyncComponent(() => import('../Charts/reactVis'))
  // },
  {
    path: "frappe-chart",
    component: asyncComponent(() => import("../Charts/frappeChart"))
  },
  {
    path: "react-chart-2",
    component: asyncComponent(() => import("../Charts/reactChart2"))
  },
  {
    path: "dialogs",
    component: asyncComponent(() => import("../AdvanceUI/Dialogs"))
  },
  {
    path: "gridlist",
    component: asyncComponent(() => import("../AdvanceUI/GridList"))
  },
  {
    path: "popovers",
    component: asyncComponent(() => import("../AdvanceUI/Popovers"))
  },
  {
    path: "progress",
    component: asyncComponent(() => import("../AdvanceUI/Progress"))
  },
  {
    path: "snackbar",
    component: asyncComponent(() => import("../AdvanceUI/Snackbar"))
  },
  {
    path: "tabs",
    component: asyncComponent(() => import("../AdvanceUI/Tabs"))
  },
  {
    path: "tooltips",
    component: asyncComponent(() => import("../AdvanceUI/Tooltips"))
  },
  {
    path: "email",
    component: asyncComponent(() => import("../Mail"))
  },
  {
    path: "widgets",
    component: asyncComponent(() => import("../Widgets"))
  },
  {
    path: "material-ui-picker",
    component: asyncComponent(() =>
      import("../AdvancedModules/MaterialUIPicker")
    )
  },
  {
    path: "invoice/:invoiceId",
    component: asyncComponent(() => import("../Invoice/singleInvoice"))
  },
  {
    path: "invoice",
    component: asyncComponent(() => import("../Invoice"))
  },
  {
      path: "bill-of-lading/:billOfLadingId",
      component: asyncComponent(() => import("../BillOfLading/singleBillOfLading"))
  },
  {
      path: "bill-of-lading",
      component: asyncComponent(() => import("../BillOfLading"))
  },
  {
    path: "react-color",
    component: asyncComponent(() => import("../AdvancedModules/ReactColor"))
  },
  {
    path: "expansion-panel",
    component: asyncComponent(() => import("../UiElements/ExpansionPanel"))
  },
  {
    path: "bottom-navigation",
    component: asyncComponent(() => import("../UiElements/BottomNavigation"))
  },
  {
    path: "modals",
    component: asyncComponent(() => import("../UiElements/Modals"))
  },
  {
    path: "box",
    component: asyncComponent(() => import("../Box"))
  },
  {
      path: "settings",
      component: asyncComponent(() => import("../settings"))
  },
  ...customRoutes
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute;
          return (
            <Route
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          );
        })}
      </div>
    );
  }
}

export default AppRouter;
