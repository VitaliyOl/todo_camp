import React, { useCallback } from 'react';
import useTodoStore from '~store/todo.store';
import Input from '~shared/components/Input/Input';
import Checkbox from '~shared/components/Checkbox/Checkbox';
import Button from '~shared/components/Button/Button';
import Form from '~shared/components/Form/Form';
import { formStyles } from '~/components/AddTodoForm/AddTodoForm.styles';
import { getErrorString } from '~shared/utils/getErrorString';
import { addFormSchema } from '~/shared/services/validationSchemas';
import { useCustomFormik } from '~/hooks/useCustomFormik';
import { AddTodoFormValues } from '~/shared/services/types';
import { addTodoInitialValues } from '~/shared/services/initialValues';

const AddTodoForm: React.FC = () => {
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = useCallback(
    async (values: AddTodoFormValues, { resetForm }: { resetForm: () => void }) => {
      await addTodo({
        title: values.title,
        description: values.description,
        isCompleted: false,
        isPrivate: values.isPrivate,
      });
      resetForm();
    },
    [addTodo]
  );

  const { formik, errorMessage } = useCustomFormik<AddTodoFormValues>({
    initialValues: addTodoInitialValues,
    validationSchema: addFormSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={formStyles}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Input
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title ? getErrorString(formik.errors.title) : undefined}
        multiline
      />
      <Input
        type="text"
        id="description"
        name="description"
        placeholder="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description ? getErrorString(formik.errors.description) : undefined}
        multiline
      />
      <Checkbox
        id="isPrivate"
        label="Private"
        checked={formik.values.isPrivate}
        onChange={formik.handleChange}
      />
      <Button
        type="submit"
        variant="primary"
        size="medium"
        disabled={formik.isSubmitting || !formik.isValid}
      >
        Add Todo
      </Button>
    </Form>
  );
};

export default AddTodoForm;