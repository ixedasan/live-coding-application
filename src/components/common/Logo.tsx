'use client'

import { useState } from 'react'
import { Code, Terminal } from 'lucide-react'
import { useTheme } from 'next-themes'

type SizeOption = 'small' | 'medium' | 'large'
type ThemeOption = 'dark' | 'light' | 'system'

interface LiveCodeLogoProps {
	compact?: boolean
	size?: SizeOption
}

interface SizeConfig {
	container: string
	icon: number
	text: string
	cursor: string
	padding: string
}

interface ThemeColors {
	bg: string
	bgHover: string
	border: string
	text: string
	accent: string
	cursor: string
}

export function Logo({ compact = false, size = 'medium' }: LiveCodeLogoProps) {
	const { resolvedTheme } = useTheme()
	const [hover, setHover] = useState(false)

	const sizeConfig: Record<SizeOption, SizeConfig> = {
		small: {
			container: 'h-6',
			icon: 14,
			text: 'text-xs',
			cursor: 'h-3 w-1',
			padding: 'px-2 py-1'
		},
		medium: {
			container: 'h-8',
			icon: 16,
			text: 'text-sm',
			cursor: 'h-4 w-1.5',
			padding: 'px-3 py-1.5'
		},
		large: {
			container: 'h-10',
			icon: 20,
			text: 'text-base',
			cursor: 'h-5 w-2',
			padding: 'px-4 py-2'
		}
	}

	const currentSize = sizeConfig[size]

	const themeColors: Record<ThemeOption, ThemeColors> = {
		dark: {
			bg: 'bg-slate-900',
			bgHover: 'bg-slate-800',
			border: 'border-slate-700',
			text: 'text-white',
			accent: 'text-emerald-400',
			cursor: 'bg-emerald-400'
		},
		light: {
			bg: 'bg-white',
			bgHover: 'bg-gray-50',
			border: 'border-gray-200',
			text: 'text-slate-800',
			accent: 'text-emerald-600',
			cursor: 'bg-emerald-600'
		},
		system: {
			bg: 'bg-slate-900',
			bgHover: 'bg-slate-800',
			border: 'border-slate-700',
			text: 'text-white',
			accent: 'text-emerald-400',
			cursor: 'bg-emerald-400'
		}
	}

	const currentTheme = (resolvedTheme as ThemeOption) || 'dark'
	const colors = themeColors[currentTheme]

	return (
		<div
			className={`inline-flex items-center ${colors.bg} ${currentSize.padding} rounded-md border shadow-sm ${colors.border} transition-all`}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{
				transform: hover ? 'translateY(-1px)' : 'translateY(0)',
				boxShadow: hover
					? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
					: '0 1px 3px rgba(0, 0, 0, 0.1)'
			}}
		>
			{/* Terminal icon */}
			<Terminal size={currentSize.icon} className={`${colors.accent}`} />

			{!compact && (
				<>
					{/* Logo text */}
					<span
						className={`ml-1 font-semibold tracking-tight ${colors.text} ${currentSize.text}`}
					>
						live<span className={`${colors.accent}`}>code</span>
					</span>

					{/* Code icon (only in non-compact mode) */}
					<Code size={currentSize.icon} className={`ml-1 ${colors.accent}`} />
				</>
			)}

			{/* Blinking cursor */}
			<div
				className={`${currentSize.cursor} ml-1 ${colors.cursor} animate-pulse`}
			/>
		</div>
	)
}
