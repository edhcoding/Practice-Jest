import { obj } from "./module";
import axios from "axios";

// 모듈 전체를 모킹 (메서드 전부에 spyOn 해준것과 마찬가지, prop은 모킹되지 않음)
// 만약 덮어씌우고 싶다면 두번째 인자로 콜백 함수 넣어서 덮어씌우기 가능함 (조심! 전부 다 덮어씌워짐)
// 만약에 메서드 하나만 모킹하고 싶다면
// 1. 그 메서드만 spyOn 해주기
// 2. jest.requireActual 사용해서 원본 모듈 spread 해주기
// 주의! - jest.mock은 호이스팅 되기 때문에 test 내부에 작성해도 최상단으로 올라감
// 호이스팅 동작이 마음에 안든다면 spyOn 해주기
// jest.mock("./module", () => {
//   return {
//     ...jest.requireActual("./module"),
//     obj: {
//       ...jest.requireActual("./module").obj,
//       method3: jest.fn(),
//     },
//   };
// });
jest.mock("./module");

// 위에 jest.mock 코드 보면 모킹에 대한 구현을 지금 파일에서 하고 있는데 이렇게 안하고도 가능함
// 테스트 하고자하는 함수가 있는 파일과 같은 경로상에 __mocks__ 폴더를 만들고 그 안에 이름이 똑같은 테스트 하고자하는 함수 파일을 만들어서 모킹 코드를 작성해주면 됨
// 그럼 그 파일에 있는 모킹 코드가 테스트 파일에서 자동으로 불러와짐
// 보통 __mocks__ 폴더는 모든 테스트에 공통적으로 모킹을 해야 되는 경우에 주로 사용함, 개별적으로 모킹 해야한다면 위와 같이 작성함

jest.mock("axios");

test("모듈을 전부 모킹", () => {
  // 이렇게 하나씩 메서드 모킹하는 것은 비효율적
  // jest.spyOn(obj, "method");
  // jest.spyOn(obj, "method2");
  // jest.spyOn(obj, "method3");
  // jest.spyOn(obj, "method4");
  // jest.spyOn(obj, "method5");

  // obj의 prop도 교체해주고 싶을때는
  jest.replaceProperty(obj, "prop", "hello");
  // console.log(obj); // 모킹된 객체 출력
});

test("axios 모킹", () => {
  const mockedAxios = jest.mocked(axios);
  // console.log(mockedAxios); // 함수들은 모두 모킹되어있는데 속성들은 모킹되지 않음
});

// 정리
// 함수나 메서드 수정 - spyOn
// 속성 수정 - replaceProperty
