/**
 * Form handling and validation for PILOTING Website
 * Author: Bolt
 * Version: 1.0
 */

$(document).ready(function() {
  // Handle application form submission
  $('#applicationForm').on('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const fullName = $('#fullName').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const message = $('#message').val().trim();
    
    // Validate form
    if (validateForm(fullName, email, phone)) {
      // Show loading state
      const submitBtn = $(this).find('button[type="submit"]');
      const originalBtnText = submitBtn.html();
      submitBtn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...');
      submitBtn.prop('disabled', true);
      
      // Simulate form submission (replace with actual AJAX call in production)
      setTimeout(function() {
        // Reset form
        $('#applicationForm')[0].reset();
        
        // Show success message
        showFormMessage('success', 'Application submitted successfully! We will contact you shortly.');
        
        // Reset button
        submitBtn.html(originalBtnText);
        submitBtn.prop('disabled', false);
      }, 1500);
    }
  });
  
  // Real-time validation as user types
  $('#fullName, #email, #phone').on('blur', function() {
    const field = $(this);
    const value = field.val().trim();
    const fieldName = field.attr('id');
    
    if (!value) {
      showFieldError(field, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
    } else if (fieldName === 'email' && !isValidEmail(value)) {
      showFieldError(field, 'Please enter a valid email address');
    } else if (fieldName === 'phone' && !isValidPhone(value)) {
      showFieldError(field, 'Please enter a valid phone number');
    } else {
      removeFieldError(field);
    }
  });
  
  // Newsletter subscription form
  $('.newsletter .btn').on('click', function() {
    const emailInput = $(this).prev('input');
    const email = emailInput.val().trim();
    
    if (!email || !isValidEmail(email)) {
      emailInput.addClass('is-invalid');
      return;
    }
    
    emailInput.removeClass('is-invalid');
    
    // Simulate subscription (replace with actual AJAX call in production)
    $(this).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
    $(this).prop('disabled', true);
    
    setTimeout(() => {
      emailInput.val('');
      $(this).html('Subscribe');
      $(this).prop('disabled', false);
      
      // Show a success toast
      showToast('Successfully subscribed to our newsletter!', 'success');
    }, 1500);
  });
});

// Form validation function
function validateForm(fullName, email, phone) {
  let isValid = true;
  
  // Check name
  if (!fullName) {
    showFieldError($('#fullName'), 'Full name is required');
    isValid = false;
  } else {
    removeFieldError($('#fullName'));
  }
  
  // Check email
  if (!email) {
    showFieldError($('#email'), 'Email address is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showFieldError($('#email'), 'Please enter a valid email address');
    isValid = false;
  } else {
    removeFieldError($('#email'));
  }
  
  // Check phone
  if (!phone) {
    showFieldError($('#phone'), 'Phone number is required');
    isValid = false;
  } else if (!isValidPhone(phone)) {
    showFieldError($('#phone'), 'Please enter a valid phone number');
    isValid = false;
  } else {
    removeFieldError($('#phone'));
  }
  
  return isValid;
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation function
function isValidPhone(phone) {
  // Basic phone validation (can be customized based on requirements)
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
  return phoneRegex.test(phone);
}

// Show field error
function showFieldError(field, message) {
  field.addClass('is-invalid');
  
  // Remove existing error message if any
  field.next('.invalid-feedback').remove();
  
  // Add error message
  field.after(`<div class="invalid-feedback">${message}</div>`);
}

// Remove field error
function removeFieldError(field) {
  field.removeClass('is-invalid');
  field.next('.invalid-feedback').remove();
}

// Show form message (success or error)
function showFormMessage(type, message) {
  // Remove existing alerts
  $('.alert').remove();
  
  // Create alert
  const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
  const alertHtml = `
    <div class="alert ${alertClass} alert-dismissible fade show mt-3" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  
  // Add alert to form
  $('#applicationForm').prepend(alertHtml);
  
  // Scroll to alert
  $('html, body').animate({
    scrollTop: $('#applicationForm').offset().top - 100
  }, 300);
  
  // Auto dismiss after 5 seconds
  setTimeout(() => {
    $('.alert').alert('close');
  }, 5000);
}

// Show toast notification
function showToast(message, type = 'info') {
  // Check if toast container exists, if not create it
  if (!$('#toast-container').length) {
    $('body').append('<div id="toast-container" class="position-fixed bottom-0 end-0 p-3" style="z-index: 1050;"></div>');
  }
  
  // Create a unique ID for this toast
  const toastId = 'toast-' + new Date().getTime();
  
  // Determine toast class based on type
  let bgClass = 'bg-info';
  if (type === 'success') bgClass = 'bg-success';
  if (type === 'warning') bgClass = 'bg-warning';
  if (type === 'error') bgClass = 'bg-danger';
  
  // Create toast HTML
  const toastHtml = `
    <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header ${bgClass} text-white">
        <strong class="me-auto">PILOTING</strong>
        <small>Just now</small>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;
  
  // Add toast to container
  $('#toast-container').append(toastHtml);
  
  // Initialize and show toast
  const toastElement = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastElement, {
    autohide: true,
    delay: 5000
  });
  toast.show();
  
  // Remove toast from DOM after it's hidden
  $(toastElement).on('hidden.bs.toast', function() {
    $(this).remove();
  });
}