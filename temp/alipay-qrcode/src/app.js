import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './app.less';

// pages
import HomePage from './pages/home';

const pages = [
  {
    name: 'Home',
    path: '/:name?',
    component: HomePage,
    // exact: true
  }
];

// eslint-disable-next-line
class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          {
            pages.map(page=><Route key={`${page.name}${page.path}`} {...page} />)
          }
        </Switch>
      </HashRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
