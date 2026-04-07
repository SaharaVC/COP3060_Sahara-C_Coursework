console.log("Welcome to Sahara Calloway's Coursework Page!");
console.log("Repo: https://github.com/SaharaVC/COP3060_Sahara-C_Coursework");

const ownerName = "Sahara Calloway";
const interestCount = 5;
const newsletterOptedIn = false;
const topInterests = ["Music", "Video Games", "Anime", "Collecting DVDs", "Collecting Fugglers"];
const ownerInfo = {
  major: "Computer Science",
  year: 2,
  focus: "Cybersecurity"
};
let fetchedPosts = null;
 
const totalChars = topInterests.reduce((sum, s) => sum + s.length, 0);
 
const newsletterOff = newsletterOptedIn === false;
 
if (ownerName.length > 0 && ownerInfo.major !== undefined) {
  console.log(`Owner: ${ownerName} | Major: ${ownerInfo.major} | Total interest chars: ${totalChars}`);
}

/**
 * renderInterestList
 * Loops over topInterests and builds a <ul> inside #interest-list.
 */
function renderInterestList() {
  const container = document.getElementById("interest-list");
  if (!container) return;
 
  const ul = document.createElement("ul");
 
  for (let i = 0; i < topInterests.length; i++) {
    const li = document.createElement("li");
    li.textContent = topInterests[i];
    ul.appendChild(li);
  }
 
  container.appendChild(ul);
}

/**
 * setStatus
 * writes message into #status with a visual type class
 * @param {string} message
 * @param {"info"|"success"|"error"} type
 */
function setStatus(message, type = "info") {
  const el = document.getElementById("status");
  if (!el) return;
  el.textContent = message;
  el.className = "";
  if (type !== "info") el.classList.add(`status-${type}`);
}

const API_BASE = "https://jsonplaceholder.typicode.com/posts";
 
async function fetchPosts() {
  setStatus("Loading...", "info");
  document.getElementById("results").innerHTML = "";
 
  const url = buildUrl(API_BASE, 10);
 
  try {
    const response = await fetch(url);
 
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
 
    const data = await response.json();
    fetchedPosts = data;b 
 
    if (!Array.isArray(fetchedPosts) || fetchedPosts.length === 0) {
      handleError("The API returned no posts.");
      return;
    }
 
    setStatus(`Loaded ${fetchedPosts.length} posts.`, "success");
 
    const sortOrder = document.getElementById("sort-select")?.value || "asc";
    renderList(filterData(fetchedPosts, sortOrder));
 
  } catch (err) {
    handleError("Could not load posts. Check your connection and try again.", err);
  }
}


document.addEventListener("DOMContentLoaded", () => {
 
  renderInterestList();
 
  // Listener 1: form submit — email validation
  // Uses your existing <form> and <input id="email"> from index.html
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
 
      const emailVal = document.getElementById("email")?.value.trim() || "";
 
      // Must contain "@", ".", and be at least 6 chars
      const isValid = emailVal.includes("@") &&
                      emailVal.includes(".") &&
                      emailVal.length >= 6;
 
      if (isValid) {
        setStatus(`✓ "${emailVal}" is valid. Submission ready.`, "success");
      } else {
        setStatus("✗ Enter a valid email address (e.g. name@example.com).", "error");
      }
    });
  }
 
  // Listener 2: email input — live feedback while typing
  const emailInput = document.getElementById("email");
  if (emailInput) {
    emailInput.addEventListener("input", () => {
      const val = emailInput.value.trim();
 
      if (val.length === 0) {
        setStatus("", "info");
      } else if (val.includes("@") && val.includes(".") && val.length >= 6) {
        setStatus("✓ Email looks good.", "success");
      } else {
        setStatus("Keep typing — not a valid email yet.", "info");
      }
    });
  }
 
  // Listener 3: fetch button click
  const fetchBtn = document.getElementById("fetch-btn");
  if (fetchBtn) {
    fetchBtn.addEventListener("click", () => {
      fetchPosts();
    });
  }
 
  // Sort dropdown: re-render cached posts with new order
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      if (!fetchedPosts) {
        setStatus("Load posts first before sorting.", "info");
        return;
      }
      renderList(filterData(fetchedPosts, sortSelect.value));
    });
  }
 
});
