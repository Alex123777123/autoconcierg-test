import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Replace this URL with your actual webhook URL to receive form submissions.
const WEBHOOK_URL = 'https://example.com/webhook';

export default function Home() {
  const router = useRouter();

  const [utm, setUtm] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  // Extract UTM parameters from the query string when the route is ready.
  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;
    const utmData = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      if (query[key]) utmData[key] = query[key];
    });
    setUtm(utmData);
  }, [router]);

  // Validate Russian phone numbers (allows +7 and 8 formats with optional separators)
  const validatePhone = (value) => {
    const re = /^\+?[78][\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
    return re.test(value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !phone || !validatePhone(phone)) {
      return;
    }
    setStatus('loading');
    try {
      const payload = {
        name,
        phone,
        message,
        utm,
      };
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus('success');
        setName('');
        setPhone('');
        setMessage('');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Автоконсьерж</h1>
          <div className="flex space-x-4">
            {/* Quick contact links in header */}
            <a
              href="https://wa.me/79001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              WhatsApp
            </a>
            <a
              href="https://t.me/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Telegram
            </a>
          </div>
        </div>
      </header>
      <main>
        {/* Hero section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold mb-4">Тест‑драйв автоконсьержа</h2>
            <p className="text-lg mb-6">
              Ваш личный помощник в выборе и покупке автомобиля. Попробуйте наш сервис бесплатно.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#contact" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Попробовать бесплатно
              </a>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://wa.me/79001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  WhatsApp
                </a>
                <a
                  href="https://t.me/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-3xl font-bold mb-8 text-center">Наши преимущества</h3>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow">
                <h4 className="font-semibold text-xl mb-2">Экономия времени</h4>
                <p>
                  Мы берём на себя подбор и проверку авто, чтобы вы могли заняться важными
                  делами.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h4 className="font-semibold text-xl mb-2">Профессиональный подход</h4>
                <p>Наши эксперты тщательно анализируют рынок и подбирают лучшие предложения.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h4 className="font-semibold text-xl mb-2">Прозрачность</h4>
                <p>Мы работаем честно: вы знаете каждую копейку, которую платите.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-3xl font-bold mb-8 text-center">Как это работает</h3>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="text-2xl font-bold mr-4">1.</span>
                <div>
                  <h4 className="font-semibold text-xl">Оставляете заявку</h4>
                  <p>Расскажите, какой автомобиль вам нужен, и мы свяжемся с вами.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl font-bold mr-4">2.</span>
                <div>
                  <h4 className="font-semibold text-xl">Подбираем варианты</h4>
                  <p>Наши специалисты подберут несколько автомобилей под ваши критерии.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl font-bold mr-4">3.</span>
                <div>
                  <h4 className="font-semibold text-xl">Помогаем оформить</h4>
                  <p>Мы сопровождаем вас на всех этапах сделки, чтобы всё прошло гладко.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Pricing/Test */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-4">Сколько стоит тест?</h3>
            <p className="mb-6">
              Первый тест абсолютно бесплатный. Вы платите только если решите воспользоваться
              полным сервисом.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Записаться на тест
            </a>
          </div>
        </section>

        {/* Contact form */}
        <section id="contact" className="bg-gray-50 py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h3 className="text-3xl font-bold mb-6 text-center">Оставьте заявку</h3>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Ваше имя*
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Телефон*
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+7 (999) 123-45-67"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {phone && !validatePhone(phone) && (
                  <p className="text-red-500 text-sm mt-1">Введите корректный номер телефона</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Комментарий
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Hidden UTM fields for submission */}
              {Object.keys(utm).map((key) => (
                <input key={key} type="hidden" name={key} value={utm[key]} />
              ))}
              <button
                type="submit"
                disabled={
                  status === 'loading' ||
                  !name ||
                  !phone ||
                  !validatePhone(phone)
                }
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
              </button>
              {status === 'success' && (
                <p className="text-green-600 mt-4">
                  Спасибо! Мы скоро свяжемся с вами.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 mt-4">
                  Ошибка при отправке. Попробуйте ещё раз.
                </p>
              )}
            </form>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-3xl font-bold mb-8 text-center">Часто задаваемые вопросы</h3>
            <div className="space-y-4">
              <details className="bg-white p-4 rounded-lg shadow">
                <summary className="font-medium cursor-pointer">Сколько стоит полный сервис?</summary>
                <p className="mt-2">
                  Стоимость зависит от ваших требований и начинается от 10\u00a0000\u00a0\u20bd. Точную
                  сумму озвучит менеджер после уточнения деталей.
                </p>
              </details>
              <details className="bg-white p-4 rounded-lg shadow">
                <summary className="font-medium cursor-pointer">
                  С какими марками автомобилей вы работаете?
                </summary>
                <p className="mt-2">Мы подбираем автомобили любых марок, как новые, так и с пробегом.</p>
              </details>
              <details className="bg-white p-4 rounded-lg shadow">
                <summary className="font-medium cursor-pointer">
                  Как быстро вы найдёте автомобиль?
                </summary>
                <p className="mt-2">Всё зависит от ваших критериев. Обычно подбор занимает от 3 до 7 дней.</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Автоконсьерж. Все права защищены.</p>
        </div>
      </footer>
    </>
  );
}
