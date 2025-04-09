'use client'

import { useEffect, useState } from 'react'
import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/Tooltip'

type ThemeOption = 'dark' | 'light' | 'system'
type ThemeStyleKind = 'button' | 'dropdown' | 'selectedItem'

interface ThemeSwitcherProps {
	compact?: boolean
}

export function ThemeSwitcher({ compact = false }: ThemeSwitcherProps) {
	const { theme, setTheme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const effectiveTheme = (resolvedTheme as ThemeOption) || 'dark'

	const themeStyles: Record<ThemeStyleKind, Record<ThemeOption, string>> = {
		button: {
			dark: 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200',
			light: 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700',
			system: 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
		},
		dropdown: {
			dark: 'bg-slate-800 border-slate-700 text-slate-200',
			light: 'bg-white border-slate-200 text-slate-700',
			system: 'bg-slate-800 border-slate-700 text-slate-200'
		},
		selectedItem: {
			dark: 'bg-slate-700',
			light: 'bg-slate-100',
			system: 'bg-slate-700'
		}
	}

	const getThemeIcon = () => {
		if (!mounted) return null

		switch (theme) {
			case 'dark':
				return <Moon size={16} className="text-emerald-400" />
			case 'light':
				return <Sun size={16} className="text-amber-400" />
			default:
				return <Laptop size={16} className="text-blue-400" />
		}
	}

	const getCurrentStyles = (styleType: ThemeStyleKind): string => {
		return themeStyles[styleType][effectiveTheme]
	}

	if (!mounted) {
		return (
			<div
				className={`h-9 w-9 ${compact ? 'h-8 w-8' : ''} flex animate-pulse items-center justify-center rounded-md border border-slate-700 bg-slate-800`}
			>
				<div className="h-4 w-4 rounded-full bg-slate-600" />
			</div>
		)
	}

	if (compact) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className={`h-8 w-8 rounded-md ${getCurrentStyles('button')}`}
							onClick={() => {
								if (theme === 'dark') setTheme('light')
								else if (theme === 'light') setTheme('system')
								else setTheme('dark')
							}}
						>
							{getThemeIcon()}
						</Button>
					</TooltipTrigger>
					<TooltipContent
						side="bottom"
						className={getCurrentStyles('dropdown')}
					>
						<p>Toggle theme ({theme})</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className={`h-9 w-9 rounded-md ${getCurrentStyles('button')}`}
				>
					{getThemeIcon()}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className={getCurrentStyles('dropdown')}>
				<DropdownMenuItem
					className={`flex cursor-pointer items-center gap-2 ${theme === 'light' ? getCurrentStyles('selectedItem') : ''}`}
					onClick={() => setTheme('light')}
				>
					<Sun size={16} className="text-amber-400" />
					<span>Light</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					className={`flex cursor-pointer items-center gap-2 ${theme === 'dark' ? getCurrentStyles('selectedItem') : ''}`}
					onClick={() => setTheme('dark')}
				>
					<Moon size={16} className="text-emerald-400" />
					<span>Dark</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					className={`flex cursor-pointer items-center gap-2 ${theme === 'system' ? getCurrentStyles('selectedItem') : ''}`}
					onClick={() => setTheme('system')}
				>
					<Laptop size={16} className="text-blue-400" />
					<span>System</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
