import { useEffect } from 'react';

/** Get On The Rug's policy lives on its own site, getontherug.co, now (October 24, 2026). Builds 1
 *  to 3 of the app link #/get-on-the-rug/privacy and #/get-on-the-rug/terms here, so those routes
 *  forward: the privacy policy to getontherug.co, the terms to Apple's Standard License Agreement,
 *  which the app's later builds link directly. */
export const GET_ON_THE_RUG_PRIVACY = 'https://getontherug.co/privacy';
export const APPLE_STANDARD_EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export function GetOnTheRugRedirect({ to, label }: { to: string; label: string }) {
    useEffect(() => {
        window.location.replace(to);
    }, [to]);

    return (
        <section className="min-h-screen flex items-center justify-center px-6">
            <p className="text-zinc-400 light:text-zinc-600 text-center">
                Get On The Rug's {label} is at{' '}
                <a href={to} className="text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-800">
                    {to.replace(/^https:\/\//, '')}
                </a>
                .
            </p>
        </section>
    );
}
