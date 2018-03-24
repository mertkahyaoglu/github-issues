import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class Dropdown extends Component {
  state = {
    isOpen: this.props.isOpen,
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    data: PropTypes.array,
    renderListItem: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    const { isOpen } = this.props;
    if (nextProps.isOpen !== isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }
  }

  closeDropdown = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, title, data, renderListItem, onItemClick } = this.props;
    return (
      <DropdownHolder isOpen={isOpen}>
        <DropdownWrapper>
          <Header>
            {title} <CloseButton onClick={this.closeDropdown}>x</CloseButton>
          </Header>
          <List>
            {data.map(item => (
              <Item key={item.id} onClick={() => onItemClick(item)}>
                {renderListItem(item)}
              </Item>
            ))}
          </List>
        </DropdownWrapper>
      </DropdownHolder>
    );
  }
}

const DropdownHolder = styled.div`
  position: absolute;
  right: 10px;
  z-index: 100;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 300px;
  margin-top: 4px;
  margin-bottom: 20px;
  overflow: hidden;
  font-size: 12px;
  color: #586069;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 3px;
  box-shadow: 0 3px 12px rgba(27, 31, 35, 0.15);
`;

const Header = styled.div`
  padding: 8px 10px;
  line-height: 16px;
  background: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
  text-align: left;
  font-weight: 600;
`;

const CloseButton = styled.span`
  display: block;
  float: right;
  color: #c6cbd1;
  cursor: pointer;
  font-size: 15px;
`;

const List = styled.div`
  position: relative;
  max-height: 400px;
  overflow: auto;
`;

const Item = styled.a`
  text-align: left;
  background-color: #fff;
  display: block;
  padding: 8px 8px 8px 30px;
  overflow: hidden;
  color: inherit;
  cursor: pointer;
  border-bottom: 1px solid #eaecef;
`;
