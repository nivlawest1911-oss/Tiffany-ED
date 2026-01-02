# Deployment Instructions

The application code is fully production-ready. However, due to Windows security restrictions (symlink creation), the automated deployment tool cannot finalize the upload.

**Please follow these steps to deploy your application:**

1.  **Open PowerShell as Administrator**
    *   Search for "PowerShell" in your Start menu.
    *   Right-click and select **"Run as administrator"**.

2.  **Navigate to the project folder**
    Copy and paste this command:
    ```powershell
    cd c:\Users\nivla\edintel-app
    ```

3.  **Deploy to Firebase**
    Run the deployment command:
    ```powershell
    firebase deploy
    ```

**Verification**
Once the command completes, your live application will be available at:
👉 **https://studio-9997686479-ca258.web.app**

## Summary of Recent Updates
*   **Stripe Integration**: Dynamic pricing with "Monthly/Annual" toggles and secure fallbacks.
*   **Identity**: "Full Legal Name" field added to signup; Personalized "Welcome" message in Archive.
*   **Dashboards**: Fixed chart visibility issues on the Board page.
*   **Security**: Updated Firestore rules for public pricing access and user data protection.
