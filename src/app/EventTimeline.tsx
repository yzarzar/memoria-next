"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/Timeline";
import { cn } from "@/lib/utils";

const TimelineContent = ({ images, index }: { images: number[]; index: number }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      // Clone the content for seamless loop
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      // Set animation properties
      containerRef.current.style.setProperty("--animation-duration", "40s");
      setStart(true);
    }
  }, []);

  const handleScroll = (e: React.WheelEvent) => {
    if (containerRef.current) {
      e.preventDefault();
      containerRef.current.scrollLeft += e.deltaY;
      setIsScrolling(true);
      
      // Reset animation after manual scroll
      clearTimeout(containerRef.current.dataset.scrollTimeout as any);
      const timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      containerRef.current.dataset.scrollTimeout = timeout as any;
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleScroll}
      className="relative z-20 max-w-7xl overflow-x-auto overflow-y-hidden hide-scrollbar [mask-image:linear-gradient(to_right,transparent,white_20%,white)]"
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex min-w-full gap-8 py-4 w-max flex-nowrap",
          start && !isScrolling && "animate-scroll",
          "hover:[animation-play-state:paused]"
        )}
      >
        {images.map((num) => (
          <div
            key={`card-${index}-${num}`}
            className="relative flex-shrink-0 px-4 cursor-grab active:cursor-grabbing"
            style={{ width: 'calc(70vh * 0.7 + 2rem)' }}
          >
            <div className="relative h-[70vh] w-[calc(70vh*0.7)] overflow-hidden rounded-2xl">
              <Image
                src={`https://assets.aceternity.com/templates/startup-${num}.webp`}
                alt={`startup template ${num}`}
                fill
                className="object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
              <div className="absolute bottom-0 p-4 text-white">
                <h4 className="text-xl font-semibold">Event Title {num}</h4>
                <p className="text-sm opacity-80">Brief description here</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function EventTimeline() {
  const images = [1, 2, 3, 4];
  
  const data = Array.from({ length: 8 }, (_, i) => ({
    title: "2024",
    content: <TimelineContent images={images} index={i} />
  }));

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
