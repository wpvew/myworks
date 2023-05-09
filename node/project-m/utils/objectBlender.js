function objectBlender(obj) {
  return Object.keys(obj).reduce((newObj, key) => {
    return {
      ...newObj,
      [key]: obj[key].value,
    };
  }, {});
}

module.exports = objectBlender;
