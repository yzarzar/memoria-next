"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "./GoogleGeminiEffect";
import { ImagesSlider } from "./ImagesSlider";
import { BackgroundLines } from "./BackgroundLines";
import image1 from '@/assets/images/image1.jpg'
import image2 from '@/assets/images/image2.jpg'
import image3 from '@/assets/images/image3.jpg'
import image4 from '@/assets/images/image4.jpg'

export function Hero() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // const images = [
  //   "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // ];

  const images = [
    image1.src,
    image2.src,
    image3.src,
    image4.src,
  ];

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.5], [0, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.5], [0, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.5], [0, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.5], [0, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.5], [0, 1.2]);


  return (
    <div className="h-[400vh] w-full relative" ref={ref}>
      <div className="sticky top-0 h-screen w-full">
        <ImagesSlider
          images={images}
          overlay={true}
          // overlayClassName="bg-gradient-to-b from-black/50 via-black/50 to-black/80"
          autoplay={true}
          direction="up"
        >
          <div className="absolute inset-0 z-20">
            <BackgroundLines 
              className="h-full bg-transparent"
              svgOptions={{ duration: 8 }}
            >
              <div />
            </BackgroundLines>
          </div>
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-40" /> */}
          <div className="absolute inset-0 z-50">
            <GoogleGeminiEffect
              pathLengths={[
                pathLengthFirst,
                pathLengthSecond,
                pathLengthThird,
                pathLengthFourth,
                pathLengthFifth,
              ]}
            />
          </div>
        </ImagesSlider>
      </div>
    </div>
  );
}
