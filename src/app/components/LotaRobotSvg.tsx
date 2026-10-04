import React from "react";
import { motion } from "framer-motion";

interface LotaRobotSvgProps {
  className?: string;
  style?: React.CSSProperties;
  theme?: "light" | "dark";
  animateFloating?: boolean;
}

export function LotaRobotSvg({ 
  className = "", 
  style, 
  theme = "dark",
  animateFloating = true
}: LotaRobotSvgProps) {
  const isLight = theme === "light";

  return (
    <motion.div
      className={className}
      animate={animateFloating ? {
        transform: [
          "translateY(0px) rotate(0deg)",
          "translateY(-12px) rotate(1deg)",
          "translateY(0px) rotate(-0.5deg)",
          "translateY(-6px) rotate(0.8deg)",
          "translateY(0px) rotate(0deg)"
        ]
      } : {}}
      transition={animateFloating ? {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
      style={{
        display: "inline-block",
        position: "relative",
        filter: isLight 
          ? "drop-shadow(0 20px 35px rgba(220, 38, 38, 0.18))" 
          : "drop-shadow(0 25px 50px rgba(56, 189, 248, 0.30)) drop-shadow(0 0 30px rgba(6, 182, 212, 0.25))",
        ...style
      }}
    >
      <svg
        viewBox="0 0 500 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          {/* ── Glow Filters ── */}
          <filter id="lotaCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="16" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="lotaSoftAura" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="25" />
          </filter>

          {/* ── Gradients: Metallic Chassis ── */}
          <linearGradient id="chassisWhite" x1="120" y1="40" x2="380" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#F8FAFC" />
            <stop offset="70%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          <linearGradient id="chassisShadow" x1="250" y1="200" x2="250" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="60%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="chassisDark" x1="150" y1="100" x2="350" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* ── Gradients: Visor & Glass ── */}
          <radialGradient id="visorGlass" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="50%" stopColor="#090D16" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          <linearGradient id="visorGlassReflection" x1="180" y1="120" x2="340" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>

          {/* ── Gradients: Cyan Neon Lights ── */}
          <linearGradient id="neonCyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="50%" stopColor="#00F2FE" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <radialGradient id="neonCyanPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A5F3FC" />
            <stop offset="60%" stopColor="#00F2FE" />
            <stop offset="100%" stopColor="#0891B2" />
          </radialGradient>
        </defs>

        {/* ── Background Soft Energy Aura ── */}
        <ellipse 
          cx="250" 
          cy="260" 
          rx="180" 
          ry="170" 
          fill="url(#neonCyanPulse)" 
          opacity={isLight ? "0.15" : "0.28"} 
          filter="url(#lotaSoftAura)" 
        />

        {/* ── TORSO & LOWER BODY (Shoulders, Arms, Chest Plate) ── */}
        <g id="lotaBody">
          {/* Back Collar / Neck Base */}
          <path d="M190 310 C190 290 310 290 310 310 L330 350 C330 370 170 370 170 350 Z" fill="url(#chassisDark)" />

          {/* Glowing Neck Ring Accent */}
          <path d="M210 316 C225 310 275 310 290 316 C280 322 220 322 210 316 Z" fill="url(#neonCyan)" filter="url(#lotaCyanGlow)" />

          {/* Left Shoulder Armor Pod */}
          <circle cx="140" cy="370" r="48" fill="url(#chassisWhite)" />
          <circle cx="140" cy="370" r="44" fill="url(#chassisShadow)" />
          <circle cx="138" cy="368" r="30" fill="url(#chassisDark)" />
          {/* Shoulder Neon Ring */}
          <circle cx="138" cy="368" r="22" stroke="url(#neonCyan)" strokeWidth="6" fill="none" filter="url(#lotaCyanGlow)" />
          <circle cx="138" cy="368" r="8" fill="#67E8F9" filter="url(#lotaCyanGlow)" />

          {/* Right Shoulder Armor Pod */}
          <circle cx="360" cy="370" r="48" fill="url(#chassisWhite)" />
          <circle cx="360" cy="370" r="44" fill="url(#chassisShadow)" />
          <circle cx="362" cy="368" r="30" fill="url(#chassisDark)" />
          {/* Shoulder Neon Ring */}
          <circle cx="362" cy="368" r="22" stroke="url(#neonCyan)" strokeWidth="6" fill="none" filter="url(#lotaCyanGlow)" />
          <circle cx="362" cy="368" r="8" fill="#67E8F9" filter="url(#lotaCyanGlow)" />

          {/* Main Chest Body Plate */}
          <path 
            d="M170 340 Q250 330 330 340 L345 420 Q250 455 155 420 Z" 
            fill="url(#chassisWhite)" 
            stroke="#E2E8F0" 
            strokeWidth="2" 
          />
          {/* Chest Inner Recess */}
          <path 
            d="M190 355 Q250 348 310 355 L320 410 Q250 432 180 410 Z" 
            fill="url(#chassisShadow)" 
          />

          {/* LOTA / AI Glowing Chest Badge */}
          <rect x="210" y="365" width="80" height="24" rx="8" fill="url(#chassisDark)" />
          <text 
            x="250" 
            y="382" 
            textAnchor="middle" 
            fill="#00F2FE" 
            fontSize="13" 
            fontWeight="900" 
            letterSpacing="3" 
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            filter="url(#lotaCyanGlow)"
          >
            LOTA
          </text>
          {/* Under-badge neon accent bar */}
          <rect x="228" y="394" width="44" height="3" rx="1.5" fill="#00F2FE" filter="url(#lotaCyanGlow)" />

          {/* Forearms / Crossed Pose Plate */}
          <g id="lotaArms">
            {/* Left Forearm */}
            <path 
              d="M130 395 C140 450 190 490 250 490 L265 445 C220 445 180 420 170 390 Z" 
              fill="url(#chassisWhite)" 
              stroke="#CBD5E1" 
              strokeWidth="2"
            />
            {/* Right Forearm (Overlapping) */}
            <path 
              d="M370 395 C360 450 310 490 235 490 L220 445 C280 445 320 420 330 390 Z" 
              fill="url(#chassisWhite)" 
              stroke="#CBD5E1" 
              strokeWidth="2"
            />
            {/* Robotic Arm Seams & Cyan Accents */}
            <path d="M165 425 Q205 455 240 460" stroke="url(#neonCyan)" strokeWidth="4" strokeLinecap="round" filter="url(#lotaCyanGlow)" />
            <path d="M335 425 Q295 455 260 460" stroke="url(#neonCyan)" strokeWidth="4" strokeLinecap="round" filter="url(#lotaCyanGlow)" />
            {/* Joint detail pods */}
            <ellipse cx="205" cy="458" rx="8" ry="5" fill="url(#chassisDark)" />
            <ellipse cx="295" cy="458" rx="8" ry="5" fill="url(#chassisDark)" />
          </g>
        </g>

        {/* ── HEAD & HELMET (Sphere Helmet, Ear Audio Pods, Visor, Face) ── */}
        <g id="lotaHead">
          
          {/* Ear Audio Pod - Left (Looking forward-right) */}
          <g id="earLeft">
            <ellipse cx="120" cy="190" rx="34" ry="46" fill="url(#chassisWhite)" transform="rotate(-6 120 190)" />
            <ellipse cx="118" cy="190" rx="26" ry="38" fill="url(#chassisDark)" transform="rotate(-6 118 190)" />
            {/* Outer Cyan Ring */}
            <ellipse 
              cx="118" 
              cy="190" 
              rx="20" 
              ry="30" 
              stroke="url(#neonCyan)" 
              strokeWidth="5" 
              fill="none" 
              filter="url(#lotaCyanGlow)" 
              transform="rotate(-6 118 190)" 
            />
            {/* Inner Core */}
            <ellipse cx="118" cy="190" rx="10" ry="16" fill="#00F2FE" filter="url(#lotaCyanGlow)" transform="rotate(-6 118 190)" />
          </g>

          {/* Ear Audio Pod - Right */}
          <g id="earRight">
            <ellipse cx="380" cy="190" rx="34" ry="46" fill="url(#chassisWhite)" transform="rotate(6 380 190)" />
            <ellipse cx="382" cy="190" rx="26" ry="38" fill="url(#chassisDark)" transform="rotate(6 382 190)" />
            {/* Outer Cyan Ring */}
            <ellipse 
              cx="382" 
              cy="190" 
              rx="20" 
              ry="30" 
              stroke="url(#neonCyan)" 
              strokeWidth="5" 
              fill="none" 
              filter="url(#lotaCyanGlow)" 
              transform="rotate(6 382 190)" 
            />
            {/* Inner Core */}
            <ellipse cx="382" cy="190" rx="10" ry="16" fill="#00F2FE" filter="url(#lotaCyanGlow)" transform="rotate(6 382 190)" />
          </g>

          {/* Main Helmet Dome Outer Sphere */}
          <ellipse cx="250" cy="180" rx="135" ry="140" fill="url(#chassisWhite)" />
          <ellipse cx="250" cy="180" rx="135" ry="140" fill="url(#chassisShadow)" opacity="0.3" />

          {/* Helmet Top Specular Reflection */}
          <path 
            d="M170 85 C220 50 280 50 330 85 C300 70 200 70 170 85 Z" 
            fill="#FFFFFF" 
            opacity="0.9" 
          />

          {/* Dark Glass Visor Bezel (Chassis Surround) */}
          <rect 
            x="160" 
            y="95" 
            width="180" 
            height="160" 
            rx="52" 
            fill="url(#chassisDark)" 
            stroke="#1E293B" 
            strokeWidth="3" 
          />

          {/* Dark Glass Visor Screen */}
          <rect 
            x="166" 
            y="101" 
            width="168" 
            height="148" 
            rx="46" 
            fill="url(#visorGlass)" 
          />

          {/* Visor Diagonal Light Sweep Reflection */}
          <path 
            d="M175 110 Q250 95 325 110 L320 145 Q250 125 180 155 Z" 
            fill="url(#visorGlassReflection)" 
          />

          {/* ── ROBOT FACE: Glowing Cyan Eyes & Cheerful Smile (Facing Rightwards into page) ── */}
          <g id="lotaFace">
            {/* Left Eye (Slightly larger, looking slightly right) */}
            <g transform="translate(195, 155)">
              <ellipse cx="14" cy="16" rx="16" ry="20" fill="url(#neonCyanPulse)" filter="url(#lotaCyanGlow)" />
              <ellipse cx="14" cy="16" rx="13" ry="17" fill="#67E8F9" />
              {/* Pupil gleam */}
              <circle cx="10" cy="10" r="5" fill="#FFFFFF" />
            </g>

            {/* Right Eye (Perspective foreshortened, looking right) */}
            <g transform="translate(262, 155)">
              <ellipse cx="14" cy="16" rx="16" ry="20" fill="url(#neonCyanPulse)" filter="url(#lotaCyanGlow)" />
              <ellipse cx="14" cy="16" rx="13" ry="17" fill="#67E8F9" />
              {/* Pupil gleam */}
              <circle cx="10" cy="10" r="5" fill="#FFFFFF" />
            </g>

            {/* Cute Glowing Smile */}
            <path 
              d="M236 198 Q252 208 268 198" 
              stroke="#00F2FE" 
              strokeWidth="4" 
              strokeLinecap="round" 
              fill="none" 
              filter="url(#lotaCyanGlow)" 
            />

            {/* Subtle Cheek Blushes */}
            <ellipse cx="196" cy="188" rx="8" ry="4" fill="#00F2FE" opacity="0.35" filter="url(#lotaCyanGlow)" />
            <ellipse cx="288" cy="188" rx="8" ry="4" fill="#00F2FE" opacity="0.35" filter="url(#lotaCyanGlow)" />
          </g>

          {/* Chin Seam / Plate Accent */}
          <path d="M220 278 Q250 286 280 278" stroke="url(#neonCyan)" strokeWidth="3" strokeLinecap="round" opacity="0.8" filter="url(#lotaCyanGlow)" />
        </g>

      </svg>
    </motion.div>
  );
}
