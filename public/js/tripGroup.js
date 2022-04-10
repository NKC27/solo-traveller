console.log("trip group");

const postForm = document.getElementById("post-form");
const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");
const commentForm = document.getElementById("comment-form");
const commentBody = document.getElementById("comment-body");

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute("data-id");
  const title = postTitle.value.trim();
  const body = postBody;

  if (id && title && body) {
    const response = await fetch(`/api/users/post/${id}`, {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
});

commentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("comment form");
  const id = event.target.getAttribute("data-id");

  const body = commentBody.value.trim();
  console.log(id);
  console.log(body);
  if (id && body) {
    const response = await fetch(`/api/users/comment/${id}`, {
      method: "POST",
      body: JSON.stringify({ body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
});
