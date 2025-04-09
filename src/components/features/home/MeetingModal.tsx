import { useState } from 'react'
import { ArrowRight, Link as LinkIcon, Terminal, Video } from 'lucide-react'

import { useMeetingActions } from '@/hooks/useMeetingActions'
import { cn } from '@/lib/utils'
import { Button } from '../../ui/Button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '../../ui/Dialog'
import { Input } from '../../ui/Input'

interface MeetingModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	isJoinMeeting: boolean
}

export function MeetingModal({
	isOpen,
	onClose,
	title,
	isJoinMeeting
}: MeetingModalProps) {
	const [meetingUrl, setMeetingUrl] = useState('')
	const { createInstantMeeting, joinMeeting } = useMeetingActions()

	const handleStart = () => {
		if (isJoinMeeting) {
			const meetingId = meetingUrl.split('/').pop()
			if (meetingId) joinMeeting(meetingId)
		} else {
			createInstantMeeting()
		}

		setMeetingUrl('')
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
				<div className="bg-primary/10 px-6 py-5">
					<DialogHeader className="items-start gap-1 p-0">
						<div className="text-primary flex items-center gap-2">
							{isJoinMeeting ? (
								<Video className="h-5 w-5" />
							) : (
								<Terminal className="h-5 w-5" />
							)}
							<DialogTitle className="text-foreground font-semibold">
								{title}
							</DialogTitle>
						</div>
						<p className="text-muted-foreground mt-1 text-sm">
							{isJoinMeeting
								? 'Enter a session link or ID to connect with your interviewer'
								: 'Create a new live coding interview session'}
						</p>
					</DialogHeader>
				</div>
				<div className="space-y-4 p-6">
					{isJoinMeeting ? (
						<div className="space-y-2">
							<label
								htmlFor="meeting-url"
								className="block text-sm font-medium"
							>
								Session Link or ID
							</label>
							<div className="relative">
								<div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
									<LinkIcon className="h-4 w-4" />
								</div>
								<Input
									id="meeting-url"
									placeholder="Paste link or enter session ID..."
									value={meetingUrl}
									onChange={e => setMeetingUrl(e.target.value)}
									className="bg-muted/50 border-input focus-visible:ring-primary h-10 py-2 pr-4 pl-9"
								/>
							</div>
						</div>
					) : (
						<div className="flex items-start gap-3">
							<div className="bg-primary/10 text-primary mt-0.5 rounded-full p-2">
								<Terminal className="h-4 w-4" />
							</div>
							<div>
								<h3 className="mb-1 text-sm font-medium">
									New Interview Session
								</h3>
								<p className="text-muted-foreground text-sm">
									You&apos;ll get a shareable link that you can send to
									candidates or other interviewers.
								</p>
							</div>
						</div>
					)}

					<div className="flex justify-end gap-3 pt-3">
						<Button variant="ghost" onClick={onClose} className="h-9 px-4">
							Cancel
						</Button>
						<Button
							onClick={handleStart}
							disabled={isJoinMeeting && !meetingUrl.trim()}
							className={cn(
								'h-9 gap-1.5 px-4',
								isJoinMeeting && !meetingUrl.trim() ? 'opacity-50' : ''
							)}
						>
							{isJoinMeeting ? 'Join Session' : 'Create Session'}
							<ArrowRight className="h-3.5 w-3.5" />
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
