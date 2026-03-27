function handleResetRequest(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    
    // Reset error message
    emailError.style.display = 'none';
    
    // Basic email validation
    if (!email) {
        emailError.textContent = 'الرجاء إدخال البريد الإلكتروني';
        emailError.style.display = 'block';
        return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        emailError.textContent = 'الرجاء إدخال بريد إلكتروني صحيح';
        emailError.style.display = 'block';
        return false;
    }

    // Here you would typically:
    // 1. Send a request to your backend
    // 2. Generate a reset token
    // 3. Send an email with reset link
    
    // For demo purposes, we'll just show the success message
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
    
    // You can also send an actual email using your backend service
    console.log('Password reset requested for:', email);
    
    return false;
}
