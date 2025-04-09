import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { AlertCircleIcon, BookIcon, LightbulbIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from '@/components/ui/Resizable'
import { ScrollArea, ScrollBar } from '@/components/ui/ScrollArea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select'
import { CODING_QUESTIONS, LANGUAGES } from '@/constants'

export function CodeEditor() {
	const [selectedQuestion, setSelectedQuestion] = useState(CODING_QUESTIONS[0])
	const [language, setLanguage] = useState<'javascript' | 'python' | 'java'>(
		LANGUAGES[0].id
	)
	const [code, setCode] = useState(selectedQuestion.starterCode[language])

	const handleQuestionChange = (questionId: string) => {
		const question = CODING_QUESTIONS.find(q => q.id === questionId)!
		setSelectedQuestion(question)
		setCode(question.starterCode[language])
	}

	const handleLanguageChange = (
		newLanguage: 'javascript' | 'python' | 'java'
	) => {
		setLanguage(newLanguage)
		setCode(selectedQuestion.starterCode[newLanguage])
	}

	return (
		<ResizablePanelGroup
			direction="vertical"
			className="min-h-[calc-100vh-4rem-1px]"
		>
			{/* QUESTION SECTION */}
			<ResizablePanel>
				<ScrollArea className="h-full">
					<div className="p-6">
						<div className="mx-auto max-w-4xl space-y-6">
							{/* HEADER */}
							<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<h2 className="text-2xl font-semibold tracking-tight">
											{selectedQuestion.title}
										</h2>
									</div>
									<p className="text-muted-foreground text-sm">
										Choose your language and solve the problem
									</p>
								</div>
								<div className="flex items-center gap-3">
									<Select
										value={selectedQuestion.id}
										onValueChange={handleQuestionChange}
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select question" />
										</SelectTrigger>
										<SelectContent>
											{CODING_QUESTIONS.map(q => (
												<SelectItem key={q.id} value={q.id}>
													{q.title}
												</SelectItem>
											))}
										</SelectContent>
									</Select>

									<Select value={language} onValueChange={handleLanguageChange}>
										<SelectTrigger className="w-[150px]">
											{/* SELECT VALUE */}
											<SelectValue>
												<div className="flex items-center gap-2">
													<img
														src={`/${language}.png`}
														alt={language}
														className="h-5 w-5 object-contain"
													/>
													{LANGUAGES.find(l => l.id === language)?.name}
												</div>
											</SelectValue>
										</SelectTrigger>
										{/* SELECT CONTENT */}
										<SelectContent>
											{LANGUAGES.map(lang => (
												<SelectItem key={lang.id} value={lang.id}>
													<div className="flex items-center gap-2">
														<img
															src={`/${lang.id}.png`}
															alt={lang.name}
															className="h-5 w-5 object-contain"
														/>
														{lang.name}
													</div>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* PROBLEM DESC. */}
							<Card>
								<CardHeader className="flex flex-row items-center gap-2">
									<BookIcon className="text-primary/80 h-5 w-5" />
									<CardTitle>Problem Description</CardTitle>
								</CardHeader>
								<CardContent className="text-sm leading-relaxed">
									<div className="prose prose-sm dark:prose-invert max-w-none">
										<p className="whitespace-pre-line">
											{selectedQuestion.description}
										</p>
									</div>
								</CardContent>
							</Card>

							{/* PROBLEM EXAMPLES */}
							<Card>
								<CardHeader className="flex flex-row items-center gap-2">
									<LightbulbIcon className="h-5 w-5 text-yellow-500" />
									<CardTitle>Examples</CardTitle>
								</CardHeader>
								<CardContent>
									<ScrollArea className="h-full w-full rounded-md border">
										<div className="space-y-4 p-4">
											{selectedQuestion.examples.map((example, index) => (
												<div key={index} className="space-y-2">
													<p className="text-sm font-medium">
														Example {index + 1}:
													</p>
													<ScrollArea className="h-full w-full rounded-md">
														<pre className="bg-muted/50 rounded-lg p-3 font-mono text-sm">
															<div>Input: {example.input}</div>
															<div>Output: {example.output}</div>
															{example.explanation && (
																<div className="text-muted-foreground pt-2">
																	Explanation: {example.explanation}
																</div>
															)}
														</pre>
														<ScrollBar orientation="horizontal" />
													</ScrollArea>
												</div>
											))}
										</div>
										<ScrollBar />
									</ScrollArea>
								</CardContent>
							</Card>

							{/* CONSTRAINTS */}
							{selectedQuestion.constraints && (
								<Card>
									<CardHeader className="flex flex-row items-center gap-2">
										<AlertCircleIcon className="h-5 w-5 text-blue-500" />
										<CardTitle>Constraints</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="marker:text-muted-foreground list-inside list-disc space-y-1.5 text-sm">
											{selectedQuestion.constraints.map((constraint, index) => (
												<li key={index} className="text-muted-foreground">
													{constraint}
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							)}
						</div>
					</div>
					<ScrollBar />
				</ScrollArea>
			</ResizablePanel>

			<ResizableHandle withHandle />

			{/* CODE EDITOR */}
			<ResizablePanel defaultSize={60} maxSize={100}>
				<div className="relative h-full">
					<Editor
						height={'100%'}
						defaultLanguage={language}
						language={language}
						theme="vs-dark"
						value={code}
						onChange={value => setCode(value || '')}
						options={{
							minimap: { enabled: false },
							fontSize: 18,
							lineNumbers: 'on',
							scrollBeyondLastLine: false,
							automaticLayout: true,
							padding: { top: 16, bottom: 16 },
							wordWrap: 'on',
							wrappingIndent: 'indent'
						}}
					/>
				</div>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
