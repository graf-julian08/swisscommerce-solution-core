
import React from 'react';
import { notFound } from 'next/navigation';
import LuxuryHeaderDesign1 from '@/components/site-components/fashion/header/Design1';
import LuxuryHeaderDesign2 from '@/components/site-components/fashion/header/Design2';
import LuxuryHeaderDesign3 from '@/components/site-components/fashion/header/Design3';
import LuxuryHeaderDesign4 from '@/components/site-components/fashion/header/Design4';
import LuxuryHeaderDesign5 from '@/components/site-components/fashion/header/Design5';
import LuxuryHeaderDesign6 from '@/components/site-components/fashion/header/Design6';
import LuxuryHeaderDesign7 from '@/components/site-components/fashion/header/Design7';
import LuxuryHeaderDesign8 from '@/components/site-components/fashion/header/Design8';
import LuxuryHeaderDesign9 from '@/components/site-components/fashion/header/Design9';
import LuxuryHeaderDesign10 from '@/components/site-components/fashion/header/Design10';
import LuxuryHeaderDesign11 from '@/components/site-components/fashion/header/Design11';

// Registry of available designs
const DESIGNS: Record<string, React.ComponentType> = {
    'design1': LuxuryHeaderDesign1,
    'design2': LuxuryHeaderDesign2,
    'design3': LuxuryHeaderDesign3,
    'design4': LuxuryHeaderDesign4,
    'design5': LuxuryHeaderDesign5,
    'design6': LuxuryHeaderDesign6,
    'design7': LuxuryHeaderDesign7,
    'design8': LuxuryHeaderDesign8,
    'design9': LuxuryHeaderDesign9,
    'design10': LuxuryHeaderDesign10,
    'design11': LuxuryHeaderDesign11,
};

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function HeaderLabPage({ params }: PageProps) {
    // Await params in Next.js 15+
    const resolvedParams = await params;
    const id = resolvedParams.id.toLowerCase().replace('.tsx', ''); // Handle loose imports like "design1.tsx"

    const Component = DESIGNS[id];

    if (!Component) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            {/* The Component */}
            <Component />
        </div>
    );
}
