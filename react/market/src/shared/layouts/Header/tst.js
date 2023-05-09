const myArr = [1, 2, 3, 4];

function low(arr) {
  let result = true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] <= arr[i]) {
      result = result && true;
    } else {
      result = false;
    }
  }
  return result;
}

function up(arr) {
  let result = true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] >= arr[i]) {
      result = result && true;
    } else {
      result = false;
    }
  }
  return result;
}

const result = low(myArr) || up(myArr);

console.log(result);
