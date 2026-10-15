/**
 * 이마트 금정점 시니어 고객경험(CX) 혁신 프로젝트
 * 메인 애플리케이션 컨트롤러 (app.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  let currentSlideIndex = 0;

  // DOM 엘리먼트 캐싱
  const prevBtn = document.getElementById("prevSlideBtn");
  const nextBtn = document.getElementById("nextSlideBtn");
  const slideNumText = document.getElementById("currentSlideNumText");
  const dotsContainer = document.getElementById("slideDotsContainer");
  const progressFill = document.getElementById("progressBarFill");
  const jumpSelect = document.getElementById("slideJumpSelect");
  const viewPresentationBtn = document.getElementById("viewPresentationBtn");
  const viewDashboardBtn = document.getElementById("viewDashboardBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const helpBtn = document.getElementById("helpBtn");
  const helpModal = document.getElementById("helpModal");
  const closeHelpBtn = document.getElementById("closeHelpBtn");
  const lnbList = document.getElementById("dashboardLnbList");

  // ========================================================================
  // 1. 슬라이드 네비게이션 & 프로그레스 제어
  // ========================================================================
  function buildNavigation() {
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.className = `slide-dot ${i === 0 ? "active" : ""}`;
        dot.title = `슬라이드 ${i + 1}`;
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    if (jumpSelect && window.EMART_DATA && window.EMART_DATA.slides) {
      jumpSelect.innerHTML = "";
      window.EMART_DATA.slides.forEach((s, idx) => {
        const opt = document.createElement("option");
        opt.value = idx;
        opt.textContent = `${s.num} ${s.title}`;
        jumpSelect.appendChild(opt);
      });
      jumpSelect.addEventListener("change", (e) => {
        goToSlide(parseInt(e.target.value, 10));
      });
    }

    if (lnbList && window.EMART_DATA && window.EMART_DATA.slides) {
      lnbList.innerHTML = "";
      window.EMART_DATA.slides.forEach((s, idx) => {
        const li = document.createElement("li");
        li.className = `lnb-item ${idx === 0 ? "active" : ""}`;
        li.textContent = `${s.num} ${s.title}`;
        li.addEventListener("click", () => {
          if (document.body.classList.contains("view-dashboard-active")) {
            slides[idx].scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            goToSlide(idx);
          }
        });
        lnbList.appendChild(li);
      });
    }
  }

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    slides.forEach((slide, idx) => {
      slide.classList.remove("active", "prev-slide");
      if (idx === index) {
        slide.classList.add("active");
      } else if (idx < index) {
        slide.classList.add("prev-slide");
      }
    });

    currentSlideIndex = index;

    // 네비게이션 UI 동기화
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    if (slideNumText) {
      const curNum = (currentSlideIndex + 1).toString().padStart(2, "0");
      slideNumText.textContent = `${curNum} / ${totalSlides.toString().padStart(2, "0")}`;
    }

    // 도트 동기화
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".slide-dot");
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentSlideIndex);
      });
    }

    // 셀렉트 박스 동기화
    if (jumpSelect) jumpSelect.value = currentSlideIndex;

    // 프로그레스 바 계산
    if (progressFill) {
      const pct = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressFill.style.width = `${pct}%`;
    }

    // LNB 활성화 동기화
    if (lnbList) {
      const items = lnbList.querySelectorAll(".lnb-item");
      items.forEach((item, idx) => {
        item.classList.toggle("active", idx === currentSlideIndex);
      });
    }
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }

  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  // ========================================================================
  // 2. 키보드 단축키 및 터치 제스처
  // ========================================================================
  document.addEventListener("keydown", (e) => {
    // 모달 활성화 중일 때는 슬라이드 이동 차단
    if (document.querySelector(".modal-overlay.active")) return;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
      case " ":
        e.preventDefault();
        nextSlide();
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        e.preventDefault();
        prevSlide();
        break;
      case "Home":
        e.preventDefault();
        goToSlide(0);
        break;
      case "End":
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;
      case "f":
      case "F":
        toggleFullscreen();
        break;
      case "d":
      case "D":
        setDashboardMode();
        break;
      case "p":
      case "P":
        setPresentationMode();
        break;
      case "?":
        toggleHelpModal();
        break;
    }
  });

  // 터치 스와이프 지원 (태블릿/모바일)
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    if (document.body.classList.contains("view-dashboard-active")) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;
    const diffY = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(diffX) > 60 && Math.abs(diffY) < 100) {
      if (diffX < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  // ========================================================================
  // 3. 듀얼 뷰 모드 전환 (프레젠테이션 vs 대시보드)
  // ========================================================================
  function setPresentationMode() {
    document.body.classList.remove("view-dashboard-active");
    if (viewPresentationBtn) viewPresentationBtn.classList.add("active");
    if (viewDashboardBtn) viewDashboardBtn.classList.remove("active");
    goToSlide(currentSlideIndex);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function setDashboardMode() {
    document.body.classList.add("view-dashboard-active");
    if (viewPresentationBtn) viewPresentationBtn.classList.remove("active");
    if (viewDashboardBtn) viewDashboardBtn.classList.add("active");
  }

  if (viewPresentationBtn) viewPresentationBtn.addEventListener("click", setPresentationMode);
  if (viewDashboardBtn) viewDashboardBtn.addEventListener("click", setDashboardMode);

  // ========================================================================
  // 4. 10분 발표 타이머 (Presentation Timer)
  // ========================================================================
  let timerDuration = 600; // 10분 = 600초
  let timerRemaining = timerDuration;
  let timerInterval = null;
  let isTimerRunning = false;

  const timerDisplay = document.getElementById("timerDisplay");
  const timerToggleBtn = document.getElementById("timerToggleBtn");
  const timerResetBtn = document.getElementById("timerResetBtn");

  function updateTimerUI() {
    if (!timerDisplay) return;
    const mins = Math.floor(timerRemaining / 60);
    const secs = timerRemaining % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

    timerDisplay.classList.remove("warning", "overtime");
    if (timerRemaining <= 0) {
      timerDisplay.classList.add("overtime");
    } else if (timerRemaining <= 120) {
      timerDisplay.classList.add("warning");
    }
  }

  function toggleTimer() {
    if (isTimerRunning) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      if (timerToggleBtn) timerToggleBtn.innerHTML = "▶";
    } else {
      isTimerRunning = true;
      if (timerToggleBtn) timerToggleBtn.innerHTML = "⏸";
      timerInterval = setInterval(() => {
        timerRemaining--;
        updateTimerUI();
      }, 1000);
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerRemaining = timerDuration;
    if (timerToggleBtn) timerToggleBtn.innerHTML = "▶";
    updateTimerUI();
  }

  if (timerToggleBtn) timerToggleBtn.addEventListener("click", toggleTimer);
  if (timerResetBtn) timerResetBtn.addEventListener("click", resetTimer);

  // ========================================================================
  // 5. 전체화면 (Fullscreen) API
  // ========================================================================
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      if (fullscreenBtn) fullscreenBtn.innerHTML = "<span>⛶</span> 축소";
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      if (fullscreenBtn) fullscreenBtn.innerHTML = "<span>⛶</span> 전체화면";
    }
  }

  if (fullscreenBtn) fullscreenBtn.addEventListener("click", toggleFullscreen);

  // ========================================================================
  // 6. 단축키 도움말 모달
  // ========================================================================
  function toggleHelpModal() {
    if (!helpModal) return;
    helpModal.classList.toggle("active");
  }

  if (helpBtn) helpBtn.addEventListener("click", toggleHelpModal);
  if (closeHelpBtn) closeHelpBtn.addEventListener("click", () => helpModal.classList.remove("active"));
  if (helpModal) {
    helpModal.addEventListener("click", (e) => {
      if (e.target === helpModal) helpModal.classList.remove("active");
    });
  }

  // ========================================================================
  // 7. 인터랙티브 감정곡선 차트 (Slide 14)
  // ========================================================================
  window.renderEmotionChart = function (mode = "all") {
    const asIsLine = document.getElementById("asIsSvgLine");
    const toBeLine = document.getElementById("toBeSvgLine");
    const asIsDots = document.getElementById("asIsDotsGroup");
    const toBeDots = document.getElementById("toBeDotsGroup");

    if (asIsLine && asIsDots) {
      const show = mode === "all" || mode === "asis";
      asIsLine.style.display = show ? "block" : "none";
      asIsDots.style.display = show ? "block" : "none";
    }

    if (toBeLine && toBeDots) {
      const show = mode === "all" || mode === "tobe";
      toBeLine.style.display = show ? "block" : "none";
      toBeDots.style.display = show ? "block" : "none";
    }
  };

  // ========================================================================
  // 8. 3-Step 매장안내도 탭 인터랙션 (Slide 10)
  // ========================================================================
  window.switchStoreGuideStep = function (stepNum) {
    document.querySelectorAll(".guide-step-card").forEach((card, idx) => {
      if (idx + 1 === stepNum) {
        card.style.background = "#EFF6FF";
        card.style.borderColor = "#0284C7";
        card.style.transform = "scale(1.02)";
      } else {
        card.style.background = "#FFFFFF";
        card.style.borderColor = "#E2E8F0";
        card.style.transform = "scale(1)";
      }
    });

    const previewImg = document.getElementById("guidePreviewImg");
    const previewCaption = document.getElementById("guidePreviewCaption");
    if (!previewImg || !previewCaption) return;

    if (stepNum === 1) {
      previewImg.src = "다이소_홈플러스동래점_매장안내도.jpg";
      previewCaption.innerHTML = "<strong>Step 1. [진입부] '한눈에 쏙' 시니어 전용 포켓 리플릿 맵:</strong> 18pt 이상 큰 글씨와 5개 테마 고대비 컬러 코딩 적용.";
    } else if (stepNum === 2) {
      previewImg.src = "./1014수요일 금정점/매장1층 바로진열된 품목.jpg";
      previewCaption.innerHTML = "<strong>Step 2. [동선] 아이레벨(130~170cm) 4면 기둥 인덱스:</strong> 천장 표지판 사각지대를 해소하고 보행 시야각 내 즉시 식별.";
    } else if (stepNum === 3) {
      previewImg.src = "./1014수요일 금정점/2층 올라가는 무빙워크.jpg";
      previewCaption.innerHTML = "<strong>Step 3. [바닥] 미끄럼 방지 컬러 웨이파인딩 라인:</strong> 신선식품(초록), 가공식품(주황), 출구/무빙워크(파랑) 유도.";
    }
  };

  // 초기 네비게이션 생성 및 첫 슬라이드 표시
  buildNavigation();
  goToSlide(0);
});
