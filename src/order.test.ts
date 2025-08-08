import { first, second, third } from "./order";

// 함수가 호출되었나, 인수로 뭐가 들어갔냐보다 함수 호출 순서가 중요한 경우도 있음

// mock 속성에는 함수가 호출되었을때의 함수 정보가 객체로 들어있음
// mock.calls에는 함수가 호출된 인수 정보가 배열로 들어있음
// 즉, 앞에서 배운 toHaveBeenCalledWith이 mock.calls에 있는 인수와 일치하는지 확인하는 함수인거임
// toHaveBeenCalledTimes는 mock.calls 배열의 length를 검사하는거임
// mock.invocationCallOrder는 함수가 호출된 순서를 배열로 반환함 (하나의 함수가 여러번 호출 됐을 수 있어서 배열 형태)
test("first->second->third", () => {
  // spy 함수 생성
  const spy1 = jest.fn(first);
  const spy2 = jest.fn(second);
  const spy3 = jest.fn(third);

  // 함수 호출
  (spy1 as any)(1, 2, 3);
  spy2();
  (spy1 as any)("hello");
  spy3();
  spy1();

  // toBeLessThan - expect 함수의 호출순서가 toBeLessThan 함수의 호출순서보다 작은지 확인
  // toBeGreaterThan - expect 함수의 호출순서가 toBeGreaterThan 함수의 호출순서보다 큰지 확인
  // 아래오 같이 작성하면 처음 내 코드를 보는 사람은 이해하기 어려움
  // 이럴때 jest-extended 사용하면 더 가독성있게 작성할 수 있음
  expect(spy1.mock.invocationCallOrder[0]).toBeLessThan(
    spy2.mock.invocationCallOrder[0]
  );
  expect(spy3.mock.invocationCallOrder[0]).toBeGreaterThan(
    spy2.mock.invocationCallOrder[0]
  );
});

test("first->second->third 2", () => {
  const spy1 = jest.fn(first);
  const spy2 = jest.fn(second);
  const spy3 = jest.fn(third);
  (spy1 as any)(1, 2, 3);
  spy2();
  (spy1 as any)("hello");
  spy3();
  spy1();

  // 함수 호출 순서 확인 (jest-extended 사용)
  expect(spy1).toHaveBeenCalledBefore(spy2);
  expect(spy3).toHaveBeenCalledAfter(spy2);
});

test("인수의 일부 테스트", () => {
  // 가짜 함수 생성
  const fn = jest.fn();

  // 가짜 함수에 인수를 넣어서 호출하면 mock.calls에 인수가 들어감 - 인수 일부 테스트 가능
  fn({
    a: {
      b: {
        c: "hello",
      },
      d: "bye",
    },
    e: ["f"],
  });
  expect(fn.mock.calls[0][0].a.b.c).toBe("hello");
});
