/**
 * 이마트 금정점 시니어 고객경험(CX) 혁신 프로젝트
 * 보고용 인터랙티브 웹 애플리케이션 - 인메모리 데이터셋 (No-DB)
 */

window.EMART_DATA = {
  project: {
    title: "초고령 상권 맞춤형 자립형 시니어 쇼핑경험 혁신안",
    subtitle: "3-Step 매장안내 시스템과 시니어 프렌들리 이지 스마트 카트(Easy Cart) 도입을 중심으로",
    organization: "신세계 FUTURE & DREAM ACADEMY",
    course: "1차 고객경험 프로젝트 (고객이해 30%, 참신성 25%, 실현가능성 25%, 완성도 10%, 전달력 10%)",
    store: "이마트 금정점 (부산광역시 금정구 중앙대로 1841번길 24)",
    date: "2026년 10월",
    team: "ACADEMY 1팀",
    totalSlides: 16
  },

  // 16개 슬라이드 메타데이터
  slides: [
    { id: "s01", num: "01/16", category: "Cover", title: "이마트 금정점 시니어 고객경험(CX) 혁신", badge: "최종 보고서" },
    { id: "s02", num: "02/16", category: "Executive Summary", title: "한눈에 보는 핵심 요약: 배경 · 문제 · 솔루션 · 기대효과", badge: "프로젝트 총괄" },
    { id: "s03", num: "03/16", category: "Demographics", title: "부산 금정구 인구 분석 & 점포 선정 배경", badge: "상권 인구 분석" },
    { id: "s04", num: "04/16", category: "Big Data", title: "반경 500m 상권 빅데이터 분석: 초고령 상권의 특징", badge: "소상공인 빅데이터" },
    { id: "s05", num: "05/16", category: "Field Research", title: "이마트 금정점 현장 실사 관찰 기록 (10/14 방문)", badge: "현장 관찰 팩트" },
    { id: "s06", num: "06/16", category: "Academic Insight", title: "학술 연구 근거: 노인 소비자의 대형마트 서비스품질 지각 분석", badge: "소비자학연구 (2021)" },
    { id: "s07", num: "07/16", category: "Target Persona", title: "타겟 페르소나: 자립형 시니어 쇼핑객 김영숙 (71세)", badge: "고객 모델링" },
    { id: "s08", num: "08/16", category: "As-Is Journey", title: "As-Is 고객여정지도: 기존 장보기 단계별 Pain Points 및 감정 곡선", badge: "현행 여정 분석" },
    { id: "s09", num: "09/16", category: "Problem Framing", title: "진짜 문제 정의: 관점 정의(POV) 및 3대 핵심 HMW 질문", badge: "디자인씽킹" },
    { id: "s10", num: "10/16", category: "Solution 1", title: "솔루션 1: 3-Step 시니어 친화 매장 안내 시스템", badge: "물리 환경 개선" },
    { id: "s11", num: "11/16", category: "Solution 2 (HW)", title: "솔루션 2: 시니어 특화 '이지 스마트 카트 (Easy Cart)' 하드웨어 사양", badge: "디바이스 기획" },
    { id: "s12", num: "12/16", category: "Solution 2 (UX)", title: "솔루션 2: 시니어 맞춤형 화면 UI 목업 및 결제 프로세스", badge: "인터랙티브 체험" },
    { id: "s13", num: "13/16", category: "Solution 3", title: "솔루션 3: 공간 및 인적 인프라 확충 (사랑방 쉼터 & 골든 서포터즈)", badge: "휴게/인적 케어" },
    { id: "s14", num: "14/16", category: "To-Be Journey", title: "To-Be 고객여정지도: 혁신 후 고객 경험 및 감정 점수 변화", badge: "개선 후 여정" },
    { id: "s15", num: "15/16", category: "Business Impact", title: "기대효과: 고객 가치 및 이마트 비즈니스 정량적 임팩트", badge: "기대 효과" },
    { id: "s16", num: "16/16", category: "Roadmap & QA", title: "실행 로드맵 및 리스크 관리: 3단계 추진 계획", badge: "실행 계획" }
  ],

  // 금정구 인구 통계 데이터 (2025.07 기준)
  demographics: [
    { dong: "구서2동", total: 29989, senior: 8106, ratio: 27.0, note: "이마트 금정점 직접 배후지" },
    { dong: "남산동", total: 25407, senior: 8231, ratio: 32.4, note: "금정구 최고령 주거밀집지" },
    { dong: "부곡3동", total: 14271, senior: 3867, ratio: 27.1, note: "인접 주거 생활권" },
    { dong: "구서1동", total: 18235, senior: 4520, ratio: 24.8, note: "구서역 역세권 상권" },
    { dong: "부곡2동", total: 16422, senior: 4368, ratio: 26.6, note: "시니어 주거 비율 지속 상승" }
  ],

  // 500m 상권 빅데이터
  tradeArea500m: {
    floatingSeniorRatio: 36.0, // 60대 이상
    floating50sRatio: 21.0,    // 50대
    floatingOver50Total: 57.0, // 50대 이상 합산
    residentialSeniorRatio: 35.3,
    medicalFacilities: 78,
    dailyFloatingAvg: 85784,
    femaleRatio: 52.7
  },

  // 학술 연구 회귀계수 (이진명 외, 2021)
  academicData: {
    paper: "이진명 외 (2021), 『소비자학연구』 제32권 제6호",
    title: "노인소비자의 대형마트 서비스품질 지각이 만족도 및 노인지향성 지각에 미치는 영향",
    satisfaction: [
      { factor: "물리적 환경 (안내판, 동선, 진열)", beta: 0.283, rank: "1위 (압도적)", p: "< .001", color: "#0B69A3" },
      { factor: "본원적 혜택 (상품구색, 품질)", beta: 0.194, rank: "2위", p: "< .01", color: "#64748B" },
      { factor: "인적 상호작용 (직원 응대)", beta: 0.162, rank: "3위", p: "< .05", color: "#64748B" },
      { factor: "스마트 혜택 (무인기기, 앱)", beta: 0.144, rank: "4위 (만족도 최저)", p: "< .05", color: "#D97706" }
    ],
    elderlyOrientation: [
      { factor: "편의적 혜택 (휴게공간, 벤치)", beta: 0.378, rank: "1위 (결정적 영향)", p: "< .000", color: "#16A34A" },
      { factor: "스마트 혜택 (스마트카트 등)", beta: 0.228, rank: "2위 (혁신 인식)", p: "< .000", color: "#D97706" }
    ]
  },

  // 김영숙 페르소나 데이터 (새로 추가된 PNG 인포그래픽 기반 정밀 구조화)
  persona: {
    name: "김영숙",
    age: 71,
    gender: "여성",
    residence: "부산광역시 금정구 구서동",
    family: "은퇴 부부 1~2인 가구",
    visitFrequency: "주 1~2회 (평일 오후 2~4시)",
    mainItems: "신선 채소, 과일, 참기름 등 양념류, 생필품 소량",
    transport: "도보 또는 마을버스",
    quote: "익숙한 마트에서 필요한 물건을 내 손으로 편하게 사고 싶어요.",
    coreGoal: "불필요하게 헤매거나 다른 사람에게 반복적으로 도움을 요청하지 않고, 원하는 상품을 합리적인 가격에 구매하여 무리 없이 귀가하는 것.",
    coreValues: [
      { label: "자율성과 익숙함", desc: "다른 사람에게 의존하지 않고 혼자 힘으로 장보기" },
      { label: "명확한 가격 정보", desc: "할인과 행사 혜택을 헷갈리지 않고 정확히 인지" },
      { label: "이동의 편안함", desc: "무릎 관절 부담과 무거운 카트 운반 피로 완화" },
      { label: "정확한 계산", desc: "결제 실수나 기기 조작 오류 없이 안심하고 마무리" }
    ],
    empathyMap: {
      say: [
        "이 상품은 어디 있지?",
        "이 할인은 어떻게 받는 거지?",
        "셀프계산대는 뒤에 줄 서 있으면 손이 떨려서 못 하겠어."
      ],
      think: [
        "괜히 직원에게 여러 번 물어보는 건 부담스럽다.",
        "계산을 잘못해서 망신당하면 어쩌지?",
        "나이 들었다고 민폐 끼치긴 싫은데..."
      ],
      do: [
        "입구에 들어서면 익숙한 채소 매대부터 빙 둘러본다.",
        "작은 가격표를 확인하기 위해 허리를 굽히고 가까이 들여다본다.",
        "유인 계산대에 긴 줄이 있어도 묵묵히 기립 대기한다."
      ],
      feel: [
        "방문 전: 오늘 저녁거리를 직접 고른다는 익숙함과 소소한 기대감",
        "탐색 중: 안내도가 없어 매대를 왕복하며 느끼는 답답함과 무릎 통증",
        "계산 후: 긴 대기 끝에 결제를 무사히 마쳤을 때의 피로와 안도감"
      ]
    },
    imageAsset: "./이마트 금정점 고령층 쇼핑 페르소나.png"
  },

  // 6단계 고객여정 비교 데이터 (As-Is vs To-Be 감정곡선)
  journeySteps: [
    {
      step: 1,
      title: "방문 및 입장",
      touchpoint: "출입구, 카트 보관소",
      asIsAction: "출입구로 진입 후 무거운 철제 카트를 꺼냄",
      asIsPain: "출입구에 층별/구역 매장 안내도가 전무함. 카트 바퀴가 무겁고 뻑뻑함",
      asIsScore: 3.0,
      toBeAction: "입구에서 시니어 포켓 리플릿 맵을 챙기고, 가벼운 이지 스마트 카트를 수령",
      toBeDelight: "18pt 큰 글씨 지도로 동선 사전 파악, 부드러운 전동 보조 주행 시작",
      toBeScore: 4.5,
      diff: "+1.5"
    },
    {
      step: 2,
      title: "상품 위치 탐색",
      touchpoint: "매장 통로, 기둥, 천장 표지판",
      asIsAction: "메모한 참기름, 소면을 찾기 위해 통로를 반복 배회",
      asIsPain: "천장 표지판은 글씨가 작고 시야각보다 높아 목이 아픔. 결국 3번 왕복 후 직원 찾아 질문",
      asIsScore: 1.8,
      toBeAction: "카트 화면 음성 검색('참기름 어디 있노?') 터치 또는 기둥 아이레벨 인덱스 확인",
      toBeDelight: "카트 지도에 1층 7번 매대까지 초록 유도 화살표가 굵게 표시되어 30초 만에 직행",
      toBeScore: 4.8,
      diff: "+3.0 (최대 반등)"
    },
    {
      step: 3,
      title: "가격 및 상품 비교",
      touchpoint: "상품 매대, 가격표, POP",
      asIsAction: "작은 가격표와 1+1 조건 등 복잡한 할인 조건을 찡그려 읽음",
      asIsPain: "노안으로 작은 가격표 글씨가 잘 안 보이고 행사 카드 혜택이 혼란스러움",
      asIsScore: 2.5,
      toBeAction: "카트 손잡이 바코드 스캐너에 가볍게 스캔 후 담기",
      toBeDelight: "10.1인치 화면에 24pt 초대형 글씨로 최종 결제가격 및 자동 포인트 할인 즉시 표시",
      toBeScore: 4.5,
      diff: "+2.0"
    },
    {
      step: 4,
      title: "매장 이동 및 휴식",
      touchpoint: "무빙워크, 코너 유휴공간",
      asIsAction: "1층(식품)과 2층(생필품)을 오가며 쇼핑 지속",
      asIsPain: "무거운 카트를 밀며 무릎과 허리 통증 심화. 잠시 앉아 쉴 의자가 전혀 없음",
      asIsScore: 2.0,
      toBeAction: "전동 모터 어시스트로 한 손 주행, 1층 '이마트 사랑방' 쉼터에서 5분 휴식",
      toBeDelight: "쌀·생수를 실어도 500g 무게감으로 가볍게 밀림, 푹신한 등받이 벤치와 무료 혈압 체크",
      toBeScore: 4.6,
      diff: "+2.6"
    },
    {
      step: 5,
      title: "계산 및 결제",
      touchpoint: "유인/셀프 계산대",
      asIsAction: "18대 셀프계산대를 지나쳐 3곳만 열린 유인 계산대 줄에 15분간 서서 대기",
      asIsPain: "다리 통증, 셀프계산대 기기 오류 공포 및 뒷사람 눈치, 극심한 시간 지체",
      asIsScore: 1.9,
      toBeAction: "카트 화면 '결제하기' 누르고 신용카드 삽입 후 10초 만에 원스톱 결제",
      toBeDelight: "계산대 줄 설 필요 없이 전용 스마트 게이트로 바로 통과, 스스로 완수한 디지털 성취감",
      toBeScore: 4.7,
      diff: "+2.8"
    },
    {
      step: 6,
      title: "포장 및 귀가",
      touchpoint: "자율포장대, 출구, 버스정류장",
      asIsAction: "신체 배터리 방전 상태로 테이프를 끊어 박스 포장 후 귀가",
      asIsPain: "체력 소진으로 귀가 후 눕게 됨. '대형마트 오기 너무 힘들다'는 피로감 누적",
      asIsScore: 2.8,
      toBeAction: "골든 서포터즈 어르신의 친절한 포장 보조와 함께 여유롭게 귀가",
      toBeDelight: "체력 소모 없이 가뿐하게 장보기 완료, '다음 주에 또 와야지' 재방문 의사 100%",
      toBeScore: 4.3,
      diff: "+1.5"
    }
  ],

  // 스마트 카트 시뮬레이터 상품 데이터
  cartCatalog: [
    { id: "p1", name: "피코크 진한 참기름 350ml", price: 6900, originalPrice: 8500, discountNote: "신세계포인트 회원 1,600원 즉시 할인", aisle: "1층 7번 매대 (양념/기름)", tag: "인기양념" },
    { id: "p2", name: "파머스픽 달콤 사과 1봉 (5입)", price: 9900, originalPrice: 12900, discountNote: "시니어 특별 기획전 3,000원 할인", aisle: "1층 2번 매대 (신선과일)", tag: "신선과일" },
    { id: "p3", name: "CJ 햇반 백미 210g x 8입", price: 8000, originalPrice: 9200, discountNote: "금주의 초특가 1,200원 할인", aisle: "1층 4번 매대 (가공/즉석밥)", tag: "간편생필" },
    { id: "p4", name: "자연방사 1+ 신선란 30구", price: 7500, originalPrice: 8900, discountNote: "이마트 e머니 1,400원 적립 혜택", aisle: "1층 1번 매대 (계란/유제품)", tag: "필수식품" },
    { id: "p5", name: "오뚜기 진라면 매운맛 5입", price: 3800, originalPrice: 4200, discountNote: "인기 라면 멀티팩 할인", aisle: "1층 5번 매대 (면류/스프)", tag: "인기라면" }
  ]
};
