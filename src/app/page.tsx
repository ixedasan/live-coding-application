import { SignInButton } from '@clerk/nextjs'

export default function Page() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-24">
			<SignInButton />
		</div>
	)
}
