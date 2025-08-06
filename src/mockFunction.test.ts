import { obj } from "./mockFunction";

// 예를들어 함수가 데이터베이스를 호출하는 함수라고 가정했을때
// 나는 해당 함수를 실제로 호출되었는지만 확인하고 싶고 데이터 베이스 요청은 실행시키지 않고 싶을 수 있음 (spyOn 사용)
// mockImplementation, mockReturnValue 사용해서 리턴값 바꾸기

// 아래는 기존 코드임
test("obj의 minus 메서드 테스트 (spy)", () => {
  const spy = jest.spyOn(obj, "minus");
  const result = obj.minus(1, 2);

  expect(spy).toHaveBeenCalledWith(1, 2);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
});

test("obj의 minus 메서드에 스파이를 심긴 하되 실행은 하지 않고 싶을 때", () => {
  // mockImplementation은 해당 함수를 덮어씌워서 실행하지 않게 해줌 결과값은 undefined 반환함
  const spy = jest.spyOn(obj, "minus").mockImplementation();
  const result = obj.minus(1, 2);

  expect(spy).toHaveBeenCalledWith(1, 2);
  expect(result).toBeUndefined();
  expect(result).not.toBe(-1);
});

// spyOn을 사용하면 기존 함수를 바꿔버릴 수 잇음
test("obj의 minus 메서드에 스파이를 심고 리턴값을 바꾸게", () => {
  const spy = jest.spyOn(obj, "minus").mockImplementation((a, b) => a + b);
  const result = obj.minus(1, 2); // obj.minus 함수는 덧셈함수로 덮어씌워짐

  expect(spy).toHaveBeenCalledWith(1, 2);
  expect(result).toBe(3);
});

test("obj.minus에 스파이를 심고 리턴값이 서로 다르게 나오게", () => {
  jest
    .spyOn(obj, "minus")
    .mockImplementationOnce((a, b) => a + b) // 처음은 덧셈함수
    .mockImplementationOnce(() => 5) // 두번째는 5리턴함수
    .mockImplementation((a, b) => a + b); // 세번째부터는 덧셈함수
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);
  expect(result1).toBe(3);
  expect(result2).toBe(5);
  expect(result3).toBe(3);
});

test("함수를 바꾸지 않고 리턴값만 바꾸고 싶을때", () => {
  jest.spyOn(obj, "minus").mockReturnValue(100);
  const result = obj.minus(1, 2);
  expect(result).toBe(100);
});

test("함수를 바꾸지 않고 리턴값만 바꾸고 싶을때 (mockReturnValueOnce)", () => {
  jest
    .spyOn(obj, "minus")
    .mockReturnValueOnce(100) // 이것도 똑같이 이어 적을 수 있음
    .mockReturnValueOnce(-1)
    .mockReturnValue(3);
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);
  expect(result1).toBe(100);
  expect(result2).toBe(-1);
  expect(result3).toBe(3);
});
