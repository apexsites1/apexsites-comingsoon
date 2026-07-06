const SCRIPT_URL = "https://script.google.com/a/macros/apexsites.ai/s/AKfycbw0dyr0M7N2FF783LcreOqeVhmQfRHitvIEpM9yRqf6fYn6H2GYgcsW9fxi02Tz-Ij9/exec";

const logoVideo = document.getElementById("logoVideo");
const form = document.getElementById("preSignupForm");
const message = document.getElementById("formMessage");

if (logoVideo) {
  logoVideo.addEventListener("ended", () => {
    logoVideo.pause();
    if (Number.isFinite(logoVideo.duration) && logoVideo.duration > 0.05) {
      logoVideo.currentTime = Math.max(0, logoVideo.duration - 0.04);
    }
  });
}

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = `form-message ${type}`.trim();
}

function isValidEmail(email) {
  const value = email.trim().toLowerCase();
  if (value.length > 254) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return false;

  const blockedDomains = new Set([
    "example.com",
    "example.net",
    "example.org",
    "test.com",
    "invalid.com"
  ]);

  const domain = value.split("@")[1];
  if (!domain || blockedDomains.has(domain)) return false;
  if (domain.startsWith("-") || domain.endsWith("-")) return false;

  return true;
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    referral_url: document.referrer || ""
  };
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = form.querySelector("button");
    const name = form.name.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const company = form.company.value.trim();

    setMessage("");

    if (company) {
      form.reset();
      return;
    }

    if (!name) {
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

    try {
      const payload = {
        name,
        email,
        company,
        source: "ApexSites Coming Soon Page",
        page: "https://comingsoon.apexsites.ai/",
        timestamp: new Date().toISOString(),
        ...getUtmParams()
      };

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      form.reset();
      setMessage(
        "You're in! Thanks for joining the ApexSites early access list. We'll send invitations to this email on a first-come basis as we begin opening access during pre-launch. We can't wait to show you what we've been building.",
        "success"
      );
      button.textContent = "You’re In";
    } catch (error) {
      setMessage("Something went wrong. Give it another try in a minute.", "error");
      button.textContent = "Get Early Access";
      button.disabled = false;
    }
  });
}
