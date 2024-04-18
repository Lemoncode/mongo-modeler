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
        aria-required="true"
      >
        <div className={classes.radioButton}>
          <input
            className={classes.radioButtonInput}
            type="radio"
            name="export type"
            id="radio1"
            aria-labelledby="radio1-label"
            onChange={() => handleExportType(ExportType.SVG)}
          />
          <label
            htmlFor="radio1"
            id="radio1-label"
            className={classes.radioButtonLabel}
          >
            <span className={classes.radioButtonCustom}></span>SVG
          </label>
        </div>
        <div className={classes.radioButton}>
          <input
            className={classes.radioButtonInput}
            type="radio"
            name="export type"
            id="radio2"
            aria-labelledby="radio2-label"
            onChange={() => handleExportType(ExportType.PNG)}
          />
          <label
            htmlFor="radio2"
            id="radio2-label"
            className={classes.radioButtonLabel}
          >
            <span className={classes.radioButtonCustom}></span>PNG
          </label>
        </div>
        <div className={classes.radioButton}>
          <input
            className={classes.radioButtonInput}
            type="radio"
            name="export type"
            id="radio3"
            aria-labelledby="radio3-label"
            onChange={() => handleExportType(ExportType.SCHEMA)}
          />
          <label
            htmlFor="radio3"
            id="radio3-label"
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
          ariaLabelledby="checkboxExport"
        />
        <label htmlFor="checkboxExportFile" id="checkboxExport">
          <span>Expand all fields (svg & png export)</span>
        </label>
      </div>

      <button
        className="button-secondary"
        onClick={handleExportClick}
        disabled={!selectedExportType}
        aria-label="Export Buttom"
      >
        Export
      </button>
    </>
  );
};
