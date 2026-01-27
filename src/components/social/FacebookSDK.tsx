'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        fbAsyncInit: () => void;
        FB: any;
        checkLoginState: () => void;
    }
}

export default function FacebookSDK() {
    useEffect(() => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '1146759363578051', // Use env var or fallback
                cookie: true,
                xfbml: true,
                version: 'v18.0'
            });

            window.FB.AppEvents.logPageView();
        };

        // Load SDK script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            if (fjs && fjs.parentNode) {
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, 'script', 'facebook-jssdk'));

        // Global Helper for checkLoginState
        window.checkLoginState = () => {
            window.FB.getLoginStatus(function (response: any) {
                console.log("FB Login Status:", response);
                // Here you would typically dispatch to your auth handler
            });
        };

    }, []);

    return (
        <>
            {/* Facebook SDK Container */}
            <div id="fb-root"></div>
        </>
    );
}
