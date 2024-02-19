import React from 'react';
import { useModalDialogContext } from '@/core/providers';
import classes from './export-table.module.css';
import { ExportType } from '@/core/model';

interface Props {
  onExport: (exportType: ExportType, areAllFieldsExpanded: boolean) => void;
}

export const ExportTablePod: React.FC<Props> = props => {
  const { onExport } = props;
  const { closeModal } = useModalDialogContext();
  const [selectedExportType, setSelectedExportType] =
    React.useState<ExportType | null>(null);
  const [areAllFieldsExpanded, setAreAllFieldsExpanded] =
    React.useState<boolean>(true);
  const handleExportType = (exportType: ExportType) => {
    setSelectedExportType(exportType ?? ExportType.SVG);
  };

  const handleExportClick = () => {
    onExport(selectedExportType ?? ExportType.SVG, areAllFieldsExpanded);
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

      <div className={classes.checkboxExport}>
        <div className="checkbox">
          <input
            type="checkbox"
            id="checkbox1"
            onChange={() => setAreAllFieldsExpanded(!areAllFieldsExpanded)}
            checked={areAllFieldsExpanded}
          />
          <label htmlFor="checkbox1">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
        </div>
        <p>Expand all fields (svg & png export)</p>
      </div>
      <button
        className="button-secondary"
        onClick={handleExportClick}
        disabled={!selectedExportType}
      >
        Export
      </button>
    </>
  );
};
