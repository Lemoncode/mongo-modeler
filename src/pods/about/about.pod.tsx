import React from 'react';
import classes from './about.pod.module.css';
import { memberList } from './members';
import { MemberListComponent } from './components/members.component';

export const AboutPod: React.FC = () => {
  return (
    <div>
      <img
        className={classes.projectLogo}
        src="/assets/logo_mongo_modeler_dark_mode.svg"
        alt="Mongo Modeler Logo"
      />
      <h2 className={classes.projectName}>Mongo Modeler</h2>

      <p className={classes.projectVersion}>Version 0.1</p>
      <p className={classes.projectCommunity}>Community preview</p>

      <h2 className={classes.team}>Development Team</h2>
      <div className={classes.teamWrapper}>
        {memberList.map(member => (
          <MemberListComponent
            member={member}
            key={member.id}
          ></MemberListComponent>
        ))}
      </div>
    </div>
  );
};
