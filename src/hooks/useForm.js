import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidation = {}) => {

  const [formState, setFormState] = useState(initialForm);

  const [formValidations, setFormValidation] = useState({

  });

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {

    setFormState(initialForm)

  }, [initialForm])


  const isFormValid = useMemo(() => {

    for (const formValue of Object.keys(formValidations)) {
      if (formValidations[formValue] !== null) return false;
    };

    return true;
  }, [formValidations]);


  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {

    const formCheckValues = {};

    for (const formField of Object.keys(formValidation)) {

      const [fn, errorMessage] = formValidation[formField];

      formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;

    }

    setFormValidation(formCheckValues);

  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidations,
    isFormValid,
  }
}