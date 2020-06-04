import * as React from "react";
import { Helmet } from "react-helmet-async";

import "./favicon/favicon.ico";
import "./favicon/android-chrome-192x192.png";
import "./favicon/android-chrome-512x512.png";
import appleTouchIcon from "./favicon/apple-touch-icon.png";
import favicon32 from "./favicon/favicon-32x32.png";
import favicon16 from "./favicon/favicon-16x16.png";
import manifest from "./favicon/site.webmanifest";

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
          <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
          <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
          <link rel="manifest" href={manifest} />
        </Helmet>
        FavIcon Test
      </div>
    );
  }
}
