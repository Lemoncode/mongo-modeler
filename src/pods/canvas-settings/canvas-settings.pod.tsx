import { Size } from '@/core/model';
import React from 'react';

interface Props {
  size: Size;
  onChangeSize: (size: Size) => void;
}

export const CanvasSettingsComponent: React.FC<Props> = props => {
  const { size, onChangeSize } = props;
  const [editSize, setEditSize] = React.useState<Size>({ ...size });

  const handleSubmitSize = () => {
    onChangeSize(editSize);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditSize({
      ...editSize,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      Canvas Setting
      <input name="width" value={editSize.width} onChange={handleFieldChange} />
      <input
        name="height"
        value={editSize.height}
        onChange={handleFieldChange}
      />
      <button onClick={handleSubmitSize}>On Change Settings</button>
    </div>
  );
};
