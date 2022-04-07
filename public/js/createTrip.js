const createForm = document.getElementById("create-form");
console.log("javascript");
updateForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("event listener");
  const tripName = document.getElementById("trip-name").value.trim();
  const tripLink = document.getElementById("trip-link").value.trim();
  const imgSrc = document.getElementById("img-src").value.trim();
  if (title && body) {
    const response = await fetch("/api/trip/create", {
      method: "POST",
      body: JSON.stringify({
        trip_name: tripName,
        trip_link: tripLink,
        img_src: imgSrc,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
});
