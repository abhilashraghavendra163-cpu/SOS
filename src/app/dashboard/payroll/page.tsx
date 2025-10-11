import { MyPayrollCard } from "@/app/components/user/MyPayrollCard";
import { PayslipsCard } from "@/app/components/user/PayslipsCard";

export default function PayrollPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MyPayrollCard />
            <PayslipsCard />
        </div>
    )
}
