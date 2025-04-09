'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from 'convex/react'
import { CalendarIcon, CodeIcon, Loader2Icon, TerminalIcon } from 'lucide-react'

import { useUserRole } from '@/hooks/useUserRole'
import { api } from '../../../../convex/_generated/api'
import { Loader } from '../../common/Loader'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card'
import { ActionCard } from './ActionCard'
import { MeetingCard } from './MeetingCard'
import { MeetingModal } from './MeetingModal'
import { QUICK_ACTIONS } from '@/constants'

export function HomePage() {
	const router = useRouter()
	const { isInterviewer, isLoading } = useUserRole()
	const interviews = useQuery(api.interviews.getMyInterviews)
	const [meetingModalState, setMeetingModalState] = useState({
		isOpen: false,
		type: undefined as 'start' | 'join' | undefined
	})

	const handleQuickAction = (title: string) => {
		switch (title) {
			case 'New Call':
				setMeetingModalState({ isOpen: true, type: 'start' })
				break
			case 'Join Interview':
				setMeetingModalState({ isOpen: true, type: 'join' })
				break
			default:
				router.push(`/${title.toLowerCase()}`)
		}
	}

	const closeModal = () =>
		setMeetingModalState({ isOpen: false, type: undefined })

	if (isLoading) return <Loader variant="fullscreen" />

	return (
		<div className="container mx-auto max-w-7xl p-6">
			<WelcomeSection role={isInterviewer ? 'interviewer' : 'candidate'} />

			{isInterviewer ? (
				<>
					<QuickActionsSection onActionSelect={handleQuickAction} />

					<MeetingModal
						isOpen={meetingModalState.isOpen}
						onClose={closeModal}
						title={
							meetingModalState.type === 'join'
								? 'Join Interview Session'
								: 'Start Interview Session'
						}
						isJoinMeeting={meetingModalState.type === 'join'}
					/>
				</>
			) : (
				<CandidateInterviewsSection interviews={interviews} />
			)}
		</div>
	)
}

const WelcomeSection = ({ role }: { role: 'interviewer' | 'candidate' }) => (
	<Card className="mb-10">
		<CardHeader className="pb-3">
			<div className="flex items-center space-x-3">
				<div className="bg-muted rounded-md p-2">
					<TerminalIcon className="text-primary h-6 w-6" />
				</div>
				<CardTitle className="text-3xl">
					Welcome to live<span className="text-primary">code</span>
				</CardTitle>
			</div>
		</CardHeader>
		<CardContent>
			<p className="text-muted-foreground text-lg">
				{role === 'interviewer'
					? 'Manage your coding interviews and assessments with our powerful live collaboration platform.'
					: 'Prepare for your upcoming technical interviews and showcase your coding skills in real-time.'}
			</p>
		</CardContent>
	</Card>
)

const QuickActionsSection = ({
	onActionSelect
}: {
	onActionSelect: (title: string) => void
}) => (
	<>
		<div className="mb-6">
			<h2 className="text-foreground mb-2 text-2xl font-semibold">
				Quick Actions
			</h2>
			<p className="text-muted-foreground">
				Access frequently used features and tools
			</p>
		</div>

		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{QUICK_ACTIONS.map(action => (
				<ActionCard
					key={action.title}
					action={action}
					onClick={() => onActionSelect(action.title)}
				/>
			))}
		</div>
	</>
)

const EmptyState = ({ message }: { message: string }) => (
	<Card className="px-8 py-12 text-center">
		<CardContent className="pt-6">
			<CodeIcon className="text-muted mx-auto mb-4 h-12 w-12" />
			<h3 className="text-foreground mb-2 text-xl font-medium">
				No interviews scheduled
			</h3>
			<p className="text-muted-foreground mx-auto max-w-md">{message}</p>
		</CardContent>
	</Card>
)

const LoadingState = () => (
	<Card>
		<CardContent className="flex flex-col items-center justify-center py-12">
			<Loader2Icon className="text-primary mb-4 h-8 w-8 animate-spin" />
			<p className="text-muted-foreground">
				Loading your interview sessions...
			</p>
		</CardContent>
	</Card>
)

const CandidateInterviewsSection = ({ interviews }) => (
	<>
		<div className="mb-6">
			<div className="flex items-center gap-2">
				<CalendarIcon className="text-primary h-5 w-5" />
				<h2 className="text-foreground text-2xl font-semibold">
					Your Interviews
				</h2>
			</div>
			<p className="text-muted-foreground mt-1">
				View and join your scheduled coding sessions
			</p>
		</div>

		<div className="mt-6">
			{interviews === undefined ? (
				<LoadingState />
			) : interviews.length > 0 ? (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{interviews.map(interview => (
						<MeetingCard key={interview._id} interview={interview} />
					))}
				</div>
			) : (
				<EmptyState message="You currently have no upcoming interview sessions. Check back later or contact your recruiter for more information." />
			)}
		</div>
	</>
)
