module.exports = (callback) => {
  return async (event, data) => {
    const result = await callback(data);
    return JSON.stringify(result);
  };
};
