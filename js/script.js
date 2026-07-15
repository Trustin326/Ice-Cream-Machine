const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

const navLinks = document.querySelectorAll(".main-nav a");

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

const galleryImages = document.querySelectorAll(".gallery-image");
const viewGalleryButton = document.getElementById("viewGallery");

const year = document.getElementById("year");


/* CURRENT YEAR */

year.textContent = new Date().getFullYear();


/* MOBILE MENU */

menuToggle.addEventListener("click", () => {

  const isOpen =
    mainNav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    isOpen
  );

  menuToggle.textContent =
    isOpen ? "×" : "☰";

});


navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    mainNav.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.textContent = "☰";

  });

});


/* ACTIVE NAVIGATION */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );


const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {

          link.classList.remove("active");

          const href =
            link.getAttribute("href");

          if (
            href ===
            `#${entry.target.id}`
          ) {

            link.classList.add("active");

          }

        });

      });

    },

    {
      rootMargin:
        "-35% 0px -55% 0px"
    }

  );


sections.forEach((section) => {

  observer.observe(section);

});


/* IMAGE MODAL */

function openModal(imageSource) {

  modalImage.src = imageSource;

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


function closeModal() {

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  modalImage.src = "";

  document.body.style.overflow = "";

}


galleryImages.forEach((imageButton) => {

  imageButton.addEventListener(
    "click",
    () => {

      openModal(
        imageButton.dataset.image
      );

    }
  );

});


viewGalleryButton.addEventListener(
  "click",
  () => {

    openModal(
      "images/truck-character.jpg"
    );

  }
);


modalClose.addEventListener(
  "click",
  closeModal
);


modal.addEventListener(
  "click",
  (event) => {

    if (event.target === modal) {

      closeModal();

    }

  }
);


document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      modal.classList.contains("open")
    ) {

      closeModal();

    }

  }
);
