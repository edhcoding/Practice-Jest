import { toMatchObject, toMatchObject2 } from "./toMatchObject";

// 객체 비교를 toStrictEqual로 한다고 했는데 예외 상황이 있음
// class 객체는 비교 안됨
// 아래처럼 작성하면 TestObject {}, Object {} 이렇게 비교 돼서 안됨 => toMatchObject 사용하면 객체 프로퍼티 비교 가능
test("toMatchObject은 두 객체를 비교해줍니다.", () => {
  // expect(toMatchObject()).toStrictEqual({});
  expect(toMatchObject()).toMatchObject({});

  // expect(toMatchObject2("test")).toStrictEqual({ a: "test" });
  expect(toMatchObject2("test")).toMatchObject({ a: "test" });
});

// 객체끼리 비교는 toStrictEqual 사용하면 되고
// 클래스 객체는 toMatchObject 사용하면 됨

test("배열 끼리도 비교 가능", () => {
  expect([1, 2, 3]).toStrictEqual([1, 2, 3]);
  expect([1, 2, 3]).not.toBe([1, 2, 3]); // 배열은 toBe 사용 안된다는걸 보여주는거임
  expect([1, 2, 3]).toMatchObject([1, 2, 3]);
});
