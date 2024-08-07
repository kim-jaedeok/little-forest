# 🎙🎙 **Little Forest** 🎙🎙

음정 높낮이로 길을 만들고, 지형을 움직여 고슴도치를 목표 지점까지 보내는 게임입니다.

<img src="./README_assets/littleForest_gif.gif" alt="LittleForest" width="70%" />

---

## Project Description

🤔 &nbsp; [Motivation](#motivation)

📆 &nbsp; [Schedule](#schedule)

🧗‍♀️ &nbsp; [Challenge](#challenge)

---

## Motivation

게임 제작과 Canvas에 대한 흥미로 게임을 주제로 결정하였습니다.  
보다 특색 있는 게임을 만들어보고자 음성인식 기반으로 조작되는 게임을 아이디어로 채택했습니다.  
**영감을 받은 게임** [One Hand Clapping](https://www.youtube.com/watch?v=gRGI1Oj9wFc)

<br>

## Schedule

### **`2021.04.12~04.30 총 제작기간 19일`**

### **`1주차` - 설계 단계**

- 프로젝트 주제 선정
- 구현 가능 여부 검토
  - 음성 인식 Web API 스터디
  - 주파수 인식 라이브러리 탐색
  - Canvas 기초 스터디

### **`2주차` - 구현 단계**

- 기능 구현

  - Audio Context(Web Api) 이용하여 음성 인식 기능 구현
  - Canvas Animation 구현
  - Sprite Image 제작
  - 게임별 움직임 및 충돌 로직 등

  **Pitch에 따른 Interaction 요소 조작**  
  입력된 Pitch 값에 따라 캐릭터가 이동할 수 있는 길을 생성  
  입력된 Pitch 값만큼 캐릭터에게 다가오는 지형

  **움직이는 장애물 구현**  
  좌우로 움직이는 장애물 구현  
  캐릭터 충돌 시 충돌했을 때, 장애물이 가진 운동 에너지만큼 운동 방향으로 캐릭터를 튕겨냄

  **키보드 캐릭터 조작**  
  키보드 입력을 통해 좌, 우, 점프 가능  
  자연스러운 점프를 위해 중력 모델 적용

  **다양한 위치의 지형**  
  실시간으로 캐릭터의 좌표값을 추적하여  
  현재 캐릭터의 y값에 맞는 지면을 찾아 캐릭터의 y값을 고정

  **포탈을 통한 맵 이동**  
  캐릭터가 포탈에 도달하면 다음 맵으로 이동  
  마지막 맵일 경우 처음 맵으로 이동

### **`3주차` - 마무리 단계**

- 구현 마무리
  - 게임 완성도를 위한 게임 내부 엣지케이스 핸들
  - 게임 맵 및 상호작용 추가 (little forest)
  - UX 향상을 위한 이미지 로딩 과정 최적화 (Loading Page 추가)
- 리팩토링
  - 전체 코드 일관성 유지
  - Prop-types 추가
- 배포
  - Netlify

<br>

## Challenge

### **`Pitch Detector`**

**Audio Context (Web Api)**  
음성인식을 위해 Web Api로 제공되는 Audio Context를 사용하였습니다.  
다만, Audio Context의 AnalyserNode를 통해 얻을 수 있는 주파수 데이터가 FFT로 변환되어 제공되는데  
이를 원하는 형태로 가공하여 사용하는 것에 어려움이 있어 Ml5라는 라이브러리를 사용했지만  
이 또한 성능 문제가 있어 음의 Pitch 값을 얻을 수 있는 오픈소스를 개량해서 사용했습니다.

### **`Canvas`**

게임 플레이 화면을 보여주기 위해, Javascript를 기반으로 HTML에 다양한 애니메이션을 보여줄 수 있는 Canvas를 사용하였습니다. 원하는 선/도형/이미지를 그리고, 애니메이션 효과를 넣기 위해 requestAnimationFrame 함수를 재귀로 실행하는 등 Canvas 개념 자체는 어렵지 않았습니다. 하지만 게임 특성상 아래와 같이 다양한 상황(점프 & 낙하 / 횡이동 & 종이동 / 충돌 & 접촉 / 캐릭터 사망 등)이 있었기에, 이들을 고려하여 어떻게 Canvas에 그릴지 로직을 만드는 것에 어려움이 있었습니다.

- 생동감 있는 게임 캐릭터 구현을 위해 Sprite 이미지를 사용하였기 때문에, 기본 60fps로 실행되는 requestAnimationFrame 함수에서 이미지 프레임에 맞게 Canvas Drawing이 실행되도록 <span style="color: blue">프레임 제어 로직</span>이 필요했습니다.
- 캐릭터가 점프를 했을 때 아래와 같은 과정을 거치기 때문에, Canvas Y 축(수직 축)에 대해 동역학 모델링에서 사용되는 <span style="color: blue">중력모델</span>을 구현해야 했습니다.
  ```
  점프 → 빠르게 올라감 → 점점 느려짐 → 멈춤 → 느리게 떨어짐 → 점점 빨라짐 → 착지
  ```
- 지면 접촉 및 장애물 충돌 구현을 위해 캐릭터 좌표(x, y)와 지면 및 장애물 좌표를 다양한 경우를 고려하여 로직을 만들어야 했습니다.
- 멀티플레이를 할 경우, 플레이어마다 브라우저 화면의 크기가 다르기 때문에 소켓통신에 절대좌표를 보내면 캐릭터가 이상한 위치에 그려지게 됩니다. 따라서 캐릭터 위치를 Canvas 크기에 대해 정규화하여 소켓통신을 해야했습니다.

이처럼 Canvas를 다루는게 까다롭고 어려웠지만, 게임, 웹 디자인 등에 쓰이는 Canvas의 활용도에 대해 배울 수 있었던 좋은 경험이었습니다.

### **`객체 지향 프로그램`**

게임을 개발하면서 아래와 같은 특성이 있었습니다.

- 애니메이션을 위해 많은 변수가 필요함
- 게임 오브젝트(캐릭터/장애물/맵 등)들이 이동, 충돌 등 다양한 행동을 구현해야 함
- 게임 오브젝트들은 이전 프레임 상태(좌표, 이미지 등)를 기억해야 함
- 게임 오브젝트들은 전반적으로 공통된 특성을 가지지만 일부분만 다름

처음에는 게임을 구현하면서 익숙한 절차지향 프로그래밍과 함수형 프로그래밍으로 진행하였습니다. 하지만 함수에 많은 매개변수를 전달하고 값을 기억하기 위해 클로저를 만들어야 했습니다. 또한 많은 기능이 있다보니 코드가 장황해지고 서로 변수가 공유되기에 코드 결합도가 높아져 디버깅하기 어려웠습니다. 이에 객체지향프로그래밍을 하기로 하였습니다. 게임 오브젝트들에 크기/위치/이미지 속성을 부여하고 어떠한 행동을 메소드에 정의함으로써 코딩을 직관적으로 할 수 있었습니다. 하지만 게임을 개발하면서 클래스 구조가 많이 변경되었으며, 정말 제품을 만드는 것처럼 클래스 설계하는 것이 중요하다는 것을 배울 수 있었습니다.

### **`움직이는 이미지 만들기`**

프로젝트의 첫번째 목표는 역량 강화였지만, 그만큼 중요했던 두번째 목표는 플레이어가 재미를 느낄 수 있는 게임다운 게임을 만들자는 것이었습니다. 그래서 유저에게 보여지는 즐거움을 극대화하고, 현재 게임이 잘 동작하고 있다는 정보를 전달하기 위해 움직이는 캐릭터와 효과를 주고자 하였습니다.

화면에 움직이는 요소를 구현하기 위해 gif나 svg를 활용할 수도 있었지만, 캔버스의 frame 기능을 최대한 활용하고 로딩 시간을 단축시키기 위해 sprite image를 도입했습니다.

### **`이미지 저장 위치`**

게임을 구현하고 나니 배경화면, 캐릭터, 이펙트 등 코드를 제외한 asset들이 쌓이게 되었고, 어디에 이미지를 저장할 것인가가 프로젝트 후반의 주요한 화두 중 하나였습니다.  
저희는 아래와 같은 검토 과정을 거쳐 최종적으로 source 내부에 이미지를 저장하기로 하였습니다.  
[이미지를 어디에 저장할까?](https://www.notion.so/canwefly89/AWS-S3-download-files-import-from-public-in-react-8eb1c34ddc0949b5b0d61af055e3aea4)

1. S3에 저장하기  
   파일별로 경로를 지정해서 불러와야만 하기 때문에 image의 수가 많은 본 프로젝트에 도입하기에는 부적합하다고 판단
2. public 폴더에 저장하기  
   Create-React-App에서는 public으로부터 `import`를 실행하기 위해서는 `webpack.config.js`를 조작해야 함  
   `webpack.config.js`를 조작하기 위해 컴파일러와 번들러를 `eject`하는 방식을 고려하였으나, 다른 코드에서 생길 문제들을 예상할 수 없어 source에 두기로 결정
