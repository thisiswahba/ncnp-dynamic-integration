"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";
import { useLanguage } from "@/app/contexts/language-context";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const { language } = useLanguage();
  const isRTL = language === "ar";

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Anchor toasts to the leading edge of the active language so RTL
      // toasts render on the right and LTR toasts render on the left.
      // Also forces the toast container's text direction to match the
      // active language, preventing English copy from inheriting `rtl`
      // and pushing trailing punctuation to the visual start.
      dir={isRTL ? "rtl" : "ltr"}
      position={isRTL ? "top-right" : "top-left"}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
