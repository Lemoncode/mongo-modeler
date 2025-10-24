import { AddCollection } from './components';
import { RelationButton } from './components';
import classes from './floating-bar.pod.module.css';

export const FloatingBarComponent: React.FC = () => {
  return (
    <>
      <div className={classes.floatingBarContainer}>
        <div className={classes.floatingBar}>
          <AddCollection />
          <RelationButton />
        </div>
      </div>
    </>
  );
};
