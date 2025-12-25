const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const adminEmail = "nivlawest1911@gmail.com";

async function grantAdminRole(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Successfully granted Admin privileges to: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error("Error granting admin role:", error);
    process.exit(1);
  }
}

grantAdminRole(adminEmail);
