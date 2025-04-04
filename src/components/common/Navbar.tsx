import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

import { Button } from '../ui/Button'
import { DashboardButton } from './DashboardButton'
import { Logo } from './Logo'
import { ThemeSwitcher } from './ThemeSwitcher'

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 border-b">
			<nav className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link
					href="/"
					className="mr-6 flex items-center gap-2 font-mono text-2xl font-semibold transition-opacity hover:opacity-80"
				>
					<Logo />
				</Link>
				<SignedIn>
					<div className="flex items-center gap-4">
						<DashboardButton />
						<ThemeSwitcher />
						<UserButton />
					</div>
				</SignedIn>
				<SignedOut>
					<SignInButton>
						<Button size="sm">Get Started</Button>
					</SignInButton>
				</SignedOut>
			</nav>
		</header>
	)
}
