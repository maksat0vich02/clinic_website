"use client";
import { useState } from "react";
import scss from "./Services.module.scss";

const services = [
  {
    title: "Лечение кариеса",
    icon: "🦷",
    description: "Современное лечение без боли с использованием микроскопа",
    duration: "30-60 мин",
    price: "от 2 500 сом",
  },
  {
    title: "Пломбирование",
    icon: "🪥",
    description: "Эстетичные пломбы из современных материалов",
    duration: "40-90 мин",
    price: "от 3 000 сом",
  },
  {
    title: "Имплантация",
    icon: "🦴",
    description: "Восстановление зубов с пожизненной гарантией",
    duration: "1-2 часа",
    price: "от 45 000 сом",
  },
  {
    title: "Протезирование",
    icon: "😁",
    description: "Коронки, виниры, мосты из керамики и циркония",
    duration: "1-3 часа",
    price: "от 15 000 сом",
  },
  {
    title: "Отбеливание зубов",
    icon: "✨",
    description: "Безопасное отбеливание за 1 визит",
    duration: "1 час",
    price: "от 8 000 сом",
  },
  {
    title: "Брекеты и ортодонтия",
    icon: "🔩",
    description: "Исправление прикуса для детей и взрослых",
    duration: "1-2 года",
    price: "от 80 000 сом",
  },
  {
    title: "Детская стоматология",
    icon: "👶",
    description: "Лечение молочных зубов и профилактика",
    duration: "20-40 мин",
    price: "от 1 500 сом",
  },
  {
    title: "Профессиональная гигиена",
    icon: "🧼",
    description: "Чистка и укрепление эмали",
    duration: "40-60 мин",
    price: "от 2 000 сом",
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setForm((prev) => ({ ...prev, service: serviceTitle }));
    setModalOpen(true);
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
          setSelectedService("");
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

  return (
    <section className={scss.services} id="services">
      <div className={scss.header}>
        <h2>Наши услуги</h2>
        <p>Полный спектр стоматологических услуг для всей семьи</p>
      </div>

      <div className={scss.serviceGrid}>
        {services.map((item, i) => (
          <div
            key={i}
            className={scss.card}
            onClick={() => handleServiceClick(item.title)}
          >
            <span className={scss.icon}>{item.icon}</span>
            <h3>{item.title}</h3>
            <p className={scss.description}>{item.description}</p>
            <div className={scss.details}>
              <span className={scss.duration}>⏱️ {item.duration}</span>
              <span className={scss.price}>💰 {item.price}</span>
            </div>
            <button className={scss.serviceButton}>Записаться</button>
          </div>
        ))}
      </div>

      {/* Блок преимуществ */}
      <div className={scss.features}>
        <div className={scss.feature}>
          <span className={scss.featureIcon}>🏥</span>
          <h4>Современное оборудование</h4>
          <p>Новейшие технологии для точной диагностики</p>
        </div>
        <div className={scss.feature}>
          <span className={scss.featureIcon}>👨‍⚕️</span>
          <h4>Опытные врачи</h4>
          <p>Специалисты с 5+ лет опыта работы</p>
        </div>
        <div className={scss.feature}>
          <span className={scss.featureIcon}>😌</span>
          <h4>Безболезненное лечение</h4>
          <p>Эффективная анестезия и комфорт</p>
        </div>
        <div className={scss.feature}>
          <span className={scss.featureIcon}>✅</span>
          <h4>Гарантия качества</h4>
          <p>Гарантия на все виды лечения</p>
        </div>
      </div>

      {/* Кнопка записи */}
      <div className={scss.cta}>
        <p>
          Не нашли нужную услугу? Проконсультируйтесь с нашими специалистами!
        </p>
        <button
          className={scss.ctaButton}
          onClick={() => {
            setSelectedService("Консультация");
            setModalOpen(true);
          }}
        >
          Бесплатная консультация
        </button>
      </div>

      {/* Модальное окно */}
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

            <h2>Запись на услугу</h2>
            {selectedService && (
              <p className={scss.selectedService}>
                Вы выбрали: <strong>{selectedService}</strong>
              </p>
            )}
            <p className={scss.modalDescription}>
              Оставьте заявку и мы подберем удобное время для записи
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
                placeholder="Услуга"
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
                "Записаться на услугу"
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
