import { useState } from "react"

import { Layout } from "./components/site/Layout"
import { ScreenWidthIndicator } from "./components/site/ScreenWidthIndicator"
import { FaNpm } from "react-icons/fa"
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2"
import { TbLoader2 } from "react-icons/tb"

type SearchResult = {
	package: {
	  name: string;
	  version: string;
	  description?: string;
	  links: {
		npm?: string;
		homepage?: string;
		repository?: string;
		bugs?: string;
	  };
	  author?: {
		name: string;
		email?: string;
		url?: string;
	  };
	  publisher: {
		username: string;
		email: string;
	  };
	  maintainers: Array<{
		username: string;
		email: string;
	  }>;
	};
	score: {
	  final: number;
	  detail: {
		quality: number;
		popularity: number;
		maintenance: number;
	  };
	};
	searchScore: number;
  };
  


const NpmSearch = () => {
	const scrollClass: string =
		"[&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500"

	const [query, setQuery] = useState("")
	const [results, setResults] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const handleSearch = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(
				`https://registry.npmjs.org/-/v1/search?text=${query}`,
			)
			const data = await response.json()

			setResults(data.objects)
		} catch (error) {
			console.error("Error fetching data: ", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="relative flex items-center">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search npm packages"
					className="block w-full rounded-full border-gray-200 p-4 text-lg focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:focus:ring-gray-600"
				/>
				<button
					onClick={handleSearch}
					className="absolute right-0 top-0 inline-flex items-center gap-x-2 rounded-full border border-transparent bg-transparent p-3 text-blue-500 dark:text-white hover:text-white hover:bg-blue-700 dark:hover:bg-blue-400/20 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
					disabled={isLoading}
				>
					{isLoading ? (
						<TbLoader2 className="inline-block size-9 animate-spin rounded-full border-current border-t-transparent text-white" />
					) : (
						<HiOutlineMagnifyingGlassCircle className="size-9" />
					)}
				</button>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{results.map((item:SearchResult, index) => (
					<div
						key={index}
						className="flex flex-col rounded-xl border border-t-4 border-t-blue-600 bg-white shadow-sm dark:border-gray-700 dark:border-t-blue-500 dark:bg-slate-900 dark:shadow-slate-700/[.7]"
					>
						<div className="p-4 md:p-5">
							<h3 className="text-lg font-bold text-gray-800 dark:text-white">
								{item.package.name}{" "}
							</h3>
							<p
								className={`mt-2 overflow-auto text-gray-500 dark:text-gray-400 ${scrollClass}`}
							>
								{item.package.description}
							</p>
							<a
								className="mt-3 inline-flex items-center gap-x-1 rounded-lg border border-transparent text-sm font-semibold text-blue-600 hover:text-blue-800 disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
								href={`https://www.npmjs.com/package/${item.package.name}`}
								target="_blank"
							>
								<FaNpm className="size-10 text-blue-500 dark:text-white" />
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

const App = () => {
	return (
		<>
			<Layout>
				<div className="prose max-w-none dark:prose-invert">
					<NpmSearch />
				</div>
			</Layout>
			<ScreenWidthIndicator />
		</>
	)
}

export default App
