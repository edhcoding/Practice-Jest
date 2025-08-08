// 만약에 테스트 간 모듈 캐시를 초기화 하고 싶다면 jest.resetModules() 사용하면 모듈 캐시 날려줌
// beforeEach(() => {
//   jest.resetModules();
// });

test("first import", async () => {
  // module을 import 함수 사용해서 가져올 수 있음 - dynamic import
  const c = await import("./mockClass");
  (c as any).prop = "hello"; // 임의로 속성 추가
  expect(c).toBeDefined();
});

test("second import", async () => {
  // 임의로 속성 추가한 상태에서 다시 mockClass 가져오면 속성 유지됨
  // JavaScript 에서는 모듈을 가져오면 캐시되어있음
  const c = await import("./mockClass");
  expect((c as any).prop).toBe("hello");
});
