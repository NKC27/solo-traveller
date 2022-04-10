console.log("trip group");

const postForm = document.getElementById("post-form");
const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");
const commentForms = document.querySelectorAll(".comment-form");

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute("data-id");
  const title = postTitle.value.trim();
  const body = postBody.value;
  console.log("click");
  console.log(id);
  console.log(title);
  console.log(body);

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

commentForms.forEach((commentForm) => {
  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("comment form");
    const id = event.target.getAttribute("data-id");

    const commentBody = document.getElementById(`comment-body${id}`);
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
});
