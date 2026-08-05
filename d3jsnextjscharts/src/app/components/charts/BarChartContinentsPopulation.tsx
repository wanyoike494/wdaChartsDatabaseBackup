"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ContinentData {
    Continent: string;
    Population2026: number;
}

export default function BarChartContinentsPopulation() {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        // Clear previous render
        d3.select(svgRef.current).selectAll("*").remove();

        const width = 700;
        const height = 450;
        const margin = { top: 30, right: 20, bottom: 50, left: 60 };

        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const svg = d3
            .select(svgRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("width", "100%")
            .attr("height", "100%");

        const chart = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv<ContinentData>(
            "https://raw.githubusercontent.com/wanyoike494/Datasets/refs/heads/main/demographics/population/originalData/continentsPopulationOnly2026.csv",
            (d) => ({
                Continent: d.Continent || "Unknown",
                Population2026: d.Population2026 ? +d.Population2026 : 0,
            })
        ).then((data) => {
            data.sort((a, b) => b.Population2026 - a.Population2026);
            const filteredData = data.filter((d) => d.Population2026 > 0);

            const xScale = d3
                .scaleBand()
                .domain(filteredData.map((d) => d.Continent))
                .range([0, chartWidth])
                .padding(0.35);

            const yScale = d3
                .scaleLinear()
                .domain([0, d3.max(filteredData, (d) => d.Population2026) ?? 0])
                .range([chartHeight, 0])
                .nice();

            // Simple dashed grid lines
            chart
                .append("g")
                .attr("class", "grid-lines stroke-zinc-200 dark:stroke-zinc-800")
                .attr("opacity", 0.4)
                .call(
                    d3.axisLeft(yScale)
                        .tickSize(-chartWidth)
                        .tickFormat(() => "")
                )
                .call((g) => g.select(".domain").remove())
                .call((g) =>
                    g.selectAll(".tick line").attr("stroke-dasharray", "4,4")
                );

            // X Axis
            const xAxisGroup = chart
                .append("g")
                .attr("transform", `translate(0,${chartHeight})`)
                .call(d3.axisBottom(xScale));

            xAxisGroup
                .select(".domain")
                .attr("class", "stroke-zinc-200 dark:stroke-zinc-800")
                .attr("stroke-width", 1);

            xAxisGroup
                .selectAll(".tick line")
                .attr("class", "stroke-zinc-200 dark:stroke-zinc-800");

            xAxisGroup
                .selectAll(".tick text")
                .attr("class", "fill-zinc-500 dark:fill-zinc-400 font-sans text-[11px] font-medium")
                .attr("dy", "10px");

            // Y Axis
            const yAxisGroup = chart
                .append("g")
                .call(
                    d3.axisLeft(yScale)
                        .ticks(5)
                        .tickFormat((d) => {
                            const val = +d;
                            if (val >= 1e9) return `${(val / 1e9).toFixed(1)}B`;
                            if (val >= 1e6) return `${(val / 1e6).toFixed(0)}M`;
                            return val.toLocaleString();
                        })
                );

            yAxisGroup.select(".domain").remove();

            yAxisGroup
                .selectAll(".tick line")
                .attr("class", "stroke-zinc-200 dark:stroke-zinc-800");

            yAxisGroup
                .selectAll(".tick text")
                .attr("class", "fill-zinc-500 dark:fill-zinc-400 font-sans text-[11px] font-medium")
                .attr("dx", "-4px");

            // Draw Bars (Simple and clean, static rendering without entry animation)
            chart
                .selectAll("rect")
                .data(filteredData)
                .enter()
                .append("rect")
                .attr("class", "cursor-pointer transition-all duration-150 fill-indigo-600 dark:fill-indigo-500 hover:fill-indigo-500 dark:hover:fill-indigo-400")
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("x", (d) => xScale(d.Continent)!)
                .attr("width", xScale.bandwidth())
                .attr("y", (d) => yScale(d.Population2026))
                .attr("height", (d) => chartHeight - yScale(d.Population2026))
                // Simple Tooltip on hover
                .on("mouseover", (event, d) => {
                    if (tooltipRef.current) {
                        tooltipRef.current.style.opacity = "1";
                        tooltipRef.current.innerHTML = `
                            <div class="font-bold text-xs text-zinc-100">${d.Continent}</div>
                            <div class="text-zinc-400 text-[10px] mt-0.5">Projected: ${d.Population2026.toLocaleString()}</div>
                        `;
                    }
                })
                .on("mousemove", (event) => {
                    if (tooltipRef.current && svgRef.current) {
                        const [x, y] = d3.pointer(event, svgRef.current);
                        tooltipRef.current.style.left = `${x + 12}px`;
                        tooltipRef.current.style.top = `${y - 12}px`;
                    }
                })
                .on("mouseout", () => {
                    if (tooltipRef.current) {
                        tooltipRef.current.style.opacity = "0";
                    }
                });
        });
    }, []);

    return (
        <div className="relative w-full h-full min-h-0 flex items-center justify-center">
            <svg
                ref={svgRef}
                className="w-full h-full max-h-full overflow-visible"
            />
            <div
                ref={tooltipRef}
                className="absolute pointer-events-none opacity-0 bg-zinc-950/95 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg border border-zinc-800 transition-opacity duration-150 font-sans backdrop-blur-md z-30"
                style={{ left: 0, top: 0 }}
            />
        </div>
    );
}