import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface ImageSliderProps {
  images: string[];
  showThumbnails?: boolean;
  className?: string;
}

export default function ImageSlider({ images, showThumbnails = true, className = '' }: ImageSliderProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className={`relative ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        pagination={{ clickable: true }}
        effect="fade"
        className="h-full"
        onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={image}
                alt={`View ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </SwiperSlide>
        ))}

        <button className="swiper-button-prev !w-10 !h-10 !bg-black/30 !rounded-full hover:!bg-black/50 transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button className="swiper-button-next !w-10 !h-10 !bg-black/30 !rounded-full hover:!bg-black/50 transition-colors">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </Swiper>

      {showThumbnails && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                activeImageIndex === index ? 'ring-2 ring-amber-400 ring-offset-2' : 'opacity-50'
              }`}
            >
              <img src={image} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}