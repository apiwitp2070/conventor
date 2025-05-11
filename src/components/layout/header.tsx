import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "../theme-provider";

export function Header() {
  const { setTheme } = useTheme();

  return (
    <header className="fixed z-10 w-full px-6 py-4 bg-background shadow dark:border-b dark:border-foreground/50">
      <div className="container mx-auto flex justify-between items-center ">
        <img src="/favicon.ico" width={40} height={40} />
        <div className="flex items-center gap-6">
          <div
            className="cursor-pointer hidden dark:block"
            onClick={() => setTheme("light")}
          >
            <MoonIcon size={20} className="text-foreground" />
          </div>
          <div
            className="cursor-pointer dark:hidden"
            onClick={() => setTheme("dark")}
          >
            <SunIcon size={20} className="text-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
