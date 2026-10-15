/**
 * 이마트 금정점 시니어 고객경험(CX) 혁신 프로젝트
 * 페르소나 인포그래픽 고화질 라이트박스 뷰어 (persona-viewer.js)
 */

(function () {
  const modalOverlay = document.getElementById("personaModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const zoomInBtn = document.getElementById("zoomInBtn");
  const zoomOutBtn = document.getElementById("zoomOutBtn");
  const zoomResetBtn = document.getElementById("zoomResetBtn");
  const closeBtn = document.getElementById("closeLightboxBtn");

  if (!modalOverlay || !lightboxImg) return;

  let currentScale = 1;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;

  function updateTransform() {
    lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
  }

  function resetView() {
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  }

  window.openPersonaLightbox = function () {
    modalOverlay.classList.add("active");
    resetView();
    document.body.style.overflow = "hidden";
  };

  window.closePersonaLightbox = function () {
    modalOverlay.classList.remove("active");
    if (!document.body.classList.contains("view-dashboard-active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // 줌 버튼 핸들러
  if (zoomInBtn) {
    zoomInBtn.addEventListener("click", () => {
      currentScale = Math.min(currentScale + 0.25, 3.5);
      updateTransform();
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener("click", () => {
      currentScale = Math.max(currentScale - 0.25, 0.5);
      updateTransform();
    });
  }

  if (zoomResetBtn) {
    zoomResetBtn.addEventListener("click", resetView);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", window.closePersonaLightbox);
  }

  // 모달 배경 클릭 시 닫기
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      window.closePersonaLightbox();
    }
  });

  // ESC 키 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      window.closePersonaLightbox();
    }
  });

  // 휠 줌 핸들러
  modalOverlay.addEventListener("wheel", (e) => {
    if (!modalOverlay.classList.contains("active")) return;
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15;
    currentScale = Math.min(Math.max(currentScale + zoomFactor, 0.5), 3.5);
    updateTransform();
  }, { passive: false });

  // 드래그 팬 핸들러
  const bodyArea = document.querySelector(".lightbox-body");
  if (bodyArea) {
    bodyArea.addEventListener("mousedown", (e) => {
      if (currentScale <= 1) return;
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      bodyArea.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform();
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      if (bodyArea) bodyArea.style.cursor = "grab";
    });
  }
})();
