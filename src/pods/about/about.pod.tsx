import React from 'react';
import classes from './about.pod.module.css';
import { LinkedinIcon } from '@/common/components';
export const AboutPod: React.FC = () => {
  return (
    <div>
      <h2 className={classes.project}>Mongo Modeler</h2>
      <p className={classes.projectVersion}>Version 0.1</p>
      <p className={classes.projectCommunity}>Community preview</p>
      <p>Github</p>

      <h2 className={classes.team}>Development Team</h2>

      {/* //TODO: component and member.ts */}
      <div className={classes.member}>
        <a
          className={classes.memberLink}
          href="https://www.linkedin.com/in/deletidev/"
          target="_blank"
        >
          <img src="/public/members/leticia.jpeg" alt="Leticia de la Osa" />
          <div className={classes.memberIcon}>
            <LinkedinIcon />
          </div>
        </a>
        <p className="member-name">Leticia de la Osa</p>
      </div>
    </div>
  );
};
