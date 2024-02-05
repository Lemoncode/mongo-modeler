import React from 'react';
import classes from './members.component.module.css';
import { LinkedinIcon } from '@/common/components';
import { Member } from '../members';

interface Props {
  member: Member;
}
export const MemberListComponent: React.FC<Props> = props => {
  const { member } = props;
  return (
    <div className={classes.member}>
      <a
        className={classes.memberLink}
        href={member.urlLinkedin}
        target="_blank"
      >
        <img src={member.image} alt={member.name} />
        <div className={classes.memberIcon}>
          <LinkedinIcon />
        </div>
      </a>
      <p className="member-name">{member.name}</p>
    </div>
  );
};
