export const inwokeMain = async ({ command, options, debug = false }) => {
  const result = await window.mainApi.invokeMain(command, options);
  if (debug) {
    console.log(result);
  }
  return JSON.parse(result);
};
