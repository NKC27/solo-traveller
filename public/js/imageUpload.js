// const uploadForms = document.querySelectorAll(".upload-form");

// uploadForms.forEach((uploadForm) => {
//   uploadForm.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const id = event.target.getAttribute("data-id");
//     const image = document.getElementById(`image${id}`).value;
//     console.log(id);
//     console.log(image);
//     if (id && image) {
//       // Send a POST request to the API endpoint
//       const response = await fetch("api/trip/image", {
//         method: "POST",

//         body: JSON.stringify({ image }),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.ok) {
//         // If successful, redirect the browser to the profile page
//         document.location.replace("/dashboard");
//       } else {
//         alert(response.statusText);
//       }
//     }
//   });
// });
