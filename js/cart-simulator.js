/**
 * 이마트 금정점 시니어 고객경험(CX) 혁신 프로젝트
 * 이지 스마트 카트(Easy Cart) 인터랙티브 시뮬레이터 (cart-simulator.js)
 */

(function () {
  // 웹 오디오 API 기반 자체 비프음/효과음 (외부 의존성 없음)
  function playTone(freq, type, duration, delay = 0) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {
      // AudioContext 제한 시 조용히 무시
    }
  }

  function playScanBeep() {
    playTone(1760, "sine", 0.1); // 카트 스캐너 특유의 고주파 비프
  }

  function playSuccessChime() {
    playTone(523.25, "triangle", 0.15, 0);    // C5
    playTone(659.25, "triangle", 0.15, 0.12); // E5
    playTone(783.99, "triangle", 0.25, 0.24); // G5
  }

  // 장바구니 상태 관리 (기본 샘플 2개 사전 탑재)
  let cartState = [
    { id: "p1", name: "피코크 진한 참기름 350ml", price: 6900, originalPrice: 8500, aisle: "1층 7번 매대" },
    { id: "p2", name: "파머스픽 사과 1봉 (5입)", price: 9900, originalPrice: 12900, aisle: "1층 2번 매대" }
  ];

  function renderCart() {
    const listContainer = document.getElementById("cartListScroll");
    const countBadge = document.getElementById("cartItemCountBadge");
    const subtotalEl = document.getElementById("cartSubtotalPrice");
    const discountEl = document.getElementById("cartDiscountPrice");
    const totalPriceEl = document.getElementById("cartTotalPrice");

    if (!listContainer) return;

    listContainer.innerHTML = "";

    let subtotal = 0;
    let totalDiscount = 0;

    cartState.forEach((item, idx) => {
      subtotal += item.originalPrice || item.price;
      totalDiscount += ((item.originalPrice || item.price) - item.price);

      const row = document.createElement("div");
      row.className = "cart-row-item";
      row.innerHTML = `
        <div class="cart-row-name">
          <span>🛒</span>
          <span>${item.name}</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="cart-row-price">${item.price.toLocaleString()}원</span>
          <button class="cart-row-remove" title="삭제" data-idx="${idx}">✕</button>
        </div>
      `;
      listContainer.appendChild(row);
    });

    const total = subtotal - totalDiscount;

    if (countBadge) countBadge.textContent = `${cartState.length}개`;
    if (subtotalEl) subtotalEl.textContent = `${subtotal.toLocaleString()}원`;
    if (discountEl) discountEl.textContent = `-${totalDiscount.toLocaleString()}원`;
    if (totalPriceEl) totalPriceEl.textContent = `${total.toLocaleString()}원`;

    // 삭제 버튼 바인딩
    listContainer.querySelectorAll(".cart-row-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-idx"), 10);
        cartState.splice(idx, 1);
        renderCart();
      });
    });
  }

  window.addItemToEasyCart = function (product) {
    playScanBeep();
    cartState.push(product);
    renderCart();

    // 안내 메시지 피드백
    const voiceText = document.getElementById("voiceDisplaySpeech");
    if (voiceText) {
      voiceText.textContent = `삐- [${product.name}] 카트에 정상 담김 (${product.price.toLocaleString()}원)`;
      voiceText.style.color = "#16A34A";
      setTimeout(() => {
        voiceText.style.color = "";
      }, 2000);
    }
  };

  // 음성 검색 시뮬레이션
  window.triggerVoiceSearch = function () {
    const micBtn = document.getElementById("voiceMicBtn");
    const voiceText = document.getElementById("voiceDisplaySpeech");
    const routeLine = document.getElementById("minimapRouteLine");
    const targetAisle = document.getElementById("mapTargetAisle");

    if (!micBtn || !voiceText) return;

    micBtn.classList.add("listening");
    micBtn.innerHTML = "<span>🎙️</span> 듣는 중...";
    voiceText.textContent = "듣고 있습니다... 말씀하세요";

    setTimeout(() => {
      voiceText.textContent = "🎙️ “참기름 어디 있노?” (음성 인식 완료)";
      micBtn.classList.remove("listening");
      micBtn.innerHTML = "<span>🎙️</span> 말하기";
      playScanBeep();

      // 지도 경로 활성화
      if (routeLine) {
        routeLine.style.display = "block";
        routeLine.style.stroke = "#16A34A";
      }
      if (targetAisle) {
        targetAisle.style.animation = "pulse-yellow 1.5s infinite";
        targetAisle.style.background = "#FEF08A";
      }

      setTimeout(() => {
        voiceText.textContent = "📍 [1층 7번 매대 (양념/기름)] 직행 경로 안내 중 (도보 약 25초)";
      }, 800);
    }, 1200);
  };

  // 카트 결제 모달 시뮬레이션
  window.triggerCartCheckout = function () {
    const modal = document.getElementById("receiptModal");
    const itemsList = document.getElementById("receiptItemsContainer");
    const totalEl = document.getElementById("receiptFinalTotal");

    if (!modal) return;

    playSuccessChime();

    if (itemsList) {
      itemsList.innerHTML = "";
      let total = 0;
      cartState.forEach((item) => {
        total += item.price;
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.justifyContent = "space-between";
        row.innerHTML = `<span>${item.name}</span><strong>${item.price.toLocaleString()}원</strong>`;
        itemsList.appendChild(row);
      });
      if (totalEl) totalEl.textContent = `${total.toLocaleString()}원`;
    }

    modal.classList.add("active");
  };

  window.closeReceiptModal = function () {
    const modal = document.getElementById("receiptModal");
    if (modal) modal.classList.remove("active");
  };

  // DOM 로드 시 초기화
  document.addEventListener("DOMContentLoaded", () => {
    renderCart();

    const micBtn = document.getElementById("voiceMicBtn");
    if (micBtn) {
      micBtn.addEventListener("click", window.triggerVoiceSearch);
    }

    const guideBtn = document.getElementById("actionGuideBtn");
    if (guideBtn) {
      guideBtn.addEventListener("click", window.triggerVoiceSearch);
    }

    const checkoutBtn = document.getElementById("actionCheckoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", window.triggerCartCheckout);
    }

    const closeReceiptBtn = document.getElementById("closeReceiptBtn");
    if (closeReceiptBtn) {
      closeReceiptBtn.addEventListener("click", window.closeReceiptModal);
    }
  });
})();
