const updateTripFormHandler = async (event) => {
  event.preventDefault();
  console.log("update trip");
  const id = event.target.getAttribute("data-id");
  const tripName = document.querySelector("#trip-name").value.trim();
  const tripLink = document.querySelector("#trip-link").value.trim();
  const imgSrc = document.querySelector("#img-src").value.trim();

  if (tripName && tripLink && imgSrc) {
    const response = await fetch(`/api/trip/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        trip_name: tripName,
        trip_link: tripLink,
        img_src: imgSrc,
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
