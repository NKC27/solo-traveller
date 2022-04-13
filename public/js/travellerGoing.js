console.log("hello");

const goingBtns = document.querySelectorAll(".going");

goingBtns.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    console.log("click");
    const trip_id = event.target.getAttribute("data-id");

    if (trip_id) {
      await fetch("/api/trip/going", {
        method: "POST",
        body: JSON.stringify({ trip_id }),
        headers: { "Content-Type": "application/json" },
      });

      // if (response.ok) {
      await fetch("/api/trip/going", {
        method: "PUT",
        body: JSON.stringify({ trip_id }),
        headers: { "Content-Type": "application/json" },
      });
      // if (nextResponse.ok) {
      document.location.replace("/");
      // }
      //   } else {

      //   }
      // }
    }
  });
});
