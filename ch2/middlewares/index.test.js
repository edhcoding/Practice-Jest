const { isLoggedIn, isNotLoggedIn } = require("./index");

// 테스트 커버리지로 어디까지 테스트코드 작성했는지 확인가능함
// stmts - 해당 파일의 몇 퍼센트 테스트 코드 작성했는지
// branch - 보통 if문 같은 조건문 몇 퍼센트 테스트 코드 작성했는지
// Funcs - 함수들은 몇 퍼센트 테스트 코드 작성했는지
// lines - 코드줄 수 에서 몇 퍼센트 테스트 코드 작성했는지
// uncovered line #s - 테스트 코드 작성 안 된 코드 줄 번호

describe("isLoggedIn", () => {
  test("로그인을 했으면 next() 호출", () => {
    const req = {
      isAuthenticated() {
        // 로그인 한 상태면 true 반환
        return true;
      },
    };
    const res = {};
    const next = jest.fn();

    isLoggedIn(req, res, next);
    // 실패부터 확인 후 성공 테스트하기 - 레드 그린 리펙토링 원칙
    // expect(next).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('로그인을 안 한 상태면 403 "로그인 필요"를 응답한다', () => {
    const req = {
      isAuthenticated() {
        // 로그인을 안 한 상태면 false를 반환
        return false;
      },
    };
    const res = {
      status: jest.fn(() => res), // 메서드 체이닝 테스트
      send: jest.fn(),
    };
    const next = jest.fn();

    isLoggedIn(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("로그인 필요");
  });
});

describe("isNotLoggedIn", () => {
  test("로그인을 안 했으면 next() 호출", () => {
    const req = {
      isAuthenticated() {
        // 로그인 안 한 상태면 false 반환
        return false;
      },
    };
    const res = {};
    const next = jest.fn();

    isNotLoggedIn(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("로그인을 한 상태면 next를 호출한다", () => {
    const req = {
      isAuthenticated() {
        // 로그인을 한 상태면 true를 반환
        return true;
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
    
    isNotLoggedIn(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(
      `/?error=${encodeURIComponent("로그인한 상태입니다.")}`
    );
  });
});
