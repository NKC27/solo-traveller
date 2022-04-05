console.log("signup form");

let signupForm = document.getElementById("signup-form");

const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log("signup");
  const user_name = document.querySelector("#userName").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (user_name && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ user_name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

signupForm.addEventListener("submit", signupFormHandler);
