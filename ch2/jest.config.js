// npm init jest@latest

/** @type {import('jest').Config} */
const config = {
  // 이거 하나는 기억하면 좋은데 ch1에서 beforeEach에 jest.clearAllMocks() 썼던거 처럼 안적어도 자동으로 모든 모킹 초기화 해줌(추가되어있다고 생각하면됨)
  clearMocks: true,

  // 테스트를 작성하다보면 어떤 부분은 테스트했고 어떤 부분은 안했는지 헷갈림, collectCoverage 옵션을 통해 커버리지 정보를 수집할 수 있음
  collectCoverage: true,
  coverageDirectory: "coverage", // 해당 폴더가 생성되고 커버리지 보고서가 생성됨
  coverageProvider: "v8", // 커버리지 정보를 수집하는 방법
};

module.exports = config;
