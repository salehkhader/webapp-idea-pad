import { Layout } from "./components/site/Layout"
import { ScreenWidthIndicator } from "./components/site/ScreenWidthIndicator"

export default function App() {
	return (
		<>
			<Layout>
				<div className="prose dark:prose-invert max-w-none">
					<div className="flex w-full flex-col items-center justify-center text-center">
						<h1 >Welcome!</h1>
						<p>
							Starter template for React projects with Tailwind CSS
							and TypeScript.
						</p>
						<button
							className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
							onClick={() =>
								window.open(
									"https://github.com/salehkhader/vite-react-tailwind-template",
									"_blank",
								)
							}
						>
							Clone this repo ➡️
						</button>
					</div>
				</div>
			</Layout>
			<ScreenWidthIndicator />
		</>
	)
}
