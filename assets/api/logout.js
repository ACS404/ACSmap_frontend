import { pythonURI, fetchOptions } from './config.js';

export async function handleLogout() {
    console.log("🚪 Logging out...");
    
    try {
        const response = await fetch(pythonURI + '/api/authenticate', {
            ...fetchOptions,
            method: 'DELETE',
            credentials: 'include' // Important!
        });
        
        console.log("📊 Logout response status:", response.status);
        
        if (!response.ok) {
            console.error('❌ Logout failed:', response.status);
        } else {
            console.log("✅ Logout successful");
        }
        
        // Clear any local storage/session storage if you're using it
        localStorage.clear();
        sessionStorage.clear();
        
        return true;
    } catch (e) {
        console.error('❌ Python logout failed:', e);
        return false;
    }
}