"use client";
import { useState } from "react";
import scss from "./Hero.module.scss";
import Image from "next/image";
import doctorimg from "../../../images/doctor.png";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setMessage("Пожалуйста, заполните имя и телефон");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.ok) {
        setMessage("✅ Заявка успешно отправлена!");
        setForm({ name: "", phone: "", service: "" });

        setTimeout(() => {
          setModalOpen(false);
          setMessage("");
        }, 2000);
      } else {
        setMessage("❌ Ошибка при отправке заявки");
      }
    } catch (err: any) {
      setMessage("❌ Ошибка сети. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  const handleServicesClick = () => {
    window.location.href = "/services";
  };

  return (
    <section className={scss.hero} id="hero">
      <div className={scss.heroText}>
        <h1>Современная стоматология без боли</h1>
        <p>Лечение, имплантация и эстетическая стоматология</p>

        <div className={scss.heroButtons}>
          <button
            className={scss.btnPrimary}
            onClick={() => setModalOpen(true)}
          >
            Записаться онлайн
          </button>
          <button className={scss.btnOutline} onClick={handleServicesClick}>
            Наши услуги
          </button>
        </div>
      </div>

      <div className={scss.heroImage}>
        <Image
          src={doctorimg}
          alt="Doctor"
          width={400}
          height={500}
          priority
          className={scss.doctorImage}
        />
      </div>

      {modalOpen && (
        <div className={scss.modalOverlay} onClick={() => setModalOpen(false)}>
          <div
            className={scss.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={scss.closeModal}
              onClick={() => setModalOpen(false)}
              aria-label="Закрыть"
            >
              ✕
            </button>
            <h2>Записаться на прием</h2>
            <p className={scss.modalDescription}>
              Оставьте заявку и мы перезвоним вам в течение 15 минут
            </p>

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
                placeholder="Услуга (необязательно)"
                value={form.service}
                onChange={handleChange}
                className={scss.formInput}
                disabled={loading}
              />
            </div>

            {message && (
              <div
                className={`${scss.message} ${
                  message.includes("✅") ? scss.success : scss.error
                }`}
              >
                {message}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={scss.submitButton}
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
          </div>
        </div>
      )}
    </section>
  );
}
