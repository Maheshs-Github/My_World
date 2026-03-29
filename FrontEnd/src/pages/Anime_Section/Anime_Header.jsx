import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "../../Anime.css";

const Anime_Header = () => {
  const animeImages = [
    {
      title: "Attack on Titan – Wall Maria Scene",
      img: "https://images.alphacoders.com/137/thumb-1920-1379590.png",
    },
    {
      title: "Your Name – Sky Aesthetic",
      img: "https://images3.alphacoders.com/100/thumb-1920-1006667.jpg",
    },
    {
      title: "Studio Ghibli Forest Vibes",
      img: "https://wallpapers-clan.com/wp-content/uploads/2024/08/kikis-delivery-service-broom-ride-clipart-pc-wallpaper-preview.jpg",
    },
    {
      title: "Cyberpunk Anime Streets",
      img: "https://images.alphacoders.com/116/thumb-1920-1168055.jpg",
    },
    {
      title: "Just One Piece",
      img: "https://images3.alphacoders.com/132/thumb-1920-1323165.png",
    },
    {
      title: "Some Drama Times ",
      img: "https://res.cloudinary.com/dkv6a6geb/image/upload/v1774167358/Screenshot_877_gxe7gg.png",
    },
    {
      title: "Anime Clouds & Mountains",
      img: "https://images6.alphacoders.com/597/thumb-1920-597921.jpg",
    },
  ];

  return (
    <div>
      {/* <div className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden font-over">
        <img
          src="https://wallpaperaccess.com/full/1122593.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/90"></div>

        <div className="relative z-10 flex flex-col h-full justify-center pl-10 text-white">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wide">
            My Anime World
          </h1>
          <p className="mt-2 text-lg opacity-80">
            Explore Anime, Manga and Your Favourite Characters
          </p>
        </div>
      </div> */}

      <div className="anime-page pt-10">
        {/* Header */}
        <header className="anime-header">
          <h1>My Anime World</h1>
          <p>
            All About My favourite Anime's ,Manga's , character's, moments &
            more
          </p>
        </header>

        {/* Swiper Section */}
        <section className="anime-swiper-section">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 2500 }}
            className="anime-swiper"
          >
            {animeImages.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="slide-container">
                  <img src={item.img} alt={item.title} />
                  <div className="slide-title">{item.title}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </div>
  );
};

export default Anime_Header;
