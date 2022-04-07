const createForm = document.getElementById("create-form");
console.log("javascript");
createForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("event listener");
  const tripName = document.getElementById("trip-name");
  const tripLink = document.getElementById("trip-link");
  const imgSrc = document.getElementById("img-src");
  if (tripName && tripLink && imgSrc) {
    const response = await fetch("/api/trip/create", {
      method: "POST",
      body: JSON.stringify({
        trip_name: tripName.value,
        trip_link: tripLink.value,
        img_src: imgSrc.value,
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
