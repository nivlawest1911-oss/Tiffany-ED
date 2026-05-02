const { execSync } = require('child_process');
try {
  console.log("Adding DATABASE_URL...");
  execSync('npx vercel env add DATABASE_URL production', { 
    input: 'postgresql://postgres.mpitiluamiidbjqmvbir:M3ZTAF2Hgm2CrmNp@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true'
  });
  console.log("Adding BETTER_AUTH_SECRET...");
  execSync('npx vercel env add BETTER_AUTH_SECRET production', { 
    input: 'ff0454a42ed4bcdb2afc15b7f6c182522dddfb844627e9374433af6b22f60891'
  });
  console.log("Done");
} catch (e) {
  console.error("Error", e);
}
