import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { Issues } from 'pages';

export default class Main extends Component {
  render() {
    return (
      <Container>
        <Route exact component={Issues} path="/" />
      </Container>
    );
  }
}

const Container = styled.div`
  width: 960px;
  padding: 60px 0;
  margin-right: auto;
  margin-left: auto;
`;
