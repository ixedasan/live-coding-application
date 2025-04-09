'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	CallControls,
	CallingState,
	CallParticipantsList,
	PaginatedGridLayout,
	SpeakerLayout,
	useCallStateHooks
} from '@stream-io/video-react-sdk'
import { LayoutListIcon, LoaderIcon, UsersIcon } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from '@/components/ui/Resizable'
import { EndCallButton } from "./EndCallButton"
import { CodeEditor } from "./CodeEditor"

export function MeetingRoom() {
	const router = useRouter()
	const [layout, setLayout] = useState<'grid' | 'speaker'>('speaker')
	const [showParticipants, setShowParticipants] = useState(false)
	const { useCallCallingState } = useCallStateHooks()

	const callingState = useCallCallingState()

	if (callingState !== CallingState.JOINED) {
		return (
			<div className="flex h-96 items-center justify-center">
				<LoaderIcon className="size-6 animate-spin" />
			</div>
		)
	}

	return (
		<div className="h-[calc(100vh-4rem-1px)]">
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel
					defaultSize={35}
					minSize={25}
					maxSize={100}
					className="relative"
				>
					{/* VIDEO LAYOUT */}
					<div className="absolute inset-0">
						{layout === 'grid' ? <PaginatedGridLayout /> : <SpeakerLayout />}

						{/* PARTICIPANTS LIST OVERLAY */}
						{showParticipants && (
							<div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 absolute top-0 right-0 h-full w-[300px] backdrop-blur">
								<CallParticipantsList
									onClose={() => setShowParticipants(false)}
								/>
							</div>
						)}
					</div>

					{/* VIDEO CONTROLS */}

					<div className="absolute right-0 bottom-4 left-0">
						<div className="flex flex-col items-center gap-4">
							<div className="flex flex-wrap items-center justify-center gap-2 px-4">
								<CallControls onLeave={() => router.push('/')} />

								<div className="flex items-center gap-2">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="outline" size="icon" className="size-10">
												<LayoutListIcon className="size-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem onClick={() => setLayout('grid')}>
												Grid View
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => setLayout('speaker')}>
												Speaker View
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>

									<Button
										variant="outline"
										size="icon"
										className="size-10"
										onClick={() => setShowParticipants(!showParticipants)}
									>
										<UsersIcon className="size-4" />
									</Button>

									<EndCallButton />
								</div>
							</div>
						</div>
					</div>
				</ResizablePanel>

				<ResizableHandle withHandle />

				<ResizablePanel defaultSize={65} minSize={25}>
					<CodeEditor />
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	)
}
