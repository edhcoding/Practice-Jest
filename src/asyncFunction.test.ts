import * as fns from "./asyncFunction";

// !! 프로미스 테스트 할때는 앞에 꼭 return 추가해주자
// 성공은 resolves, then
// 실패는 rejects, catch

// 비동기 함수 테스트
test("okPromise 테스트", () => {
  expect(fns.okPromise()).resolves.toBe("ok"); // 함수가 promise를 리턴하면 꼭 resolves 넣어야함
});

test("okPromise 테스트 2", () => {
  // mocking해서 promise 함수 테스트 할 수 있는데 함정이 있음 no를 해도 테스트 통과함 - 강의에서는 통과로 나오는데 나는 실패로 나옴
  // 통과로 나올때 해결법은 okSpy가 프로미스 함수고 resolves 사용할때는 앞에 return 추가해줘야됨
  const okSpy = jest.fn(fns.okPromise);

  // 이렇게 return을 추가해줘야 promise가 resolve될 때 까지 기다리고 나서 테스트 성공 유무 판단
  // return이 없으면 resolve 되기 전에 테스트가 끝나버림
  return expect(okSpy()).resolves.toBe("ok");
});

test("okPromise 테스트 3", () => {
  const okSpy = jest.fn(fns.okPromise);

  // then을 사용하면 resolves 사용하지 않아도 됨
  // result 자체는 promise가 아니라 그냥 문자열임
  // 이것도 마찬가지로 return 추가해줘야 테스트가 성공할때까지 기다림
  return okSpy().then((result) => expect(result).toBe("ok"));
});

test("okPromise 테스트 4", async () => {
  const okSpy = jest.fn(fns.okPromise);
  const result = await okSpy();

  // async await은 return 필요 없음
  expect(result).toBe("ok");
});

test("okPromise 테스트 5", () => {
  // jest.spyOn(fns, "okPromise").mockReturnValue(Promise.resolve("ok"));
  jest.spyOn(fns, "okPromise").mockResolvedValue("ok");

  return expect(fns.okPromise()).resolves.toBe("ok");
});

test("noPromise 테스트", () => {
  const noSpy = jest.fn(fns.noPromise);

  // throw 되는 경우는 catch 사용해야함
  return noSpy().catch((result) => expect(result).toBe("no"));
});

test("noPromise 테스트 2", () => {
  const noSpy = jest.fn(fns.noPromise);

  return expect(noSpy()).rejects.toBe("no");
});

test("noPromise 테스트 3", async () => {
  const noSpy = jest.fn(fns.noPromise);

  try {
    await noSpy();
  } catch (error) {
    expect(error).toBe("no");
  }
});

test("noPromise 테스트 4", () => {
  // jest.spyOn(fns, "noPromise").mockReturnValue(Promise.reject("no"));
  jest.spyOn(fns, "noPromise").mockRejectedValue("no");

  return expect(fns.noPromise()).rejects.toBe("no");
});
