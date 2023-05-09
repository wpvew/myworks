export const isKeyOf = <O extends Record<PropertyKey, unknown>>(
  object: O,
  property: PropertyKey
): property is keyof O => {
  return Object.prototype.hasOwnProperty.call(object, property);
};
