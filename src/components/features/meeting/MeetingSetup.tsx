import { useEffect, useState } from 'react'
import {
	DeviceSettings,
	useCall,
	VideoPreview
} from '@stream-io/video-react-sdk'
import {
	ArrowRight,
	CameraIcon,
	Code,
	MicIcon,
	SettingsIcon,
	Terminal
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '../../ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '../../ui/Card'
import { Switch } from '../../ui/Switch'

export function MeetingSetup({
	onSetupComplete
}: {
	onSetupComplete: () => void
}) {
	const [isCameraDisabled, setIsCameraDisabled] = useState(true)
	const [isMicDisabled, setIsMicDisabled] = useState(false)

	const call = useCall()
	if (!call) return null

	useEffect(() => {
		if (isCameraDisabled) call.camera.disable()
		else call.camera.enable()
	}, [isCameraDisabled, call.camera])

	useEffect(() => {
		if (isMicDisabled) call.microphone.disable()
		else call.microphone.enable()
	}, [isMicDisabled, call.microphone])

	const handleJoin = async () => {
		await call.join()
		onSetupComplete()
	}

	return (
		<div className="bg-background/95 flex min-h-screen items-center justify-center backdrop-blur-sm">
			<div className="mx-auto w-full max-w-[1200px]">
				<div className="mb-6 text-center">
					<div className="mb-2 inline-flex items-center justify-center gap-2">
						<div className="bg-primary/10 rounded-md p-2">
							<Terminal className="text-primary h-5 w-5" />
						</div>
						<h1 className="text-2xl font-bold">
							live<span className="text-primary">code</span>
						</h1>
					</div>
					<p className="text-muted-foreground">
						Prepare your devices before joining the interview session
					</p>
				</div>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<Card className="border-border hover:border-primary/20 overflow-hidden transition-all duration-300 hover:shadow-md">
						<CardHeader className="pb-2">
							<div className="flex items-center gap-2">
								<CameraIcon className="text-primary h-4 w-4" />
								<CardTitle>Camera Preview</CardTitle>
							</div>
							<CardDescription>
								Make sure you look good and are properly positioned
							</CardDescription>
						</CardHeader>
						<CardContent className="p-0">
							<div className="relative mt-2 min-h-[400px] overflow-hidden rounded-b-lg">
								<div className="bg-card/30 absolute inset-0">
									<VideoPreview className="h-full w-full object-cover" />
									{isCameraDisabled && (
										<div className="bg-card absolute inset-0 flex items-center justify-center backdrop-blur-sm">
											<div className="p-6 text-center">
												<CameraIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
												<p className="text-lg font-medium">
													Camera is turned off
												</p>
												<p className="text-muted-foreground mt-1 text-sm">
													Enable your camera to see preview
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="border-border hover:border-primary/20 transition-all duration-300 hover:shadow-md">
						<CardHeader className="pb-2">
							<div className="flex items-center gap-2">
								<Code className="text-primary h-4 w-4" />
								<CardTitle>Meeting Details</CardTitle>
							</div>
							<CardDescription className="font-mono text-xs break-all">
								Session ID: {call.id}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex h-full flex-col justify-between">
								<div className="mt-2 space-y-4">
									<div className="bg-card/50 flex items-center justify-between rounded-lg border p-3 transition-colors">
										<div className="flex items-center gap-3">
											<div
												className={cn(
													'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
													isCameraDisabled ? 'bg-muted' : 'bg-primary/10'
												)}
											>
												<CameraIcon
													className={cn(
														'h-5 w-5 transition-colors',
														isCameraDisabled
															? 'text-muted-foreground'
															: 'text-primary'
													)}
												/>
											</div>
											<div>
												<p className="font-medium">Camera</p>
												<p
													className={cn(
														'text-sm transition-colors',
														isCameraDisabled
															? 'text-muted-foreground'
															: 'text-foreground'
													)}
												>
													{isCameraDisabled ? 'Off' : 'On'}
												</p>
											</div>
										</div>
										<Switch
											checked={!isCameraDisabled}
											onCheckedChange={checked => setIsCameraDisabled(!checked)}
										/>
									</div>
									<div className="bg-card/50 flex items-center justify-between rounded-lg border p-3 transition-colors">
										<div className="flex items-center gap-3">
											<div
												className={cn(
													'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
													isMicDisabled ? 'bg-muted' : 'bg-primary/10'
												)}
											>
												<MicIcon
													className={cn(
														'h-5 w-5 transition-colors',
														isMicDisabled
															? 'text-muted-foreground'
															: 'text-primary'
													)}
												/>
											</div>
											<div>
												<p className="font-medium">Microphone</p>
												<p
													className={cn(
														'text-sm transition-colors',
														isMicDisabled
															? 'text-muted-foreground'
															: 'text-foreground'
													)}
												>
													{isMicDisabled ? 'Off' : 'On'}
												</p>
											</div>
										</div>
										<Switch
											checked={!isMicDisabled}
											onCheckedChange={checked => setIsMicDisabled(!checked)}
										/>
									</div>
									<div className="bg-card/50 flex items-center justify-between rounded-lg border p-3">
										<div className="flex items-center gap-3">
											<div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
												<SettingsIcon className="text-primary h-5 w-5" />
											</div>
											<div>
												<p className="font-medium">Settings</p>
												<p className="text-muted-foreground text-sm">
													Configure devices
												</p>
											</div>
										</div>
										<DeviceSettings />
									</div>
								</div>

								<div className="mt-8 space-y-3">
									<Button
										className="group relative w-full overflow-hidden"
										size="lg"
										onClick={handleJoin}
									>
										<div className="bg-primary/20 absolute inset-0 w-0 transition-all duration-300 group-hover:w-full" />
										<span className="relative flex items-center gap-2">
											Join Interview Session
											<ArrowRight className="h-4 w-4" />
										</span>
									</Button>
									<p className="text-muted-foreground text-center text-xs">
										Our team is looking forward to discussing your skills and
										experience. Good luck! 🚀
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
