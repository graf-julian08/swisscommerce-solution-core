export default function ShopBuilderPage({ params }: { params: { shopId: string } }) {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl font-bold mb-4">Shop Builder</h1>
            <p className="text-gray-400">Shop ID: {params.shopId}</p>
        </div>
    );
}
