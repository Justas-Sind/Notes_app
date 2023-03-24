import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useEffect } from "react";

export default function ToggleDarkMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setEnabled(true);
    }
  }, []);

  function handleTheme() {
    if (enabled) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setEnabled(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setEnabled(true);
    }
  }

  return (
    <div className="">
      <Switch
        checked={enabled}
        onClick={() => handleTheme()}
        className={`${enabled ? "bg-purple-600" : "bg-slate-400"}
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full outline-2 outline-purple-300 transition-colors duration-200 ease-in-out focus:outline focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Dark Mode Switch</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-6" : "translate-x-1"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
