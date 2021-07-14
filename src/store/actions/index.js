const storeUser = (user) => {
  return {
    type: 'STORE_USER',
    data: user,
  };
};
const removeUser = () => {
  return {
    type: 'REMOVE_USER',
  };
};

export { storeUser, removeUser };
