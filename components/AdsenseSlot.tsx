"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

export function AdsenseSlot() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            // optional: handle error
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8579465290654846"
            data-ad-slot="8743355838"
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
}
