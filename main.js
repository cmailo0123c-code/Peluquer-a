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
  var barberModalImg = document.getElementById("barberModalImg");
  var barberModalName = document.getElementById("bookingTitle") ? null : null;
  var barberNameEl = document.getElementById("barberModalName");
  var barberModalBook = document.getElementById("barberModalBook");
  var currentBarber = null;

  document.querySelectorAll(".barber").forEach(function(card){
    card.addEventListener("click", function(){
      var name = card.getAttribute("data-barber");
      var imgSrc = card.querySelector("img").getAttribute("src");
      currentBarber = name;
      barberNameEl.textContent = name;
      barberModalImg.setAttribute("src", imgSrc);
      barberModalImg.setAttribute("alt", name + ", barbero en Barbudos Barbería");
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
  barberModalBook.addEventListener("click", function(){
    closeBarberModal();
    openBooking({ barber: currentBarber });
  });

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

  /* ===========================================================
     BOOKING MODAL
  =========================================================== */
  var booking = document.getElementById("booking");
  var bookingBody = document.getElementById("bookingBody");
  var bookingNext = document.getElementById("bookingNext");
  var bookingBack = document.getElementById("bookingBack");
  var bookingSteps = document.getElementById("bookingSteps");
  var stepDots = document.querySelectorAll("[data-step-dot]");

  var state = {
    step: 1,
    service: null,
    barber: null,
    date: null,
    dateLabel: null,
    time: null,
    name: "",
    phone: "",
    email: "",
    notes: ""
  };

  function resetState(){
    state = { step: 1, service: null, barber: null, date: null, dateLabel: null, time: null, name:"", phone:"", email:"", notes:"" };
    document.querySelectorAll(".booking__option.is-selected").forEach(function(el){ el.classList.remove("is-selected"); });
    document.getElementById("bookingForm").reset();
  }

  function openBooking(prefill){
    resetState();
    if(prefill && prefill.barber){
      state.barber = prefill.barber;
    }
    if(prefill && prefill.service){
      var map = {
        experiencia: "Experiencia Barbudos — $45.000"
      };
      state.service = map[prefill.service] || null;
    }
    booking.classList.add("is-open");
    booking.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    goToStep(1);
  }
  function closeBooking(){
    booking.classList.remove("is-open");
    booking.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open-booking]").forEach(function(btn){
    btn.addEventListener("click", function(e){
      e.preventDefault();
      openBooking({ service: btn.getAttribute("data-service") });
    });
  });
  document.querySelectorAll("[data-close-booking]").forEach(function(btn){
    btn.addEventListener("click", closeBooking);
  });

  var stepEls = document.querySelectorAll(".booking__step[data-step]");
  var successEl = document.querySelector('.booking__step[data-step="success"]');

  function goToStep(n){
    state.step = n;
    stepEls.forEach(function(el){
      var match = el.getAttribute("data-step") === String(n);
      el.hidden = !match;
    });
    successEl.hidden = true;
    bookingSteps.hidden = false;
    stepDots.forEach(function(dot, idx){
      var dn = idx + 1;
      dot.classList.toggle("is-active", dn === n);
      dot.classList.toggle("is-done", dn < n);
    });
    bookingBack.hidden = n === 1;
    bookingNext.textContent = n === 5 ? "Confirmar reserva" : "Continuar";
    bookingBody.scrollTop = 0;

    if(n === 3){ renderCalendar(); }
    if(n === 5){ renderSummary(); }
  }

  bookingBack.addEventListener("click", function(){
    if(state.step > 1){ goToStep(state.step - 1); }
  });

  bookingNext.addEventListener("click", function(){
    if(state.step === 1){
      if(!state.service){ shake(document.getElementById("serviceOptions")); return; }
      goToStep(2);
    } else if(state.step === 2){
      if(!state.barber){ shake(document.getElementById("barberOptions")); return; }
      goToStep(3);
    } else if(state.step === 3){
      if(!state.date || !state.time){ shake(document.getElementById("calendar")); return; }
      goToStep(4);
    } else if(state.step === 4){
      var form = document.getElementById("bookingForm");
      if(!form.reportValidity()) return;
      var fd = new FormData(form);
      state.name = fd.get("name") || "";
      state.phone = fd.get("phone") || "";
      state.email = fd.get("email") || "";
      state.notes = fd.get("notes") || "";
      goToStep(5);
    } else if(state.step === 5){
      submitBooking();
    }
  });

  function shake(el){
    if(reduceMotion) return;
    el.animate([
      { transform: "translateX(0)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(0)" }
    ], { duration: 260, easing: "ease-out" });
  }

  /* -- step 1: service options -- */
  document.getElementById("serviceOptions").addEventListener("click", function(e){
    var btn = e.target.closest(".booking__option");
    if(!btn) return;
    document.querySelectorAll("#serviceOptions .booking__option").forEach(function(b){ b.classList.remove("is-selected"); });
    btn.classList.add("is-selected");
    state.service = btn.getAttribute("data-value");
  });

  /* -- step 2: barber options -- */
  var barberOptionsEl = document.getElementById("barberOptions");
  barberOptionsEl.addEventListener("click", function(e){
    var btn = e.target.closest(".booking__option");
    if(!btn) return;
    document.querySelectorAll("#barberOptions .booking__option").forEach(function(b){ b.classList.remove("is-selected"); });
    btn.classList.add("is-selected");
    state.barber = btn.getAttribute("data-value");
  });

  /* -- step 3: calendar + time -- */
  var calendarEl = document.getElementById("calendar");
  var timeOptionsEl = document.getElementById("timeOptions");
  var WEEKDAY_LABELS = ["D","L","M","M","J","V","S"];

  function renderCalendar(){
    calendarEl.innerHTML = "";
    WEEKDAY_LABELS.forEach(function(l){
      var lab = document.createElement("span");
      lab.className = "calendar__label";
      lab.textContent = l;
      calendarEl.appendChild(lab);
    });
    var today = new Date();
    var firstDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var startOffset = firstDay.getDay();
    for(var i = 0; i < startOffset; i++){
      calendarEl.appendChild(document.createElement("span"));
    }
    for(var d = 0; d < 21; d++){
      var day = new Date(firstDay);
      day.setDate(firstDay.getDate() + d);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "calendar__day";
      btn.textContent = day.getDate();
      var isSunday = day.getDay() === 0;
      if(isSunday){
        btn.classList.add("is-disabled");
        btn.disabled = true;
      } else {
        var iso = day.toISOString().slice(0,10);
        btn.setAttribute("data-date", iso);
        if(state.date === iso){ btn.classList.add("is-selected"); }
        btn.addEventListener("click", function(){
          document.querySelectorAll(".calendar__day").forEach(function(b){ b.classList.remove("is-selected"); });
          this.classList.add("is-selected");
          state.date = this.getAttribute("data-date");
          state.dateLabel = new Date(state.date + "T00:00:00").toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
          state.time = null;
          renderTimes();
        });
      }
      calendarEl.appendChild(btn);
    }
    if(state.date){ renderTimes(); } else { timeOptionsEl.innerHTML = ""; }
  }

  function renderTimes(){
    timeOptionsEl.innerHTML = "";
    var date = new Date(state.date + "T00:00:00");
    var isSaturday = date.getDay() === 6;
    var openHour = 11, closeHour = isSaturday ? 15 : 20;
    var slots = [];
    for(var h = openHour; h < closeHour; h++){
      slots.push(h + ":00"); slots.push(h + ":30");
    }
    if(!slots.length){
      var empty = document.createElement("p");
      empty.className = "booking__empty";
      empty.textContent = "No encontramos horarios disponibles para este día. Elige otro día.";
      timeOptionsEl.appendChild(empty);
      return;
    }
    slots.forEach(function(t){
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "time-slot";
      btn.textContent = t;
      if(state.time === t) btn.classList.add("is-selected");
      btn.addEventListener("click", function(){
        document.querySelectorAll(".time-slot").forEach(function(b){ b.classList.remove("is-selected"); });
        this.classList.add("is-selected");
        state.time = t;
      });
      timeOptionsEl.appendChild(btn);
    });
  }

  /* -- step 5: summary -- */
  function summaryRows(){
    return [
      ["Servicio", state.service || "—"],
      ["Barbero", state.barber || "—"],
      ["Fecha", state.dateLabel || "—"],
      ["Hora", state.time || "—"],
      ["Nombre", state.name || "—"],
      ["Teléfono", state.phone || "—"]
    ];
  }
  function renderSummary(){
    var dl = document.getElementById("bookingSummary");
    dl.innerHTML = "";
    summaryRows().forEach(function(row){
      var div = document.createElement("div");
      div.innerHTML = "<dt>" + row[0] + "</dt><dd>" + escapeHtml(row[1]) + "</dd>";
      dl.appendChild(div);
    });
  }
  function escapeHtml(str){
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function buildWhatsAppMessage(){
    var lines = [
      "Hola Barbudos, quiero agendar hora:",
      "Servicio: " + (state.service || "-"),
      "Barbero: " + (state.barber || "-"),
      "Fecha preferida: " + (state.dateLabel || "-"),
      "Hora preferida: " + (state.time || "-"),
      "Nombre: " + (state.name || "-"),
      "Teléfono: " + (state.phone || "-")
    ];
    if(state.notes){ lines.push("Notas: " + state.notes); }
    return encodeURIComponent(lines.join("\n"));
  }

  function submitBooking(){
    // No live booking API is connected. We hand off to WhatsApp with a
    // pre-filled summary, and link to the official agenda as an alternative.
    stepEls.forEach(function(el){ el.hidden = true; });
    bookingSteps.hidden = true;
    successEl.hidden = false;
    bookingBack.hidden = true;
    bookingNext.hidden = true;

    var dl = document.getElementById("bookingSuccessSummary");
    dl.innerHTML = "";
    summaryRows().slice(0,4).forEach(function(row){
      var div = document.createElement("div");
      div.innerHTML = "<dt>" + row[0] + "</dt><dd>" + escapeHtml(row[1]) + "</dd>";
      dl.appendChild(div);
    });

    document.getElementById("successMapsBtn").href = "https://www.google.com/maps/place/Barbudos+Barberia/";

    var waLink = "https://api.whatsapp.com/send?phone=56930624045&text=" + buildWhatsAppMessage();
    window.open(waLink, "_blank");
  }

  // reset "next" button visibility when reopening
  var origOpenBooking = openBooking;
  openBooking = function(prefill){
    bookingNext.hidden = false;
    origOpenBooking(prefill);
  };

  /* ---------------- ESC to close overlays ---------------- */
  document.addEventListener("keydown", function(e){
    if(e.key !== "Escape") return;
    if(booking.classList.contains("is-open")) closeBooking();
    if(barberModal.classList.contains("is-open")) closeBarberModal();
    if(lightbox.classList.contains("is-open")) closeLightbox();
    if(mobileMenu.classList.contains("is-open")) closeMenu();
  });

})();
