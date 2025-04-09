import type { Metadata } from 'next'

import { HomePage } from '@/components/features/home/HomePage'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	...NO_INDEX_PAGE
}

export default function Page() {
	return <HomePage />
}
