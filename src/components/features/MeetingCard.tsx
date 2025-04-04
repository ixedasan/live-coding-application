import { format } from 'date-fns'
import { CalendarIcon, Clock, Code, Terminal, User, Video } from 'lucide-react'

import { useMeetingActions } from '@/hooks/useMeetingActions'
import { cn, getMeetingStatus } from '@/lib/utils'
import { Doc } from '../../../convex/_generated/dataModel'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '../ui/Card'

type Interview = Doc<'interviews'>

export function MeetingCard({ interview }: { interview: Interview }) {
	const { joinMeeting } = useMeetingActions()

	const status = getMeetingStatus(interview)
	const formattedDate = format(
		new Date(interview.startTime),
		'EEEE, MMMM d · h:mm a'
	)

	const statusConfig = {
		live: {
			variant: 'default' as const,
			icon: Video,
			label: 'Live Now',
			iconClass: 'animate-pulse',
			bgClass: 'bg-primary/10'
		},
		upcoming: {
			variant: 'secondary' as const,
			icon: Clock,
			label: 'Upcoming',
			iconClass: '',
			bgClass: 'bg-secondary/10'
		},
		completed: {
			variant: 'outline' as const,
			icon: Code,
			label: 'Completed',
			iconClass: '',
			bgClass: 'bg-muted'
		}
	}

	const statusProps = statusConfig[status] || statusConfig.upcoming

	return (
		<Card className="border-border hover:border-primary/20 overflow-hidden transition-all duration-300 hover:shadow-md">
			<div
				className={cn(
					'h-1 w-full',
					status === 'live'
						? 'bg-primary'
						: status === 'upcoming'
							? 'bg-secondary'
							: 'bg-muted'
				)}
			/>
			<CardHeader className="space-y-2 pb-3">
				<div className="flex items-center justify-between">
					<div className="text-muted-foreground flex items-center gap-2 text-sm">
						<CalendarIcon className="text-primary h-4 w-4" />
						{formattedDate}
					</div>

					<Badge
						variant={statusProps.variant}
						className="flex items-center gap-1.5"
					>
						<statusProps.icon
							className={cn('h-3 w-3', statusProps.iconClass)}
						/>
						{statusProps.label}
					</Badge>
				</div>
				<CardTitle className="line-clamp-1 flex items-center gap-2">
					<Terminal className="text-primary h-4 w-4" />
					{interview.title}
				</CardTitle>
				{interview.description && (
					<CardDescription className="line-clamp-2">
						{interview.description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className="pb-4">
				{interview.interviewerIds && interview.interviewerIds.length > 0 && (
					<div className="text-muted-foreground mb-3 flex items-center text-sm">
						<div className="flex items-center gap-2">
							<div
								className={cn(
									'flex h-7 w-7 items-center justify-center rounded-full',
									statusProps.bgClass
								)}
							>
								<User className="h-3.5 w-3.5" />
							</div>
							<span>
								Interviewer{interview.interviewerIds.length > 1 ? 's' : ''}:{' '}
								{interview.interviewerIds.length}
							</span>
						</div>
					</div>
				)}

				{status === 'live' && (
					<Button
						className="group relative w-full overflow-hidden"
						onClick={() => joinMeeting(interview.streamCallId)}
					>
						<div className="bg-primary/20 absolute inset-0 w-0 transition-all duration-300 group-hover:w-full" />
						<span className="relative flex items-center gap-2">
							<Video className="h-4 w-4" />
							Join Session
						</span>
					</Button>
				)}
				{status === 'upcoming' && (
					<Button
						variant="outline"
						className="text-muted-foreground w-full border-dashed"
						disabled
					>
						<Clock className="mr-2 h-4 w-4" />
						Waiting to Start
					</Button>
				)}
				{status === 'completed' && (
					<Button variant="secondary" className="w-full">
						<Code className="mr-2 h-4 w-4" />
						View Recording
					</Button>
				)}
			</CardContent>
		</Card>
	)
}
