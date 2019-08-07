import React from "react";
import { Link } from "react-router-dom";

export default class ExceptionPage extends React.Component {
  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    return (
      <div>
        <h2>404</h2>
        <ul>
          <li>
            <a href="javascript:;" onClick={this.goBack}>
              back
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
