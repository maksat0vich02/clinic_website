"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import styles from "./Reviews.module.scss";

const reviews = [
  {
    name: "Александр П.",
    text: "Боялся имплантации, но всё прошло без боли. Очень профессиональная клиника!",
    rating: 5,
  },
  {
    name: "Мария К.",
    text: "Отличные врачи и современное оборудование. Результат превзошёл ожидания!",
    rating: 5,
  },
  {
    name: "Игорь С.",
    text: "Делал чистку и лечение. Всё быстро и комфортно. Рекомендую!",
    rating: 4,
  },
];

export default function Reviews() {
  return (
    <section className={styles.reviews}>
      <div className="container">
        <h2>Отзывы наших пациентов</h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={3}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i}>
              <div className={styles.card}>
                <div className={styles.stars}>
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </div>

                <p>{r.text}</p>
                <span>{r.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
