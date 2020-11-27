import * as React from "react";
import { HelmetWrapper, AppProps } from "@mocoding/react-app-common";

export class App extends React.Component<AppProps> {
  public render(): React.ReactNode {
    return (
      <HelmetWrapper helmetContext={this.props.context.helmetContext}>
        Application should go there.
      </HelmetWrapper>
    );
  }
}
