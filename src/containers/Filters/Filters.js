import React, { Component } from 'react';
import styled from 'styled-components';
import { removeAuthor, removeLabel } from 'ducks/filters';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cross from 'react-icons/lib/ti/times';
import Status from 'components/Status';

export class Filters extends Component {
  render() {
    const {
      filteredAuthor,
      filteredLabel,
      removeAuthor,
      removeLabel,
    } = this.props;
    return (
      <FiltersWrapper>
        {filteredAuthor && (
          <Filter onClick={removeAuthor}>
            <Status icon={Cross}>{filteredAuthor.login}</Status>
          </Filter>
        )}
        {filteredLabel && (
          <Filter onClick={removeLabel}>
            <Status icon={Cross}>{filteredLabel.name}</Status>
          </Filter>
        )}
      </FiltersWrapper>
    );
  }
}

const mapStateToProps = state => {
  const { filters: { filteredAuthor, filteredLabel } } = state;
  return {
    filteredLabel,
    filteredAuthor,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeAuthor,
      removeLabel,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

const FiltersWrapper = styled.div`
  display: flex;
  padding: 10px 0;
`;

export const Filter = styled.button`
  border-radius: 8px;
  background: #f6f8fa;
  margin-right: 8px;
  padding: 4px 8px;
  border: none;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  position: relative;
  outline: none;
`;
