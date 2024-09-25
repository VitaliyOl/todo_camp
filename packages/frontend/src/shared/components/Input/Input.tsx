import React from 'react';
import { InputGroup, TextArea } from '@blueprintjs/core';
import { inputStyles, errorStyles } from '~/shared/components/Input/Input.styles';

interface InputProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  multiline?: boolean;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  multiline = false,
  containerClassName,
}) => (
  <div className={`${inputStyles} ${containerClassName}`}>
    {multiline ? (
      <TextArea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        fill
        growVertically
      />
    ) : (
      <InputGroup
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    )}
    {error && <div className={errorStyles}>{error}</div>}
  </div>
);

export default Input;
