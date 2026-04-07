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
