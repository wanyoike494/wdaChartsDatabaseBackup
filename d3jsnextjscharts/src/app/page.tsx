"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import BarChartContinentsPopulation from "./components/chartsInsights/BarChartContinentsPopulation";
import populationThumbnail from "./images/barchartpopulationcontinents.png";

interface ChartItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  type: string;
  isActive: boolean;
  thumbnail?: any;
}

const ALL_CHARTS: ChartItem[] = [
  {
    id: "population-by-continent",
    title: "Population by Continent",
    description: "Projections for the year 2026 showing the population distribution across all major continents.",
    category: "Demographics",
    subcategory: "population",
    type: "bar",
    isActive: true,
    thumbnail: populationThumbnail,
  },
  {
    id: "age-distribution",
    title: "Global Age Distribution",
    description: "A demographic analysis of population age groups across different economic zones.",
    category: "Demographics",
    subcategory: "age",
    type: "line",
    isActive: false,
  },
  {
    id: "life-expectancy",
    title: "Life Expectancy Trends",
    description: "Visualizing the increase in global life expectancy over the last five decades.",
    category: "Demographics",
    subcategory: "life expectancy",
    type: "pie",
    isActive: false,
  },
  {
    id: "gdp-by-country",
    title: "Global GDP Distribution",
    description: "A choropleth map showing the gross domestic product of nations in USD.",
    category: "Finance",
    subcategory: "GDP",
    type: "map",
    isActive: false,
  },
  {
    id: "gdp-per-capita",
    title: "GDP Per Capita Comparison",
    description: "Comparing national wealth adjusted for population sizes across top economies.",
    category: "Finance",
    subcategory: "GDP per capita",
    type: "horizontal-bar",
    isActive: false,
  },
  {
    id: "land-area-shares",
    title: "Continental Land Area",
    description: "Visualizing the physical size breakdown of Earth's landmasses.",
    category: "Geography",
    subcategory: "Area",
    type: "pie",
    isActive: false,
  },
  {
    id: "forest-cover-trends",
    title: "Global Forest Cover",
    description: "Tracking afforestation and deforestation rates in critical biomes.",
    category: "Geography",
    subcategory: "forest",
    type: "line",
    isActive: false,
  },
  {
    id: "ocean-depths-volumes",
    title: "Ocean Volume & Depths",
    description: "A breakdown of the water volumes and depths of Earth's five oceans.",
    category: "Geography",
    subcategory: "oceans",
    type: "horizontal-bar",
    isActive: false,
  },
  {
    id: "scientific-citations",
    title: "Scientific Citations by Field",
    description: "A distribution of global research impact across major scientific domains.",
    category: "Science",
    subcategory: "Citations",
    type: "bar",
    isActive: false,
  },
  {
    id: "live-population-stat",
    title: "World Population Live Count",
    description: "A demographic indicator demonstrating live global population change.",
    category: "Demographics",
    subcategory: "population",
    type: "stat",
    isActive: false,
  },
  {
    id: "research-spending",
    title: "R&D Spend by Country",
    description: "Visualizing the percentage of GDP dedicated to research and development.",
    category: "Science",
    subcategory: "R&D",
    type: "bar",
    isActive: false,
  },
  {
    id: "tech-adoption-curves",
    title: "Technology Adoption Rates",
    description: "Visualizing how quickly new technologies are adopted by consumers.",
    category: "Technology",
    subcategory: "Adoption",
    type: "line",
    isActive: false,
  },
];

const CATEGORY_STRUCTURE = [
  {
    name: "Demographics",
    subcategories: ["population", "age", "life expectancy"],
  },
  {
    name: "Finance",
    subcategories: ["GDP", "GDP per capita"],
  },
  {
    name: "Geography",
    subcategories: ["Area", "forest", "oceans"],
  },
  {
    name: "Science",
    subcategories: ["Citations", "R&D"],
  },
  {
    name: "Technology",
    subcategories: ["Adoption", "Infrastructure"],
  },
];

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const [activeChartId, setActiveChartId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    Demographics: true,
    Finance: true,
    Geography: true,
  });

  const toggleCategory = (catName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category && selectedSubcategory === null) {
      // Clear filter
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(null);
    }
    setCurrentPage(1);
  };

  const handleSubcategorySelect = (category: string, subcategory: string) => {
    if (selectedCategory === category && selectedSubcategory === subcategory) {
      // Clear filter
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(subcategory);
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Filtered list
  const filteredCharts = useMemo(() => {
    return ALL_CHARTS.filter((chart) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        chart.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chart.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chart.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || chart.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSubcategory =
        !selectedSubcategory || chart.subcategory.toLowerCase() === selectedSubcategory.toLowerCase();

      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [searchQuery, selectedCategory, selectedSubcategory]);

  // Paginated list
  const totalPages = Math.max(1, Math.ceil(filteredCharts.length / ITEMS_PER_PAGE));
  const paginatedCharts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCharts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCharts, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Detail View Mode
  if (activeChartId === "population-by-continent") {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-200 flex flex-col relative">
        <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 shrink-0">
            <button
              onClick={() => setActiveChartId(null)}
              className="flex items-center text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <span className="text-xs bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-full font-mono text-zinc-600 dark:text-zinc-400">
              Demographics &bull; population
            </span>
          </div>
          <div className="flex-grow min-h-0 py-2">
            <BarChartContinentsPopulation />
          </div>
        </div>
      </main>
    );
  }

  // Dashboard List View Mode
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-200 flex flex-col relative">
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8 w-full">
        
        {/* Left Filter Sidebar */}
        <aside className="w-full lg:w-60 shrink-0 flex flex-col gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4">
              <h2 className="text-sm font-bold tracking-wider text-zinc-900 dark:text-zinc-100 uppercase font-sans">
                Filter
              </h2>
              {(selectedCategory || selectedSubcategory || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold font-sans cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <nav className="flex flex-col gap-4 font-sans text-xs">
              {CATEGORY_STRUCTURE.map((cat) => {
                const isExpanded = !!expandedCategories[cat.name];
                const isSelectedCat = selectedCategory === cat.name;

                return (
                  <div key={cat.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between w-full">
                      <button
                        onClick={() => handleCategorySelect(cat.name)}
                        className={`text-left font-bold flex-1 py-1 rounded-md px-1.5 transition-colors cursor-pointer ${
                          isSelectedCat && !selectedSubcategory
                            ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                            : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                        }`}
                      >
                        {cat.name}
                      </button>
                      <button
                        onClick={() => toggleCategory(cat.name)}
                        className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                      >
                        <svg
                          className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {isExpanded && (
                      <ul className="pl-4 flex flex-col gap-1 border-l border-zinc-100 dark:border-zinc-800/80 ml-2">
                        {cat.subcategories.map((sub) => {
                          const isSelectedSub =
                            selectedCategory === cat.name && selectedSubcategory === sub;

                          return (
                            <li key={sub}>
                              <button
                                onClick={() => handleSubcategorySelect(cat.name, sub)}
                                className={`w-full text-left py-1 px-2 rounded-md transition-colors cursor-pointer capitalize ${
                                  isSelectedSub
                                    ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-semibold"
                                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
                                }`}
                              >
                                {sub}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Right Dashboard Content */}
        <section className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Top Header info */}
          <div className="shrink-0">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
              WDA Charts Database
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
              Charts for World Data Analysis Project. Inspired by{" "}
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                Visual Capitalist
              </span>
            </p>
          </div>

          {/* Search Bar Row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-zinc-400 dark:text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search charts by name, category, or keyword..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-sans"
              />
            </div>
            {/* Simple Grid/Filter Layout Indicator Icon */}
            <div className="shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg text-zinc-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
          </div>

          {/* Cards Grid */}
          {paginatedCharts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-850 rounded-2xl py-16 px-4 bg-white dark:bg-zinc-900/20 text-center">
              <svg
                className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mb-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
                No charts found
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs font-sans">
                Try adjusting your filters or search keywords to locate your desired dataset.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedCharts.map((chart) => {
                return (
                  <div
                    key={chart.id}
                    onClick={() => chart.isActive && setActiveChartId(chart.id)}
                    className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full font-sans transition-all group ${
                      chart.isActive
                        ? "cursor-pointer hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-750"
                        : "opacity-85"
                    }`}
                  >
                    {/* Thumbnail Box */}
                    <div className="relative h-36 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-850 flex items-center justify-center overflow-hidden">
                      {chart.isActive && chart.thumbnail ? (
                        <div className="w-full h-full relative group-hover:scale-[1.02] transition-transform duration-350 ease-out">
                          <Image
                            src={chart.thumbnail}
                            alt={chart.title}
                            fill
                            placeholder="blur"
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-4 w-full h-full text-zinc-300 dark:text-zinc-800">
                          {chart.type === "bar" && (
                            <svg className="w-12 h-12 stroke-current fill-none stroke-[1.2]" viewBox="0 0 24 24">
                              <line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round" />
                              <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" />
                              <line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round" />
                            </svg>
                          )}
                          {chart.type === "horizontal-bar" && (
                            <svg className="w-12 h-12 stroke-current fill-none stroke-[1.2]" viewBox="0 0 24 24">
                              <line x1="4" y1="6" x2="18" y2="6" strokeLinecap="round" />
                              <line x1="4" y1="12" x2="22" y2="12" strokeLinecap="round" />
                              <line x1="4" y1="18" x2="12" y2="18" strokeLinecap="round" />
                            </svg>
                          )}
                          {chart.type === "pie" && (
                            <svg className="w-12 h-12 stroke-current fill-none stroke-[1.2]" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="8" />
                              <path d="M12 4v8h8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {chart.type === "line" && (
                            <svg className="w-12 h-12 stroke-current fill-none stroke-[1.2]" viewBox="0 0 24 24">
                              <path d="M4 18l4-6 4 4 8-10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {chart.type === "map" && (
                            <svg className="w-12 h-12 stroke-current fill-none stroke-[1.2]" viewBox="0 0 24 24">
                              <rect x="4" y="4" width="16" height="16" rx="2" />
                              <path d="M9 4v16M15 4v16M4 9h16M4 15h16" strokeDasharray="2,2" />
                            </svg>
                          )}
                          {chart.type === "stat" && (
                            <div className="font-extrabold text-[15px] font-mono text-zinc-400 dark:text-zinc-650 tracking-wider">
                              8,200,000
                            </div>
                          )}
                        </div>
                      )}
                      
                      {!chart.isActive && (
                        <div className="absolute top-2 right-2">
                          <span className="text-[9px] bg-zinc-200/90 dark:bg-zinc-800/90 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded font-medium border border-zinc-300/20">
                            Coming Soon
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Metadata Content */}
                    <div className="p-4 flex-grow flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[9px] text-zinc-400 dark:text-zinc-500 font-mono">
                        <span className="capitalize">{chart.category}</span>
                        <span>&bull;</span>
                        <span className="capitalize">{chart.subcategory}</span>
                      </div>
                      
                      <h3 className={`text-xs font-bold transition-colors ${
                        chart.isActive 
                          ? "text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" 
                          : "text-zinc-700 dark:text-zinc-400"
                      }`}>
                        {chart.title}
                      </h3>
                      
                      <p className="text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400 flex-grow">
                        {chart.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center border-t border-zinc-200 dark:border-zinc-800 pt-5 mt-2 font-mono text-xs text-zinc-500 shrink-0">
              <nav className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 px-2.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800/60 disabled:opacity-40 disabled:hover:bg-transparent font-bold cursor-pointer"
                >
                  &larr;
                </button>
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pNum = i + 1;
                  const isCurrent = currentPage === pNum;
                  return (
                    <button
                      key={pNum}
                      onClick={() => handlePageChange(pNum)}
                      className={`px-2.5 py-1 rounded cursor-pointer ${
                        isCurrent
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold"
                          : "hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
                {totalPages < 10 && (
                  <>
                    <span className="px-1 text-zinc-300 dark:text-zinc-700">&bull;&bull;&bull;</span>
                    <button
                      onClick={() => handlePageChange(10)}
                      className="px-2.5 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer"
                    >
                      10
                    </button>
                  </>
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1 px-2.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800/60 disabled:opacity-40 disabled:hover:bg-transparent font-bold cursor-pointer"
                >
                  &rarr;
                </button>
              </nav>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
