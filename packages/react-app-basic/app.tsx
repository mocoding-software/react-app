import * as React from "react";
import { HelmetWrapper, AppProps } from "@mocoding/react-app-common";

import HmrProxyEntryModule from "@mocoding/react-app-common/entry";

export class App extends React.Component<AppProps> {
  public render(): React.ReactNode {
    return (
      <HelmetWrapper helmetContext={this.props.context.helmetContext}>
        <HmrProxyEntryModule />
      </HelmetWrapper>
    );
  }
}
