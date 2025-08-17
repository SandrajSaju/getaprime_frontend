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

      {/* Unlocked View */}
      {/* {feature.unlocked ? (
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-5">Key Benefits</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feature.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition"
                >
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-5">Usage Examples</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {feature.examples.map((ex) => (
                <div
                  key={ex.title}
                  className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
                >
                  <div className="bg-gray-200 h-44 flex items-center justify-center">
                    <span className="text-gray-500">{ex.title}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{ex.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
          <div className="flex items-center gap-3">
            <LockClosedIcon className="h-8 w-8 text-gray-500" />
            <h2 className="text-2xl font-bold">Unlock {feature.name}</h2>
          </div>
          <p className="text-gray-600">
            This premium feature helps you gain valuable insights and drive
            growth. Upgrade to access all the tools you need for success.
          </p>
          <h3 className="font-semibold mt-4">What you'll get:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {feature.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="mt-6">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium shadow-lg hover:from-purple-600 hover:to-indigo-700 transition"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}