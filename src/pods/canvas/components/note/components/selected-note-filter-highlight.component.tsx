export const SelectedNoteFilterHighlightComponent: React.FC = () => {
  return (
    <defs>
      <filter id="note_component_selected" x="0" y="0">
        <feDropShadow
          dx="4"
          dy="4"
          stdDeviation="3"
          floodColor="var(--shadow-note)"
        />
      </filter>
    </defs>
  );
};
