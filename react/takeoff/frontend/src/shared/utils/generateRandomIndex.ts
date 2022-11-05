import { assoc } from './assoc';

export const generateRandomString = () => {
  const rand = Math.random().toString(36).substring(2, 15);
  return rand;
};
// export const generateMaskString = <O extends object, T extends keyof O>(obj: O, key: T) => {
//   const MASK_LIST = {
//     facebook: 'facebook.com/',
//     vk: 'vk.com/',
//   }
//   const mask = obj[key];
//   return mask;
// };

export const generateId = <O extends object>(obj: O) => assoc('id', generateRandomString())(obj);

// export const generateMask = <O extends object>(obj: O) => assoc('mask', generateRandomString())(obj);
