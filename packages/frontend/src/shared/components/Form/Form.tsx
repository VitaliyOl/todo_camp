import React from 'react';

interface FormProps {
  id?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
}

const Form: React.FC<FormProps> = ({ id, onSubmit, children, className }) => (
  <form id={id} onSubmit={onSubmit} className={className}>
    {children}
  </form>
);

export default Form;