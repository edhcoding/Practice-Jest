import mockFunc from "./mockFunc";
import mockClass from "./mockClass";

// jest.mock("./mockFunc"); 하면 내부에 있는 모든 함수들이 모킹되는데 원본 함수들이 필요하다면 requireActual
jest.mock("./mockFunc", () => {
  return {
    ...jest.requireActual("./mockFunc"), // 나머지 원본 함수들을 가지고 오게하고
    single2: jest.fn(), // single2 함수만 모킹
  };
});
jest.mock("./mockClass");

test("requireActual", () => {
  console.log("mockFunc", mockFunc);
  console.log("mockClass", new mockClass().methodA);

  // 이렇게 모킹을 한 와중에 원본 함수를 가지고 오고 싶을때
  const originalFunc = jest.requireActual("./mockFunc");
  console.log("originalFunc", originalFunc); // 모킹안된 원본 함수 출력

  // toBeDefined - undefined 아닌지 확인
  expect(mockFunc).toBeDefined();
  expect(mockClass).toBeDefined();
});
