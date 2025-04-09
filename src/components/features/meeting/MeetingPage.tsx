'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'

import { Loader } from '@/components/common/Loader'
import { MeetingSetup } from '@/components/features/meeting/MeetingSetup'
import { useGetCallById } from '@/hooks/useGetCallById'
import { MeetingRoom } from './MeetingRoom'

export function MeetingPage() {
	const { id } = useParams()
	const { isLoaded } = useUser()
	const { call, isCallLoading } = useGetCallById(id)

	const [isSetupComplete, setIsSetupComplete] = useState(false)

	if (!isLoaded || isCallLoading) return <Loader />

	return (
		<StreamCall call={call}>
			<StreamTheme>
				{!isSetupComplete ? (
					<MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
				) : (
					<MeetingRoom />
				)}
			</StreamTheme>
		</StreamCall>
	)
}
