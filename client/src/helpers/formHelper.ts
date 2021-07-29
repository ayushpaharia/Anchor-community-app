import React, { useState } from "react";

// interfaces
interface formValues {
  username: string;
  password: string;
  email: string;
  phoneno: string;
}

const defaultFormValues: formValues = {
  username: "",
  password: "",
  phoneno: "",
  email: "",
};

const testFormValues: formValues = {
  username: "user",
  password: "user12345@",
  phoneno: "1234567890",
  email: "user@email.com",
};

function useForm() {
  const [formValues, setFormValues] = useState<formValues>({
    ...defaultFormValues,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  function clearForm() {
    console.log(formValues);
    setFormValues({ ...defaultFormValues });
  }

  function fillTestValues() {
    setFormValues({ ...testFormValues });
  }

  return { formValues, handleInputChange, clearForm, fillTestValues };
}

export default useForm;
