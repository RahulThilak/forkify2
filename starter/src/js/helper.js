import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // We are doing Promise.race because there is a possibility of two kind of error to occur 1. Fetch url is wrong so no result. 2. User has a bad internet connection so fetch took too long to respond. So we want the error which occurs 1st to be printed by the catch block. So we use Promise.race
    const res1 = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res1.json();

    if (!res1.ok) throw new Error(`${data.message} (${res1.status})`);
    return data;
  } catch (err) {
    // because we want to get the error message in the model.js and not here.
    throw err;
  }
};
/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    // We are doing Promise.race because there is a possibility of two kind of error to occur 1. Fetch url is wrong so no result. 2. User has a bad internet connection so fetch took too long to respond. So we want the error which occurs 1st to be printed by the catch block. So we use Promise.race
    const res1 = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res1.json();

    if (!res1.ok) throw new Error(`${data.message} (${res1.status})`);
    return data;
  } catch (err) {
    // because we want to get the error message in the model.js and not here.
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res1 = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res1.json();

    if (!res1.ok) throw new Error(`${data.message} (${res1.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
*/
