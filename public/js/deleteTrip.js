const deleteBtn = document.querySelectorAll(".delete");

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    console.log(event.target.getAttribute("data-id"));
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
      await fetch(`/api/trip/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // document.location.replace("/company-dashboard");
      } else {
        alert("OMG");
      }
    }
  });
});
