import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Status({ status, icon, children, className }) {
  return (
    <StyledStatus status={status} className={className}>
      {icon && React.createElement(icon, { style: { marginRight: '0.5em' } })}
      {children}
    </StyledStatus>
  );
}

Status.defaultProps = {
  status: 'default',
};

Status.propTypes = {
  status: PropTypes.string.isRequired,
  icon: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

const StyledStatus = styled.div`
  display: flex;
  align-items: center;
  color: ${props =>
    props.status === 'success' ||
    props.status === 'warning' ||
    props.status === 'default'
      ? props.theme[`${props.status}Color`]
      : props.theme.dangerColor};
`;
