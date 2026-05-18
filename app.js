const STORAGE_KEY = "confspace-data-v1";
const AUTH_KEY = "confspace-auth-v1";
const USERS_KEY = "confspace-users-v1";

const adminUser = {
  username: "admin",
  password: "1234",
  name: "Адміністратор",
  role: "Адміністратор"
};

const demoData = {
  conferences: [
    {
      id: "conf-1",
      title: "International Conference on Software Engineering and Digital Research",
      description:
        "Наукова конференція, присвячена сучасним підходам до програмної інженерії, веб-технологій, аналізу даних та цифрової трансформації освіти.",
      startDate: "2026-06-18",
      endDate: "2026-06-19",
      format: "Змішаний",
      location: "Київ / online",
      status: "Актуальна",
      joinUrl: "https://meet.google.com/example-conf-2026"
    },
    {
      id: "conf-2",
      title: "Student Science Days: Information Technologies",
      description:
        "Студентська науково-практична конференція з доповідями у сфері інформаційних систем, UI/UX, кібербезпеки та розробки веб-додатків.",
      startDate: "2026-05-28",
      endDate: "2026-05-28",
      format: "Online",
      location: "Microsoft Teams",
      status: "Запланована",
      joinUrl: "https://teams.microsoft.com/l/meetup-join/example-student-science-days"
    }
  ],
  talks: [
    {
      id: "talk-1",
      conferenceId: "conf-1",
      section: "Програмна інженерія",
      title: "Компонентний підхід до розробки веб-додатків",
      speaker: "Олена Коваленко",
      speakerRole: "Викладач",
      organization: "Міжнародний Європейський Університет",
      date: "2026-06-18",
      time: "10:00",
      description:
        "Доповідь розглядає побудову інтерфейсів із повторно використовуваних компонентів та переваги такого підходу для супроводу веб-систем.",
      material: "https://example.com/component-web-apps.pdf",
      materialTitle: "Презентація: компонентний підхід",
      materialType: "PDF-презентація",
      materialSummary:
        "Матеріал містить схему компонентної структури веб-додатка, приклади повторного використання UI-блоків і короткі висновки щодо підтримки проєкту."
    },
    {
      id: "talk-2",
      conferenceId: "conf-1",
      section: "Бази даних",
      title: "Проєктування структури даних для конференційних систем",
      speaker: "Андрій Мельник",
      speakerRole: "Викладач",
      organization: "Кафедра інформаційних технологій",
      date: "2026-06-18",
      time: "11:30",
      description:
        "Описано сутності, зв'язки та підходи до нормалізації даних для систем керування розкладом конференцій.",
      material: "https://example.com/conference-database-design.pdf",
      materialTitle: "Схема бази даних конференційної системи",
      materialType: "Методичний PDF",
      materialSummary:
        "Матеріал демонструє таблиці конференцій, секцій, доповідей, спікерів і матеріалів, а також пояснює зв'язки між ними."
    },
    {
      id: "talk-3",
      conferenceId: "conf-1",
      section: "UI/UX",
      title: "Адаптивний інтерфейс для перегляду наукових подій",
      speaker: "Марія Шевченко",
      speakerRole: "Запрошений експерт",
      organization: "UX Research Lab",
      date: "2026-06-19",
      time: "09:45",
      description:
        "Розглядаються принципи побудови зручного інтерфейсу для розкладів, фільтрів, карток доповідей та мобільного перегляду.",
      material: "https://example.com/adaptive-event-ui.pdf",
      materialTitle: "UX-рекомендації для розкладу конференцій",
      materialType: "Конспект доповіді",
      materialSummary:
        "Матеріал містить рекомендації щодо адаптивного інтерфейсу, фільтрів, карток розкладу та зручного перегляду матеріалів зі смартфона."
    },
    {
      id: "talk-4",
      conferenceId: "conf-2",
      section: "Веб-технології",
      title: "Використання JavaScript для інтерактивних освітніх сервісів",
      speaker: "Денис Євсєєв",
      speakerRole: "Студент",
      organization: "Група ІПЗ-22-401",
      date: "2026-05-28",
      time: "12:15",
      description:
        "Демонстрація можливостей JavaScript для пошуку, фільтрації та динамічного оновлення інтерфейсу без перезавантаження сторінки.",
      material: "https://example.com/javascript-education-services.pdf",
      materialTitle: "Приклади JavaScript для інтерактивного сервісу",
      materialType: "Демонстраційний код",
      materialSummary:
        "Матеріал включає приклади пошуку, фільтрації, роботи з localStorage і динамічного оновлення сторінки без перезавантаження."
    }
  ]
};

const state = {
  data: loadData(),
  view: loadUser() ? "public" : "login",
  search: "",
  type: "all",
  user: loadUser(),
  editingTalkId: null,
  adminMode: "talk",
  authMode: "login",
  registeredUsers: loadRegisteredUsers()
};

const els = {
  navButtons: document.querySelectorAll(".top-nav .nav-button"),
  topNav: document.querySelector(".top-nav"),
  views: document.querySelectorAll(".view"),
  protectedContent: document.querySelectorAll(".protected-content"),
  conferenceList: document.querySelector("#conference-list"),
  scheduleList: document.querySelector("#schedule-list"),
  materialsList: document.querySelector("#materials-list"),
  adminTalks: document.querySelector("#admin-talks"),
  authUser: document.querySelector("#auth-user"),
  logoutButton: document.querySelector("#logout-button"),
  loginForm: document.querySelector("#login-form"),
  authModeButtons: document.querySelectorAll("[data-auth-mode]"),
  loginError: document.querySelector("#login-error"),
  registerForm: document.querySelector("#register-form"),
  registerError: document.querySelector("#register-error"),
  materialModal: document.querySelector("#material-modal"),
  modalTitle: document.querySelector("#modal-title"),
  modalBody: document.querySelector("#modal-body"),
  modalClose: document.querySelector("#modal-close"),
  conferenceModal: document.querySelector("#conference-modal"),
  conferenceModalTitle: document.querySelector("#conference-modal-title"),
  conferenceModalBody: document.querySelector("#conference-modal-body"),
  conferenceModalClose: document.querySelector("#conference-modal-close"),
  searchInput: document.querySelector("#search-input"),
  typeFilter: document.querySelector("#type-filter"),
  resetFilters: document.querySelector("#reset-filters"),
  printSchedule: document.querySelector("#print-schedule"),
  statConferences: document.querySelector("#stat-conferences"),
  statTalks: document.querySelector("#stat-talks"),
  statMaterials: document.querySelector("#stat-materials"),
  talkForm: document.querySelector("#talk-form"),
  conferenceForm: document.querySelector("#conference-form"),
  adminModeButtons: document.querySelectorAll("[data-admin-mode]"),
  formTitleHeading: document.querySelector("#form-title-heading"),
  submitTalk: document.querySelector("#submit-talk"),
  cancelEdit: document.querySelector("#cancel-edit"),
  formConference: document.querySelector("#form-conference"),
  adminStats: document.querySelector("#admin-stats"),
  adminConferences: document.querySelector("#admin-conferences")
};

function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return normalizeData(structuredClone(demoData));
  }

  try {
    return normalizeData(JSON.parse(stored));
  } catch {
    return normalizeData(structuredClone(demoData));
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function loadUser() {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function saveUser(user) {
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

function loadRegisteredUsers() {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => ({
        firstName: item.firstName || item.name || "",
        lastName: item.lastName || "",
        email: (item.email || "").toLowerCase(),
        password: item.password || "",
        role: "Учасник"
      }))
      .filter((item) => item.email && item.password);
  } catch {
    return [];
  }
}

function saveRegisteredUsers() {
  localStorage.setItem(USERS_KEY, JSON.stringify(state.registeredUsers));
}

function normalizeData(data) {
  const normalized = {
    conferences: Array.isArray(data.conferences) ? data.conferences : [],
    talks: Array.isArray(data.talks) ? data.talks : []
  };

  normalized.conferences = normalized.conferences.map((conference) => {
    const demoConference = demoData.conferences.find((item) => item.id === conference.id);
    return {
      ...conference,
      joinUrl: conference.joinUrl || demoConference?.joinUrl || ""
    };
  });

  normalized.talks = normalized.talks.map((talk) => {
    const demoTalk = demoData.talks.find((item) => item.id === talk.id);
    return {
      ...talk,
      speakerRole: talk.speakerRole || demoTalk?.speakerRole || "Учасник",
      materialTitle: talk.materialTitle || demoTalk?.materialTitle || `Матеріали: ${talk.title}`,
      materialType: talk.materialType || demoTalk?.materialType || "Посилання",
      materialSummary:
        talk.materialSummary ||
        demoTalk?.materialSummary ||
        "Матеріал прив'язаний до конкретної доповіді конференції."
    };
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

function isLoggedIn() {
  return Boolean(state.user);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

function getConference(id) {
  return state.data.conferences.find((conference) => conference.id === id);
}

function getTalkStatus(talk) {
  const now = new Date();
  const start = new Date(`${talk.date}T${talk.time}:00`);
  const end = new Date(start.getTime() + 45 * 60 * 1000);

  if (now < start) {
    return { text: "Заплановано", className: "" };
  }

  if (now >= start && now <= end) {
    return { text: "Триває", className: "active" };
  }

  return { text: "Завершено", className: "done" };
}

function getFilteredTalks() {
  const query = state.search.trim().toLowerCase();

  return state.data.talks
    .filter(() => state.type === "all" || state.type === "lesson")
    .filter((talk) => {
      if (!query) return true;
      const conference = getConference(talk.conferenceId);
      return [talk.title, conference?.title]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    })
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
}

function getFilteredConferences() {
  const query = state.search.trim().toLowerCase();

  return [...state.data.conferences]
    .filter(() => state.type === "all" || state.type === "conference")
    .filter((conference) => {
      if (!query) return true;
      return [conference.title, conference.description, conference.location, conference.format]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    })
    .sort((a, b) => {
      const dateCompare = a.startDate.localeCompare(b.startDate);
      if (dateCompare !== 0) return dateCompare;
      return a.title.localeCompare(b.title);
    });
}

function renderFilters() {
  els.formConference.innerHTML = [...state.data.conferences]
    .sort((a, b) => {
      const dateCompare = a.startDate.localeCompare(b.startDate);
      if (dateCompare !== 0) return dateCompare;
      return a.title.localeCompare(b.title);
    })
    .map((conference) => `<option value="${conference.id}">${conference.title}</option>`)
    .join("");
  els.typeFilter.value = state.type;
}

function renderStats() {
  els.statConferences.textContent = state.data.conferences.length;
  els.statTalks.textContent = state.data.talks.length;
  els.statMaterials.textContent = state.data.talks.filter((talk) => talk.material).length;
}

function renderConferences() {
  const conferences = getFilteredConferences();

  if (!conferences.length) {
    els.conferenceList.innerHTML = `<div class="empty-state">Конференцій за поточними фільтрами не знайдено.</div>`;
    return;
  }

  els.conferenceList.innerHTML = conferences
    .map((conference) => {
      const talksCount = state.data.talks.filter((talk) => talk.conferenceId === conference.id).length;
      const joinLink = conference.joinUrl
        ? `<a class="join-link" href="${conference.joinUrl}" target="_blank" rel="noreferrer">Приєднатися до конференції</a>`
        : "";
      return `
        <article class="conference-card">
          <div class="tag-row">
            <span class="date-pill">${conference.status}</span>
            <span class="tag">${conference.format}</span>
          </div>
          <h3>${conference.title}</h3>
          <p class="muted">${conference.description}</p>
          <div class="meta-row">
            <span class="tag">${formatDate(conference.startDate)}</span>
            <span class="tag">${conference.location}</span>
            <span class="tag">${talksCount} доповідей</span>
          </div>
          <div class="card-actions">
            <button class="secondary-button" type="button" data-conference-details="${conference.id}">Детальніше</button>
            ${joinLink}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSchedule() {
  const talks = getFilteredTalks();

  if (!talks.length) {
    els.scheduleList.innerHTML = `<div class="empty-state">За вибраними фільтрами доповідей не знайдено.</div>`;
    return;
  }

  els.scheduleList.innerHTML = talks
    .map((talk) => {
      const conference = getConference(talk.conferenceId);
      const status = getTalkStatus(talk);
      return `
        <article class="schedule-card">
          <div class="time-block">
            <strong>${talk.time}</strong>
            <span class="muted">${formatDate(talk.date)}</span>
            <span class="tag">${talk.section}</span>
            <span class="status-badge ${status.className}">${status.text}</span>
          </div>
          <div>
            <h3>${talk.title}</h3>
            <p class="muted">${talk.description}</p>
            <div class="tag-row">
              <span class="tag">${conference?.title ?? "Конференція"}</span>
            </div>
          </div>
          <div class="speaker-block">
            <strong>${talk.speaker}</strong>
            <span class="role-badge">${talk.speakerRole ?? "Учасник"}</span>
            <span class="muted">${talk.organization}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMaterials() {
  const talks = getFilteredTalks().filter((talk) => talk.material);

  if (!talks.length) {
    els.materialsList.innerHTML = `<div class="empty-state">Матеріалів за вибраними фільтрами не знайдено.</div>`;
    return;
  }

  els.materialsList.innerHTML = talks
    .map((talk) => {
      const conference = getConference(talk.conferenceId);
      return `
        <article class="material-card">
          <div>
            <h3>${talk.materialTitle ?? talk.title}</h3>
            <p class="muted">${conference?.title ?? ""} · ${talk.speaker} · ${talk.section}</p>
          </div>
          <button class="material-link" type="button" data-material-id="${talk.id}">Відкрити</button>
        </article>
      `;
    })
    .join("");
}

function openMaterial(talkId) {
  const talk = state.data.talks.find((item) => item.id === talkId);
  if (!talk) return;

  const conference = getConference(talk.conferenceId);
  els.modalTitle.textContent = talk.materialTitle ?? talk.title;
  els.modalBody.innerHTML = `
    <div class="material-preview">
      <h3>${talk.title}</h3>
      <p class="muted">${talk.description}</p>
      <div class="tag-row">
        <span class="tag">${talk.materialType ?? "Матеріал"}</span>
        <span class="tag">${talk.section}</span>
        <span class="tag">${talk.speakerRole ?? "Учасник"}: ${talk.speaker}</span>
      </div>
    </div>
    <div>
      <h3>Опис матеріалу</h3>
      <p class="muted">${talk.materialSummary ?? "Матеріал прив'язаний до конкретної доповіді конференції."}</p>
    </div>
    <div>
      <h3>Дані заняття / доповіді</h3>
      <p class="muted">${conference?.title ?? "Конференція"} · ${formatDate(talk.date)} · ${talk.time}</p>
    </div>
    <div class="material-actions">
      <a class="material-link" href="${talk.material}" target="_blank" rel="noreferrer">Відкрити файл</a>
      <button class="secondary-button" type="button" data-copy-material-link>Скопіювати посилання</button>
    </div>
  `;
  els.materialModal.classList.remove("hidden");

  const copyButton = els.modalBody.querySelector("[data-copy-material-link]");
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(talk.material);
      copyButton.textContent = "Скопійовано";
    } catch {
      copyButton.textContent = "Посилання недоступне";
    }
  });
}

function closeMaterial() {
  els.materialModal.classList.add("hidden");
}

function openConferenceDetails(conferenceId) {
  const conference = getConference(conferenceId);
  if (!conference) return;

  const talks = state.data.talks.filter((talk) => talk.conferenceId === conference.id);
  const sections = [...new Set(talks.map((talk) => talk.section))];
  const materialsCount = talks.filter((talk) => talk.material).length;
  const joinLink = conference.joinUrl
    ? `<a class="material-link" href="${conference.joinUrl}" target="_blank" rel="noreferrer">Приєднатися до конференції</a>`
    : "";

  els.conferenceModalTitle.textContent = conference.title;
  els.conferenceModalBody.innerHTML = `
    <div class="material-preview">
      <h3>${conference.title}</h3>
      <p class="muted">${conference.description}</p>
      <div class="tag-row">
        <span class="tag">${conference.format}</span>
        <span class="tag">${conference.location}</span>
        <span class="date-pill">${conference.status}</span>
      </div>
    </div>
    <div>
      <h3>Період проведення</h3>
      <p class="muted">${formatDate(conference.startDate)} - ${formatDate(conference.endDate)}</p>
    </div>
    <div class="admin-stats">
      <div class="admin-stat">
        <strong>${sections.length}</strong>
        <span>секцій</span>
      </div>
      <div class="admin-stat">
        <strong>${talks.length}</strong>
        <span>доповідей</span>
      </div>
      <div class="admin-stat">
        <strong>${materialsCount}</strong>
        <span>матеріалів</span>
      </div>
      <div class="admin-stat">
        <strong>${new Set(talks.map((talk) => talk.speakerRole ?? "Учасник")).size}</strong>
        <span>ролей</span>
      </div>
    </div>
    <div class="material-actions">
      ${joinLink}
      <button class="secondary-button" type="button" data-open-conference-schedule="${conference.id}">Переглянути розклад</button>
    </div>
  `;
  els.conferenceModal.classList.remove("hidden");
}

function closeConferenceDetails() {
  els.conferenceModal.classList.add("hidden");
}

function renderAdmin() {
  renderAdminStats();
  renderAdminConferences();
  const talks = [...getFilteredTalks()].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  if (!talks.length) {
    els.adminTalks.innerHTML = `<div class="empty-state">За поточними фільтрами доповідей не знайдено.</div>`;
    return;
  }

  els.adminTalks.innerHTML = talks
    .map(
      (talk) => `
        <div class="admin-talk">
          <strong>${talk.title}</strong>
          <span class="muted">${talk.section} · ${talk.speakerRole ?? "Учасник"} · ${talk.speaker} · ${formatDate(talk.date)} ${talk.time}</span>
          <div class="admin-talk-actions">
            <button class="secondary-button" type="button" data-edit-talk="${talk.id}">Редагувати</button>
            <button class="danger-button" type="button" data-delete-talk="${talk.id}">Видалити</button>
          </div>
        </div>
      `
    )
    .join("");
}

function renderAdminConferences() {
  const conferences = getFilteredConferences();

  els.adminConferences.innerHTML = conferences
    .map(
      (conference) => `
        <div class="admin-talk">
          <strong>${conference.title}</strong>
          <span class="muted">${conference.format} · ${conference.status} · ${formatDate(conference.startDate)} - ${formatDate(conference.endDate)}</span>
          <span class="muted">${conference.location}</span>
          <div class="admin-talk-actions">
            <button class="secondary-button" type="button" data-edit-conference="${conference.id}">Редагувати</button>
            <button class="danger-button" type="button" data-delete-conference="${conference.id}">Видалити</button>
          </div>
        </div>
      `
    )
    .join("");
}

function renderAdminStats() {
  const sectionsCount = [...new Set(state.data.talks.map((talk) => talk.section))].length;
  const materialsCount = state.data.talks.filter((talk) => talk.material).length;

  els.adminStats.innerHTML = `
    <div class="admin-stat">
      <strong>${state.data.conferences.length}</strong>
      <span>конференцій</span>
    </div>
    <div class="admin-stat">
      <strong>${sectionsCount}</strong>
      <span>секцій</span>
    </div>
    <div class="admin-stat">
      <strong>${state.data.talks.length}</strong>
      <span>доповідей</span>
    </div>
    <div class="admin-stat">
      <strong>${materialsCount}</strong>
      <span>матеріалів</span>
    </div>
  `;
}

function renderAdminMode() {
  const isTalkMode = state.adminMode === "talk";
  els.talkForm.classList.toggle("hidden", !isTalkMode);
  els.conferenceForm.classList.toggle("hidden", isTalkMode);
  els.adminModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.adminMode === state.adminMode);
  });
}

function renderAuthMode() {
  const isLoginMode = state.authMode === "login";
  els.loginForm.classList.toggle("hidden", !isLoginMode);
  els.registerForm.classList.toggle("hidden", isLoginMode);
  els.authModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.authMode === state.authMode);
  });
}

function clearEditMode() {
  state.editingTalkId = null;
  els.talkForm.reset();
  els.formTitleHeading.textContent = "Додати доповідь";
  els.submitTalk.textContent = "Додати до розкладу";
  els.cancelEdit.classList.add("hidden");
}

function setEditMode(talkId) {
  const talk = state.data.talks.find((item) => item.id === talkId);
  if (!talk) return;

  state.editingTalkId = talkId;
  document.querySelector("#form-conference").value = talk.conferenceId;
  document.querySelector("#form-section").value = talk.section;
  document.querySelector("#form-title").value = talk.title;
  document.querySelector("#form-speaker").value = talk.speaker;
  document.querySelector("#form-speaker-role").value = talk.speakerRole ?? "Учасник";
  document.querySelector("#form-date").value = talk.date;
  document.querySelector("#form-time").value = talk.time;
  document.querySelector("#form-description").value = talk.description;
  document.querySelector("#form-material").value = talk.material ?? "";
  els.formTitleHeading.textContent = "Редагувати доповідь і розклад";
  els.submitTalk.textContent = "Зберегти зміни";
  els.cancelEdit.classList.remove("hidden");
}

function setView(view) {
  if (!isLoggedIn() && view !== "login") {
    view = "login";
  }

  if (state.user?.role !== "Адміністратор" && view === "admin") {
    view = "public";
    if (state.user) {
      alert("Для доступу до адмін-панелі потрібен вхід адміністратора.");
    }
  }

  state.view = view;
  els.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  els.views.forEach((viewEl) => {
    viewEl.classList.toggle("active", viewEl.id === `${view}-view`);
  });
}

function renderAuth() {
  if (state.user) {
    els.authUser.textContent = `${state.user.name} (${state.user.role})`;
    els.logoutButton.classList.remove("hidden");
    els.topNav.classList.remove("locked");
    els.protectedContent.forEach((element) => element.classList.remove("locked"));
  } else {
    els.authUser.textContent = "Гість";
    els.logoutButton.classList.add("hidden");
    els.topNav.classList.add("locked");
    els.protectedContent.forEach((element) => element.classList.add("locked"));
  }
}

function render() {
  renderFilters();
  renderStats();
  renderConferences();
  renderSchedule();
  renderMaterials();
  renderAdmin();
  renderAuth();
  renderAdminMode();
  renderAuthMode();
}

els.navButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

els.authModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.authMode = button.dataset.authMode;
    els.loginError.textContent = "";
    els.registerError.textContent = "";
    renderAuthMode();
  });
});

els.adminModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.adminMode = button.dataset.adminMode;
    if (state.adminMode !== "talk") {
      clearEditMode();
    }
    renderAdminMode();
  });
});

els.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

els.typeFilter.addEventListener("change", (event) => {
  state.type = event.target.value;
  render();
});

els.resetFilters.addEventListener("click", () => {
  state.search = "";
  state.type = "all";
  els.searchInput.value = "";
  render();
});

els.printSchedule.addEventListener("click", () => {
  setView("schedule");
  window.print();
});

els.conferenceList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-conference-details]");
  if (!button) return;
  openConferenceDetails(button.dataset.conferenceDetails);
});

els.materialsList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-material-id]");
  if (!button) return;
  openMaterial(button.dataset.materialId);
});

els.modalClose.addEventListener("click", closeMaterial);

els.materialModal.addEventListener("click", (event) => {
  if (event.target === els.materialModal) {
    closeMaterial();
  }
});

els.conferenceModalClose.addEventListener("click", closeConferenceDetails);

els.conferenceModal.addEventListener("click", (event) => {
  if (event.target === els.conferenceModal) {
    closeConferenceDetails();
    return;
  }

  const scheduleButton = event.target.closest("[data-open-conference-schedule]");
  if (!scheduleButton) return;

  state.type = "lesson";
  state.search = "";
  els.searchInput.value = "";
  closeConferenceDetails();
  render();
  setView("schedule");
});

els.adminTalks.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-talk]");
  const deleteButton = event.target.closest("[data-delete-talk]");

  if (editButton) {
    setEditMode(editButton.dataset.editTalk);
    return;
  }

  if (deleteButton) {
    const talk = state.data.talks.find((item) => item.id === deleteButton.dataset.deleteTalk);
    if (!talk) return;

    const confirmed = confirm(`Видалити доповідь "${talk.title}" з розкладу?`);
    if (!confirmed) return;

    state.data.talks = state.data.talks.filter((item) => item.id !== talk.id);
    if (state.editingTalkId === talk.id) {
      clearEditMode();
    }
    saveData();
    render();
  }
});

els.adminConferences.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-conference]");
  const deleteButton = event.target.closest("[data-delete-conference]");

  if (editButton) {
    const conference = state.data.conferences.find((item) => item.id === editButton.dataset.editConference);
    if (!conference) return;

    state.adminMode = "conference";
    document.querySelector("#conference-title").value = conference.title;
    document.querySelector("#conference-description").value = conference.description;
    document.querySelector("#conference-start-date").value = conference.startDate;
    document.querySelector("#conference-end-date").value = conference.endDate;
    document.querySelector("#conference-format").value = conference.format;
    document.querySelector("#conference-status").value = conference.status;
    document.querySelector("#conference-location").value = conference.location;
    document.querySelector("#conference-join-url").value = conference.joinUrl ?? "";
    els.conferenceForm.dataset.editingConferenceId = conference.id;
    document.querySelector("#submit-conference").textContent = "Зберегти конференцію";
    renderAdminMode();
    return;
  }

  if (deleteButton) {
    const conference = state.data.conferences.find((item) => item.id === deleteButton.dataset.deleteConference);
    if (!conference) return;

    const confirmed = confirm(`Видалити конференцію "${conference.title}" разом з усіма її доповідями?`);
    if (!confirmed) return;

    state.data.conferences = state.data.conferences.filter((item) => item.id !== conference.id);
    state.data.talks = state.data.talks.filter((talk) => talk.conferenceId !== conference.id);
    if (els.conferenceForm.dataset.editingConferenceId === conference.id) {
      els.conferenceForm.reset();
      delete els.conferenceForm.dataset.editingConferenceId;
      document.querySelector("#submit-conference").textContent = "Створити конференцію";
    }
    saveData();
    render();
  }
});

els.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  els.loginError.textContent = "";

  const username = document.querySelector("#login-username").value.trim();
  const password = document.querySelector("#login-password").value;

  if (username === adminUser.username && password === adminUser.password) {
    state.user = { name: adminUser.name, role: adminUser.role, username: adminUser.username };
    saveUser(state.user);
    els.loginForm.reset();
    setView("public");
    render();
    return;
  }

  const registeredUser = state.registeredUsers.find(
    (item) => item.email === username.toLowerCase() && item.password === password
  );

  if (!registeredUser) {
    els.loginError.textContent = "Невірний логін або пароль.";
    return;
  }

  state.user = {
    name: `${registeredUser.firstName} ${registeredUser.lastName}`.trim(),
    role: registeredUser.role,
    username: registeredUser.email
  };
  saveUser(state.user);
  els.loginForm.reset();
  setView("public");
  render();
});

els.registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  els.registerError.textContent = "";

  const firstName = document.querySelector("#register-first-name").value.trim();
  const lastName = document.querySelector("#register-last-name").value.trim();
  const email = document.querySelector("#register-email").value.trim().toLowerCase();
  const password = document.querySelector("#register-password").value;

  if (!firstName || !lastName || !email || !password) {
    els.registerError.textContent = "Заповніть усі поля.";
    return;
  }

  if (state.registeredUsers.some((item) => item.email === email)) {
    els.registerError.textContent = "Користувач із такою поштою вже існує.";
    return;
  }

  state.registeredUsers.push({
    firstName,
    lastName,
    email,
    password,
    role: "Учасник"
  });
  saveRegisteredUsers();

  state.user = {
    name: `${firstName} ${lastName}`.trim(),
    role: "Учасник",
    username: email
  };
  saveUser(state.user);
  els.registerForm.reset();
  setView("public");
  render();
});

els.logoutButton.addEventListener("click", () => {
  state.user = null;
  saveUser(null);
  setView("login");
  render();
});

els.talkForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (state.user?.role !== "Адміністратор") {
    alert("Додавання доповідей доступне лише адміністратору.");
    setView("public");
    return;
  }

  const title = document.querySelector("#form-title").value.trim();
  const talkPayload = {
    conferenceId: document.querySelector("#form-conference").value,
    section: document.querySelector("#form-section").value.trim(),
    title,
    speaker: document.querySelector("#form-speaker").value.trim(),
    speakerRole: document.querySelector("#form-speaker-role").value,
    organization: "Додано через адміністративну панель",
    date: document.querySelector("#form-date").value,
    time: document.querySelector("#form-time").value,
    description: document.querySelector("#form-description").value.trim() || "Опис буде додано пізніше.",
    material: document.querySelector("#form-material").value.trim(),
    materialTitle: `Матеріали: ${title}`,
    materialType: "Посилання",
    materialSummary: "Матеріал додано через адміністративну панель і прив'язано до цієї доповіді."
  };

  if (state.editingTalkId) {
    state.data.talks = state.data.talks.map((talk) =>
      talk.id === state.editingTalkId
        ? {
            ...talk,
            ...talkPayload
          }
        : talk
    );
  } else {
    state.data.talks.push({
      id: `talk-${Date.now()}`,
      ...talkPayload
    });
  }

  saveData();
  clearEditMode();
  render();
  setView("schedule");
});

els.conferenceForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (state.user?.role !== "Адміністратор") {
    alert("Створення конференцій доступне лише адміністратору.");
    setView("public");
    return;
  }

  const conference = {
    title: document.querySelector("#conference-title").value.trim(),
    description: document.querySelector("#conference-description").value.trim() || "Опис буде додано пізніше.",
    startDate: document.querySelector("#conference-start-date").value,
    endDate: document.querySelector("#conference-end-date").value,
    format: document.querySelector("#conference-format").value,
    location: document.querySelector("#conference-location").value.trim(),
    status: document.querySelector("#conference-status").value,
    joinUrl: document.querySelector("#conference-join-url").value.trim()
  };

  const editingId = els.conferenceForm.dataset.editingConferenceId;

  if (editingId) {
    state.data.conferences = state.data.conferences.map((item) =>
      item.id === editingId ? { ...item, ...conference, id: editingId } : item
    );
    delete els.conferenceForm.dataset.editingConferenceId;
    document.querySelector("#submit-conference").textContent = "Створити конференцію";
  } else {
    state.data.conferences.push({
      id: `conf-${Date.now()}`,
      ...conference
    });
  }

  saveData();
  els.conferenceForm.reset();
  delete els.conferenceForm.dataset.editingConferenceId;
  document.querySelector("#submit-conference").textContent = "Створити конференцію";
  state.adminMode = "talk";
  render();
  setView("public");
});

render();
setView(state.view);
