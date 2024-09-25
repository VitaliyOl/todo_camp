import React from 'react';
import { Checkbox as BlueprintCheckbox } from '@blueprintjs/core';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, checked, onChange, label }) => (
  <BlueprintCheckbox id={id} checked={checked} onChange={onChange} label={label} />
);

export default Checkbox;