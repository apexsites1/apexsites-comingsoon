const SCRIPT_URL = "https://script.google.com/a/macros/apexsites.ai/s/AKfycbw0dyr0M7N2FF783LcreOqeVhmQfRHitvIEpM9yRqf6fYn6H2GYgcsW9fxi02Tz-Ij9/exec";

const form = document.getElementById("preSignupForm");
const message = document.getElementById("formMessage");
const button = document.getElementById("submitButton");
const logoVideo = document.getElementById("logoVideo");

function setMessage(text, type = "") {
  message.textContent = text;
  message.classList.remove("is-error", "is-success");
  if (type) message.classList.add(`is-${type}`);
}

function isValidEmail(email) {
  const value = email.trim();
  if (value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name) || "";
}

if (logoVideo) {
  logoVideo.addEventListener("ended", () => {
    logoVideo.pause();
    if (Number.isFinite(logoVideo.duration) && logoVideo.duration > 0.03) {
      logoVideo.currentTime = Math.max(0, logoVideo.duration - 0.03);
    }
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim().toLowerCase();
  const company = form.company.value.trim();

  setMessage("");

  if (company) {
    form.reset();
    setMessage("You’re on the list. We received your info, and we’ll send access invites on a first-come basis as we open pre-launch access. Glad you’re getting in early.", "success");
    return;
  }

  if (name.length < 2) {
    setMessage("Add your name so we know who to invite.", "error");
    form.name.focus();
    return;
  }

  if (!isValidEmail(email)) {
    setMessage("That email doesn’t look quite right. Try again with a real email address.", "error");
    form.email.focus();
    return;
  }

  button.textContent = "Joining...";
  button.disabled = true;

  const payload = {
    name,
    email,
    company,
    source: "ApexSites Coming Soon Splash Page",
    page: window.location.href,
    referrer: document.referrer || "",
    utm_source: getParam("utm_source"),
    utm_medium: getParam("utm_medium"),
    utm_campaign: getParam("utm_campaign"),
    utm_content: getParam("utm_content"),
    utm_term: getParam("utm_term"),
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    form.reset();
    setMessage("You’re on the list. We received your info, and we’ll send access invites to this email on a first-come basis as we open pre-launch access. Glad you’re getting in early.", "success");
    button.textContent = "Joined";
  } catch (error) {
    setMessage("Something went wrong. Give it another try in a minute.", "error");
    button.textContent = "Get Early Access";
    button.disabled = false;
  }
});
