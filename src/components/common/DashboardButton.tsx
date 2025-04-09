'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SparklesIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { useUserRole } from '@/hooks/useUserRole'
import { Button } from '../ui/Button'

export function DashboardButton() {
	const { isCandidate, isLoading } = useUserRole()
	const { resolvedTheme } = useTheme()
	const [hover, setHover] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (isCandidate || isLoading) return null

	const isDark = mounted ? resolvedTheme === 'dark' : true

	return (
		<Link href={'/dashboard'}>
			<Button
				className={`relative gap-2 border font-medium transition-all ${
					isDark
						? 'border-slate-700 bg-slate-800 text-white hover:bg-slate-700'
						: 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
				}`}
				size={'sm'}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				style={{
					transform: hover ? 'translateY(-1px)' : 'translateY(0)',
					boxShadow: hover
						? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
						: '0 1px 3px rgba(0, 0, 0, 0.1)'
				}}
			>
				<div className="relative">
					<div
						className={`absolute -inset-1 rounded-full opacity-70 blur-sm ${
							isDark ? 'bg-emerald-900' : 'bg-emerald-100'
						}`}
						style={{
							opacity: hover ? 0.7 : 0.4,
							transition: 'opacity 0.2s ease'
						}}
					/>
					<SparklesIcon
						className={`relative size-4 ${
							isDark ? 'text-emerald-400' : 'text-emerald-600'
						}`}
					/>
				</div>
				<span>Dashboard</span>
			</Button>
		</Link>
	)
}
