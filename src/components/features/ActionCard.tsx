import { cn } from '@/lib/utils'
import { Card } from '../ui/Card'
import { QuickActionType } from '@/constants'

export function ActionCard({
	action,
	onClick
}: {
	action: QuickActionType
	onClick: () => void
}) {
	return (
		<Card
			className="group border-border hover:border-primary/50 relative cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md"
			onClick={onClick}
		>
			<div
				className={cn(
					'absolute inset-0 opacity-90 transition-opacity group-hover:opacity-100',
					action.gradient
				)}
			/>
			<div className="from-primary/0 to-primary/20 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
			<div className="relative size-full p-6">
				<div className="space-y-4">
					<div className="relative">
						<div
							className={cn(
								'absolute -inset-1 rounded-full opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-80',
								`bg-${action.color}/30`
							)}
						/>
						<div
							className={cn(
								'flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105',
								`bg-${action.color}/10`
							)}
						>
							<action.icon className={cn('h-6 w-6', `text-${action.color}`)} />
						</div>
					</div>
					<div className="space-y-1.5">
						<h3 className="text-foreground group-hover:text-primary text-lg font-semibold transition-colors duration-300">
							{action.title}
						</h3>
						<p className="text-muted-foreground line-clamp-2 text-sm">
							{action.description}
						</p>
					</div>
				</div>
				<div className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
			</div>
		</Card>
	)
}
