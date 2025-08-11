// test("1 더하기 2는 3", () => {
//   expect(1 + 2).toBe(3);
// });

// test("2 더하기 3는 5", () => {
//   expect(2 + 3).toBe(5);
// });

// test("3 더하기 4는 7", () => {
//   expect(3 + 4).toBe(7);
// });

// 비슷한 패턴의 테스트를 할 때는 test.each 사용 - 고차함수
test.each([
  [1, 2, 3],
  [2, 3, 5],
  [3, 4, 7],
])("%i 더하기 %i는 %i", (a, b, c) => {
  expect(a + b).toBe(c);
});

// or 순서를 안지키고 싶다면
test.each([
  { a: 1, b: 2, c: 3 },
  { a: 2, b: 3, c: 5 },
  { a: 3, b: 4, c: 7 },
])("%i 더하기 %i는 %i", ({ a, b, c }) => {
  expect(a + b).toBe(c);
});
