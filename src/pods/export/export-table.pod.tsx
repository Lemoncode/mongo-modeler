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
    setSelectedExportType(exportType ?? ExportType.SVG);
  };

  const handleExportClick = () => {
    onExport(selectedExportType ?? ExportType.SVG);
    closeModal();
  };
  return (
    <>
      <div className={classes.inputContent}>
        <div className={classes.radioButton}>
          <input
            className={classes.radioButtonInput}
            type="radio"
            name="export type"
            id="radio2"
            aria-label="SVG"
            onChange={() => handleExportType(ExportType.SVG)}
          />
          <label htmlFor="radio2" className={classes.radioButtonLabel}>
            <span className={classes.radioButtonCustom}></span>SVG
          </label>
        </div>
        <div className={classes.radioButton}>
          <input
            className={classes.radioButtonInput}
            type="radio"
            name="export type"
            id="radio1"
            aria-label="PNG"
            onChange={() => handleExportType(ExportType.PNG)}
          />
          <label htmlFor="radio1" className={classes.radioButtonLabel}>
            <span className={classes.radioButtonCustom}></span>PNG
          </label>
        </div>
        <div className={classes.radioButton}>
          <input
            className={classes.radioButtonInput}
            type="radio"
            name="export type"
            id="radio3"
            aria-label="Mongo Schema"
            onChange={() => handleExportType(ExportType.SCHEMA)}
          />
          <label htmlFor="radio3" className={classes.radioButtonLabel}>
            <span className={classes.radioButtonCustom}></span>Mongo Schema
          </label>
        </div>
      </div>
      <button className="button-secondary" onClick={handleExportClick}>
        Export
      </button>
    </>
  );
};
