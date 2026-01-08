import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm animate-pulse">
            <div className="h-64 bg-stone-200"></div>
            <div className="p-5 space-y-3">
                <div className="flex justify-between">
                    <div className="h-6 bg-stone-200 rounded w-3/4"></div>
                    <div className="h-6 bg-stone-200 rounded w-1/6"></div>
                </div>
                <div className="h-4 bg-stone-200 rounded w-1/2"></div>
                <div className="pt-4 flex justify-between items-center">
                    <div className="h-8 bg-stone-200 rounded w-1/3"></div>
                    <div className="h-10 w-10 bg-stone-200 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
