"use client";

import React, { useState, useEffect, ReactNode } from "react";
import ContactSlider from "./ContactSlider";

export interface ContactData {
  contact_email?: string;
  linkedin_url?: string;
}

interface RootClientWrapperProps {
  children?: ReactNode;
  contactData?: ContactData | null;
}

export default function RootClientWrapper({
  children,
  contactData,
}: RootClientWrapperProps) {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const closeSlider = () => setIsSliderOpen(false);

  useEffect(() => {
    const handleOpen = () => setIsSliderOpen(true);
    window.addEventListener("open-contact-slider", handleOpen);
    return () => window.removeEventListener("open-contact-slider", handleOpen);
  }, []);

  return (
    <>
      {children}
      <ContactSlider
        isOpen={isSliderOpen}
        onClose={closeSlider}
        contactData={contactData}
      />
    </>
  );
}

export function triggerContactSlider() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-contact-slider"));
  }
}