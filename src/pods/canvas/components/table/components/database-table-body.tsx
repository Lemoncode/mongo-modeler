import { TABLE_CONST } from '@/core/providers';

interface Props {
  renderedRows: JSX.Element[];
}

export const DatabaseTableBody: React.FC<Props> = props => {
  const { renderedRows } = props;
  return (
    <g transform={`translate(0, ${TABLE_CONST.HEADER_TITLE_GAP})`}>
      {renderedRows}
    </g>
  );
};
