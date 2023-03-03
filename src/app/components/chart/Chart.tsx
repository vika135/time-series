import "./Chart.scss"
import {useContext, useState, useEffect, useRef} from "react";
import {ValuesContext} from "../../app";
import * as d3 from 'd3';
import throttle from 'lodash.throttle';
import {ChartValueModel} from "../../models/chart-value.model";

export default function Chart() {
    const {values} = useContext(ValuesContext)
    const svgRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState<{ width: number, height: number }>({width: 0, height: 0});
    const [useSymlogScale, setUseSymlogScale] = useState<boolean>(true);

    useEffect(() => {
        const svg = d3.select<SVGElement, unknown>(svgRef.current);

        const margin = {top: 20, right: 20, bottom: 30, left: 50};

        const x = d3.scaleTime()
            .range([margin.left, dimensions.width - margin.right])
            .domain(d3.extent(values, (d: ChartValueModel) => d.time));

        const y = useSymlogScale ?
            d3.scaleSymlog().range([dimensions.height - margin.bottom, margin.top])
                .domain(d3.extent(values, (d: ChartValueModel) => d.value))
            : d3.scaleLinear().range([dimensions.height - margin.bottom, margin.top])
                .domain(d3.extent(values, (d: ChartValueModel) => d.value))

        const xAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) => g
            .attr('transform', `translate(0, ${dimensions.height - margin.bottom})`)
            .call(d3.axisBottom<Date>(x).tickFormat(d3.timeFormat('%H:%M:%S')));

        const yAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) => g
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(useSymlogScale ?
                d3.axisLeft<number>(y).ticks(5, ".1s")
                : d3.axisLeft<number>(y)
            );

        const line = d3.line<ChartValueModel>()
            .defined(d => !isNaN(d.value))
            .x(d => x(d.time)!)
            .y(d => y(d.value)!);

        svg.select('.line')
            .attr('d', line(values)!);

        svg.select('.x-axis')
            .call(xAxis);

        svg.select('.y-axis')
            .call(yAxis);
    }, [values, dimensions, useSymlogScale]);

    useEffect(() => {
        function handleResize() {
            if (svgRef.current) {
                setDimensions({
                    width: svgRef.current.offsetWidth,
                    height: svgRef.current.offsetHeight
                });
            }
        }

        handleResize();
        const throttledResize = throttle(handleResize, 200); // throttle to 200ms
        window.addEventListener("resize", throttledResize);
        return () => window.removeEventListener("resize", throttledResize);
    }, []);

    const handleToggleScale = () => {
        setUseSymlogScale(!useSymlogScale);
    }

    return (
        <>
            <div className='chart' ref={svgRef}>
                <svg className='chart__svg' width={dimensions.width} height={dimensions.height}>
                    <g className='line-group'>
                        <path className='line' fill='none' stroke='steelblue' strokeWidth='1.5'/>
                    </g>
                    <g className='x-axis'/>
                    <g className='y-axis'/>
                </svg>
            </div>
            <button onClick={handleToggleScale}>
                {useSymlogScale ? 'Switch to Linear Scale' : 'Switch to Log Scale'}
            </button>
        </>
    )
}