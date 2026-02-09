"use client";
import { useState, useEffect } from "react";
import styles from "./BeforeAfter.module.scss";
import beforiImg from "../../images/befori_img.png";
import afterImg from "../../images/after_img.png";
import Image from "next/image";

export default function BeforeAfter() {
  const [value, setValue] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Анимация при загрузке
    const timer = setTimeout(() => {
      setValue(50);
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <h2>Результаты наших пациентов</h2>

        <div className={styles.wrapper}>
          <div
            className={`${styles.imageContainer} ${isLoaded ? styles.loaded : ""}`}
          >
            {/* AFTER IMAGE */}
            <div className={styles.imageWrapper}>
              <Image
                src={afterImg}
                alt="Результат после процедуры"
                className={styles.after}
                priority={true}
                sizes="(max-width: 768px) 100vw, 900px"
              />
              <span className={styles.label} style={{ right: "20px" }}>
                После
              </span>
            </div>

            {/* BEFORE IMAGE */}
            <div
              className={styles.beforeWrapper}
              style={{ width: `${value}%` }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={beforiImg}
                  alt="Результат до процедуры"
                  className={styles.before}
                  sizes="(max-width: 768px) 100vw, 900px"
                />
                <span className={styles.label} style={{ left: "20px" }}>
                  До
                </span>
              </div>
            </div>

            {/* SLIDER HANDLE WITH LINE */}
            <div className={styles.sliderHandle} style={{ left: `${value}%` }}>
              <div className={styles.handleLine} />
              <div className={styles.handleCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 12L11 15L16 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className={styles.handleLabel}>{value}%</div>
            </div>

            {/* SLIDER INPUT (hidden but functional for accessibility) */}
            <label htmlFor="beforeAfterSlider" className={styles.srOnly}>
              Сравнение до и после: перемещайте ползунок для сравнения
              изображений
            </label>
            <input
              id="beforeAfterSlider"
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className={styles.slider}
              aria-valuetext={`Показано ${value}% изображения "До"`}
            />

            {/* CONTROLS */}
            <div className={styles.controls}>
              <button
                onClick={() => setValue(0)}
                className={`${styles.controlBtn} ${value === 0 ? styles.active : ""}`}
                aria-label="Показать только изображение 'После'"
              >
                После
              </button>
              <button
                onClick={() => setValue(50)}
                className={`${styles.controlBtn} ${value === 50 ? styles.active : ""}`}
                aria-label="Показать оба изображения поровну"
              >
                50/50
              </button>
              <button
                onClick={() => setValue(100)}
                className={`${styles.controlBtn} ${value === 100 ? styles.active : ""}`}
                aria-label="Показать только изображение 'До'"
              >
                До
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
