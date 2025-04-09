import { useEffect, useState } from 'react'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'

export const useGetCallById = (id: string | string[]) => {
	const [call, setCall] = useState<Call | undefined>(undefined)
	const [isCallLoading, setIsCallLoading] = useState<boolean>(true)

	const client = useStreamVideoClient()

	useEffect(() => {
		setCall(undefined)
		setIsCallLoading(true)

		if (!client) return

		if (!id || (Array.isArray(id) && id.length === 0)) {
			setIsCallLoading(false)
			return
		}

		let isMounted = true

		const getCall = async () => {
			try {
				const filterConditions = Array.isArray(id)
					? { id: { $in: id } }
					: { id }

				const { calls } = await client.queryCalls({
					filter_conditions: filterConditions
				})

				if (isMounted) {
					if (calls.length > 0) {
						setCall(calls[0])
					} else {
						console.warn(`Call with id ${JSON.stringify(id)} not found`)
						setCall(undefined)
					}
				}
			} catch (error) {
				console.error('Error fetching call:', error)
				if (isMounted) {
					setCall(undefined)
				}
			} finally {
				if (isMounted) {
					setIsCallLoading(false)
				}
			}
		}

		getCall()
		return () => {
			isMounted = false
		}
	}, [client, id])

	return { call, isCallLoading }
}
