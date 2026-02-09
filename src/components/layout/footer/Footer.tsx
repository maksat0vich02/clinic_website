"use client";
import scss from "./Footer.module.scss";
import Image from "next/image";
import logo from "../../images/logo.png"; // твой логотип
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.top}>
          <div className={scss.logoSection}>
            <Image src={logo} alt="Dentaris Logo" width={200} height={130} />
            <p>Современная стоматология без боли</p>
          </div>

          <div className={scss.links}>
            <h4>Меню</h4>
            <Link href="/doctors">Врачи</Link>
            <Link href="/services">Услуги</Link>
            <Link href="/contacts">Контакты</Link>
            <Link href="/">Главная</Link>
          </div>

          <div className={scss.contact}>
            <h4>Контакты</h4>
            <p>Тел: +996 700 000 000</p>
            <p>Email: info@dentaris.kg</p>
            <p>Адрес: г. Бишкек, ул. Примерная 123</p>
          </div>

          <div className={scss.socials}>
            <h4>Мы в соцсетях</h4>
            <div className={scss.icons}>
              <a href="#" aria-label="Facebook">
                🌐
              </a>
              <a href="#" aria-label="Instagram">
                📸
              </a>
              <a href="#" aria-label="Telegram">
                ✈️
              </a>
            </div>
          </div>
        </div>

        <div className={scss.bottom}>
          <p>© 2026 Dentaris Clinic. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
