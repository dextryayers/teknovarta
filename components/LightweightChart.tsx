'use client';

import { useEffect, useRef } from 'react';
import { createChart, ColorType, ISeriesApi } from 'lightweight-charts';

export default function LightweightChart({
  data,
  colors = {
    backgroundColor: '#1c1c1c',
    lineColor: '#ff3b30',
    textColor: '#999999',
    areaTopColor: 'rgba(255, 59, 48, 0.56)',
    areaBottomColor: 'rgba(255, 59, 48, 0.04)',
  }
}: {
  data: { time: string; value: number }[];
  colors?: any;
}) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      grid: {
        vertLines: { color: '#2a2a2a' },
        horzLines: { color: '#2a2a2a' },
      },
    });
    
    chartRef.current = chart;

    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    });
    seriesRef.current = newSeries;

    // Sorting data by time for lightweight-charts requirement
    const sortedData = [...data].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    newSeries.setData(sortedData);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, colors]);

  return (
    <div ref={chartContainerRef} className="w-full" />
  );
}
