// src/app/shop/[slug]/not-found.tsx
// Custom 404 page for shops

import Link from 'next/link';

export default function ShopNotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-6">
                <h1 className="text-6xl font-light mb-4">404</h1>
                <h2 className="text-xl font-medium mb-4">Shop nicht gefunden</h2>
                <p className="text-neutral-400 mb-8">
                    Der Shop, den du suchst, existiert nicht oder wurde deaktiviert.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
                >
                    Zur Hauptseite
                </Link>
            </div>
        </div>
    );
}
