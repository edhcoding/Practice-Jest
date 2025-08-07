import { after3days } from "./date";

// 아래처럼 생각할 수 있는데 진짜 1000분의 1초 차이로 테스트 실패함
// test("3일 후를 리턴한다.", () => {
//   const date = new Date();
//   date.setDate(date.getDate() + 3);

//   expect(after3days()).toStrictEqual(date);
// });

// 이럴때는 가짜 타이머를 적용해서 테스트 할 수 있음
test("3일 후를 리턴한다.", () => {
  jest.useFakeTimers().setSystemTime(new Date(2025, 8, 7)); // 오늘이 9월 7일이라고 가정 (월은 0부터 시작하므로 8 = 9월)
  console.log(new Date()); // 2025-09-06T15:00:00.000Z - Z가 붙으면 런던시간으로 +9시간을 더해줘야 한국시간임
  expect(after3days()).toStrictEqual(new Date(2025, 8, 10)); // 3일 뒤인 9월 10일이 나와야함
});

// useFakkeTimer 사용했으면 다시 원래대로 돌려줘야함
afterEach(() => jest.useRealTimers());

// jest fakeTimer 기능이 많다.
// https://jestjs.io/docs/jest-object#jestusefaketimersfaketimersconfig

// jest.runAllTicks()
// 바로 promise, async/await 반환할 수 있는 메소드

// jest.runAllTimers()
// 바로 setTimeout, setInterval의 콜백 함수를 실행할 수 있게 하는 메소드 + runAllTicks

// jest.runAllImmediates()
// 바로 setImmediate 콜백 함수를 실행할 수 있게 하는 메소드

// jest.advanceTimersByTime
// 타이머를 특정 시간 만큼만 진행시킴

// jest.clearAllTimers
// 타이머 없애는 메소드, runAllTimers로 타이머 실행 시켜도 실행되지 않음

// jest.getTimersCount()
// 타이머 몇개인지 카운트 하는 메소드

// jest.getRealSystemTime()
// useFakeTimer를 사용해서 가짜시간을 설정하면 실제시간을 볼 수 있는방법은 jest.getRealSystemTime 밖에 없다.

// toBeCloseTo 사용하면 부동 소수점 오차를 무시할 수 있음
test("0.1 + 0.2 는 0.3", () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});
