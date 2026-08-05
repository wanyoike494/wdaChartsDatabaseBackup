"use client";

import BarChart from "../charts/BarChartContinentsPopulation";

export default function BarChartContinentsPopulation() {
    return (
        <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full lg:h-[480px] lg:min-h-0">
            {/* Chart Card */}
            <div className="flex-1 min-h-0 h-[360px] sm:h-[420px] lg:h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-5 flex flex-col relative">
                <div className="mb-2 shrink-0">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
                        Population by Continent
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                        Projections for the year 2026
                    </p>
                </div>

                <div className="relative flex-1 min-h-0 w-full flex items-center justify-center">
                    <BarChart />
                </div>
            </div>

            {/* Insights Panel */}
            <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl p-5 justify-start">
                <div className="shrink-0">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
                        Key Demographics
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                        Quick takeaways
                    </p>
                </div>

                <ul className="flex-1 flex flex-col gap-3 my-2 overflow-y-auto list-disc pl-5 text-xs text-zinc-600 dark:text-zinc-300 font-sans">
                    <li>
                        <strong className="text-zinc-800 dark:text-zinc-200">Largest Continent:</strong> Asia with ~4.86B people (approx. 60% of total).
                    </li>
                    <li>
                        <strong className="text-zinc-800 dark:text-zinc-200">Second Largest:</strong> Africa with ~1.58B people projected by 2026.
                    </li>
                    <li>
                        <strong className="text-zinc-800 dark:text-zinc-200">Total Projected Population:</strong> 8.3B people across all populated regions.
                    </li>
                </ul>
            </div>
        </div>
    );
}