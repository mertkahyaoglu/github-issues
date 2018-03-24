import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ExclamationIcon from 'react-icons/lib/fa/exclamation-circle';
import CommentIcon from 'react-icons/lib/fa/comment';
import Status from 'components/Status';
import Label from 'components/Label';
import Assignee from 'components/Assignee';
import { timeDifference } from 'utils/helpers';

export default class IssueRow extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  renderLabels = labels =>
    labels.map(label => <Label key={label.id} label={label} />);

  renderAssignees = assignees =>
    assignees.map(assignee => (
      <Assignee key={assignee.id} assignee={assignee} />
    ));

  render() {
    const { data } = this.props;
    return (
      <Row>
        <Status
          status={data.state === 'open' ? 'success' : 'danger'}
          icon={ExclamationIcon}
        />
        <IssueInfo>
          <TitleWrapper>
            <Title href={data.html_url} target="_blank">
              {data.title}
            </Title>
            <Labels>{this.renderLabels(data.labels)}</Labels>
            <Assignees>{this.renderAssignees(data.assignees)}</Assignees>
            {data.comments > 0 && (
              <CommentsLink href={data.html_url} target="_blank">
                <Status icon={CommentIcon}>{data.comments}</Status>
              </CommentsLink>
            )}
          </TitleWrapper>
          <Meta>
            {`#${data.number} opend on ${timeDifference(
              +new Date(),
              +new Date(data.created_at)
            )} by`}{' '}
            <UserLink href={data.user.html_url} target="_blank">
              {data.user.login}
            </UserLink>
          </Meta>
        </IssueInfo>
      </Row>
    );
  }
}

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 13px;
  background-color: #fff;
  border-bottom: 1px solid #e1e4e8;
  &:hover {
    background-color: #f6f8fa;
  }
`;

const IssueInfo = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.a`
  color: #24292e;
  font-weight: 600;
`;

const UserLink = styled.a`
  color: #586069;
`;

const CommentsLink = styled.a`
  color: #586069;
  font-size: 12px;
`;

const Labels = styled.div`
  margin-left: 4px;
`;

const Assignees = styled.div`
  margin-left: auto;
  margin-right: 10px;
`;

const Meta = styled.div`
  color: #586069;
  font-size: 12px;
  margin-top: 8px;
`;
