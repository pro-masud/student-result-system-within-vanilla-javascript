/**
 * Send Data to LS
 */
const sendDataLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Get Data from LS
 */
const getDataLS = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return [];
};

/**
 * Create Alert
 */
const createAlert = (msg, type = "danger") => {
  return `<p class="alert alert-${type} d-flex justify-content-between">${msg}
      <button class="btn-close" data-bs-dismiss="alert"></button>
    </p>`;
};

/**
 * isNumber function create only return a number here
 * */

const inNumber = (number) => {
  const patten = /^[0-9]{6,10}$/;
  return patten.test(number);
}