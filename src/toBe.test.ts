import { sum } from "./toBe";

// it or test (O)
test("sum은 두 숫자를 더해줍니다.", () => {
  expect(sum(1, 2)).toBe(3);
});

// 비슷한 matcher => toBe, toEqual
// 차이점 값이 정확하게 일치하는지 비교하려면 toBe, 객체 비교하려면 toEqual

// boolean, undefined, null matcher - .not 붙이면 반대로 테스트 가능
// toBeNull - null 값만 허용
// toBeUndefined - undefined 값만 허용
// toBeDefined - undefined가 아닌 값
// toBeTruthy - true 값만 허용
// toBeFalsy - false 값만 허용 (false, 0, -0, 0n, "", null, undefined, NaN)

// esm 트랜스파일러 없이 테스트 가능하게 하는 방법
// npx cross-env NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" jest

// typescript 사용하려면 -> ts-jest @types/jest
// config 설정 -> npx ts-jest config:init
// 위에 명령어로 jest.config.js 생성해서 설정 추가해도되고
// package.json에 "jest": {} 추가해도됨 (config 파일 별도 분리 안하고 싶을때)
