import { User } from "../entities/User";

export async function findExistingUser(query: User, method?: string) {
  const { email, username } = query;
  try {
    const existingUser: User = await User.findOne({
      where: [{ username }, { email }],
    });

    const errors: string[] = [];

    if (existingUser?.email == query.email && existingUser)
      errors.push("User with this email already exists!");
    if (existingUser?.username == query.username && existingUser)
      errors.push("User with this username already exists!");

    const isErrorFound = errors.length > 0;
    return {
      existingUser: isErrorFound && method !== "return" ? null : existingUser,
      errors: method === "return" ? null : errors,
    };
  } catch (err) {
    throw new Error(err);
  }
}
