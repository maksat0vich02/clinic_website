"use client";

import { useState } from "react";
import scss from "./Doctors.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import img1 from "../../images/doctor1_img.png";
import img2 from "../../images/doctor2_img.png";
import img3 from "../../images/doctor3_img.png";
import img4 from "../../images/doctor4_img.png";

const doctors = [
  {
    img: img1,
    name: "Иван Петров",
    role: "Стоматолог-терапевт",
    exp: "8 лет",
    specialization: "Лечение кариеса, пломбирование, профессиональная гигиена",
  },
  {
    img: img2,
    name: "Анна Сидорова",
    role: "Ортодонт",
    exp: "6 лет",
    specialization: "Исправление прикуса, брекеты, элайнеры",
  },
  {
    img: img3,
    name: "Максим Иванов",
    role: "Имплантолог",
    exp: "12 лет",
    specialization: "Имплантация, костная пластика, протезирование",
  },
  {
    img: img4,
    name: "Ольга Смирнова",
    role: "Детский стоматолог",
    exp: "5 лет",
    specialization: "Лечение молочных зубов, герметизация фиссур",
  },
];

export default function Doctors() {
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<
    (typeof doctors)[0] | null
  >(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
    service: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setNotification("Пожалуйста, заполните имя и телефон");
      return;
    }

    setLoading(true);
    setNotification("");

    try {
      const requestData = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        service: form.service.trim(),
        doctorName: selectedDoctor?.name || "",
        doctorSpecialization: selectedDoctor?.role || "",
        serviceType: "Запись к врачу",
      };

      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (data.ok) {
        setNotification(
          "✅ Заявка успешно отправлена! Мы свяжемся с вами для подтверждения записи.",
        );
        setForm({ name: "", phone: "", message: "", service: "" });

        setTimeout(() => {
          setOpen(false);
          setNotification("");
        }, 3000);
      } else {
        setNotification(
          `❌ Ошибка: ${data.error || "Не удалось отправить заявку"}`,
        );
      }
    } catch (err: any) {
      setNotification(
        "❌ Ошибка сети. Проверьте соединение и попробуйте еще раз.",
      );
      console.error("Ошибка отправки заявки:", err);
    } finally {
      setLoading(false);
    }
  };

  const openPopup = (doctor: (typeof doctors)[0]) => {
    setSelectedDoctor(doctor);
    setOpen(true);
    setForm({
      name: "",
      phone: "",
      message: "",
      service: "",
    });
  };

  const closePopup = () => {
    setOpen(false);
    setSelectedDoctor(null);
    setNotification("");
    setForm({ name: "", phone: "", message: "", service: "" });
  };

  return (
    <section className={scss.doctors} id="doctors">
      <h2>Наши врачи</h2>
      <p className={scss.subtitle}>Профессионалы с многолетним опытом</p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={3}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className={scss.doctorsSwiper}
      >
        {doctors.map((doc, i) => (
          <SwiperSlide key={i}>
            <div className={scss.doctorCard}>
              <div className={scss.imageWrapper}>
                <Image
                  src={doc.img}
                  alt={doc.name}
                  width={140}
                  height={140}
                  className={scss.doctorImage}
                />
              </div>
              <h3>{doc.name}</h3>
              <p className={scss.role}>{doc.role}</p>
              <p className={scss.specialization}>{doc.specialization}</p>
              <span className={scss.experience}>Опыт: {doc.exp}</span>

              <div className={scss.stars}>★★★★★</div>

              <button
                onClick={() => openPopup(doc)}
                className={scss.bookButton}
                aria-label={`Записаться на прием к ${doc.name}`}
              >
                Записаться на прием
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Popup */}
      {open && selectedDoctor && (
        <div className={scss.popupOverlay} onClick={closePopup}>
          <div className={scss.popup} onClick={(e) => e.stopPropagation()}>
            <button
              className={scss.closeButton}
              onClick={closePopup}
              aria-label="Закрыть форму"
            >
              ×
            </button>

            <h3>Запись к врачу</h3>
            <div className={scss.doctorInfo}>
              <div className={scss.doctorAvatar}>
                <Image
                  src={selectedDoctor.img}
                  alt={selectedDoctor.name}
                  width={60}
                  height={60}
                  className={scss.doctorPopupImage}
                />
              </div>
              <p className={scss.doctorName}>
                <strong>Врач:</strong> {selectedDoctor.name}
              </p>
              <p className={scss.doctorRole}>
                <strong>Специализация:</strong> {selectedDoctor.role}
              </p>
              <p className={scss.doctorExp}>
                <strong>Опыт работы:</strong> {selectedDoctor.exp}
              </p>
            </div>

            <div className={scss.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя *"
                value={form.name}
                onChange={handleChange}
                className={scss.formInput}
                required
                disabled={loading}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Телефон *"
                value={form.phone}
                onChange={handleChange}
                className={scss.formInput}
                required
                disabled={loading}
              />
              <input
                type="text"
                name="service"
                placeholder="Желаемая услуга"
                value={form.service}
                onChange={handleChange}
                className={scss.formInput}
                disabled={loading}
              />
              <textarea
                name="message"
                placeholder="Дополнительная информация (симптомы, пожелания по времени)"
                value={form.message}
                onChange={handleChange}
                className={scss.formTextarea}
                rows={4}
                disabled={loading}
              />
            </div>

            {notification && (
              <div
                className={`${scss.notification} ${
                  notification.includes("✅") ? scss.success : scss.error
                }`}
              >
                {notification}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={scss.submitButton}
              aria-label={loading ? "Отправка заявки..." : "Отправить заявку"}
            >
              {loading ? (
                <>
                  <span className={scss.spinner}></span>
                  Отправка...
                </>
              ) : (
                "Отправить заявку"
              )}
            </button>

            <p className={scss.privacy}>
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
