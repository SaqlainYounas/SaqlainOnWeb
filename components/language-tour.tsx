"use client";

import { useEffect } from "react";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import { offset } from "@floating-ui/dom";
import { useContent } from "@/lib/contexts/i18n-context";

const TOUR_KEY = "language-tour-shown";

export default function LanguageTour() {
  const { languageTour } = useContent();

  useEffect(() => {
    if (localStorage.getItem(TOUR_KEY)) return;

    const timeout = setTimeout(() => {
      const target = document.querySelector("[data-tour='language-selector']");
      if (!target) return;

      const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
          scrollTo: false,
          cancelIcon: { enabled: false },
          modalOverlayOpeningRadius: 4,
          modalOverlayOpeningPadding: 6,
          classes: "shepherd-theme-custom",
        },
      });

      tour.addStep({
        id: "language-select",
        attachTo: { element: "[data-tour='language-selector']", on: "bottom-end" },
        floatingUIOptions: { middleware: [offset(10)] },
        title: languageTour.title,
        text: languageTour.text,
        buttons: [
          {
            text: languageTour.button,
            action() {
              localStorage.setItem(TOUR_KEY, "1");
              tour.complete();
            },
            classes: "shepherd-button-primary",
          },
        ],
      });

      tour.start();
    }, 800);

    return () => clearTimeout(timeout);
  }, [languageTour]);

  return null;
}
