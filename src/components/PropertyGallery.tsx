import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, X, ZoomIn, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface PropertyGalleryProps {
  images: string[];
  title: string;
  price?: number;
  location?: string;
  rating?: number;
}

export default function PropertyGallery({ 
  images, 
  title, 
  price, 
  location, 
  rating 
}: PropertyGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(true);
  const { t } = useTranslation();

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative h-[70vh]">
        <Swiper
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          effect="fade"
          navigation={{
            prevEl: '.gallery-button-prev',
            nextEl: '.gallery-button-next',
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full group"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full cursor-pointer" onClick={() => handleImageClick(index)}>
                <img
                  src={image}
                  alt={`${title} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 transition-opacity group-hover:opacity-80" />
                
                {/* Property Info Overlay */}
                {showInfo && index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white animate-fadeIn">
                    <h1 className="font-serif text-4xl mb-2">{title}</h1>
                    {location && (
                      <p className="text-lg text-gray-200 mb-2">{location}</p>
                    )}
                    {price && (
                      <p className="text-2xl font-semibold">
                        ${price} <span className="text-lg font-normal">{t('property.perNight')}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Zoom Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/50 p-4 rounded-full">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
          <button className="gallery-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="gallery-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Info Toggle Button */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <Info className="w-6 h-6" />
          </button>
        </Swiper>

        {/* Thumbnail Strip */}
        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden md:flex gap-2 px-4 py-2 bg-black/50 rounded-xl">
          {images.slice(0, 5).map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(index)}
              className={`w-20 h-20 rounded-lg overflow-hidden transition-all ${
                currentImageIndex === index ? 'ring-2 ring-amber-400 ring-offset-2' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={image} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
          {images.length > 5 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-20 h-20 rounded-lg bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              +{images.length - 5}
            </button>
          )}
        </div> */}
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            initialSlide={currentImageIndex}
            className="h-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="h-full flex items-center justify-center p-4">
                  <img
                    src={image}
                    alt={`${title} - View ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}