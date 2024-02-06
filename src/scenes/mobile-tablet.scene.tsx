import classes from './mobile-tablet.scene.module.css';

export const MobileTabletScene: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h3>
          Community preview is only available on desktop, sorry for the
          inconvenience.
        </h3>

        <p>
          Our team is working to make it available on mobile devices in the next
          version.
        </p>
        <img
          src="/assets/mobile-development.svg"
          alt="illustration showing a woman developing a mobile phone application"
        />
      </div>
    </div>
  );
};
