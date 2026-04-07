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
