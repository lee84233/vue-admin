/**
 * 常用正则验证
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 手机号，宽松正则验证
 *
 * @param {String, Number} phone 手机号码
 * @returns {Boolean}
 */
export function isPhone(phone) {
  const reg = /^[1]([3-9])[0-9]{9}$/
  return reg.test(phone)
}

/**
 * 邮箱正则
 *
 * @param {String} email 邮箱
 * @returns {Boolean}
 */
export function isEmail(email) {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  return reg.test(email)
}

/**
 * 身份证号正则
 *
 * @param {String} cardID 身份证号码
 * @returns {Boolean}
 */
export function isCardID(cardID) {
  const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  return reg.test(cardID)
}
