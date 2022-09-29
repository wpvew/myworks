export const validationLogin = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]-/g,'')
}
export const validationNumber = (str: string) => {
  return str.replace(/[^0-9+]/g,'')
}
export const validationString = (str: string) => {
  return str.replace(/[^a-zA-ZА-я-]/g,'')
}
export const validationEmail = (str: string) => {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(str)
}
