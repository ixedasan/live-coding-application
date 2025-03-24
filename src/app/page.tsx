import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton
} from '@clerk/nextjs'

export default function Page() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-24">
			<SignedOut>
				<SignInButton />
				<SignUpButton />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</div>
	)
}
