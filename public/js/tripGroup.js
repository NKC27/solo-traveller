console.log("trip group");

const postForm = document.getElementById("post-form");
const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute("data-id");
  const title = postTitle.value.trim();
  const body = postBody.value.trim();

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
