"use strict";

const weddingConfig = {
    groomName: "신랑 이름",
    brideName: "신부 이름",
    groomFather: "신랑 아버지",
    groomMother: "신랑 어머니",
    brideFather: "신부 아버지",
    brideMother: "신부 어머니",
    groomPhone: "",
    bridePhone: "",
    groomFatherPhone: "",
    groomMotherPhone: "",
    brideFatherPhone: "",
    brideMotherPhone: "",
    weddingDate: "2027-01-16T12:00:00+09:00",
    weddingDateLabel: "2027. 01. 16 SAT",
    weddingTime: "토요일 오후 12시",
    togetherStartDate: "2024-01-16T00:00:00+09:00",
    venueName: "예식장 이름",
    venueHall: "홀 정보를 입력해주세요",
    venueAddress: "예식장 주소를 입력해주세요",
    groomBank: "은행명",
    groomAccount: "000-0000-0000",
    groomAccountOwner: "신랑 이름",
    brideBank: "은행명",
    brideAccount: "000-0000-0000",
    brideAccountOwner: "신부 이름",
    movieUrl: "",
    photoShareUrl: "",
    backgroundMusicUrl: ""
};

const fieldBindings = {
    "[data-groom-name]": weddingConfig.groomName,
    "[data-bride-name]": weddingConfig.brideName,
    "[data-groom-father]": weddingConfig.groomFather,
    "[data-groom-mother]": weddingConfig.groomMother,
    "[data-bride-father]": weddingConfig.brideFather,
    "[data-bride-mother]": weddingConfig.brideMother,
    "[data-wedding-date-label]": weddingConfig.weddingDateLabel,
    "[data-wedding-time]": weddingConfig.weddingTime,
    "[data-venue-name]": weddingConfig.venueName,
    "[data-venue-hall]": weddingConfig.venueHall,
    "[data-venue-address]": weddingConfig.venueAddress,
    "[data-groom-bank]": weddingConfig.groomBank,
    "[data-groom-account]": weddingConfig.groomAccount,
    "[data-groom-account-owner]": weddingConfig.groomAccountOwner,
    "[data-bride-bank]": weddingConfig.brideBank,
    "[data-bride-account]": weddingConfig.brideAccount,
    "[data-bride-account-owner]": weddingConfig.brideAccountOwner
};

const phoneBindings = {
    "[data-groom-phone-link]": weddingConfig.groomPhone,
    "[data-bride-phone-link]": weddingConfig.bridePhone,
    "[data-groom-father-phone-link]": weddingConfig.groomFatherPhone,
    "[data-groom-mother-phone-link]": weddingConfig.groomMotherPhone,
    "[data-bride-father-phone-link]": weddingConfig.brideFatherPhone,
    "[data-bride-mother-phone-link]": weddingConfig.brideMotherPhone
};

const galleryImages = Array.from(
    document.querySelectorAll(".gallery-item img")
).map((image) => ({
    alt: image.alt,
    src: image.src
}));

let currentGalleryIndex = 0;
let toastTimer = null;

function bindConfigValues() {
    Object.entries(fieldBindings).forEach(([selector, value]) => {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value;
        });
    });

    Object.entries(phoneBindings).forEach(([selector, phone]) => {
        document.querySelectorAll(selector).forEach((element) => {
            if (phone) {
                element.href = `tel:${phone.replace(/[^0-9+]/g, "")}`;
            } else {
                element.href = "#";
                element.addEventListener("click", (event) => {
                    event.preventDefault();
                    showToast("연락처를 입력하면 전화 버튼이 연결됩니다.");
                });
            }
        });
    });

    const music = document.querySelector("#background-music");
    if (weddingConfig.backgroundMusicUrl) {
        music.src = weddingConfig.backgroundMusicUrl;
    }
}

function showToast(message) {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
    }, 2400);
}

function renderCalendar() {
    const weddingDate = new Date(weddingConfig.weddingDate);
    const year = weddingDate.getFullYear();
    const month = weddingDate.getMonth();
    const targetDate = weddingDate.getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const calendar = document.querySelector("#calendar-grid");

    const cells = weekDays.map((day) => (
        `<span class="calendar__cell calendar__cell--header">${day}</span>`
    ));

    for (let index = 0; index < firstDay; index += 1) {
        cells.push(
            "<span class=\"calendar__cell calendar__cell--empty\">0</span>"
        );
    }

    for (let date = 1; date <= lastDate; date += 1) {
        const weddingClass = date === targetDate
            ? " calendar__cell--wedding"
            : "";
        cells.push(
            `<span class="calendar__cell${weddingClass}">${date}</span>`
        );
    }

    calendar.innerHTML = cells.join("");
}

function updateCountdown() {
    const now = new Date();
    const weddingDate = new Date(weddingConfig.weddingDate);
    const differenceMs = weddingDate.getTime() - now.getTime();
    const safeDifference = Math.max(differenceMs, 0);
    const totalSeconds = Math.floor(safeDifference / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.querySelector("#countdown-days").textContent = String(days).padStart(
        3,
        "0"
    );
    document.querySelector("#countdown-hours").textContent = String(hours).padStart(
        2,
        "0"
    );
    document.querySelector("#countdown-minutes").textContent = String(
        minutes
    ).padStart(2, "0");
    document.querySelector("#countdown-seconds").textContent = String(
        seconds
    ).padStart(2, "0");

    const dDayText = differenceMs > 0
        ? `${weddingConfig.groomName} · ${weddingConfig.brideName} 결혼식까지 ${days}일`
        : "오늘, 저희 두 사람이 결혼합니다.";
    document.querySelector("#d-day-text").textContent = dDayText;

    const togetherStartDate = new Date(weddingConfig.togetherStartDate);
    const togetherDays = Math.max(
        Math.floor((now.getTime() - togetherStartDate.getTime()) / 86400000) + 1,
        1
    );
    document.querySelector("#together-text").textContent = (
        `저희가 함께한 지 ${togetherDays.toLocaleString("ko-KR")}일`
    );
}

async function copyText(value, successMessage) {
    try {
        await navigator.clipboard.writeText(value);
        showToast(successMessage);
    } catch (error) {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        showToast(successMessage);
    }
}

function setModalState(element, isOpen) {
    element.classList.toggle("is-open", isOpen);
    element.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("is-locked", isOpen);
}

function openGallery(index) {
    currentGalleryIndex = (index + galleryImages.length) % galleryImages.length;
    const galleryModal = document.querySelector("#gallery-modal");
    const modalImage = document.querySelector("#gallery-modal-image");
    const modalCount = document.querySelector("#gallery-modal-count");
    const image = galleryImages[currentGalleryIndex];
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalCount.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
    setModalState(galleryModal, true);
}

function createCalendarFile() {
    const eventStart = new Date(weddingConfig.weddingDate);
    const eventEnd = new Date(eventStart.getTime() + 2 * 60 * 60 * 1000);
    const formatDate = (date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const title = `${weddingConfig.groomName} · ${weddingConfig.brideName} 결혼식`;
    const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Our Wedding//Wedding Reminder//KO",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        `DTSTART:${formatDate(eventStart)}`,
        `DTEND:${formatDate(eventEnd)}`,
        `SUMMARY:${title}`,
        `LOCATION:${weddingConfig.venueName} ${weddingConfig.venueAddress}`,
        "BEGIN:VALARM",
        "TRIGGER:-P1D",
        "ACTION:DISPLAY",
        `DESCRIPTION:${title}`,
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR"
    ];
    const blob = new Blob([lines.join("\r\n")], {
        type: "text/calendar;charset=utf-8"
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "wedding-reminder.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
    showToast("캘린더 일정 파일을 만들었습니다.");
}

function updateMapLinks() {
    const query = encodeURIComponent(
        `${weddingConfig.venueName} ${weddingConfig.venueAddress}`
    );
    document.querySelector("#naver-map-link").href = (
        `https://map.naver.com/p/search/${query}`
    );
    document.querySelector("#kakao-map-link").href = (
        `https://map.kakao.com/link/search/${query}`
    );
    document.querySelector("#tmap-link").href = (
        `https://www.tmap.co.kr/tmap2/mobile/route.jsp?name=${query}`
    );
}

function bindInteractions() {
    const opening = document.querySelector("#opening");
    const drawer = document.querySelector("#menu-drawer");
    const contactModal = document.querySelector("#contact-modal");
    const galleryModal = document.querySelector("#gallery-modal");
    const menuToggle = document.querySelector("#menu-toggle");
    const musicToggle = document.querySelector("#music-toggle");
    const music = document.querySelector("#background-music");

    document.querySelector("#opening-skip").addEventListener("click", () => {
        opening.classList.add("is-hidden");
    });

    menuToggle.addEventListener("click", () => {
        const willOpen = !drawer.classList.contains("is-open");
        setModalState(drawer, willOpen);
        menuToggle.setAttribute("aria-expanded", String(willOpen));
    });

    document.querySelectorAll("[data-close-drawer]").forEach((button) => {
        button.addEventListener("click", () => {
            setModalState(drawer, false);
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    document.querySelectorAll(".drawer__links a").forEach((link) => {
        link.addEventListener("click", () => {
            setModalState(drawer, false);
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    document.querySelectorAll("[data-open-modal]").forEach((button) => {
        button.addEventListener("click", () => {
            const modal = document.querySelector(`#${button.dataset.openModal}`);
            setModalState(modal, true);
        });
    });

    document.querySelectorAll("[data-close-modal]").forEach((button) => {
        button.addEventListener("click", () => {
            setModalState(contactModal, false);
        });
    });

    musicToggle.addEventListener("click", async () => {
        if (!weddingConfig.backgroundMusicUrl) {
            showToast("배경음악 파일을 연결하면 재생할 수 있습니다.");
            return;
        }
        if (music.paused) {
            try {
                await music.play();
                musicToggle.setAttribute("aria-pressed", "true");
                musicToggle.setAttribute("aria-label", "배경음악 끄기");
            } catch (error) {
                showToast("음악을 재생하지 못했습니다. 다시 눌러주세요.");
            }
        } else {
            music.pause();
            musicToggle.setAttribute("aria-pressed", "false");
            musicToggle.setAttribute("aria-label", "배경음악 켜기");
        }
    });

    const shareWedding = async () => {
        const shareData = {
            title: document.title,
            text: `${weddingConfig.groomName} · ${weddingConfig.brideName} 결혼식에 초대합니다.`,
            url: window.location.href
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (error) {
                if (error.name === "AbortError") {
                    return;
                }
            }
        }
        await copyText(window.location.href, "청첩장 주소를 복사했습니다.");
    };

    document.querySelector("#share-button").addEventListener("click", shareWedding);
    document.querySelector("[data-menu-share]").addEventListener("click", shareWedding);

    document.querySelector("#font-size-toggle").addEventListener("click", (event) => {
        const isLarge = document.body.classList.toggle("large-text");
        event.currentTarget.setAttribute("aria-pressed", String(isLarge));
        showToast(isLarge ? "큰 글씨로 표시합니다." : "기본 글씨로 표시합니다.");
    });

    document.querySelector("#copy-address").addEventListener("click", () => {
        copyText(weddingConfig.venueAddress, "예식장 주소를 복사했습니다.");
    });

    document.querySelectorAll("[data-copy-account]").forEach((button) => {
        button.addEventListener("click", () => {
            const account = button.dataset.copyAccount === "groom"
                ? weddingConfig.groomAccount
                : weddingConfig.brideAccount;
            copyText(account, "계좌번호를 복사했습니다.");
        });
    });

    document.querySelectorAll("[data-gallery-index]").forEach((button) => {
        button.addEventListener("click", () => {
            openGallery(Number(button.dataset.galleryIndex));
        });
    });

    document.querySelector(".gallery-modal__close").addEventListener("click", () => {
        setModalState(galleryModal, false);
    });
    document.querySelector(".gallery-modal__arrow--prev").addEventListener(
        "click",
        () => openGallery(currentGalleryIndex - 1)
    );
    document.querySelector(".gallery-modal__arrow--next").addEventListener(
        "click",
        () => openGallery(currentGalleryIndex + 1)
    );

    document.querySelector("#movie-button").addEventListener("click", () => {
        if (weddingConfig.movieUrl) {
            window.open(weddingConfig.movieUrl, "_blank", "noopener,noreferrer");
        } else {
            showToast("웨딩 영상 주소를 연결하면 재생할 수 있습니다.");
        }
    });

    document.querySelector("#photo-share-button").addEventListener("click", () => {
        if (weddingConfig.photoShareUrl) {
            window.open(
                weddingConfig.photoShareUrl,
                "_blank",
                "noopener,noreferrer"
            );
        } else {
            showToast("사진 공유 링크를 연결할 예정입니다.");
        }
    });

    document.querySelector("#calendar-save-button").addEventListener(
        "click",
        createCalendarFile
    );

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") {
            return;
        }
        setModalState(drawer, false);
        setModalState(contactModal, false);
        setModalState(galleryModal, false);
        menuToggle.setAttribute("aria-expanded", "false");
    });
}

function initializeWeddingCard() {
    bindConfigValues();
    renderCalendar();
    updateCountdown();
    updateMapLinks();
    bindInteractions();
    window.setInterval(updateCountdown, 1000);
}

initializeWeddingCard();
