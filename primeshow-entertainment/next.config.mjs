const nextConfig = {
  images: { unoptimized: true },
  poweredByHeader:false,
  compress:true,
  async headers(){return[{source:"/(.*)",headers:[{key:"X-Content-Type-Options",value:"nosniff"},{key:"X-Frame-Options",value:"SAMEORIGIN"},{key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},{key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=(), payment=()"},{key:"Cross-Origin-Opener-Policy",value:"same-origin"},{key:"Strict-Transport-Security",value:"max-age=63072000; includeSubDomains; preload"},{key:"Content-Security-Policy",value:"default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self' mailto: https://wa.me; img-src 'self' data: blob: https:; media-src 'self' https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.clarity.ms; frame-src https://www.youtube-nocookie.com; upgrade-insecure-requests"}]}]}
};

export default nextConfig;
