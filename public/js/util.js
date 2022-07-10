/* 
This code to check hex light/dark value is sourced here:
wc_hex_is_light: https://github.com/woocommerce/woocommerce/blob/master/includes/wc-formatting-functions.php
*/

export function isLight(color) {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
}
