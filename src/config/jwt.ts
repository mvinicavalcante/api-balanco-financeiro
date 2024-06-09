import * as bcrypt from 'bcrypt';

export const encrypt = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const compare = (password: string, passwordDb: string) => {
  const isValidPassord = bcrypt.compareSync(password, passwordDb);
  return isValidPassord;
}