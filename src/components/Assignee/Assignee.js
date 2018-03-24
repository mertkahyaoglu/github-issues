import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Avatar } from 'styles';

const Assignee = ({ assignee }) => (
  <StyledAssignee target="_blank" href={assignee.html_url}>
    <Avatar src={assignee.avatar_url} alt={assignee.login} />
  </StyledAssignee>
);

Assignee.propTypes = {
  assignee: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
};

export default Assignee;

const StyledAssignee = styled.a`
  margin-right: 4px;
`;
