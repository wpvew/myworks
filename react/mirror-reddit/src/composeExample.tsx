import React from 'react';
import { getValue } from './utils/react/pickFromSyntheticEvent';
import { preventDefault, stopPropagetion } from './utils/react/preventDefault';

export const InputExample = ({ value, onChange }: any) => {
  return (
    <input
      value={value}
      // onChange={preventDefault(stopPropagetion(getValue(onChange)))}
      // onChange={compose(onChange, getValue, stopPropagetion, preventDefault)}
      onChange={pipe(preventDefault, stopPropagetion, getValue, onChange)}
    />
  );
};

function compose<U>(...fns: Function[]) {
  return <E,>(initialValue: any): U => {
    return fns.reduceRight((prevValue, fn) => fn(prevValue), initialValue);
  }
}

function pipe<U>(...fns: Function[]) {
  return <E,>(initialValue: any): U => {
    return fns.reduce((prevValue, fn) => fn(prevValue), initialValue);
  }
}

// функция pick возвращает значение переданного ключа из объекта
function pick<K extends string>(prop: K) {
  return <O extends Record<K, any>>(obj: O) => obj[prop]
}
const somePick = pick('value')({ value: 1 }) // => 1

// функция isEqual сраванивает переданые значения
function isEqual<T>(left: T) {
  return <E extends T>(right: E) => left === right
}
const someIsEqual = isEqual(4123)(4123) // => true


const comments = [{ id: 22, text: 'some text one' }, { id: 43, text: 'some text two' }]
const fillterComments1 = comments.filter(pipe(pick('id'), isEqual(22))) // => { id: 22, text: 'some text one' }
const fillterComments2 = comments.filter(pipe(pick('id'), isEqual(22), cond)) // => { id: 43, text: 'some text two' }

function cond(b: boolean) {
  return !b
}

const filterWithId = (id: number) => pipe(pick('id'), isEqual(id), cond)
const fillterComments3 = comments.filter(filterWithId(22));

type filterByType = typeof comments[0];
type keyType = keyof filterByType
const createFileter = (filterBy: keyType) => (value: filterByType[keyType]) => pipe(pick(filterBy), isEqual(value), cond);
const fillterComments4 = comments.filter(createFileter('id')(22));


const getValueNumber = pipe<number>(pick('currentTarget'), pick('value'), parseInt);
