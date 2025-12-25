const admin = require('firebase-admin');
const fs = require('fs');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function exportConsents() {
  try {
    const snapshot = await db.collection('parental_consents').orderBy('timestamp', 'desc').get();
    const data = snapshot.docs.map(doc => {
      const d = doc.data();
      return `${doc.id},${d.parentName},${d.studentName},${d.timestamp?.toDate().toISOString()},${d.status}`;
    });

    const csvContent = "ID,Parent,Student,Timestamp,Status\n" + data.join("\n");
    fs.writeFileSync('prichard_consents_backup.csv', csvContent);
    console.log("✅ Forensic Backup Created: prichard_consents_backup.csv");
  } catch (err) {
    console.error("Export failed:", err);
  }
}

exportConsents();
