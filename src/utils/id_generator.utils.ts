// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

export const id_generator = (length: number): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  const charactersLength = characters.length;
  let slugLength = length;
  while (slugLength) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    slugLength--;
  }
  return result;
};
