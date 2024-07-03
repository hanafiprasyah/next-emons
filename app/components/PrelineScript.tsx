'use client'

// import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { IStaticMethods } from "preline/preline";
declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

export default function PrelineScript() {
    // const path = usePathname();

    useEffect(() => {
        const loadPreline = async () => {
            await import("preline/preline");

            window.HSStaticMethods.autoInit();
            if (process.env.NODE_ENV === 'development') {
                console.log('HSStaticMethods initialized')
            }
        };

        loadPreline().then(() => {
            if (process.env.NODE_ENV === 'development') {
                console.log('loadPreline function injected')
            }
        })
    }, []);

    return null;
}