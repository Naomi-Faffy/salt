document.addEventListener("DOMContentLoaded", () => {
  // Page loader
  const loader = document.querySelector(".loader")
  const loaderProgress = document.querySelector(".loader-progress span")
  let progress = 0

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 5
    if (progress > 100) progress = 100
    loaderProgress.style.width = `${progress}%`

    if (progress === 100) {
      clearInterval(interval)
      setTimeout(() => {
        loader.classList.add("hidden")
        document.body.classList.add("loaded")
        initAnimations()
      }, 500)
    }
  }, 200)

  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(0.8)"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
  })

  // Add hover effect for links and buttons
  const hoverElements = document.querySelectorAll("a, button, .menu-toggle, .gallery-item")

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.backgroundColor = "rgba(201, 168, 122, 0.2)"
      cursor.style.opacity = "0"
    })

    element.addEventListener("mouseleave", () => {
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.backgroundColor = "transparent"
      cursor.style.opacity = "1"
    })
  })

  // Header scroll effect
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    mobileMenu.classList.toggle("active")
    document.body.classList.toggle("no-scroll")
  })

  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll(".mobile-nav-link")

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.classList.remove("no-scroll")
    })
  })

  // Hero slider
  const Swiper = window.Swiper // Assuming Swiper is available globally
  const heroSwiper = new Swiper(".hero-slider", {
    speed: 1000,
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".hero-pagination",
      clickable: true,
    },
  })

  // Testimonials slider
  const testimonialSwiper = new Swiper(".testimonials-slider", {
    speed: 800,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".testimonials-pagination",
      clickable: true,
    },
  })

  // Menu tabs
  const menuTabs = document.querySelectorAll(".menu-tab")
  const menuPanels = document.querySelectorAll(".menu-panel")

  menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      menuTabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      tab.classList.add("active")

      // Hide all panels
      menuPanels.forEach((panel) => panel.classList.remove("active"))

      // Show the corresponding panel
      const panelId = tab.getAttribute("data-menu")
      document.getElementById(panelId).classList.add("active")
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Reservation form validation
  const reservationForm = document.querySelector(".reservation-form")

  if (reservationForm) {
    reservationForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Basic form validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value
      const date = document.getElementById("date").value
      const time = document.getElementById("time").value
      const guests = document.getElementById("guests").value

      if (!name || !email || !phone || !date || !time || !guests) {
        alert("Please fill in all required fields")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address")
        return
      }

      // Date validation - ensure date is not in the past
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        alert("Please select a future date")
        return
      }

      // If all validations pass, show success message
      alert("Thank you for your reservation request! We will confirm your booking shortly.")
      this.reset()
    })
  }

  // Initialize animations
  function initAnimations() {
    // GSAP ScrollTrigger setup
    const gsap = window.gsap // Assuming gsap is available globally
    const ScrollTrigger = window.ScrollTrigger // Assuming ScrollTrigger is available globally
    gsap.registerPlugin(ScrollTrigger)

    // Reveal animations for elements
    const revealElements = document.querySelectorAll(".reveal-element")

    revealElements.forEach((element, index) => {
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        onEnter: () => {
          element.classList.add("revealed")
        },
      })
    })

    // Parallax effect for background
    gsap.to(".parallax-bg", {
      scrollTrigger: {
        trigger: ".experience",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      y: -100,
    })
  }
})
