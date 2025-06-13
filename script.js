document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")
          mobileMenuBtn.classList.remove("active")
        }

        // Scroll to target
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Color Category Filter
  const colorCategories = document.querySelectorAll(".color-category")

  if (colorCategories.length > 0) {
    colorCategories.forEach((category) => {
      category.addEventListener("click", function () {
        // Remove active class from all categories
        colorCategories.forEach((cat) => cat.classList.remove("active"))

        // Add active class to clicked category
        this.classList.add("active")

        // Filter logic would go here
        const selectedCategory = this.dataset.category
        console.log("Selected category:", selectedCategory)

        // For a real implementation, you would filter the color swatches here
      })
    })
  }

  // Testimonial Slider
  const testimonialDots = document.querySelectorAll(".testimonial-dots .dot")
  const testimonials = document.querySelectorAll(".testimonial")

  if (testimonialDots.length > 0 && testimonials.length > 0) {
    // Initially hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
      if (index !== 0) {
        testimonial.style.display = "none"
      }
    })

    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        // Remove active class from all dots
        testimonialDots.forEach((d) => d.classList.remove("active"))

        // Add active class to clicked dot
        this.classList.add("active")

        // Hide all testimonials
        testimonials.forEach((testimonial) => {
          testimonial.style.display = "none"
        })

        // Show the selected testimonial
        testimonials[index].style.display = "block"
      })
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const formDataObj = {}

      formData.forEach((value, key) => {
        formDataObj[key] = value
      })

      console.log("Form submitted:", formDataObj)

      // For a real implementation, you would send this data to a server
      // For now, just show a success message
      alert("Thank you for your message! We will get back to you soon.")
      this.reset()
    })
  }

  // Reservation Form Validation
  const reservationForm = document.getElementById("reservationForm")

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

  // Add active class to nav links based on scroll position
  function setActiveNavLink() {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-links a")

    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      const headerHeight = document.querySelector("header").offsetHeight

      if (window.pageYOffset >= sectionTop - headerHeight - 200) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", setActiveNavLink)

  // Initialize active nav link on page load
  setActiveNavLink()
})
