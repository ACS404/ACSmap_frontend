---
layout: page
title: Login
permalink: /login
search_exclude: true
show_reading_time: false
---
<style>
    :root {
        --primary: #2563eb;
        --primary-dark: #1e40af;
        --primary-light: #3b82f6;
        --secondary: #0891b2;
        --success: #059669;
        --danger: #dc2626;
        --warning: #d97706;
        --dark: #111827;
        --gray-50: #f9fafb;
        --gray-100: #f3f4f6;
        --gray-200: #e5e7eb;
        --gray-300: #d1d5db;
        --gray-600: #4b5563;
        --gray-700: #374151;
        --gray-800: #1f2937;
        --gray-900: #111827;
    }

    body {
        background: linear-gradient(to bottom, #0f172a, #1e293b);
        min-height: 100vh;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }

    .login-container {
        display: flex;
        gap: 2rem;
        max-width: 1200px;
        width: 100%;
    }

    .login-card,
    .signup-card {
        flex: 1;
        background: #c9c9f5;
        border-radius: 12px;
        padding: 2.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .login-card:hover,
    .signup-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .login-card h1,
    .signup-card h1 {
        font-size: 2rem;
        font-weight: 700;
        color: var(--gray-900);
        margin: 0 0 0.5rem 0;
        letter-spacing: -0.025em;
    }

    hr {
        border: none;
        height: 2px;
        background: var(--primary);
        margin: 0 0 2rem 0;
        border-radius: 2px;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    input[type="text"],
    input[type="password"],
    input[type="email"] {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 2px solid var(--gray-200);
        border-radius: 8px;
        font-size: 0.95rem;
        transition: all 0.2s ease;
        background: white;
        color: var(--gray-900);
        box-sizing: border-box;
    }

    input[type="text"]:focus,
    input[type="password"]:focus,
    input[type="email"]:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    input::placeholder {
        color: var(--gray-600);
    }

    .switch {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 1.5rem;
    }

    .toggle {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 26px;
    }

    .toggle input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--gray-300);
        transition: 0.3s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: var(--primary);
    }

    input:checked + .slider:before {
        transform: translateX(24px);
    }

    .label-text {
        color: var(--gray-700);
        font-weight: 500;
        font-size: 0.9rem;
    }

    button[type="submit"] {
        width: 100%;
        padding: 0.875rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        background: var(--primary);
        color: white;
        box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
    }

    button[type="submit"]:hover {
        background: var(--primary-dark);
        transform: translateY(-1px);
        box-shadow: 0 6px 8px rgba(37, 99, 235, 0.3);
    }

    button[type="submit"]:active {
        transform: translateY(0);
    }

    button[type="submit"]:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    #message,
    #signupMessage {
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        border-radius: 6px;
        font-weight: 500;
        text-align: center;
        font-size: 0.9rem;
    }

    #message {
        background: #fee2e2;
        color: var(--danger);
        border: 1px solid #fecaca;
    }

    #signupMessage {
        background: #dcfce7;
        color: var(--success);
        border: 1px solid #bbf7d0;
    }

    #signupMessage.error {
        background: #fee2e2;
        color: var(--danger);
        border: 1px solid #fecaca;
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .login-container {
            flex-direction: column;
        }

        .login-card,
        .signup-card {
            max-width: 100%;
        }
    }
</style>

<div class="login-container">
    <!-- Login Form -->
    <div class="login-card">
        <h1>User Login</h1>
        <hr>
        <form id="pythonForm" onsubmit="pythonLogin(event); return false;">
            <div class="form-group">
                <input type="text" id="uid" placeholder="GitHub ID" required>
            </div>
            <div class="form-group">
                <input type="password" id="password" placeholder="Password" required>
            </div>
            <button type="submit" class="large primary submit-button">Login</button>
            <p id="message" style="display: none;"></p>
        </form>
    </div>

    <!-- Signup Form -->
    <div class="signup-card">
        <h1>Sign Up</h1>
        <hr>
        <form id="signupForm" onsubmit="signup(event); return false;">
            <div class="form-group">
                <input type="text" id="name" placeholder="Name" required>
            </div>
            <div class="form-group">
                <input type="text" id="signupUid" placeholder="GitHub ID" required>
            </div>
            <div class="form-group">
                <input type="text" id="signupSid" placeholder="Student ID" required>
            </div>
            <div class="form-group">
                <input type="email" id="signupEmail" placeholder="Email" required>
            </div>
            <div class="form-group">
                <input type="password" id="signupPassword" placeholder="Password (8+ characters)" required>
            </div>
            <label class="switch">
                <span class="toggle">
                    <input type="checkbox" name="kasmNeeded" id="kasmNeeded">
                    <span class="slider"></span>
                </span>
                <span class="label-text">Kasm Server Needed</span>
            </label>
            <button type="submit" class="large primary submit-button">Sign Up</button>
            <p id="signupMessage" style="display: none;"></p>
        </form>
    </div>
</div>

<script type="module">
    import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    console.log("🔧 Login page loaded");
    console.log("🔧 Python URI:", pythonURI);

    // Function to handle Python login
    window.pythonLogin = async function (event) {
        if (event) event.preventDefault();
        
        const uid = document.getElementById("uid").value.trim();
        const password = document.getElementById("password").value;
        const messageEl = document.getElementById("message");
        const submitBtn = document.querySelector("#pythonForm button[type='submit']");
        
        // Clear previous messages
        messageEl.style.display = 'none';
        messageEl.textContent = '';
        
        // Validation
        if (!uid || !password) {
            messageEl.textContent = "Please enter both username and password";
            messageEl.style.display = 'block';
            return false;
        }
        
        console.log("🔐 Attempting login for user:", uid);
        
        // Disable button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';
        
        try {
            const requestBody = { uid, password };
            console.log("📤 Request body:", requestBody);
            
            const response = await fetch(`${pythonURI}/api/authenticate`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Origin': 'client'
                },
                body: JSON.stringify(requestBody)
            });
            
            console.log("📊 Response status:", response.status);
            console.log("📊 Response headers:", Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
                console.error("❌ Login failed:", errorData);
                messageEl.textContent = errorData.message || `Login failed: ${response.status}`;
                messageEl.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Login';
                return false;
            }
            
            const data = await response.json();
            console.log("✅ Server response:", data);
            
            // Check cookies
            console.log("🍪 Document cookies:", document.cookie);
            
            // Wait a moment for cookie to be set
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Verify session by calling /api/id
            console.log("🔍 Verifying session...");
            const verifyResponse = await fetch(`${pythonURI}/api/id`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Origin': 'client'
                }
            });
            
            console.log("📊 Verify response status:", verifyResponse.status);
            
            if (verifyResponse.ok) {
                const userData = await verifyResponse.json();
                console.log("✅ Session verified for:", userData.name);
                console.log("🎉 Redirecting to home page...");
                
                // Show success message briefly before redirect
                messageEl.style.background = '#4f9869';
                messageEl.style.color = '#059669';
                messageEl.textContent = 'Login successful! Redirecting...';
                messageEl.style.display = 'block';
                
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = '{{site.baseurl}}/';
                }, 1000);
            } else {
                const errorText = await verifyResponse.text();
                console.error("❌ Session verification failed:", errorText);
                messageEl.textContent = "Login succeeded but session verification failed. Please try again.";
                messageEl.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Login';
            }
            
        } catch (error) {
            console.error("❌ Login error:", error);
            messageEl.textContent = `Error: ${error.message}`;
            messageEl.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Login';
        }
        
        return false;
    }

    window.signup = async function (event) {
        if (event) event.preventDefault();
        
        const signupButton = document.querySelector(".signup-card button[type='submit']");
        const messageEl = document.getElementById("signupMessage");
        
        // Clear previous messages
        messageEl.style.display = 'none';
        messageEl.textContent = '';
        messageEl.className = '';
        
        // Get form values
        const name = document.getElementById("name").value.trim();
        const uid = document.getElementById("signupUid").value.trim();
        const sid = document.getElementById("signupSid").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const kasmNeeded = document.getElementById("kasmNeeded").checked;
        
        // Validation
        if (!name || name.length < 2) {
            messageEl.textContent = "Name must be at least 2 characters";
            messageEl.className = 'error';
            messageEl.style.display = 'block';
            return false;
        }
        
        if (!uid || uid.length < 2) {
            messageEl.textContent = "GitHub ID must be at least 2 characters";
            messageEl.className = 'error';
            messageEl.style.display = 'block';
            return false;
        }
        
        if (!password || password.length < 8) {
            messageEl.textContent = "Password must be at least 8 characters";
            messageEl.className = 'error';
            messageEl.style.display = 'block';
            return false;
        }
        
        if (!email || !email.includes('@')) {
            messageEl.textContent = "Please enter a valid email address";
            messageEl.className = 'error';
            messageEl.style.display = 'block';
            return false;
        }
        
        console.log("📝 Attempting signup for:", uid);
        
        signupButton.disabled = true;
        signupButton.textContent = 'Creating account...';
        
        try {
            const requestBody = {
                name: name,
                uid: uid,
                sid: sid,
                email: email,
                password: password,
                kasm_server_needed: kasmNeeded
            };
            
            console.log("📤 Signup request:", { ...requestBody, password: '[HIDDEN]' });
            
            const response = await fetch(`${pythonURI}/api/user`, {
                method: "POST",
                mode: 'cors',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-Origin": "client"
                },
                body: JSON.stringify(requestBody)
            });
            
            console.log("📊 Signup response status:", response.status);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
                console.error("❌ Signup failed:", errorData);
                throw new Error(errorData.message || `Signup failed: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("✅ Signup successful:", data);
            
            messageEl.textContent = "Account created successfully! Redirecting to login...";
            messageEl.style.display = 'block';
            
            // Clear form
            document.getElementById("signupForm").reset();
            
            // Wait a moment then focus on login
            setTimeout(() => {
                document.getElementById("uid").value = uid;
                document.getElementById("uid").focus();
                messageEl.style.display = 'none';
                signupButton.disabled = false;
                signupButton.textContent = 'Sign Up';
            }, 2000);
            
        } catch (error) {
            console.error("❌ Signup Error:", error);
            messageEl.className = 'error';
            messageEl.textContent = `Signup Error: ${error.message}`;
            messageEl.style.display = 'block';
            signupButton.disabled = false;
            signupButton.textContent = 'Sign Up';
        }
        
        return false;
    }
</script>