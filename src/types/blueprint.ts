export interface ShopBlueprint {
    meta: {
        shopName: string;
        description: string;
        targetAudience: string;
        vibe: string;
    };
    designSystem: {
        colors: {
            primary: string;
            secondary: string;
            accent: string;
            background: string;
            text: string;
        };
        typography: {
            fontFamilyHeading: string;
            fontFamilyBody: string;
        };
        borderRadius: string; // e.g., "0.5rem"
        spacing: string; // e.g., "relaxed"
    };
    navigation: {
        links: Array<{ label: string; href: string }>;
    };
    pages: Array<{
        path: string;
        name: string;
        description: string;
        components: Array<{
            id: string;
            type: string;
            name: string;
            props?: Record<string, any>;
        }>;
    }>;
    features: {
        hasAuth: boolean;
        hasSearch: boolean;
        hasCart: boolean;
        paymentMethods: string[];
    };
}
