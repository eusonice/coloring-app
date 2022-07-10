/* 
This is a helper to get and set local storage.
*/

export function getStorage(key) {
  return localStorage.getItem(key) || null;
}
export function setStorage(key, value) {
  return localStorage.setItem(key, value);
}
export function checkStorage(key) {
  return localStorage.getItem(key) !== null;
}
