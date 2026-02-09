import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      phone,
      service,
      doctorName,
      doctorSpecialization,
      message,
      serviceType,
    } = await req.json();

    const token = process.env.TG_TOKEN;
    const chatId = process.env.TG_CHAT;

    if (!token || !chatId) {
      console.error("TG_TOKEN или TG_CHAT не заданы");
      return NextResponse.json(
        { error: "TG_TOKEN или TG_CHAT не заданы" },
        { status: 500 },
      );
    }

    // Формируем сообщение в зависимости от типа заявки
    let telegramMessage = "";

    // 1. Если это запись к конкретному врачу (из Doctors компонента)
    if (doctorName) {
      telegramMessage =
        `🏥 *ЗАПИСЬ К ВРАЧУ*\n\n` +
        `👤 *Пациент:* ${name}\n` +
        `📞 *Телефон:* ${phone}\n\n` +
        `👨‍⚕️ *Врач:* ${doctorName}\n` +
        `🎯 *Специализация:* ${doctorSpecialization || "Не указана"}\n` +
        (service ? `🦷 *Услуга:* ${service}\n` : "") +
        (message ? `📝 *Сообщение:* ${message}\n` : "") +
        `\n⏰ *Время:* ${new Date().toLocaleString("ru-RU")}`;
    }
    // 2. Если это заявка на услугу (из Header/Hero)
    else if (service) {
      telegramMessage =
        `📋 *НОВАЯ ЗАЯВКА*\n\n` +
        `👤 *Имя:* ${name}\n` +
        `📞 *Телефон:* ${phone}\n` +
        `🦷 *Услуга:* ${service}\n` +
        (message ? `📝 *Сообщение:* ${message}\n` : "") +
        `\n⏰ *Время:* ${new Date().toLocaleString("ru-RU")}`;
    }
    // 3. Общая заявка (из Contact)
    else {
      telegramMessage =
        `📋 *ЗАЯВКА ИЗ КОНТАКТОВ*\n\n` +
        `👤 *Имя:* ${name}\n` +
        `📞 *Телефон:* ${phone}\n` +
        (message ? `📝 *Сообщение:* ${message}\n` : "") +
        `\n⏰ *Время:* ${new Date().toLocaleString("ru-RU")}`;
    }

    // Добавляем примечание
    telegramMessage += `\n\n✨ *Спасибо за доверие!*`;

    console.log("Отправка в Telegram:", {
      name,
      phone,
      doctorName,
      doctorSpecialization,
      service,
      message,
    });

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      },
    );

    const responseData = await res.json();

    if (!res.ok || !responseData.ok) {
      console.error("Ошибка Telegram API:", responseData);
      return NextResponse.json(
        { error: responseData.description || "Ошибка отправки в Telegram" },
        { status: res.status },
      );
    }

    console.log("Сообщение успешно отправлено в Telegram");
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Ошибка в API:", err);
    return NextResponse.json(
      { error: err.message || "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
