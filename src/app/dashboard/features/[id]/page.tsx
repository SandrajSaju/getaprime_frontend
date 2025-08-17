"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { fetchFeatureDetailsbyId } from "../../../../../redux/slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import Loader from "@/app/components/Loader";
import useAuth from "@/hooks/useAuth";

export default function FeatureDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { checkingForLoginState } = useAuth();
  const { featureDetails, featureDetailsLoading, error } = useAppSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    dispatch(fetchFeatureDetailsbyId(id));
  }, [dispatch]);

  if (featureDetailsLoading) return <Loader text="Loading Feature Details..." />;

  return (
    <div className="p-8 space-y-10 px-10">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-90" />
        <div className="relative p-10 text-white">
          <span className="px-3 py-1 text-sm bg-white/20 rounded-full backdrop-blur-sm">
            {featureDetails?.category}
          </span>
          <h1 className="text-4xl font-extrabold mt-4">{featureDetails?.name}</h1>
          <p className="text-lg max-w-3xl mt-3">{featureDetails?.description}</p>
        </div>
      </div>
      <div className="space-y-8 px-10">
        {/* Overview */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
          <p className="mt-2 text-gray-600 leading-relaxed">
            This feature helps businesses streamline their workflow by automating
            repetitive tasks and improving collaboration. It provides detailed insights,
            customization options, and seamless integration with other tools in your
            workspace.
          </p>
        </section>

        {/* Key Benefits */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Key Benefits</h2>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600">
            <li>Boosts team productivity with automation.</li>
            <li>Provides real-time insights and analytics.</li>
            <li>Simple and intuitive user interface.</li>
            <li>Fully customizable to match your workflow.</li>
          </ul>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">How It Works</h2>
          <ol className="list-decimal list-inside mt-3 space-y-2 text-gray-600">
            <li>Enable the feature in your settings panel.</li>
            <li>Configure preferences based on your needs.</li>
            <li>Integrate with your existing tools and data.</li>
            <li>Start using it in your daily workflow instantly.</li>
          </ol>
        </section>

        {/* Example Use Case */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Example Use Case</h2>
          <p className="mt-2 text-gray-600 leading-relaxed">
            Imagine your sales team spends hours manually updating customer records.
            With this feature, every update is automated, saving hours of work each week
            while ensuring data accuracy. As a result, your team can focus more on
            engaging with leads instead of handling repetitive tasks.
          </p>
        </section>
      </div>
    </div>
  );
}