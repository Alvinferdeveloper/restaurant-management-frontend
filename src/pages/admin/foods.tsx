import FoodForm from "@/components/admin/FoodForm";
import FoodList from "@/components/admin/FoodList";

export default function Foods() {
    return (
        <div className="px-8 py-10">
            <FoodForm />
            <FoodList />
        </div>
    )
}