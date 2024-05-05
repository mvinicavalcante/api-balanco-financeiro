import * as bcrypt from 'bcrypt';

export const encrypt = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
