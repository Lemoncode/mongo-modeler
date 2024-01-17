import React from 'react';
import { useModalDialogContext } from '@/core/providers';
import classes from './export-table.module.css';
import { ExportType } from '@/core/model';

interface Props {
  onExport: (exportType: ExportType) => void;
}

export const ExportTablePod: React.FC<Props> = props => {
  const { onExport } = props;
  const { closeModal } = useModalDialogContext();
  const [selectedExportType, setSelectedExportType] =
    React.useState<ExportType | null>(null);

  const handleExportType = (exportType: ExportType) => {
    setSelectedExportType(exportType ?? 'svg');
  };

  const handleExportClick = () => {
    onExport(selectedExportType ?? 'svg');
    closeModal();
  };
  return (
    <>
      <div className={classes.inputContent}>
        <label htmlFor="svg">
          <input
            type="radio"
            name="export type"
            id="svg"
            aria-label="SVG"
            onChange={() => handleExportType('svg')}
          />
          SVG
        </label>
        <label htmlFor="png">
          <input
            type="radio"
            name="export type"
            id="png"
            aria-label="PNG"
            onChange={() => handleExportType('png')}
          />
          PNG
        </label>
        <label htmlFor="mongo">
          <input
            type="radio"
            name="export type"
            id="mongo"
            aria-label="Mongo Schema"
            onChange={() => handleExportType('mongo')}
          />
          Mongo Schema
        </label>
      </div>
      <button className={classes.buttonExport} onClick={handleExportClick}>
        Export
      </button>
    </>
  );
};
