import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = ({ label }) => (
  <StyledLabel target="_blank" href={label.url} color={label.color}>
    {label.name}
  </StyledLabel>
);

Label.propTypes = {
  label: PropTypes.shape({
    color: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Label;

const StyledLabel = styled.a`
  height: 20px;
  padding: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  border-radius: 2px;
  box-shadow: inset 0 -1px 0 rgba(27, 31, 35, 0.12);
  background-color: #${props => props.color};
  color: #000;
  margin-right: 4px;
`;
