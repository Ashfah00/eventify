// Eventify JS – Main Application Script
document.addEventListener("DOMContentLoaded", function() {
  // Initialize mobile menu toggle
  initMobileMenu();
  
  // Initialize pages based on their specific elements
  if (document.getElementById("loginForm")) initLoginPage();
  if (document.getElementById("signupForm")) initSignupPage();
  if (document.querySelector(".service-tabs")) initServicesPage();
  if (document.querySelector(".event-filters")) initEventsPage();
  if (document.getElementById("contactForm")) initContactPage();
  
  // Customer pages initialization
  if (document.querySelector(".booking-page")) initBookingPage();
  if (document.querySelector(".chat-container")) initChatPage();
  if (document.querySelector(".create-event")) initCreateEventPage();
  if (document.querySelector(".dashboard")) initCustomerDashboard();
  if (document.querySelector(".events-page")) initMyEventsPage();
  if (document.querySelector(".notifications-page")) initNotificationsPage();
  if (document.querySelector(".profile-page")) initProfilePage();
  if (document.querySelector(".marketplace-page")) initMarketplacePage();
  if (document.querySelector(".vendor-profile")) initVendorProfilePage();
  
  // Vendor pages initialization
  if (document.querySelector(".vendor-dashboard")) initVendorDashboard();
  if (document.querySelector(".booking-requests-container")) initBookingRequests();
  if (document.querySelector(".calendar-section")) initVendorCalendar();
  if (document.querySelector(".reviews-section")) initReviewsPage();
  if (document.querySelector(".vendor-profile")) initVendorProfile();
  if (document.querySelector(".settings-container")) initVendorSettings();
  if (document.querySelector(".vendor-chat-container")) initVendorChat();
  
  // Admin pages initialization
  if (document.querySelector(".admin-dashboard")) initAdminDashboard();
  if (document.getElementById("contentForm")) initContentManagement();
  if (document.querySelector(".user-list")) initManageUsers();
  if (document.querySelector(".vendor-list")) initManageVendors();
  if (document.querySelector(".report-overview")) initReports();
  if (document.querySelector(".ticket-list")) initSupport();
  if (document.querySelector(".notification-list")) initSystemNotifications();
  if (document.querySelector(".event-list")) initViewEvents();
});

// ==================== GENERAL FUNCTIONALITY ====================

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function() {
      navMenu.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
    });
  }
}

// ==================== CUSTOMER PAGES FUNCTIONALITY ====================

function initBookingPage() {
  const packageOptions = document.querySelectorAll(".package-options input[type='radio']");
  packageOptions.forEach(option => {
    option.addEventListener("change", function() {
      if (this.checked) {
        const packageName = this.id.replace("Package", "");
        const packagePrice = this.nextElementSibling.querySelector(".price").textContent;
        
        document.querySelector(".price-summary .price-item:first-child span:last-child").textContent = packagePrice;
        
        const serviceFee = document.querySelector(".price-summary .price-item:nth-child(2) span:last-child").textContent;
        const total = calculateTotal(packagePrice, serviceFee);
        document.querySelector(".price-summary .total span:last-child").textContent = total;
      }
    });
  });

  const bookingForm = document.querySelector(".booking-form form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const eventName = document.getElementById("bookingEventName").value.trim();
      const eventDate = document.getElementById("bookingDate").value;
      const eventTime = document.getElementById("bookingTime").value;
      const eventLocation = document.getElementById("bookingLocation").value.trim();
      
      if (!eventName || !eventDate || !eventTime || !eventLocation) {
        alert("Please fill in all required fields.");
        return;
      }
      
      alert("Booking information saved! Redirecting to payment...");
    });
  }
  
  function calculateTotal(packagePrice, serviceFee) {
    const packageNum = parseInt(packagePrice.replace(/\D/g, ''));
    const feeNum = parseInt(serviceFee.replace(/\D/g, ''));
    return (packageNum + feeNum).toLocaleString() + "/=";
  }
}

function initChatPage() {
  const chatInput = document.querySelector(".chat-input input");
  const sendButton = document.querySelector(".chat-input .btn-primary");
  
  if (sendButton && chatInput) {
    sendButton.addEventListener("click", function() {
      const message = chatInput.value.trim();
      if (message) {
        addMessageToChat(message, "user");
        chatInput.value = "";
        
        setTimeout(() => {
          const replies = [
            "Sounds great! When is your event?",
            "I can definitely accommodate that request.",
            "Let me check my availability and get back to you.",
            "Would you like to discuss package options?"
          ];
          const randomReply = replies[Math.floor(Math.random() * replies.length)];
          addMessageToChat(randomReply, "vendor");
        }, 1000);
      }
    });
    
    chatInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        sendButton.click();
      }
    });
  }
  
  const activeChatItem = document.querySelector(".chat-item.active");
  if (activeChatItem) {
    const unreadCount = activeChatItem.querySelector(".unread-count");
    if (unreadCount) {
      unreadCount.remove();
    }
  }
  
  function addMessageToChat(message, sender) {
    const messagesContainer = document.querySelector(".chat-messages");
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    
    if (sender === "vendor") {
      messageDiv.innerHTML = `
        <div class="message-avatar">
          <img src="../images/dj ash.jpg" alt="DJ Max">
        </div>
        <div class="message-content">
          <p>${message}</p>
          <span class="message-time">${timeString}</span>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="message-content">
          <p>${message}</p>
          <span class="message-time">${timeString}</span>
        </div>
      `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

function initCreateEventPage() {
  const imageUpload = document.querySelector(".image-upload input[type='file']");
  const uploadPreview = document.querySelector(".upload-preview");
  
  if (imageUpload && uploadPreview) {
    imageUpload.addEventListener("change", function() {
      uploadPreview.innerHTML = "";
      
      if (this.files) {
        Array.from(this.files).forEach(file => {
          if (file.type.match("image.*")) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
              const img = document.createElement("img");
              img.src = e.target.result;
              uploadPreview.appendChild(img);
            }
            
            reader.readAsDataURL(file);
          }
        });
      }
    });
  }
  
  const eventForm = document.querySelector(".event-form");
  if (eventForm) {
    eventForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const eventName = document.getElementById("eventName").value.trim();
      const eventType = document.getElementById("eventType").value;
      const eventDate = document.getElementById("eventDate").value;
      const startTime = document.getElementById("startTime").value;
      const endTime = document.getElementById("endTime").value;
      const eventLocation = document.getElementById("eventLocation").value.trim();
      const city = document.getElementById("city").value;
      const description = document.getElementById("eventDescription").value.trim();
      
      if (!eventName || !eventType || !eventDate || !startTime || !endTime || !eventLocation || !city || !description) {
        alert("Please fill in all required fields.");
        return;
      }
      
      alert("Event created successfully! Redirecting to vendor selection...");
    });
  }
}

function initCustomerDashboard() {
  const actionCards = document.querySelectorAll(".action-card");
  actionCards.forEach(card => {
    card.addEventListener("click", function() {
      const link = this.getAttribute("onclick").match(/location\.href='([^']+)'/)[1];
      if (link) {
        window.location.href = link;
      }
    });
  });
  
  const notificationBell = document.querySelector(".notification-bell");
  if (notificationBell) {
    notificationBell.addEventListener("click", function() {
      window.location.href = "notifications.html";
    });
  }
}

function initMyEventsPage() {
  const eventTabs = document.querySelectorAll(".event-tabs .tab");
  eventTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      eventTabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      
      const tabText = this.textContent.toLowerCase();
      filterEvents(tabText);
    });
  });
  
  const applyFiltersBtn = document.querySelector(".event-filters .btn-small");
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", function() {
      const eventType = document.querySelector(".event-filters select:first-child").value;
      const sortBy = document.querySelector(".event-filters select:nth-child(2)").value;
      alert(`Filters applied: Event Type - ${eventType}, Sort By - ${sortBy}`);
    });
  }
  
  function filterEvents(filter) {
    const eventCards = document.querySelectorAll(".event-card");
    const emptyState = document.querySelector(".empty-state");
    let visibleCount = 0;
    
    eventCards.forEach(card => {
      if (filter.includes("all")) {
        card.style.display = "flex";
        visibleCount++;
      } else if (filter.includes("upcoming")) {
        const isUpcoming = card.classList.contains("upcoming");
        card.style.display = isUpcoming ? "flex" : "none";
        if (isUpcoming) visibleCount++;
      } else if (filter.includes("past")) {
        const isPast = card.classList.contains("past");
        card.style.display = isPast ? "flex" : "none";
        if (isPast) visibleCount++;
      } else if (filter.includes("drafts")) {
        const isDraft = card.classList.contains("draft");
        card.style.display = isDraft ? "flex" : "none";
        if (isDraft) visibleCount++;
      }
    });
    
    if (emptyState) {
      emptyState.style.display = visibleCount > 0 ? "none" : "flex";
    }
  }
}

function initNotificationsPage() {
  const markAllReadBtn = document.getElementById("markAllRead");
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", function() {
      const unreadNotifications = document.querySelectorAll(".notification-item.unread");
      unreadNotifications.forEach(notification => {
        notification.classList.remove("unread");
      });
      document.querySelector(".notification-count").textContent = "0";
      alert("All notifications marked as read.");
    });
  }
  
  const clearAllBtn = document.getElementById("clearAll");
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", function() {
      if (confirm("Are you sure you want to clear all notifications?")) {
        document.querySelector(".notification-list").innerHTML = `
          <div class="empty-state">
            <img src="../images/notifications-off.png" alt="No notifications">
            <h3>No Notifications</h3>
            <p>You don't have any notifications yet. Your activity and updates will appear here.</p>
          </div>
        `;
        document.querySelector(".notification-count").textContent = "0";
        alert("All notifications cleared.");
      }
    });
  }
  
  const notificationTabs = document.querySelectorAll(".notification-tabs .tab");
  notificationTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      notificationTabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      filterNotifications(this.textContent.toLowerCase());
    });
  });
  
  function filterNotifications(filter) {
    const notifications = document.querySelectorAll(".notification-item");
    notifications.forEach(notification => {
      if (filter.includes("all")) {
        notification.style.display = "flex";
      } else if (filter.includes("unread")) {
        notification.style.display = notification.classList.contains("unread") ? "flex" : "none";
      } else if (filter.includes("bookings")) {
        const icon = notification.querySelector(".notification-icon i");
        notification.style.display = icon && icon.classList.contains("fa-calendar-check") ? "flex" : "none";
      } else if (filter.includes("messages")) {
        const icon = notification.querySelector(".notification-icon i");
        notification.style.display = icon && icon.classList.contains("fa-comment-dots") ? "flex" : "none";
      }
    });
  }
}

function initProfilePage() {
  const profileTabs = document.querySelectorAll(".profile-tabs .tab");
  profileTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      profileTabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      alert(`Switched to ${this.textContent} tab`);
    });
  });
  
  const menuItems = document.querySelectorAll(".profile-menu .menu-item");
  menuItems.forEach(item => {
    item.addEventListener("click", function() {
      menuItems.forEach(i => i.classList.remove("active"));
      this.classList.add("active");
      alert(`Loading ${this.textContent.trim()} section`);
    });
  });
  
  const changeAvatarBtn = document.querySelector(".upload-controls button:first-child");
  if (changeAvatarBtn) {
    changeAvatarBtn.addEventListener("click", function() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      
      input.onchange = function(e) {
        const file = e.target.files[0];
        if (file && file.type.match("image.*")) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
            document.getElementById("avatarPreview").src = e.target.result;
          }
          
          reader.readAsDataURL(file);
        }
      };
      
      input.click();
    });
  }
  
  const removeAvatarBtn = document.querySelector(".upload-controls button:last-child");
  if (removeAvatarBtn) {
    removeAvatarBtn.addEventListener("click", function() {
      if (confirm("Are you sure you want to remove your profile picture?")) {
        document.getElementById("avatarPreview").src = "../images/default-avatar.jpg";
      }
    });
  }
  
  const profileForm = document.querySelector(".profile-form form");
  if (profileForm) {
    profileForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const currentPassword = document.getElementById("currentPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      
      if (currentPassword && newPassword && confirmPassword) {
        if (newPassword !== confirmPassword) {
          alert("New passwords don't match!");
          return;
        }
        
        if (newPassword.length < 8) {
          alert("Password must be at least 8 characters long!");
          return;
        }
        
        alert("Password changed successfully!");
        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";
      } else {
        alert("Profile changes saved successfully!");
      }
    });
  }
}

function initMarketplacePage() {
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach(card => {
    card.addEventListener("click", function() {
      const category = this.getAttribute("onclick").match(/'([^']+)'/)[1];
      filterVendorsByCategory(category);
    });
  });
  
  const saveVendorButtons = document.querySelectorAll(".save-vendor");
  saveVendorButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.stopPropagation();
      this.innerHTML = this.innerHTML.includes("far") ? 
        '<i class="fas fa-heart"></i>' : 
        '<i class="far fa-heart"></i>';
      
      const vendorCard = this.closest(".vendor-card");
      const vendorName = vendorCard.querySelector("h3").textContent;
      const action = this.innerHTML.includes("fas") ? "saved" : "removed";
      alert(`${vendorName} ${action} to your favorites!`);
    });
  });
  
  const vendorCards = document.querySelectorAll(".vendor-card");
  vendorCards.forEach(card => {
    card.addEventListener("click", function(e) {
      if (!e.target.closest("button")) {
        window.location.href = "vendor-profile.html";
      }
    });
  });
  
  const applyFiltersBtn = document.querySelector(".filter-row .btn-secondary");
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", function() {
      const sortBy = document.querySelector(".filter-row select:first-child").value;
      const priceRange = document.querySelector(".filter-row select:nth-child(2)").value;
      const location = document.querySelector(".filter-row select:last-child").value;
      alert(`Filters applied: Sort By - ${sortBy}, Price Range - ${priceRange}, Location - ${location}`);
    });
  }
  
  function filterVendorsByCategory(category) {
    const vendorGrids = document.querySelectorAll(".vendor-grid");
    vendorGrids.forEach(grid => {
      const vendors = grid.querySelectorAll(".vendor-card");
      vendors.forEach(vendor => {
        vendor.style.display = (category === "all" || vendor.getAttribute("data-category") === category) ? "block" : "none";
      });
    });
    document.querySelector(".featured-vendors").scrollIntoView({ behavior: "smooth" });
  }
}

function initVendorProfilePage() {
  const thumbnails = document.querySelectorAll(".thumbnail-grid img");
  const mainImage = document.querySelector(".main-image img");
  
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", function() {
      mainImage.src = this.src;
      thumbnails.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
    });
  });
  
  const pricingTiers = document.querySelectorAll(".pricing-tier:not(.popular)");
  pricingTiers.forEach(tier => {
    tier.addEventListener("click", function() {
      pricingTiers.forEach(t => t.classList.remove("selected"));
      this.classList.add("selected");
    });
  });
  
  const bookNowBtn = document.querySelector(".vendor-actions .btn-primary");
  if (bookNowBtn) {
    bookNowBtn.addEventListener("click", function() {
      window.location.href = "booking.html";
    });
  }
  
  const saveVendorBtn = document.querySelector(".vendor-actions .btn-secondary:first-child");
  if (saveVendorBtn) {
    saveVendorBtn.addEventListener("click", function() {
      this.innerHTML = this.innerHTML.includes("far") ? 
        '<i class="fas fa-heart"></i> Saved' : 
        '<i class="far fa-heart"></i> Save Vendor';
      alert(`Vendor ${this.innerHTML.includes("fas") ? "saved" : "removed"} to your favorites!`);
    });
  }
  
  const chatBtn = document.querySelector(".vendor-actions .btn-secondary:last-child");
  if (chatBtn) {
    chatBtn.addEventListener("click", function() {
      window.location.href = "chat.html";
    });
  }
  
  const loadMoreReviewsBtn = document.querySelector(".vendor-reviews .btn-secondary");
  if (loadMoreReviewsBtn) {
    loadMoreReviewsBtn.addEventListener("click", function() {
      alert("Loading more reviews...");
    });
  }
}

// ==================== AUTH PAGES FUNCTIONALITY ====================

function initLoginPage() {
  const loginForm = document.getElementById("loginForm");
  const passwordToggle = document.querySelector(".password-toggle");

  if (passwordToggle) {
    passwordToggle.addEventListener("click", function() {
      const passwordInput = document.getElementById("loginPassword");
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.innerHTML = '<i class="fas fa-eye-slash"></i>';
      } else {
        passwordInput.type = "password";
        this.innerHTML = '<i class="fas fa-eye"></i>';
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const role = document.getElementById("loginRole").value;

      if (!email || !password || !role) {
        alert("Please fill in all fields and select your role.");
        return;
      }

      alert(`Logged in as ${role}: ${email}`);
      switch (role) {
        case "customer":
          window.location.href = "../customer/customer-dashboard.html";
          break;
        case "vendor":
          window.location.href = "../vendor/vendor-dashboard.html";
          break;
        case "admin":
          window.location.href = "../admin/admin-dashboard.html";
          break;
        default:
          alert("Unknown role. Cannot redirect.");
      }
    });
  }
}

function initSignupPage() {
  const signupForm = document.getElementById("signupForm");
  const passwordToggle = document.querySelector(".password-toggle");

  if (passwordToggle) {
    passwordToggle.addEventListener("click", function() {
      const passwordInput = document.getElementById("signupPassword");
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.innerHTML = '<i class="fas fa-eye-slash"></i>';
      } else {
        passwordInput.type = "password";
        this.innerHTML = '<i class="fas fa-eye"></i>';
      }
    });
  }

  const passwordInput = document.getElementById("signupPassword");
  if (passwordInput) {
    passwordInput.addEventListener("input", function() {
      const strengthBars = document.querySelectorAll(".strength-bar");
      const strengthText = document.querySelector(".strength-text");
      const password = this.value;
      let strength = 0;

      strengthBars.forEach(bar => bar.style.backgroundColor = "#ddd");

      if (password.length > 0) strength++;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;

      for (let i = 0; i < strength; i++) {
        if (i < strengthBars.length) {
          strengthBars[i].style.backgroundColor = i < 2 ? "#ff4d4d" : i < 4 ? "#ffcc00" : "#4CAF50";
        }
      }

      strengthText.textContent = 
        strength === 0 ? "" :
        strength < 2 ? "Weak" :
        strength < 4 ? "Medium" : "Strong";
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();
      const confirmPassword = document.getElementById("signupConfirm").value.trim();
      const role = document.getElementById("signupRole").value;
      const termsChecked = document.querySelector(".terms input[type='checkbox']").checked;

      if (!name || !email || !password || !confirmPassword || !role) {
        alert("Please fill in all required fields.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }

      if (!termsChecked) {
        alert("You must agree to the Terms of Service and Privacy Policy.");
        return;
      }

      alert(`Account created successfully! Welcome to Eventify, ${name}.`);
      setTimeout(() => {
        switch (role) {
          case "customer":
            window.location.href = "../customer/customer-dashboard.html";
            break;
          case "vendor":
            window.location.href = "../vendor/vendor-dashboard.html";
            break;
          case "admin":
            window.location.href = "../admin/admin-dashboard.html";
            break;
        }
      }, 1000);
    });
  }
}

function initServicesPage() {
  const tabs = document.querySelectorAll(".service-tabs .tab");
  const serviceCategories = document.querySelectorAll(".service-category");

  tabs.forEach(tab => {
    tab.addEventListener("click", function() {
      const tabName = this.getAttribute("data-tab");

      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");

      serviceCategories.forEach(category => {
        category.style.display = (tabName === "all" || category.id === tabName) ? "block" : "none";
      });
    });
  });
}

function initEventsPage() {
  const eventTypeFilter = document.getElementById("eventTypeFilter");
  const locationFilter = document.getElementById("locationFilter");
  const applyFiltersBtn = document.querySelector(".event-filters .btn-outline");
  const eventCards = document.querySelectorAll(".event-card");

  function filterEvents() {
    const typeValue = eventTypeFilter.value;
    const locationValue = locationFilter.value;

    eventCards.forEach(card => {
      const cardType = card.getAttribute("data-type");
      const cardLocation = card.getAttribute("data-location");
      const typeMatch = typeValue === "all" || cardType === typeValue;
      const locationMatch = locationValue === "all" || cardLocation === locationValue;
      card.style.display = typeMatch && locationMatch ? "block" : "none";
    });
  }

  if (applyFiltersBtn) applyFiltersBtn.addEventListener("click", filterEvents);
  if (eventTypeFilter) eventTypeFilter.addEventListener("change", filterEvents);
  if (locationFilter) locationFilter.addEventListener("change", filterEvents);
}

function initContactPage() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert("Your message has been sent successfully! We'll get back to you soon.");
      this.reset();
    });
  }
}

// ==================== VENDOR PAGES FUNCTIONALITY ====================

function initVendorDashboard() {
  const actionCards = document.querySelectorAll(".action-card");
  actionCards.forEach(card => {
    card.addEventListener("click", function() {
      const link = this.getAttribute("onclick").match(/location\.href='([^']+)'/)[1];
      if (link) {
        window.location.href = link;
      }
    });
  });
}

function initBookingRequests() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(button => {
    button.addEventListener("click", function() {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
      filterRequests(this.textContent.toLowerCase().split(" ")[0]);
    });
  });
  
  const acceptButtons = document.querySelectorAll(".accept-btn");
  acceptButtons.forEach(button => {
    button.addEventListener("click", function() {
      const card = this.closest(".request-card");
      const eventName = card.querySelector("h3").textContent;
      if (confirm(`Accept booking for ${eventName}?`)) {
        card.querySelector(".request-badge").textContent = "Confirmed";
        card.querySelector(".request-badge").className = "request-badge confirmed";
        alert(`Booking for ${eventName} has been confirmed!`);
      }
    });
  });
  
  const declineButtons = document.querySelectorAll(".decline-btn");
  declineButtons.forEach(button => {
    button.addEventListener("click", function() {
      const card = this.closest(".request-card");
      const eventName = card.querySelector("h3").textContent;
      if (confirm(`Decline booking for ${eventName}?`)) {
        card.querySelector(".request-badge").textContent = "Declined";
        card.querySelector(".request-badge").className = "request-badge declined";
        alert(`Booking for ${eventName} has been declined.`);
      }
    });
  });
  
  const messageButtons = document.querySelectorAll(".message-btn");
  messageButtons.forEach(button => {
    button.addEventListener("click", function() {
      const card = this.closest(".request-card");
      const clientName = card.querySelector("strong").textContent;
      alert(`Opening chat with ${clientName}`);
      window.location.href = "vendor-chat.html";
    });
  });
  
  const detailsButtons = document.querySelectorAll(".details-btn");
  detailsButtons.forEach(button => {
    button.addEventListener("click", function() {
      const card = this.closest(".request-card");
      const eventName = card.querySelector("h3").textContent;
      alert(`Showing full details for ${eventName}`);
    });
  });
  
  function filterRequests(filter) {
    const requestCards = document.querySelectorAll(".request-card");
    requestCards.forEach(card => {
      if (filter === "all") {
        card.style.display = "block";
      } else {
        const status = card.querySelector(".request-badge").textContent.toLowerCase();
        card.style.display = status.includes(filter) ? "block" : "none";
      }
    });
  }
}

function initVendorCalendar() {
  const prevBtn = document.querySelector(".calendar-header .btn-outline:first-child");
  const nextBtn = document.querySelector(".calendar-header .btn-outline:last-child");
  
  if (prevBtn) {
    prevBtn.addEventListener("click", function() {
      alert("Loading previous month");
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", function() {
      alert("Loading next month");
    });
  }
  
  const eventIndicators = document.querySelectorAll(".event-indicator");
  eventIndicators.forEach(indicator => {
    indicator.addEventListener("click", function() {
      const eventDetails = document.querySelector(".event-details h4");
      if (eventDetails) {
        eventDetails.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function initReviewsPage() {
  const ratingBars = document.querySelectorAll(".rating-bar");
  ratingBars.forEach(bar => {
    bar.addEventListener("click", function() {
      const rating = this.querySelector("span:first-child").textContent.trim();
      filterReviewsByRating(rating);
    });
  });
  
  const prevPageBtn = document.querySelector(".reviews-pagination .btn-outline:first-child");
  const nextPageBtn = document.querySelector(".reviews-pagination .btn-outline:last-child");
  
  if (prevPageBtn) {
    prevPageBtn.addEventListener("click", function() {
      if (!this.disabled) {
        alert("Loading previous page of reviews");
      }
    });
  }
  
  if (nextPageBtn) {
    nextPageBtn.addEventListener("click", function() {
      alert("Loading next page of reviews");
    });
  }
  
  function filterReviewsByRating(rating) {
    const reviewCards = document.querySelectorAll(".review-card");
    reviewCards.forEach(card => {
      const stars = card.querySelectorAll(".rating-stars i.fas.fa-star").length;
      card.style.display = stars == rating ? "block" : "none";
    });
  }
}

function initVendorChat() {
  const chatItems = document.querySelectorAll(".chat-item");
  chatItems.forEach(item => {
    item.addEventListener("click", function() {
      chatItems.forEach(i => i.classList.remove("active"));
      this.classList.add("active");
      
      const clientName = this.querySelector("h4").textContent;
      document.querySelector(".chat-partner h3").textContent = clientName;
      alert(`Loading chat with ${clientName}`);
    });
  });
  
  const chatInput = document.querySelector(".chat-input input");
  const sendButton = document.querySelector(".chat-input .btn-primary");
  
  if (sendButton && chatInput) {
    sendButton.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") sendMessage();
    });
  }
  
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      const messagesContainer = document.querySelector(".chat-messages");
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const messageDiv = document.createElement("div");
      messageDiv.className = "message sent";
      messageDiv.innerHTML = `
        <div class="message-content">
          <p>${message}</p>
          <span class="message-time">${timeString}</span>
        </div>
      `;
      
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      chatInput.value = "";
      
      setTimeout(() => {
        const replies = [
          "Thank you for your message!",
          "I'll check my availability and get back to you.",
          "Yes, I'm available for that date.",
          "Could you please provide more details?"
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const replyDiv = document.createElement("div");
        replyDiv.className = "message received";
        replyDiv.innerHTML = `
          <div class="message-avatar">
            <img src="../images/himashi.jpg" alt="Client">
          </div>
          <div class="message-content">
            <p>${randomReply}</p>
            <span class="message-time">${timeString}</span>
          </div>
        `;
        
        messagesContainer.appendChild(replyDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 1000);
    }
  }
}

function initVendorProfile() {
  const menuItems = document.querySelectorAll(".profile-menu a");
  menuItems.forEach(item => {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      menuItems.forEach(i => i.classList.remove("active"));
      this.classList.add("active");
      
      const sectionId = this.getAttribute("href");
      const sections = document.querySelectorAll(".profile-section");
      sections.forEach(section => section.classList.remove("active"));
      document.querySelector(sectionId).classList.add("active");
    });
  });
  
  const changePhotoBtn = document.querySelector(".profile-avatar button");
  if (changePhotoBtn) {
    changePhotoBtn.addEventListener("click", function() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      
      input.onchange = function(e) {
        const file = e.target.files[0];
        if (file && file.type.match("image.*")) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
            document.querySelector(".profile-avatar img").src = e.target.result;
          }
          
          reader.readAsDataURL(file);
        }
      };
      
      input.click();
    });
  }
  
  const profileForm = document.querySelector(".profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Profile changes saved successfully!");
    });
  }
  
  const addServiceBtn = document.querySelector("#services .btn-outline");
  if (addServiceBtn) {
    addServiceBtn.addEventListener("click", function() {
      const serviceName = prompt("Enter service name:");
      if (serviceName) {
        const servicePrice = prompt("Enter service price (LKR):");
        if (servicePrice) {
          const serviceDescription = prompt("Enter service description:");
          
          const serviceList = document.querySelector(".service-list");
          const newService = document.createElement("div");
          newService.className = "service-item";
          newService.innerHTML = `
            <h3>${serviceName}</h3>
            <p>${serviceDescription || "No description provided"}</p>
            <span class="service-price">LKR ${servicePrice}</span>
            <button class="btn-text"><i class="fas fa-edit"></i> Edit</button>
          `;
          
          serviceList.appendChild(newService);
          alert("New service added successfully!");
        }
      }
    });
  }
}

function initVendorSettings() {
  const tabs = document.querySelectorAll(".settings-tabs .tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", function() {
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      
      const tabId = this.getAttribute("data-tab");
      const sections = document.querySelectorAll(".settings-section");
      sections.forEach(section => section.classList.remove("active"));
      document.getElementById(tabId).classList.add("active");
    });
  });
  
  const newPasswordInput = document.querySelector("#security input[type='password']");
  if (newPasswordInput) {
    newPasswordInput.addEventListener("input", function() {
      const password = this.value;
      const strengthBars = document.querySelectorAll(".strength-bar");
      const strengthText = document.querySelector(".strength-text");
      let strength = 0;
      
      strengthBars.forEach(bar => bar.style.backgroundColor = "#ddd");
      
      if (password.length > 0) strength++;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      
      for (let i = 0; i < strength; i++) {
        if (i < strengthBars.length) {
          strengthBars[i].style.backgroundColor = i < 2 ? "#ff4d4d" : i < 4 ? "#ffcc00" : "#4CAF50";
        }
      }
      
      strengthText.textContent = 
        strength === 0 ? "Password strength" :
        strength < 2 ? "Weak" :
        strength < 4 ? "Medium" : "Strong";
    });
  }
  
  const settingsForms = document.querySelectorAll(".settings-form");
  settingsForms.forEach(form => {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const sectionId = this.closest(".settings-section").id;
      alert(`${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} settings saved successfully!`);
    });
  });
}

// ==================== ADMIN PAGES FUNCTIONALITY ====================

function initAdminDashboard() {
  const quickActionBtns = document.querySelectorAll(".action-btn");
  quickActionBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      console.log(`Quick action clicked: ${this.querySelector("span").textContent}`);
    });
  });

  const notificationBell = document.querySelector(".notification-bell");
  if (notificationBell) {
    notificationBell.addEventListener("click", function() {
      window.location.href = "system-notifications.html";
    });
  }
}

function initContentManagement() {
  const contentForm = document.getElementById("contentForm");
  
  if (contentForm) {
    contentForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const contentType = document.getElementById("contentType").value;
      const contentTitle = document.getElementById("contentTitle").value.trim();
      const contentText = document.getElementById("contentText").value.trim();
      const audienceCheckboxes = document.querySelectorAll("input[name='audience']:checked");
      
      if (!contentType || !contentTitle || !contentText || audienceCheckboxes.length === 0) {
        alert("Please fill in all required fields and select at least one audience.");
        return;
      }
      
      const audience = Array.from(audienceCheckboxes).map(cb => cb.value).join(", ");
      alert(`Content published successfully!\nType: ${contentType}\nTitle: ${contentTitle}\nAudience: ${audience}`);
      this.reset();
    });
  }
}

function initManageUsers() {
  const searchInput = document.querySelector(".search-bar input");
  const searchBtn = document.querySelector(".search-bar button");
  
  if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", function() {
      filterUserList(searchInput.value.trim().toLowerCase());
    });
    
    searchInput.addEventListener("keyup", function(e) {
      if (e.key === "Enter") {
        filterUserList(searchInput.value.trim().toLowerCase());
      }
    });
  }
  
  const statusButtons = document.querySelectorAll(".user-actions button");
  statusButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const action = this.querySelector("i").className;
      const userCard = this.closest(".user-card");
      const userName = userCard.querySelector("h3").textContent;
      
      if (action.includes("ban")) {
        userCard.classList.add("disabled");
        alert(`User ${userName} has been disabled.`);
      } else if (action.includes("check")) {
        userCard.classList.remove("disabled");
        alert(`User ${userName} has been enabled.`);
      } else if (action.includes("trash")) {
        if (confirm(`Are you sure you want to delete ${userName}?`)) {
          userCard.remove();
          alert(`User ${userName} has been deleted.`);
        }
      }
    });
  });
  
  function filterUserList(searchTerm) {
    const userCards = document.querySelectorAll(".user-card");
    userCards.forEach(card => {
      const userName = card.querySelector("h3").textContent.toLowerCase();
      const userEmail = card.querySelector("p:nth-of-type(1)").textContent.toLowerCase();
      card.style.display = (userName.includes(searchTerm) || userEmail.includes(searchTerm)) ? "flex" : "none";
    });
  }
}

function initManageVendors() {
  const tabs = document.querySelectorAll(".tabs .tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", function() {
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      filterVendorsByStatus(this.textContent.toLowerCase());
    });
  });
  
  const vendorActionButtons = document.querySelectorAll(".vendor-actions button");
  vendorActionButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const action = this.querySelector("i").className;
      const vendorCard = this.closest(".vendor-card");
      const vendorName = vendorCard.querySelector("h3").textContent;
      
      if (action.includes("check")) {
        vendorCard.classList.remove("pending");
        alert(`Vendor ${vendorName} has been approved.`);
      } else if (action.includes("ban")) {
        vendorCard.classList.add("suspended");
        alert(`Vendor ${vendorName} has been suspended.`);
      } else if (action.includes("times")) {
        if (confirm(`Are you sure you want to reject ${vendorName}?`)) {
          vendorCard.remove();
          alert(`Vendor ${vendorName} has been rejected.`);
        }
      } else if (action.includes("trash")) {
        if (confirm(`Are you sure you want to delete ${vendorName}?`)) {
          vendorCard.remove();
          alert(`Vendor ${vendorName} has been deleted.`);
        }
      }
    });
  });
  
  function filterVendorsByStatus(status) {
    const vendorCards = document.querySelectorAll(".vendor-card");
    vendorCards.forEach(card => {
      if (status.includes("all")) {
        card.style.display = "flex";
      } else if (status.includes("pending")) {
        card.style.display = card.classList.contains("pending") ? "flex" : "none";
      } else if (status.includes("verified")) {
        card.style.display = !card.classList.contains("pending") && !card.classList.contains("suspended") ? "flex" : "none";
      } else if (status.includes("suspended")) {
        card.style.display = card.classList.contains("suspended") ? "flex" : "none";
      }
    });
  }
}

function initReports() {
  const tabs = document.querySelectorAll(".report-tabs .tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", function() {
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      showReportTab(this.textContent.toLowerCase());
    });
  });
  
  const dateFilterBtn = document.querySelector(".date-range .btn-small");
  if (dateFilterBtn) {
    dateFilterBtn.addEventListener("click", function() {
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      
      if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
        return;
      }
      
      alert(`Date range filter applied: ${startDate} to ${endDate}`);
    });
  }
  
  function showReportTab(tabName) {
    const reportSections = document.querySelectorAll(".report-overview > div");
    reportSections.forEach(section => {
      section.style.display = (tabName === "overview" || section.classList.contains(tabName)) ? "block" : "none";
    });
  }
}

function initSupport() {
  const tabs = document.querySelectorAll(".tabs .tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", function() {
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      filterTicketsByStatus(this.textContent.toLowerCase().split(" ")[0]);
    });
  });
  
  const ticketActionButtons = document.querySelectorAll(".ticket-actions button");
  ticketActionButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const ticketCard = this.closest(".ticket-card");
      const ticketTitle = ticketCard.querySelector("h3").textContent;
      const statusSpan = ticketCard.querySelector(".status");
      
      if (this.classList.contains("btn-primary")) {
        const response = prompt(`Enter your response for ticket: ${ticketTitle}`);
        if (response) {
          alert(`Response sent for ticket: ${ticketTitle}`);
        }
      } else if (this.classList.contains("btn-warning")) {
        statusSpan.textContent = "In Progress";
        statusSpan.className = "status in-progress";
        alert(`Ticket marked as In Progress: ${ticketTitle}`);
      } else if (this.classList.contains("btn-success")) {
        statusSpan.textContent = "Resolved";
        statusSpan.className = "status resolved";
        alert(`Ticket resolved: ${ticketTitle}`);
      } else if (this.querySelector("i").className.includes("undo")) {
        statusSpan.textContent = "Open";
        statusSpan.className = "status open";
        alert(`Ticket reopened: ${ticketTitle}`);
      } else if (this.querySelector("i").className.includes("trash")) {
        if (confirm(`Are you sure you want to delete this ticket: ${ticketTitle}?`)) {
          ticketCard.remove();
          alert(`Ticket deleted: ${ticketTitle}`);
        }
      }
    });
  });
  
  function filterTicketsByStatus(status) {
    const ticketCards = document.querySelectorAll(".ticket-card");
    ticketCards.forEach(card => {
      card.style.display = status.includes("all") ? "block" : 
        card.querySelector(".status").className.split(" ")[1] === status ? "block" : "none";
    });
  }
}

function initSystemNotifications() {
  const markAllReadBtn = document.getElementById("markAllRead");
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", function() {
      const unreadNotifications = document.querySelectorAll(".notification-item.unread");
      unreadNotifications.forEach(notification => {
        notification.classList.remove("unread");
      });
      document.querySelector(".notification-count").textContent = "0";
      alert("All notifications marked as read.");
    });
  }
  
  const clearAllBtn = document.getElementById("clearAll");
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", function() {
      if (confirm("Are you sure you want to clear all notifications?")) {
        document.querySelector(".notification-list").innerHTML = "<p>No notifications to display.</p>";
        document.querySelector(".notification-count").textContent = "0";
        alert("All notifications cleared.");
      }
    });
  }
  
  const notificationTabs = document.querySelectorAll(".tabs .tab");
  notificationTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      notificationTabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      filterNotifications(this.textContent.toLowerCase());
    });
  });
  
  function filterNotifications(filter) {
    const notifications = document.querySelectorAll(".notification-item");
    notifications.forEach(notification => {
      if (filter.includes("all")) {
        notification.style.display = "flex";
      } else if (filter.includes("unread")) {
        notification.style.display = notification.classList.contains("unread") ? "flex" : "none";
      } else if (filter.includes("system")) {
        const icon = notification.querySelector(".notification-icon i").className;
        notification.style.display = icon.includes("exclamation") ? "flex" : "none";
      } else if (filter.includes("user")) {
        const icon = notification.querySelector(".notification-icon i").className;
        notification.style.display = icon.includes("user") ? "flex" : "none";
      }
    });
  }
}

function initViewEvents() {
  const tabs = document.querySelectorAll(".tabs .tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", function() {
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      filterEventsByStatus(this.textContent.toLowerCase().split(" ")[0]);
    });
  });
  
  const eventActionButtons = document.querySelectorAll(".event-actions button");
  eventActionButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const eventCard = this.closest(".event-card");
      const eventName = eventCard.querySelector("h3").textContent;
      
      if (this.querySelector("i").className.includes("eye")) {
        alert(`Viewing details for event: ${eventName}`);
      } else if (this.querySelector("i").className.includes("trash")) {
        if (confirm(`Are you sure you want to delete this event: ${eventName}?`)) {
          eventCard.remove();
          alert(`Event deleted: ${eventName}`);
        }
      }
    });
  });
  
  function filterEventsByStatus(status) {
    const eventCards = document.querySelectorAll(".event-card");
    eventCards.forEach(card => {
      if (status.includes("all")) {
        card.style.display = "flex";
      } else {
        const badge = card.querySelector(".badge");
        const cardStatus = badge ? badge.className.split(" ")[1] : "";
        card.style.display = cardStatus === status ? "flex" : "none";
      }
    });
  }
}