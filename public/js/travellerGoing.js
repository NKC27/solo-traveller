console.log("hello");

const goingBtn = document.getElementById("going");

goingBtn.addEventListener("click", async (event) => {
  const trip_id = event.target.getAttribute("data-id");

  if (trip_id) {
    const response = await fetch("/api/trip/going", {
      method: "POST",
      body: JSON.stringify({ trip_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const nextResponse = await fetch("/api/trip/going", {
        method: "PUT",
        body: JSON.stringify({ trip_id }),
        headers: { "Content-Type": "application/json" },
      });
      if (nextResponse.ok) {
        document.location.replace("/dashboard");
      }
    } else {
      alert(response.statusText);
    }
  }
});
