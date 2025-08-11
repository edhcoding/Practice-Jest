import { error, customError, CustomError } from "./throwFunction";

// toThrow(): 에러가 발생하는지만 확인
// toStrictEqual(): 에러 객체의 정확한 내용까지 확인

test("error 테스트", () => {
  // toThrow로 비교하기도 전에 error() 함수에서 에러가 나버려서 테스트 실패함 (error() 함수가 즉시 실행됨)
  // expect(error()).toThrow(Error);

  // 이럴때는 error 함수를 함수로 감싸주면 테스트 통과함
  // 어떤 함수가 에러를 throw 한다면 바로 넣지말고 감싸서 넣어줘야함
  expect(() => error()).toThrow(Error);
  expect(() => customError()).toThrow(CustomError);
});

test("error가 잘 난다(try/catch)", () => {
  try {
    error();
  } catch (err) {
    // toStrictEqual은 객체 비교할때 사용하는 함수 (에러 객체가 정확히 일치하는지 확인)
    expect(err).toStrictEqual(new Error());
  }
});
