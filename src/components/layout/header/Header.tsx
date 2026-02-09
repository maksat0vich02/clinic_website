"use client";
import { useState } from "react";
import scss from "./Header.module.scss";
import Image from "next/image";
import logo from "../../images/logo.png";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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

        // Закрываем модалку через 2 секунды
        setTimeout(() => {
          setModalOpen(false);
          setMessage("");
        }, 2000);
      } else {
        setMessage("❌ Ошибка при отправке заявки");
      }
    } catch (err) {
      setMessage("❌ Ошибка сети. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <Link href="/">
              <Image
                src={logo}
                alt="Dentaris Logo"
                width={200}
                height={130}
                priority
              />
            </Link>
          </div>

          <div
            className={`${scss.overlay} ${menuOpen ? scss.active : ""}`}
            onClick={() => setMenuOpen(false)}
          />

          <nav className={`${scss.nav} ${menuOpen ? scss.active : ""}`}>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Главная
            </Link>
            <Link href="/doctors" onClick={() => setMenuOpen(false)}>
              Врачи
            </Link>
            <Link href="/services" onClick={() => setMenuOpen(false)}>
              Услуги
            </Link>
            <Link href="/contacts" onClick={() => setMenuOpen(false)}>
              Контакты
            </Link>
          </nav>

          <button
            className={`${scss.burger} ${menuOpen ? scss.active : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span />
            <span />
            <span />
          </button>

          <button
            className={scss.btnPrimary}
            onClick={() => setModalOpen(true)}
            aria-label="Записаться на прием"
          >
            Записаться
          </button>
        </div>
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
    </header>
  );
}
