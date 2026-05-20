export const SelectedTableFilterHighlightComponent: React.FC = () => {
  return (
    <defs>
      <filter id="table_component_selected" x="0" y="0">
        <feDropShadow
          dx="3"
          dy="3"
          stdDeviation="4"
          floodColor="var(--shadow-filter)"
        />
      </filter>
    </defs>
  );
};
