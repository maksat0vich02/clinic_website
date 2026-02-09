"use client";
import { useState } from "react";
import scss from "./Contact.module.scss";

export const Contact = () => {
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
        setMessage(
          "✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
        );
        setForm({ name: "", phone: "", service: "" });

        // Автоматически скрыть сообщение через 5 секунд
        setTimeout(() => {
          setMessage("");
        }, 5000);
      } else {
        setMessage("❌ Ошибка при отправке. Попробуйте еще раз.");
      }
    } catch (err: any) {
      setMessage("❌ Ошибка сети. Проверьте соединение.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={scss.contact} id="contacts">
      <div className={scss.header}>
        <h2>Контакты</h2>
        <p>Свяжитесь с нами или запишитесь на прием</p>
      </div>

      <div className={scss.grid}>
        {/* Левая часть */}
        <div className={scss.info}>
          <div className={scss.card}>
            <h3>📞 Телефон</h3>
            <p>+996 700 000 000</p>
            <a href="tel:+996700000000" className={scss.callBtn}>
              Позвонить
            </a>
          </div>

          <div className={scss.card}>
            <h3>📍 Адрес</h3>
            <p>г. Бишкек, ул. Примерная 123</p>
          </div>

          <div className={scss.card}>
            <h3>✉️ Email</h3>
            <p>info@dentaris.kg</p>
            <a href="mailto:info@dentaris.kg" className={scss.emailBtn}>
              Написать
            </a>
          </div>

          <div className={scss.card}>
            <h3>⏰ График</h3>
            <p>Пн–Сб: 09:00 – 20:00</p>
            <p>Вс: 10:00 – 18:00</p>
          </div>
        </div>

        {/* Карта */}
        <div className={scss.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.143574068538!2d74.58235131538667!3d42.87166147915599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec8233d2b5b3d%3A0x6a6a8c2e2e2e2e2e!2z0JHQuNGI0LrQtdC6!5e0!3m2!1sru!2skg!4v1640000000000!5m2!1sru!2skg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта расположения клиники Dentaris"
          ></iframe>
        </div>
      </div>

      {/* Форма записи */}
      <div className={scss.form}>
        <h3>Записаться на прием</h3>
        <p>Оставьте заявку и мы перезвоним вам в течение 15 минут</p>

        <div className={scss.formFields}>
          <input
            type="text"
            name="name"
            placeholder="Ваше имя *"
            value={form.name}
            onChange={handleChange}
            required
            className={scss.formInput}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон *"
            value={form.phone}
            onChange={handleChange}
            required
            className={scss.formInput}
          />
          <input
            type="text"
            name="service"
            placeholder="Желаемая услуга (необязательно)"
            value={form.service}
            onChange={handleChange}
            className={scss.formInput}
          />

          {message && (
            <div
              className={`${scss.message} ${message.includes("✅") ? scss.success : scss.error}`}
            >
              {message}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={scss.submitBtn}
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

      {/* Статистика */}
      <div className={scss.stats}>
        <div>
          <h4>10+</h4>
          <p>Лет опыта</p>
        </div>
        <div>
          <h4>5000+</h4>
          <p>Довольных пациентов</p>
        </div>
        <div>
          <h4>20+</h4>
          <p>Квалифицированных врачей</p>
        </div>
        <div>
          <h4>99%</h4>
          <p>Положительных отзывов</p>
        </div>
      </div>
    </section>
  );
};
