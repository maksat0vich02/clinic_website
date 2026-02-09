"use cleint";
import styles from "./WhyDentaris.module.scss";

const features = [
  {
    title: "Лечение без боли",
    desc: "Современная анестезия и щадящие методики",
    icon: "🦷",
  },
  {
    title: "Опытные врачи",
    desc: "Специалисты с опытом 10+ лет",
    icon: "👨‍⚕️",
  },
  {
    title: "Современное оборудование",
    desc: "3D-диагностика и микроскоп",
    icon: "🔬",
  },
  {
    title: "Гарантия на лечение",
    desc: "Официальная гарантия на услуги",
    icon: "🛡️",
  },
  {
    title: "Прозрачные цены",
    desc: "Без скрытых платежей",
    icon: "💳",
  },
];

export default function WhyDentaris() {
  return (
    <section className={styles.why}>
      <div className="container">
        <h2>Почему выбирают Dentaris</h2>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
