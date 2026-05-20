import React from 'react';
import { useModalDialogContext } from '@/core/providers';
import classes from './export-table.module.css';
import { ExportType } from '@/core/model';
import { Checkbox } from '@/common/components';

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
      <fieldset
        className={classes.inputContent}
        aria-label="Select an export format"
      >
        <div className={classes.radioButton}>
          <input
            className={classes.radioButtonInput}
            type="radio"
            name="export type"
            id="radio-svg"
            onChange={() => handleExportType(ExportType.SVG)}
          />
          <label htmlFor="radio-svg" className={classes.radioButtonLabel}>
            <span className={classes.radioButtonCustom}></span>SVG
          </label>
        </div>
        <div className={classes.radioButton}>
          <input
            className={classes.radioButtonInput}
            type="radio"
            name="export type"
            id="radio-png"
            onChange={() => handleExportType(ExportType.PNG)}
          />
          <label htmlFor="radio-png" className={classes.radioButtonLabel}>
            <span className={classes.radioButtonCustom}></span>PNG
          </label>
        </div>
        <div className={classes.radioButton}>
          <input
            className={classes.radioButtonInput}
            type="radio"
            name="export type"
            id="radio-mongo-schema"
            onChange={() => handleExportType(ExportType.SCHEMA)}
          />
          <label
            htmlFor="radio-mongo-schema"
            className={classes.radioButtonLabel}
          >
            <span className={classes.radioButtonCustom}></span>Mongo Schema
          </label>
        </div>
      </fieldset>

      <div className={classes.checkboxExport}>
        <Checkbox
          id="checkboxExportFile"
          onChange={() => setAreAllFieldsExpanded(!areAllFieldsExpanded)}
          checked={areAllFieldsExpanded}
        />
        <label htmlFor="checkboxExportFile">
          <span>Expand all fields (svg & png export)</span>
        </label>
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
