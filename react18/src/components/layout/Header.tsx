import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../ui/button";
import RenderCounter from "../ui/renderCounter";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header-glass">
      <div className="container-lg flex items-center gap-6 py-4">
        <RenderCounter>
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <img
              src="/fm-logo.png"
              alt="Logo"
              className="w-8 h-8"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <h1 className="text-xl font-semibold">
              The real cost of React re-renders
            </h1>
          </Link>
        </RenderCounter>

        <Button
          onClick={toggleTheme}
          variant="outline"
          className="ml-auto"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <>
              <Sun size={16} />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon size={16} />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
