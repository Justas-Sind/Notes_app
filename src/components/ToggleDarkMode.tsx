import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function ToggleDarkMode() {
  const [enabled, setEnabled] = useState(false);

  if(enabled) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');

  return (
    <div className="">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-purple-600" : "bg-slate-400"}
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
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
