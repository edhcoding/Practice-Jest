export function error() {
  throw new Error();
}

// 에러를 extends한 class
export class CustomError extends Error {}

export function customError() {
  throw new CustomError();
}
