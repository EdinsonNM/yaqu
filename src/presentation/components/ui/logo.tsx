import { cn } from "@/lib/utils"
import { useTheme } from "@/components/ui/theme-provider"

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export function Logo({ width = 100, height, className }: LogoProps) {
  const { theme } = useTheme()
  const strokeColor = theme === "dark" ? "#3498DB" : "#3498DB"
  const circleColor = theme === "dark" ? "#3498DB" : "#3498DB"
  
  const calculatedHeight = height || (width * 588) / 1512 // Mantener proporción original

  return (
    <svg
      width={width}
      height={calculatedHeight}
      viewBox="0 0 1512 588"
      className={cn("", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M404.5 556.5C1073 548.5 998 634.5 1171.5 128.5M30 64.5H880.5C915.167 73.0001 989.1 110.3 1007.5 191.5C1025.9 272.7 1013.5 347.167 999.5 379.5" 
        stroke={strokeColor} 
        strokeWidth="60" 
        strokeLinecap="round"
      />
      <path 
        d="M160 177H868" 
        stroke={strokeColor} 
        strokeWidth="60" 
        strokeLinecap="round"
      />
      <path 
        d="M280 287H936" 
        stroke={strokeColor} 
        strokeWidth="60" 
        strokeLinecap="round"
      />
      <path 
        d="M502 406H917.5" 
        stroke={strokeColor} 
        strokeWidth="60" 
        strokeLinecap="round"
      />
      <circle 
        cx="1319" 
        cy="193" 
        r="193" 
        fill={circleColor}
      />
      <circle 
        cx="1318.5" 
        cy="193.5" 
        r="147.5" 
        fill={theme === "dark" ? "#000000" : "#ffffff"}
      />
      <circle 
        cx="1319" 
        cy="193" 
        r="102" 
        fill={circleColor}
      />
    </svg>
  )
}
