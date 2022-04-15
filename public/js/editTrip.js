const updateTripFormHandler = async (event) => {
  event.preventDefault();
  console.log("update trip");
  const id = event.target.getAttribute("data-id");
  const tripName = document.querySelector("#trip-name").value.trim();
  const tripLink = document.querySelector("#trip-link").value.trim();
  const tripDescription = document.querySelector("#description").value.trim();

  if (tripName && tripLink && tripDescription) {
    await fetch(`/api/trip/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        trip_name: tripName,
        trip_link: tripLink,
        trip_description: tripDescription,
      }),
      headers: { "Content-Type": "application/json" },
    });

    console.log("trip update");
    document.location.replace("/company-dashboard");
  }
};

document
  .querySelector("#update-trip-form")
  .addEventListener("submit", updateTripFormHandler);
