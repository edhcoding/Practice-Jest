import { obj } from "./mockFunction";

// 예를들어 함수가 데이터베이스를 호출하는 함수라고 가정했을때
// 나는 해당 함수를 실제로 호출되었는지만 확인하고 싶고 데이터 베이스 요청은 실행시키지 않고 싶을 수 있음 (spyOn 사용)
// mockImplementation, mockReturnValue 사용해서 리턴값 바꾸기

// ++ spy를 한 번 심어놓으면 계속 유지됨 -> 다음 테스트 할 때 없애줘야함
// 없애는 방법 3가지
// 1. spy이 심은 함수 변수로 받아서 마지막에 spyFn.mockClear() 시켜주면됨
// 이외에도 mockReset, mockRestore가 있음
// mockClear - 스파이 함수가 몇 번 실행되었는지 누구와 함께 실행되었는지만 초기화 함 (Times, With 초기화)
// mockReset - mockImplementation과 같은거로 다시 정의한 함수 초기화 (mockClear + mockImplementation)
// mockRestore - 아예 원래 함수로 복구함
// 하지만 이거를 전부 test 함수마다 마지막에 중복으로 작성하면 코드가 지저분함

// 해결방법
// beforeAll - 이 파일의 준비사항 실행 ex.DB연결
// beforeEach - 각 테스트 전에 실행됨 ex.변수 초기화
// afterAll - 모든 테스트가 끝난후 실행됨 ex.DB연결 해제
// afterEach - 각 테스트 후에 실행됨 ex.mockRestore같은 공통된거 실행

// jest.clearAllMocks() - jest 자체의 모든 스파이 함수 초기화
// jest.resetAllMocks() - jest 자체의 모든 스파이 함수 초기화 + 원래 함수로 복구
// jest.restoreAllMocks() - jest 자체의 모든 스파이를 없애버림

// 위의 해결방법들을 모두에게 적용안하고 싶을때 구역을 나눌 수 있음 - describe 사용 or 아얘 파일 나눠서 사용

// ++ git hook으로 jest test 자동으로 실행시킬 수 있는데 만약 너무 급해서 테스트는 지금 작성못하겠으면
// 꼼수로 test.skip 사용해서 테스트 무시하고 싶은 테스트 작성하면 됨 (실패해도 skip으로 추가됨)
// 더 짧게 xtest 사용해도됨

// ++ 지금 테스트 안할거고 나중에 작성하고 싶은 테스트가 있다면
// test.todo 사용할 수 잇음 (결론 주석처리 하지말고 test.todo('나중에 만들어야지') 이렇게 라도 할 것)
// describe.skip 사용해서 해당 구역 테스트 무시할 수 있음

let spyFn;
let beforeEachCount = 0;
let afterEachCount = 0;

// 바깥에 있는 beforeEach, afterEach는 모든 테스트에 적용됨
beforeEach(() => console.log("outside beforeEach", ++beforeEachCount));
afterEach(() => {
  console.log("outside afterEach", ++afterEachCount);
  jest.restoreAllMocks();
});

describe("beforeEach/afterEach 적용", () => {
  // descibe 안에있는 beforeEach, afterEach는 해당 구역에만 적용됨
  beforeEach(() => console.log("beforeEach", ++beforeEachCount));
  afterEach(() => {
    console.log("afterEach", ++afterEachCount);
    jest.restoreAllMocks();
  });

  test("obj 객체의 함수 테스트 (spyOn)", () => {
    jest.spyOn(obj, "minus");
    const result = obj.minus(1, 2); // spy로 감시하고 있기에 obj.minus 실제 함수를 실행하면 spy가 감지함

    expect(obj.minus).toHaveBeenCalledWith(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(-1);
  });

  test("obj 객체의 함수에 스파이를 심긴 하되 실행은 하지 않고 싶을 때 (undefined 반환)", () => {
    // mockImplementation은 해당 함수를 덮어씌워서 실행하지 않게 해줌 결과값은 undefined 반환함 (undefined 반환 함수 기본값)
    jest.spyOn(obj, "minus").mockImplementation();
    const result = obj.minus(1, 2); // obj.minus(1,2) 실행하면 undefined 반환함

    expect(obj.minus).toHaveBeenCalledWith(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined(); // result = undefined
    expect(result).not.toBe(-1);
  });

  // spyOn을 사용하면 기존 함수를 바꿔버릴 수 잇음
  test("obj 객체의 함수에 스파이를 심고 리턴값을 바꾸게", () => {
    jest.spyOn(obj, "minus").mockImplementation((a, b) => a + b);
    const result = obj.minus(1, 2); // obj.minus 함수는 덧셈함수로 덮어씌워짐

    expect(obj.minus).toHaveBeenCalledWith(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(3);
  });

  test("obj.minus에 스파이를 심고 리턴값이 서로 다르게 나오게", () => {
    jest
      .spyOn(obj, "minus")
      .mockImplementationOnce((a, b) => a + b) // 처음은 덧셈함수
      .mockImplementationOnce(() => 5) // 두번째는 5리턴함수
      .mockImplementation((a, b) => a + b); // 세번째부터는 덧셈함수
    const result1 = obj.minus(1, 2);
    const result2 = obj.minus(1, 2);
    const result3 = obj.minus(1, 2);

    expect(obj.minus).toHaveBeenCalledTimes(3);
    expect(result1).toBe(3);
    expect(result2).toBe(5);
    expect(result3).toBe(3);
  });
});

describe("beforeAll/afterAll 적용", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("함수를 바꾸지 않고 리턴값만 바꾸고 싶을때", () => {
    jest.spyOn(obj, "minus").mockReturnValue(100);
    const result = obj.minus(1, 2);

    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(100);
  });

  test("함수를 바꾸지 않고 리턴값만 바꾸고 싶을때 (mockReturnValueOnce)", () => {
    jest
      .spyOn(obj, "minus")
      .mockReturnValueOnce(100) // 이것도 똑같이 이어 적을 수 있음
      .mockReturnValueOnce(-1)
      .mockReturnValue(3);
    const result1 = obj.minus(1, 2);
    const result2 = obj.minus(1, 2);
    const result3 = obj.minus(1, 2);

    expect(obj.minus).toHaveBeenCalledTimes(3);
    expect(result1).toBe(100);
    expect(result2).toBe(-1);
    expect(result3).toBe(3);
  });
});

beforeAll(() => console.log("이 파일의 준비사항 실행"));
afterAll(() => console.log("모든 테스트가 끝난 후 실행"));
