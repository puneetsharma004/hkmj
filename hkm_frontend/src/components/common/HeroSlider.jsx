import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Custom hook to detect mobile screens
const useIsMobile = (breakpoint = 1025) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < breakpoint);

    return () => mql.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
};

// Slides data
const slides = [
  {
    img: '/images/banners/Banner-1-1.jpg',
    mobileImg: '/images/banners/mobile/Banner-1.jpg',
    link: '/visitor-info'
  },
  {
    img: '/images/banners/Banner-2-1.jpg',
    mobileImg: '/images/banners/mobile/Banner-2.jpg',
    link: '/donations'
  },
  {
    img: '/images/banners/Banner-3-1.jpg',
    mobileImg: '/images/banners/mobile/Banner-3.jpg',
    link: '/events'
  },
  {
    img: '/images/banners/Banner-4-1.jpg',
    mobileImg: '/images/banners/mobile/Banner-4.jpg',
    link: '/events'
  },
  {
    img: '/images/banners/Banner-5-1.jpg',
    mobileImg: '/images/banners/mobile/Banner-5.jpg',
    link: '/events'
  },
  {
    img: '/images/banners/Banner-6-1.jpg',
    mobileImg: '/images/banners/mobile/Banner-6.jpg',
    link: '/events'
  },
];

export default function HeroSlider() {
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-amber-50 dark:bg-gray-900">
      <style jsx>{`
        .swiper-button-prev,
        .swiper-button-next {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          color: #FF6B35;
          transition: all 0.3s ease;
        }
        
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }
        
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 20px;
          font-weight: bold;
        }
        
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(0, 0, 0, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          background: #FF6B35;
          transform: scale(1.25);
        }
        
        .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.75);
        }
        
        .slide-content {
          border-radius: 20px;
          overflow: hidden;
        }
      `}</style>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: false
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        speed={1000}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="slide-content w-full h-full"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.2)), url(${isMobile ? slide.mobileImg : slide.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* Content container */}
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white max-w-4xl px-6">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    {/* Your slide text here */}
                  </h1>
                  <div className="mt-8">
                    {/* Your CTA button here */}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-10">
        <div className="swiper-progress h-full bg-gradient-to-r from-amber-400 to-amber-600" />
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-white/30 rounded-full animate-pulse z-10" />
      <div className="absolute top-32 right-32 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-500 z-10" />
      <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-1000 z-10" />
    </div>
  );
}