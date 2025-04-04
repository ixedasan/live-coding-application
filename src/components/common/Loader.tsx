'use client'

import { Loader2, Terminal } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface LoaderProps {
	variant?: 'default' | 'minimal' | 'fullscreen' | 'inline'
	text?: string
	className?: string
}

export function Loader({
	variant = 'default',
	text = 'Loading...',
	className
}: LoaderProps) {
	if (variant === 'fullscreen') {
		return (
			<div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
				<Card className="relative p-8 shadow-lg">
					<div className="flex flex-col items-center">
						<LoaderAnimation />
						<p className="text-muted-foreground mt-4 animate-pulse">{text}</p>
					</div>
				</Card>
			</div>
		)
	}

	if (variant === 'minimal') {
		return <LoaderAnimation className={className} />
	}

	if (variant === 'inline') {
		return (
			<div className={cn('inline-flex items-center gap-2', className)}>
				<Loader2 className="text-primary h-4 w-4 animate-spin" />
				<span className="text-muted-foreground text-sm">{text}</span>
			</div>
		)
	}

	return (
		<div
			className={cn('flex flex-col items-center justify-center p-8', className)}
		>
			<LoaderAnimation />
			<p className="text-muted-foreground mt-4 animate-pulse">{text}</p>
		</div>
	)
}

function LoaderAnimation({ className }: { className?: string }) {
	return (
		<div className={cn('relative', className)}>
			<div className="bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-lg" />

			<div className="relative flex animate-bounce items-center justify-center">
				<div className="bg-primary/30 animate-spin-slow absolute inset-0 rotate-45 rounded-lg" />
				<div className="bg-card border-border z-10 flex h-16 w-16 items-center justify-center rounded-lg border shadow-lg">
					<Terminal className="text-primary h-8 w-8 animate-pulse" />
				</div>
			</div>

			<div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 transform items-center space-x-3 pt-2">
				<div className="text-primary animate-fade-in-1 font-mono text-lg">{`{`}</div>
				<div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
				<div className="text-primary animate-fade-in-2 font-mono text-lg">{`}`}</div>
			</div>
		</div>
	)
}
