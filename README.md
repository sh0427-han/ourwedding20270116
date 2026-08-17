# 우리의 결혼식 2027 모바일 청첩장

2027년 1월 16일 예식을 위한 모바일 청첩장 초안입니다.

## 실행 방법

별도의 빌드 과정 없이 `index.html`을 브라우저에서 열 수 있습니다.
로컬 웹 서버를 사용하는 경우 프로젝트 폴더에서 다음 명령을 실행합니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속합니다.

## 정보 수정

이름, 날짜, 연락처, 예식장, 계좌번호와 외부 링크는
`js/app.js` 상단의 `weddingConfig`에서 수정합니다.

- `weddingDate`: ISO 8601 형식의 예식 일시
- `togetherStartDate`: 교제 시작일
- `movieUrl`: 웨딩 영상 주소
- `photoShareUrl`: 하객 사진·영상 공유 주소
- `backgroundMusicUrl`: 배경음악 파일 경로 또는 URL

## 사진 수정

현재 사진은 레이아웃 확인을 위한 외부 샘플 이미지입니다.
실제 사진을 `assets` 폴더에 추가한 후 `index.html`의 이미지 주소를
`assets/파일명.jpg` 형태로 변경합니다.

## 배포

정적 HTML, CSS, JavaScript로 구성되어 GitHub Pages에서 바로 배포할 수
있습니다.
