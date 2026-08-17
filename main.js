(function(){
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- LOADER ---------------- */
  var loader = document.getElementById("loader");
  var hero = document.querySelector(".hero");
  function finishLoad(){
    loader.classList.add("is-hidden");
    requestAnimationFrame(function(){ hero.classList.add("is-loaded"); });
  }
  window.addEventListener("load", function(){ setTimeout(finishLoad, reduceMotion ? 0 : 380); });
  // safety net in case load event is delayed
  setTimeout(finishLoad, 1800);

  /* ---------------- NAVBAR SCROLL ---------------- */
  var nav = document.getElementById("nav");
  function onScroll(){
    if(window.scrollY > 40){ nav.classList.add("is-scrolled"); } else { nav.classList.remove("is-scrolled"); }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- HERO PARALLAX (subtle) ---------------- */
  var heroImg = document.querySelector(".hero__img");
  if(heroImg && !reduceMotion){
    document.addEventListener("scroll", function(){
      var y = window.scrollY;
      if(y < window.innerHeight){
        heroImg.style.transform = "translateY(" + (y * 0.18) + "px) scale(" + (1 + y * 0.00025) + ")";
      }
    }, { passive: true });
  }

  /* ---------------- SCROLL REVEALS ---------------- */
  var revealEls = document.querySelectorAll("[data-reveal], .reveal-up");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("is-visible"); });
  }

  /* ---------------- MOBILE MENU ---------------- */
  var burgerBtn = document.getElementById("burgerBtn");
  var closeMenuBtn = document.getElementById("closeMenuBtn");
  var mobileMenu = document.getElementById("mobileMenu");
  function openMenu(){
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    burgerBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu(){
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    burgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  burgerBtn.addEventListener("click", openMenu);
  closeMenuBtn.addEventListener("click", closeMenu);
  document.querySelectorAll("[data-menu-link]").forEach(function(link){
    link.addEventListener("click", function(){ closeMenu(); });
  });

  /* ---------------- SERVICE HOVER IMAGE ---------------- */
  var hoverImgWrap = document.getElementById("serviceHoverImage");
  var hoverImg = document.getElementById("serviceHoverImg");
  var serviceItems = document.querySelectorAll(".service-item");
  if(window.matchMedia("(hover: hover) and (pointer: fine)").matches){
    serviceItems.forEach(function(item){
      item.addEventListener("mouseenter", function(){
        hoverImg.src = item.getAttribute("data-img");
        hoverImgWrap.classList.add("is-visible");
      });
      item.addEventListener("mouseleave", function(){
        hoverImgWrap.classList.remove("is-visible");
      });
      item.addEventListener("mousemove", function(e){
        hoverImgWrap.style.left = (e.clientX + 26) + "px";
        hoverImgWrap.style.top = (e.clientY - 140) + "px";
      });
    });
  }

  /* ---------------- BARBER MODAL ---------------- */
  var barberModal = document.getElementById("barberModal");
  var barberModalMonogram = document.getElementById("barberModalMonogram");
  var barberNameEl = document.getElementById("barberModalName");
  var currentBarber = null;

  document.querySelectorAll(".barber").forEach(function(card){
    card.addEventListener("click", function(){
      var name = card.getAttribute("data-barber");
      var initial = card.getAttribute("data-init") || name.charAt(0);
      currentBarber = name;
      barberNameEl.textContent = name;
      barberModalMonogram.textContent = initial;
      barberModal.classList.add("is-open");
      barberModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });
  document.querySelectorAll("[data-close-barber]").forEach(function(btn){
    btn.addEventListener("click", closeBarberModal);
  });
  function closeBarberModal(){
    barberModal.classList.remove("is-open");
    barberModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ---------------- GALLERY LIGHTBOX ---------------- */
  var galleryItems = document.querySelectorAll(".gallery__item");
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCount = document.getElementById("lightboxCount");
  var galleryList = Array.prototype.slice.call(galleryItems);
  var currentGalleryIdx = 0;

  function openLightbox(idx){
    currentGalleryIdx = idx;
    updateLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function updateLightbox(){
    var item = galleryList[currentGalleryIdx];
    var img = item.querySelector("img");
    lightboxImg.setAttribute("src", img.getAttribute("src"));
    lightboxImg.setAttribute("alt", img.getAttribute("alt"));
    lightboxCount.textContent = (currentGalleryIdx + 1) + " / " + galleryList.length;
  }
  function closeLightbox(){
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  galleryList.forEach(function(item, idx){
    item.addEventListener("click", function(){ openLightbox(idx); });
  });
  document.querySelectorAll("[data-close-lightbox]").forEach(function(btn){ btn.addEventListener("click", closeLightbox); });
  document.querySelector("[data-lightbox-prev]").addEventListener("click", function(){
    currentGalleryIdx = (currentGalleryIdx - 1 + galleryList.length) % galleryList.length;
    updateLightbox();
  });
  document.querySelector("[data-lightbox-next]").addEventListener("click", function(){
    currentGalleryIdx = (currentGalleryIdx + 1) % galleryList.length;
    updateLightbox();
  });

  /* ---------------- REVIEWS UPDATED LABEL ---------------- */
  var reviewsUpdated = document.getElementById("reviewsUpdated");
  if(reviewsUpdated){
    reviewsUpdated.textContent = "actualizado agosto 2026";
  }

  /* ---------------- MAP LAZY LOAD ---------------- */
  var mapPlaceholder = document.getElementById("mapPlaceholder");
  var mapLoaded = false;
  function loadMap(){
    if(mapLoaded) return;
    mapLoaded = true;
    var wrap = mapPlaceholder.parentElement;
    var iframe = document.createElement("iframe");
    iframe.src = "https://maps.google.com/maps?q=Barbudos%20Barberia%20Providencia&t=m&z=16&output=embed";
    iframe.loading = "lazy";
    iframe.title = "Mapa de ubicación de Barbudos Barbería";
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    wrap.innerHTML = "";
    wrap.appendChild(iframe);
  }
  mapPlaceholder.addEventListener("click", loadMap);
  if("IntersectionObserver" in window){
    var mapIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ loadMap(); mapIO.disconnect(); }
      });
    }, { rootMargin: "200px" });
    mapIO.observe(mapPlaceholder);
  }

  /* ---------------- ESC to close overlays ---------------- */
  document.addEventListener("keydown", function(e){
    if(e.key !== "Escape") return;
    if(barberModal.classList.contains("is-open")) closeBarberModal();
    if(lightbox.classList.contains("is-open")) closeLightbox();
    if(mobileMenu.classList.contains("is-open")) closeMenu();
  });

})();
