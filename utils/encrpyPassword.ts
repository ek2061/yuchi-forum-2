import bcrypt from "bcryptjs";

export const encrypt = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const ePassword = await bcrypt.hash(password, salt);
  return ePassword;
};

export const decrypt = async (inputPwd: string, dbPwd: string) => {
  const result = await bcrypt.compare(inputPwd, dbPwd);
  return result;
};
