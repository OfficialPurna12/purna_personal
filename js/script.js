document.addEventListener('DOMContentLoaded', function () {
    // Highlight active navigation link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function highlightNav() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Call on page load
});

// Signature Pad

document.addEventListener('DOMContentLoaded', function() {
      const canvas = document.getElementById('signature-pad');
      const clearButton = document.getElementById('clear');
      const saveButton = document.getElementById('save');
      const formatSelect = document.getElementById('format');
      const toast = document.getElementById('toast');
      
      // Adjust canvas size to fit container
      function resizeCanvas() {
        const container = canvas.parentElement;
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = container.offsetWidth * ratio;
        canvas.height = container.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
      }
      
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      
      const signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)',
        penColor: 'rgb(0, 0, 0)',
        velocityFilterWeight: 0.7,
        minWidth: 0.5,
        maxWidth: 2.5,
        throttle: 16
      });
      
      // Clear signature
      clearButton.addEventListener('click', function() {
        signaturePad.clear();
        showToast('Signature cleared');
      });
      
      // Save signature
      saveButton.addEventListener('click', function() {
        if (signaturePad.isEmpty()) {
          showToast('Please provide a signature first');
          return;
        }
        
        const format = formatSelect.value;
        
        // Create a new canvas with white background for both PNG and JPG
        const newCanvas = document.createElement('canvas');
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;
        const newContext = newCanvas.getContext('2d');
        
        // Fill with white background
        newContext.fillStyle = 'white';
        newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
        
        // Draw the original signature
        newContext.drawImage(canvas, 0, 0);
        
        // Convert to the appropriate format
        let dataURL;
        if (format === 'jpg') {
          dataURL = newCanvas.toDataURL('image/jpeg');
        } else {
          dataURL = newCanvas.toDataURL('image/png');
        }
        
        // Create download link
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `signature.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast(`Signature saved as ${format.toUpperCase()} with white background`);
      });
      
      // Show toast notification
      function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(function() {
          toast.classList.remove('show');
        }, 3000);
      }
    });
// contact form
document.addEventListener('DOMContentLoaded', function() {
    // Create particle animation
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      createParticle();
    }
    
    function createParticle() {
      const particle = document.createElement('span');
      particle.className = 'particle';
      
      const size = Math.random() * 15 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // Random animation delay and duration
      const delay = Math.random() * 10;
      const duration = Math.random() * 20 + 10;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      particlesContainer.appendChild(particle);
    }
    
    // File input handling
    const fileInput = document.getElementById('cv');
    const fileName = document.getElementById('file-name');
    
    fileInput.addEventListener('change', function() {
      if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name;
      } else {
        fileName.textContent = 'No file chosen';
      }
    });
    
    // Form submission and payment screen
    const contactForm = document.getElementById('contactForm');
    const paymentScreen = document.getElementById('payment-screen');
    const cancelPayment = document.getElementById('cancel-payment');
    const confirmPayment = document.getElementById('confirm-payment');
    const successMessage = document.getElementById('success-message');
    
    // Course pricing
    const coursePricing = {
      'Web Development': { '6 months': 899, '1 year': 1699 },
      'Graphics Design': { '6 months': 799, '1 year': 1499 },
      'Video Editing': { '6 months': 999, '1 year': 1899 },
      'App Development': { '6 months': 1099, '1 year': 1999 },
      'UI/UX Design': { '6 months': 849, '1 year': 1599 },
      'SEO & Content Marketing': { '6 months': 749, '1 year': 1399 }
    };
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get selected course and duration
      const course = document.getElementById('course').value;
      const duration = document.getElementById('duration').value;
      
      // Calculate fees
      const courseFee = coursePricing[course][duration];
      const taxAmount = courseFee * 0.05;
      const totalAmount = courseFee + taxAmount;
      
      // Update payment screen
      document.getElementById('selected-course').textContent = course;
      document.getElementById('selected-duration').textContent = duration;
      document.getElementById('course-fee').textContent = `$${courseFee}`;
      document.getElementById('tax-amount').textContent = `$${taxAmount.toFixed(2)}`;
      document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)}`;
      
      // Show payment screen
      paymentScreen.style.display = 'flex';
    });
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
      method.addEventListener('click', function() {
        paymentMethods.forEach(m => m.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // Cancel payment
    cancelPayment.addEventListener('click', function() {
      paymentScreen.style.display = 'none';
    });
    
    // Confirm payment
    confirmPayment.addEventListener('click', function() {
      paymentScreen.style.display = 'none';
      successMessage.style.display = 'block';
      contactForm.reset();
      fileName.textContent = 'No file chosen';
      
      // Scroll to success message
      successMessage.scrollIntoView({ behavior: 'smooth' });
    });
  });


