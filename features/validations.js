export const notEmpty = (val) => val.trim().length !== 0;

export const notZero = (val) => +val !== 0;

export const isUUIDv4 = (id) => {
  const uuidv4Pattern =
    /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;
  return uuidv4Pattern.test(id);
};
