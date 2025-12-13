import { Suspense } from 'react';
import { AdminDashboard } from '@/app/components/admin/AdminDashboard';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardLoading() {
    return (
        <div className="flex flex-col gap-6">
            <Skeleton className="h-10 w-1/3" />
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-96 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
        </div>
    )
}

export default function AdminDashboardPage() {
    return (
        <Suspense fallback={<DashboardLoading />}>
            <AdminDashboard />
        </Suspense>
    )
}
