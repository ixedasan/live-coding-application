import type { PropsWithChildren } from 'react'

import { StreamClientProvider } from '@/providers/StreamClientProvider'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <StreamClientProvider>{children}</StreamClientProvider>
}
