import { timer } from "./callback";

// 콜백 함수를 테스트할때는 done 매개변수 사용해서 테스트 가능

test("timer 잘 실행되는지 테스트", (done) => {
  timer((msg: string) => {
    // 이것도 "success"가 아닌 문자도 통과함
    // jest가 비동기 3초를 못기다림
    // 이거를 기다리게 하려면 done이라는 함수 매개변수를 받아서 내가 테스트를 멈추고 싶을때 넣어주면 타이머 시간을 기다림
    expect(msg).toBe("success");
    done();
  });
});
