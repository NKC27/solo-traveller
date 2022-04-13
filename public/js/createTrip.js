const createForm = document.getElementById("create-form");
console.log("javascript");
createForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("event listener");
  const tripName = document.getElementById("trip-name");
  const tripLink = document.getElementById("trip-link");
  const tripDescription = document.getElementById("trip-description");
  if (tripName && tripLink && tripDescription) {
    const response = await fetch("/api/trip/create", {
      method: "POST",
      body: JSON.stringify({
        trip_name: tripName.value,
        trip_link: tripLink.value,
        trip_description: tripDescription.value,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/company-dashboard");
    } else {
      alert(response.statusText);
    }
  }
});
