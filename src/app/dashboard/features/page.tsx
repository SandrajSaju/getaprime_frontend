"use client";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { fetchFeatures } from "../../../../redux/slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import Loader from "@/app/components/Loader";
import useAuth from "@/hooks/useAuth";

export default function FeaturesPage() {
  const dispatch = useAppDispatch();
  const { checkingForLoginState } = useAuth();
  const { features, loading, error } = useAppSelector(
    (state: RootState) => state.profile
  );
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(features?.map((f: any) => f.category)),
  ];

  const filteredFeatures =
    selectedCategory === "All"
      ? features
      : features?.filter((f: any) => f.category === selectedCategory);

  useEffect(() => {
    dispatch(fetchFeatures());
  }, [dispatch]);

  if (loading) return <Loader text="Loading feature comparison table..." />;

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-2">Features</h1>
      <p className="text-gray-500 text-center mb-8">
        Compare plans and find the one that fits your needs.
      </p>

      {/* Category Filter */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {categories?.map((cat: any) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition ${selectedCategory === cat
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-1/3 text-left p-4"></th>
              <th className="text-center p-4 font-semibold">Free</th>
              <th className="text-center p-4 font-semibold">Standard</th>
              <th className="text-center p-4 font-semibold">Premium</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeatures?.map((feature: any, idx: number) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-4 text-gray-800">{feature.name}</td>
                {["Free", "Standard", "Premium"].map((tier) => (
                  <td key={tier} className="text-center p-4">
                    {feature.tiers[tier] ? (
                      <Check className="w-5 h-5 mx-auto text-green-500" />
                    ) : (
                      <X className="w-5 h-5 mx-auto text-red-400" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}