import { toStrictEqual } from "./toStrictEqual";

// 객체 테스트는 toBe로 안됨 -> toStrictEqual 사용
// 객체 끼리 비교하면 주소값 비교해서 테스트 실패함 -> toStrictEqual 사용
test("toStrictEqual은 두 객체를 비교해줍니다.", () => {
  expect(toStrictEqual(1, 2)).toStrictEqual({ a: 1, b: 2 });
});
