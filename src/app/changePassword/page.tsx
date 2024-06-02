"use client";
import ChangePassword from "@/components/Pages/ResetPassword/ChangePassword";
import React, { Suspense } from "react";
export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChangePassword />
        </Suspense>
    );
}