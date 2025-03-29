import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="fixed z-10 w-full px-6 py-4 bg-background shadow dark:border-b dark:border-foreground/50">
      <div className="container mx-auto flex justify-between items-center ">
        <img src="/favicon.ico" width={40} height={40} />
        <div className="flex items-center gap-6">
          <div
            className="cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" && (
              <MoonIcon size={20} className="text-foreground" />
            )}
            {theme === "light" && (
              <SunIcon size={20} className="text-foreground" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
