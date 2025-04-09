'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk'

import { Loader } from '@/components/common/Loader'
import { streamTokenProvider } from '@/actions/stream.actions'

export const StreamClientProvider = ({
	children
}: PropsWithChildren<unknown>) => {
	const [streamVideoClient, setStreamVideoClient] =
		useState<StreamVideoClient>()
	const { user, isLoaded } = useUser()

	useEffect(() => {
		if (!isLoaded || !user) return

		const client = new StreamVideoClient({
			apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
			user: {
				id: user?.id,
				name: user?.firstName || '' + ' ' + user?.lastName || '' || user?.id,
				image: user?.imageUrl
			},
			tokenProvider: streamTokenProvider
		})

		setStreamVideoClient(client)
	}, [user, isLoaded])

	if (!streamVideoClient) return <Loader variant="fullscreen" />

	return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>
}
