import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Provider } from "react-redux";
import { AppProps, HelmetWrapper } from "@mocoding/react-app-common";

import HmrProxyEntryModule from "@mocoding/react-app-common/entry";

export class App extends React.Component<AppProps> {
  public render(): React.ReactNode {
    return (
      <HelmetWrapper helmetContext={this.props.context.helmetContext}>
        <Provider store={this.props.context.store}>
          <ConnectedRouter history={this.props.context.history}>
            <HmrProxyEntryModule />
          </ConnectedRouter>
        </Provider>
      </HelmetWrapper>
    );
  }
}
