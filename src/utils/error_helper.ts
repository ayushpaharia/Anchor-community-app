import { ValidationError } from "class-validator";

export function errorHelper(validationErrors: ValidationError[]) {
  try {
    // validationErrors.map((error) => {
    //   const validationError = error.constraints;
    //   finalErrors = [...finalErrors, ...Object.values(validationError!)];
    // });

    const finalErrors: string[] = validationErrors.reduce(
      (prev: any, current: any) => {
        prev[current.property] = Object.values(current.constraints);
        return prev;
      },
      {}
    );

    return finalErrors;
  } catch (err) {
    return console.log({ error: err, message: "Something went wrong" });
  }
}
