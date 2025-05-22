// Medium RSS feed'ini JSON'a çeviren bir servis kullanıyoruz (ör: rss2json.com)
const mediumFeedUrl =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@aydinozturk";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

fetch(mediumFeedUrl)
  .then((response) => response.json())
  .then((data) => {
    const posts = data.items;
    const postsList = document.getElementById("medium-posts");
    postsList.innerHTML = "";
    posts.slice(0, 5).forEach((post) => {
      const li = document.createElement("li");
      li.className = "medium-post-item";
      const img =
        post.thumbnail ||
        (post.description.match(/<img[^>]+src=\"([^\"]+)\"/)
          ? post.description.match(/<img[^>]+src=\"([^\"]+)\"/)[1]
          : null);
      const desc =
        post.description.replace(/<[^>]+>/g, "").slice(0, 150) + "...";
      li.innerHTML = `
        <div class="medium-post-card">
          ${
            img
              ? `<img src="${img}" alt="${post.title}" class="medium-post-thumb">`
              : ""
          }
          <div class="medium-post-content">
            <a href="${post.link}" target="_blank" class="medium-post-link">${
        post.title
      }</a>
            <div class="medium-post-date">${formatDate(post.pubDate)}</div>
            <div class="medium-post-desc">${desc}</div>
          </div>
        </div>
      `;
      postsList.appendChild(li);
    });
    if (posts.length === 0) {
      postsList.innerHTML = "<li>No posts found.</li>";
    }
  })
  .catch(() => {
    document.getElementById("medium-posts").innerHTML =
      "<li>Could not load posts.</li>";
  });
