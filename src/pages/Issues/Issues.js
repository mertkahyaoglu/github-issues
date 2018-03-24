import React, { Component } from 'react';
import IssuesTable from 'containers/IssuesTable';
import Filters from 'containers/Filters';

export default class Issues extends Component {
  render() {
    return (
      <div>
        <Filters />
        <IssuesTable />
      </div>
    );
  }
}
