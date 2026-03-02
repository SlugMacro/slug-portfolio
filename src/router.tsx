import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/components/layout/RootLayout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

const CaseStudyPage = React.lazy(() => import("@/pages/CaseStudyPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      {
        path: "case-studies/:slug",
        element: (
          <React.Suspense fallback={null}>
            <CaseStudyPage />
          </React.Suspense>
        ),
      },
    ],
  },
]);
