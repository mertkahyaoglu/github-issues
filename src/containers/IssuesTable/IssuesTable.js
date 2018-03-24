import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Check from 'react-icons/lib/fa/check';
import ExclamationIcon from 'react-icons/lib/fa/exclamation-circle';
import ArrowDown from 'react-icons/lib/fa/caret-down';
import Status from 'components/Status';
import IssueRow from 'components/IssueRow';
import Dropdown from 'components/Dropdown';
import ClickOutside from 'react-click-outside';
import { Avatar } from 'styles';
import {
  getIssues,
  issuesByAuthorSelector,
  issuesByLabelSelector,
} from 'ducks/issues';
import { getContributors } from 'ducks/contributors';
import { getLabels } from 'ducks/labels';
import { filterAuthor, filterLabel } from 'ducks/filters';

export class IssuesTable extends Component {
  state = {
    authorDropdownOpen: false,
    labelDropdownOpen: false,
  };

  static propTypes = {
    data: PropTypes.shape({
      issues: PropTypes.array,
      loading: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    }).isRequired,
  };

  componentDidMount() {
    const { getIssues } = this.props;
    getIssues();
  }

  countIssues = issues => {
    const open = issues.filter(issue => issue.state === 'open').length;
    const closed = issues.length - open;
    return {
      open,
      closed,
    };
  };

  openAuthorsDropdown = () => {
    const { authorDropdownOpen } = this.state;
    const { getContributors, contributors: { contributors } } = this.props;
    this.setState({ authorDropdownOpen: !authorDropdownOpen });
    if (contributors.length === 0) {
      getContributors();
    }
  };

  closeAuthorsDropdown = () => {
    this.setState({ authorDropdownOpen: false });
  };

  openLabelsDropdown = () => {
    const { labelDropdownOpen } = this.state;
    const { getLabels, labels: { labels } } = this.props;
    this.setState({ labelDropdownOpen: !labelDropdownOpen });
    if (labels.length === 0) {
      getLabels();
    }
  };

  closeLabelsDropdown = () => {
    this.setState({ labelDropdownOpen: false });
  };

  renderIssueRows = issues =>
    issues.map(issue => <IssueRow key={issue.id} data={issue} />);

  filterByAuthor = author => {
    this.closeAuthorsDropdown();
    this.props.filterAuthor(author);
  };

  filterByLabel = label => {
    this.closeLabelsDropdown();
    this.props.filterLabel(label);
  };

  render() {
    const { authorDropdownOpen, labelDropdownOpen } = this.state;
    const {
      data,
      contributors: { contributors },
      labels: { labels },
      loading,
      error,
    } = this.props;

    if (loading) {
      return 'Loading';
    }

    if (error) {
      return 'Error';
    }

    const counts = this.countIssues(data.issues);
    return (
      <div>
        <Header>
          <IssuesCount>
            <StyledStatus icon={ExclamationIcon}>
              {counts.open} Open
            </StyledStatus>
            <StyledStatus icon={Check}>{counts.closed} Closed</StyledStatus>
          </IssuesCount>
          <ButtonsWrapper>
            <Button onClick={this.openAuthorsDropdown}>
              Author <ArrowDown />
              {contributors.length > 0 &&
                authorDropdownOpen && (
                  <ClickOutside onClickOutside={this.closeAuthorsDropdown}>
                    <Dropdown
                      isOpen={authorDropdownOpen}
                      data={contributors}
                      title="Sort by author"
                      onItemClick={item => this.filterByAuthor(item)}
                      renderListItem={item => {
                        return (
                          <ListItem>
                            <Avatar src={item.avatar_url} />
                            <LoginName>{item.login}</LoginName>
                          </ListItem>
                        );
                      }}
                    />
                  </ClickOutside>
                )}
            </Button>
            <Button onClick={this.openLabelsDropdown}>
              Label <ArrowDown />
              {labels.length > 0 &&
                labelDropdownOpen && (
                  <ClickOutside onClickOutside={this.closeLabelsDropdown}>
                    <Dropdown
                      isOpen={labelDropdownOpen}
                      data={labels}
                      title="Sort by label"
                      onItemClick={item => this.filterByLabel(item)}
                      renderListItem={item => {
                        return (
                          <ListItem>
                            <Color color={item.color} />
                            <span>{item.name}</span>
                          </ListItem>
                        );
                      }}
                    />
                  </ClickOutside>
                )}
            </Button>
          </ButtonsWrapper>
        </Header>
        <RowsWrapper>{this.renderIssueRows(data.issues)}</RowsWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    filters: { filteredAuthor, filteredLabel },
    issues,
    contributors,
    labels,
  } = state;
  const issuesFilteredByAuthor = issuesByAuthorSelector(issues, filteredAuthor);
  const issuesFilteredByLabel = issuesByLabelSelector(
    issuesFilteredByAuthor,
    filteredLabel
  );
  return {
    data: issuesFilteredByLabel,
    contributors,
    labels,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getIssues,
      getContributors,
      getLabels,
      filterAuthor,
      filterLabel,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(IssuesTable);

const Header = styled.div`
  position: relative;
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 3px 3px 0 0;
  padding: 13px;
`;

const RowsWrapper = styled.div`
  border-left: 1px #e1e4e8 solid;
  border-right: 1px #e1e4e8 solid;
`;

const IssuesCount = styled.div`
  display: inline-flex;
`;

const ButtonsWrapper = styled.div`
  float: right;
`;

const StyledStatus = styled(Status)`
  margin-right: 10px;
`;

const Button = styled.button`
  background: none;
  border: none;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  position: relative;
  outline: none;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
`;

const LoginName = styled.span`
  margin-left: 4px;
  color: #000;
`;

const Color = styled.div`
  margin-right: 4px;
  margin-top: -1px;
  background-color: #${props => props.color};
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: middle;
  border-radius: 3px;
`;
