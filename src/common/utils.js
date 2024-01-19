export const storeName = (name) => `afiwa-${name}`;

/**
 *Generate uuid to be use as keys for component without unique key
 *
 * @returns uuid
 */
export const uuid = () => {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : r && 0x3 | 0x8).toString(16);
    }
  );
  return uuid;
};

export const calculateExchangeAmount = (fromRate, toRate, amount) => {
  const rate = parseFloat(fromRate) / parseFloat(toRate);
  return [rate, parseFloat(amount) * rate];
};
