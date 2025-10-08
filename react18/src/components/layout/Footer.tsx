import * as React from "react";
import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  TwitchIcon,
  FacebookIcon,
} from "lucide-react";
import RenderCounter from "../ui/renderCounter";

// Twitter/X icon (lucide-react doesn't have X icon, so we'll use a custom SVG)
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// TikTok icon
const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/emplv" },
    { name: "Website", icon: Globe, url: "https://emp.lv" },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/emplv.dev",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      url: "https://www.facebook.com/emplv.dev",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/emplv/",
    },
    { name: "X", icon: XIcon, url: "https://x.com/empdotlv" },
    {
      name: "TikTok",
      icon: TikTokIcon,
      url: "https://www.tiktok.com/@emplv.dev",
    },
    { name: "Twitch", icon: TwitchIcon, url: "https://www.twitch.tv/emplv" },
  ];

  return (
    <footer className="border-t border-border">
      <RenderCounter className="container-lg py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Emīls Pļavenieks
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label={link.name}
                  title={link.name}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </RenderCounter>
    </footer>
  );
}
