/**
 * Sovereign Human Residency Protocol
 * 
 * Verifies Turnstile tokens against Cloudflare API.
 */

export async function verifyTurnstileToken(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  
  // Sentinel: In production, missing secret key is a critical failure.
  if (!secretKey) {
    console.warn('[SECURITY_WARNING] TURNSTILE_SECRET_KEY is undefined.');
    if (process.env.NODE_ENV === 'production') {
      console.error('[CRITICAL] PRODUCTION SECURITY BYPASS PREVENTED: Turnstile secret missing.');
      return false;
    }
    // Allow non-production environments to pass or use dummy tokens
    return true; 
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (!data.success) {
      console.error('[SECURITY] Turnstile identity verification failed.', data['error-codes']);
    }
    
    return data.success;
  } catch (error) {
    console.error('[SECURITY_CRASH] Turnstile Verification Exception:', error);
    return false;
  }
}
