import { GUID } from '@/core/model';
import classes from './database-table.module.css';

interface Props {
  id: GUID;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const TruncatedText: React.FC<Props> = props => {
  const { text, x, y, width, height, id } = props;

  return (
    <>
      <clipPath id={`clip_${id}`}>
        <rect x={x} y={y} width={width} height={height + 10}></rect>
      </clipPath>

      <text
        x={x}
        y={y + height}
        clip-path={`url(#clip_${id})`}
        className={classes.tableTextRow}
      >
        {text}
      </text>
    </>
  );
};
