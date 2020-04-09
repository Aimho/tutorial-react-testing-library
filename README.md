## Tutorial react-testing-library

[velopert 블로그](https://velog.io/@velopert/react-testing-library) - 리액트 테스팅 6, 7, 8

## Tutorial Memo

### Enzyme & react-testing-library 차이

react-testing-library(이하 rtl)는 Enzyme와 달리 모든 테스트를 DOM 위주로 진행.

컴포넌트의 props & state 를 조회하는 일은 없음, <br/>
컴포넌트를 리팩토링 하는 경우 내부 구조 및 네이밍은 많이 바뀔 수 있는데 실제 동작 방식은 크게 바뀌지 않는 경우가 많은데 <br/>
rtl은 이 점을 중요시 여겨, 컴포넌트의 기능이 똑같이 작동한다면 내부 구현 방식이 많이 바뀌어도 테스트가 실패하지 않도록 설계됨

추가적으로 Enzyme은 다양한 기능을 제공하는 반면, rtl는 필요한 기능들만 지원해줘서 가볍고,<br/>
개발자들이 일관성있고 좋은 관습을 따르는 테스트 코드를 작성할 수 있도록 유도해줌

### 다양한 쿼리

react-testing-library 기반인 [dom-testing-library](https://testing-library.com/docs/dom-testing-library/intro)에서 지원하는 다양한 쿼리함수가 있음 <br/>
이 쿼리 함수들은 `Variant`와 `Queries`의 조합으로 네이밍이 이루어져 있음

#### Variant

- `getBy*`로 시작하는 쿼리는 조건에 일치하는 DOM element 하나를 선택함 (없으면 에러 발생)
- `getAllBy*`로 시작하는 쿼리는 조건에 일치하는 DOM element 여러개를 선택함 (하나도 없으면 에러 발생)
- `queryBy*`로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 하나를 선택함
- `queryAllBy*`로 시작하는 쿼리는 조건에 일치하는 DOM element 여러개를 선택함
- `findBy*`로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 하나가 나타날 때 까지 기다렸다가 해당 DOM을 선택하는 Promise를 반환함 (기본 timeout인 4500ms 이후에도 나타나지 않으면 에러 발생)
- `findAllBy*`로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 여러개가 나타날 때 까지 기다렸다가 해당 DOM을 선택하는 Promise를 반환함 (기본 timeout인 4500ms 이후에도 나타나지 않으면 에러 발생)

#### Queries

- `ByLabelText`는 label 이 있는 input 의 label 내용으로 input 을 선택함
- `ByPlaceholderText`는 placeholder 값으로 input 및 textarea 를 선택함
- `ByText`는 element가 가지고 있는 텍스트 값으로 DOM 을 선택함 (참고로, 텍스트 값에 정규식을 넣어도 작동합)
- `ByAltText`는 alt 속성을 가지고 있는 element(주로 img) 를 선택함
- `ByTitle`은 title 속성을 가지고 있는 DOM 혹은 title element를 가지고 있는 SVG 를 선택할 때 사용함
- `ByDisplayValue`는 input, textarea, select 가 가지고 있는 현재 값을 가지고 element를 선택함
- `ByRole`은 특정 role 값을 지니고 있는 element를 선택함
- `ByTestId`는 다른 방법으로 못선택할 때, 특정 DOM에 직접 test 할 때 사용할 id를 달아서 선택함

```
<div data-testid="commonDiv">흔한 div</div>
const commonDiv = getByTestId('commonDiv);
```

### 쿼리 우선 순위

메뉴얼에서는 다음 우선순위를 따라서 사용하는것을 권장하고 있음<br/>
그리고 DOM의 `querySelector`는 지양하고 `data-testid`를 설정해 사용하는 것을 권장함

1. getByLabelText
2. getByPlaceholderText
3. getByText
4. getByDisplayValue
5. getByAltText
6. getByTitle
7. getByRole
8. getByTestId

### 비동기적으로 바뀌는 Component UI Test

[Async Utilities](https://testing-library.com/docs/dom-testing-library/api-async)를 사용하여 테스트할 수 있음 <br />
Async Utilities 에는 총 4가지 함수가 있음

**참고**
최신버전 CRA Issue있음(jest-environment-jsdom-sixteen 적용해야함)

```
yarn add jest-environment-jsdom-sixteen --dev

---

"scripts": {
   ...
   "test": "react-scripts test --env=jest-environment-jsdom-sixteen",
   ...
}
```

- `waitFor`: 함수는 콜백 안의 함수가 에러를 발생시키지 않을 때 까지 기다리다가, 대기시간이 timeout을 초과하게 되면 테스트케이스가 실패함 <br />
  timeout 의 기본값은 4500ms 이며, 이는 다음과 같이 커스터마이징 할 수 있음

```
await waitFor(() => getByText('onToggle!!'), { timeout: 3000 })
```
