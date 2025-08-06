import { toHaveBeenCalled, obj } from "./toHaveBeenCalled";

// 원래 기존에는 toBeCalled 였는데 이름 바뀜
test("toHaveBeenCalled은 함수가 호출됐는지 안됐는지 테스트 가능", () => {
  // expect(toHaveBeenCalled()).toHaveBeenCalled(); 이런식으로 작성하면 안됨 앞에서 한 번 호출해줘야함

  // jest는 실제로 toHaveBeenCalled 함수가 호출되었는지 알지 못함
  const toHaveBeenCalledSpy = jest.fn(toHaveBeenCalled); // fn을 붙이는 함수는 jest 에서는 spy 라고 불러줌 (감시한다는 의미)
  toHaveBeenCalledSpy(1, 2); // toHaveBeenCalledSpy는 toHaveBeenCalled 함수를 호출하면서 호출 되었는지까지 검사해줌
  expect(toHaveBeenCalledSpy).toHaveBeenCalled(); // 하지만 실제로 toHaveBeenCalled() 함수는 테스트 할 때 쓸모가 없는 경우가 많음 그래서 대체로 사용하는 것은
});

// 내가 몇 번 호출 되었는지
test("함수가 1번 호출되었는지 확인", () => {
  const spy = jest.fn(toHaveBeenCalled);
  spy(1, 2);

  // 함수가 호출되었냐보다 몇 번 호출되었는지가 더 중요함 => toHaveBeenCalledTimes (얘가 더 상위호환임)
  expect(spy).toHaveBeenCalledTimes(1);
});

// 내가 누구랑 호출 되었는지
test("함수가 1,2 와 함께 호출되었는지 확인", () => {
  const spy = jest.fn(toHaveBeenCalled);
  spy(1, 2);

  // toHaveBeenCalledWith은 인수까지 확인해줌
  // toHaveBeenCalled함수가 뭐랑 뭐랑 같이 호출됐는지 확인해줌 => 함수가 제대로된 인수를 받아서 호출됐는지 확인해줌
  expect(spy).toHaveBeenCalledWith(1, 2);
});

// obj의 minus 메서드가 호출되었는지 테스트
test("obj의 minus 메서드 테스트 (mocking)", () => {
  // obj.minus 함수를 복사해서 새로운 mock 함수 생성
  const spy = jest.fn(obj.minus);
  spy(1, 2); // 새로 만든 mock 함수 호출

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(1, 2);
});

test("obj의 minus 메서드 테스트 (spy)", () => {
  // obj 객체의 minus 함수에 spy를 붙여서 테스트 하겠다는 뜻
  const spy = jest.spyOn(obj, "minus"); // 감시할 객체 obj, 감시할 메서드 이름 minus
  const result = obj.minus(1, 2); // 실제 객체의 메서드 호출해서 spy가 그 호출을 감지하고 기록함

  expect(spy).toHaveBeenCalledWith(1, 2); // spy가 감시한 함수가 정확히 1, 2 인수로 호출되었는지 확인
  expect(spy).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
});

// 정리
// fn - 가짜 함수 생성, 결과는 항상 undefined, mockReturnValue 사용해서 리턴 값 설정 가능
// spyOn - 객체의 함수에 spy를 붙여서 테스트
