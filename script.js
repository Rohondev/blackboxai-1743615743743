// Authentication and navigation logic
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status on page load
    checkAuthStatus();

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Handle logout functionality
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleLogout();
        });
    });
});

function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userType = localStorage.getItem('userType');
    const currentPage = window.location.pathname.split('/').pop();

    if (isLoggedIn) {
        // Redirect to appropriate page if already logged in
        if (userType === 'admin' && !currentPage.includes('admin-dashboard')) {
            window.location.href = 'admin-dashboard.html';
        } else if (userType === 'buyer' && !currentPage.includes('products')) {
            window.location.href = 'products.html';
        }
    } else {
        // Redirect to login if not authenticated
        if (!currentPage.includes('login') && !currentPage.includes('index')) {
            window.location.href = 'login.html';
        }
    }
}

function handleLogin() {
    const userType = document.getElementById('userType').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Store authentication data
    localStorage.setItem('userType', userType);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', email);

    // Redirect based on user type
    if (userType === 'admin') {
        window.location.href = 'admin-dashboard.html';
    } else {
        window.location.href = 'products.html';
    }
}

function handleLogout() {
    // Clear authentication data
    localStorage.removeItem('userType');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Product data (will be moved to separate file later)
const products = [
    {
        id: 1,
        name: "Nonivita",
        price: 49.99,
        stock: 100,
        description: "Premium Noni fruit extract for daily wellness",
        image: "https://images.pexels.com/photos/890669/pexels-photo-890669.jpeg"
    },
    {
        id: 2,
        name: "Noni Capsules",
        price: 29.99,
        stock: 150,
        description: "Concentrated Noni in easy-to-take capsules",
        image: "https://images.pexels.com/photos/5946082/pexels-photo-5946082.jpeg"
    },
    {
        id: 3,
        name: "Noni Soap",
        price: 12.99,
        stock: 200,
        description: "Noni-infused soap for healthy skin",
        image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
    }
];