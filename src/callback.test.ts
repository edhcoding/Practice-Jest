import { timer, timer2 } from "./callback";

// 콜백 함수를 테스트할때는 done 매개변수 사용해서 테스트 가능

test("timer 잘 실행되는지 테스트", (done) => {
  timer((msg: string) => {
    // 이것도 "success"가 아닌 문자도 통과함
    // jest가 비동기 3초를 못기다림
    // 이거를 기다리게 하려면 done이라는 함수 매개변수를 받아서 내가 테스트를 멈추고 싶을때 넣어주면 타이머 시간을 기다림
    expect(msg).toBe("success");
    done(); // 비동기 작업이 끝났다고 알려주는 함수
  });
});

// timer2는 10초 걸리는 함수인데 done은 5초 안에 끝나는 비동기 함수만 테스트 가능함
test("시간아 빨리가라!", (done) => {
  expect.assertions(1); // 1번 실행되어야 테스트 성공 - 특히 비동기 함수 테스트할때는 조금만 실수해도 성공해버리는 경우가 잇어서 이렇게 확신이 들게 하는것도 테스트에서 중요함
  jest.useFakeTimers();

  timer2((msg: string) => {
    // expect를 없애도 테스트 성공으로 나오는데 이럴때는 expect 실행된 횟수를 테스트 해야함 - expect.assertions
    expect(msg).toBe("success");
    done();
  });

  // jest.runAllTimers(); // 시간을 빠르게 감아서 5초 안에 끝나도록함
  // runAllTimers 말고도 시간 수동으로 앞당길수도있음
  jest.advanceTimersByTime(10_000); // 10초 앞당김
});

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
