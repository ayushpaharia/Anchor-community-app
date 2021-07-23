import { ValidationError } from "class-validator";

export function errorHelper(validationErrors: ValidationError[]) {
  try {
    let finalErrors: string[] = [];
    validationErrors.map((error) => {
      const validationError = error.constraints;
      finalErrors = [...finalErrors, ...Object.values(validationError!)];
    });
    console.log(finalErrors);

    return finalErrors;
  } catch (err) {
    return console.log({ error: err, message: "Something went wrong" });
  }
}
