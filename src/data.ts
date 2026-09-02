import type { IconName } from "./components/Icons";

/* ================= Типы бизнеса / калькулятор ================= */

export type BizId = "magazin" | "kafe" | "fitnes" | "salon" | "avto" | "stroy";

export interface BizType {
  id: BizId;
  label: string;
  icon: IconName;
  base: number; // BYN за точку (ПО)
}

export const BIZ_TYPES: BizType[] = [
  { id: "magazin", label: "Магазин", icon: "store", base: 2400 },
  { id: "kafe", label: "Кафе / общепит", icon: "cafe", base: 2900 },
  { id: "salon", label: "Салон красоты", icon: "scissors", base: 2100 },
  { id: "fitnes", label: "Фитнес-клуб", icon: "dumbbell", base: 2300 },
  { id: "avto", label: "Автозапчасти", icon: "wrench", base: 2600 },
  { id: "stroy", label: "Стройматериалы", icon: "bricks", base: 2700 },
];

export interface EquipItem {
  id: string;
  label: string;
  price: number; // BYN за точку
  icon: IconName;
  onByDefault?: boolean;
}

export const EQUIP_ITEMS: EquipItem[] = [
  { id: "ksa", label: "КСА / фискальный регистратор", price: 990, icon: "printer", onByDefault: true },
  { id: "scanner", label: "Сканер штрих-кодов", price: 230, icon: "scanner" },
  { id: "scales", label: "Весы с печатью этикеток", price: 640, icon: "scale" },
  { id: "cheque", label: "Принтер чеков", price: 390, icon: "doc" },
  { id: "pos", label: "POS-терминал", price: 1590, icon: "terminal" },
];

export const LAUNCH_FEE = 290; // запуск и обучение, за точку
export const SUPPORT_MONTHLY = 39; // поддержка, BYN/мес за точку
export const CLOUD_MONTHLY = 120; // типовая облачная подписка, BYN/мес за точку
export const MIN_POINTS = 1;
export const MAX_POINTS = 10;

export function pointsDiscount(points: number): number {
  if (points >= 5) return 0.12;
  if (points >= 2) return 0.07;
  return 0;
}

/* ================= Ниши ================= */

export interface Niche {
  id: BizId;
  title: string;
  desc: string;
  includes: string[];
  icon: IconName;
}

export const NICHES: Niche[] = [
  {
    id: "magazin",
    title: "Магазин",
    desc: "Продуктовые, хозтовары, мини-маркеты и розничные сети — от ларька до супермаркета.",
    includes: ["КСА: наличные, карты, СКНО", "Остатки, цены и автозаказ", "Обмен с 1С и накладные"],
    icon: "store",
  },
  {
    id: "kafe",
    title: "Кафе и общепит",
    desc: "Кафе, бары, столовые, кофейни и доставка — с планом зала и стоп-листами.",
    includes: ["FastPOS с планом зала", "eMenu: QR-меню и допродажи", "Склад и калькуляции блюд"],
    icon: "cafe",
  },
  {
    id: "fitnes",
    title: "Фитнес",
    desc: "Клубы, студии и секции: абонементы, расписание, контроль доступа.",
    includes: ["Абонементы и визиты", "Онлайн-запись и напоминания", "Контроль оплат и должников"],
    icon: "dumbbell",
  },
  {
    id: "salon",
    title: "Салон красоты",
    desc: "Салоны, барбершопы и SPA: запись без накладок, проценты мастеров.",
    includes: ["Запись и электронная очередь", "Мастера: %, KPI и график", "Напоминания клиентам"],
    icon: "scissors",
  },
  {
    id: "avto",
    title: "Автозапчасти",
    desc: "Магазины запчастей и разборы: кросс-номера, аналоги, заказ по VIN.",
    includes: ["Кросс-номера и аналоги", "Заказ поставщику по VIN", "Учёт шин, АКБ и возвратов"],
    icon: "wrench",
  },
  {
    id: "stroy",
    title: "Стройматериалы",
    desc: "Стройрынки и оптово-розничные базы: весовой товар, отсрочки, резервы.",
    includes: ["Весовой и мерный товар", "Отсрочки, счета и акты", "Резервы под объекты"],
    icon: "bricks",
  },
];

/* ================= Продукты ================= */

export type BadgeKind = "hit" | "new" | "sale" | "offline" | "local";

export const BADGE_LABELS: Record<BadgeKind, string> = {
  hit: "Хит",
  new: "New",
  sale: "Акция",
  offline: "Офлайн",
  local: "Локальная лицензия",
};

export interface Product {
  id: string;
  name: string;
  sku: string;
  cat: string;
  badges: BadgeKind[];
  desc: string;
  features: string[];
  price: number;
  oldPrice?: number;
  icon: IconName;
}

export const PRODUCTS: Product[] = [
  {
    id: "sklad-pro",
    name: "Микроинвест Склад PRO",
    sku: "MI-SKLAD-PRO",
    cat: "Учёт и склад",
    badges: ["hit", "local"],
    desc: "Учёт товаров, закупок и цен для розницы и опта. Главный инструмент товароведа.",
    features: ["Автозаказ и минимальные остатки", "Обмен с 1С, накладные и ЭДО"],
    price: 2400,
    icon: "box",
  },
  {
    id: "kassa",
    name: "Микроинвест Касса",
    sku: "MI-KASSA-KSA",
    cat: "Касса / КСА",
    badges: ["offline", "local"],
    desc: "Кассовое место с фискализацией по требованиям РБ. Работает при отключённой сети.",
    features: ["Реестр КСА, интеграция со СКНО", "Офлайн-очередь чеков с синхронизацией"],
    price: 1900,
    icon: "printer",
  },
  {
    id: "fastpos",
    name: "FastPOS",
    sku: "MI-FASTPOS",
    cat: "Общепит",
    badges: ["hit"],
    desc: "POS-система для кафе и баров: план зала, кухня, быстрые пересадки и счета.",
    features: ["План зала и статусы блюд", "Разделение счёта и чаевые"],
    price: 2100,
    icon: "terminal",
  },
  {
    id: "emenu",
    name: "eMenu Pro",
    sku: "MI-EMENU-PRO",
    cat: "Общепит",
    badges: ["new"],
    desc: "Электронное меню по QR: гость заказывает сам, средний чек растёт.",
    features: ["Стоп-листы в реальном времени", "Фото, КБЖУ и допродажи"],
    price: 990,
    icon: "cafe",
  },
  {
    id: "midays",
    name: "MiDays",
    sku: "MI-MIDAYS",
    cat: "Управление",
    badges: ["new"],
    desc: "Планирование смен, задач и планёрки: кто, когда и что делает в каждой точке.",
    features: ["Графики смен и замены", "Чек-листы открытия/закрытия"],
    price: 690,
    icon: "calendar",
  },
  {
    id: "fitness",
    name: "Микроинвест Fitness",
    sku: "MI-FITNESS",
    cat: "Фитнес",
    badges: ["offline"],
    desc: "Учёт абонементов, визитов и тренеров. Напоминания возвращают клиентов.",
    features: ["Заморозки и переносы занятий", "Должники и авто-SMS"],
    price: 1800,
    icon: "dumbbell",
  },
  {
    id: "gps",
    name: "GPS Tracker",
    sku: "MI-GPS-TRACK",
    cat: "Транспорт",
    badges: [],
    desc: "Мониторинг доставки и торговых представителей: маршруты, пробег, ГСМ.",
    features: ["Геозоны и отчёты по рейсам", "Контроль сливов и простоя"],
    price: 590,
    icon: "pin",
  },
  {
    id: "callmi",
    name: "CallMi",
    sku: "MI-CALLMI",
    cat: "Коммуникации",
    badges: ["sale"],
    desc: "Учёт звонков и IP-телефония: ни один клиент не потеряется на линии.",
    features: ["Запись разговоров и статистика", "Переадресация на мобильный"],
    price: 750,
    oldPrice: 990,
    icon: "phone",
  },
];

/* ================= Оборудование и комплекты ================= */

export interface EquipCat {
  id: string;
  title: string;
  icon: IconName;
  models: number;
  from: number;
}

export const EQUIP_CATS: EquipCat[] = [
  { id: "ksa", title: "КСА и фискальные регистраторы", icon: "printer", models: 14, from: 690 },
  { id: "skanery", title: "Сканеры штрих-кодов", icon: "scanner", models: 11, from: 150 },
  { id: "vesy", title: "Весы и весовое оборудование", icon: "scale", models: 9, from: 380 },
  { id: "printery", title: "Принтеры чеков и этикеток", icon: "doc", models: 12, from: 320 },
  { id: "pos", title: "POS-терминалы и мониторы", icon: "terminal", models: 8, from: 1150 },
];

export interface Bundle {
  id: string;
  name: string;
  audience: string;
  includes: string[];
  price: string;
  accent: boolean;
}

export const BUNDLES: Bundle[] = [
  {
    id: "start",
    name: "«Старт»",
    audience: "Один магазин или киоск",
    includes: ["Склад PRO + Касса", "КСА и сканер штрих-кодов", "Запуск и обучение кассира", "30 дней поддержки в подарок"],
    price: "3 490",
    accent: false,
  },
  {
    id: "cafe",
    name: "«Кафе под ключ»",
    audience: "Кафе до 40 посадочных мест",
    includes: ["FastPOS + eMenu Pro", "КСА, POS-терминал, принтер чеков", "Меню, калькуляции, стоп-листы", "Обучение двух смен"],
    price: "5 900",
    accent: true,
  },
  {
    id: "set",
    name: "«Мини-сеть»",
    audience: "3–5 точек одного владельца",
    includes: ["Единая база, цены и дисконт", "Обмен товара между точками", "Центральный склад и отчёты", "SLA-поддержка и мониторинг"],
    price: "от 9 900",
    accent: false,
  },
];

/* ================= Таймлайн ================= */

export interface TimelineStep {
  day: string;
  title: string;
  text: string;
}

export const TIMELINE: TimelineStep[] = [
  { day: "День 1", title: "Заявка и бриф", text: "Звонок на 30 минут: фиксируем задачи, точки и что болит прямо сейчас." },
  { day: "День 2", title: "Аудит процессов", text: "Выезд или онлайн: ассортимент, кассовые сценарии, учёт и отчётность." },
  { day: "День 3", title: "Конфигурация", text: "Коммерческое предложение по ПО и оборудованию — без лишних модулей." },
  { day: "День 4", title: "Поставка", text: "Оборудование со склада в Минске, лицензии активируем на вашей технике." },
  { day: "День 5", title: "Настройка", text: "Справочники, цены, остатки. Подключаем 1С, банк и терминалы оплаты." },
  { day: "День 6", title: "Обучение", text: "Кассиры и администраторы работают сами. Памятки и тестовые смены." },
  { day: "День 7", title: "Запуск", text: "Мы рядом в первый торговый день. Дальше — поддержка и развитие." },
];

/* ================= Кейсы ================= */

export interface CaseMetric {
  label: string;
  before: string;
  after: string;
  delta: string;
}

export interface CaseItem {
  tag: string;
  city: string;
  title: string;
  text: string;
  metrics: CaseMetric[];
}

export const CASES: CaseItem[] = [
  {
    tag: "Магазин",
    city: "Минск",
    title: "«Продукты у дома»",
    text: "Две кассы, 4 500 SKU. Перешли с бумажных накладных и «тетрадки» на Склад PRO + КСА.",
    metrics: [
      { label: "Инвентаризация", before: "2 дня", after: "4 часа", delta: "−92%" },
      { label: "Время чека", before: "4,1 мин", after: "2,5 мин", delta: "−39%" },
      { label: "Выручка за квартал", before: "база", after: "+12%", delta: "рост" },
    ],
  },
  {
    tag: "Кафе",
    city: "Гомель",
    title: "Кафе «Тёплый кот»",
    text: "38 посадочных мест, кухня и бар. FastPOS + eMenu Pro: заказы больше не теряются.",
    metrics: [
      { label: "Потерянные заказы", before: "5–7 / нед", after: "0", delta: "−100%" },
      { label: "Оборачиваемость стола", before: "54 мин", after: "42 мин", delta: "+22%" },
      { label: "Средний чек (eMenu)", before: "27 BYN", after: "31 BYN", delta: "+15%" },
    ],
  },
  {
    tag: "Фитнес",
    city: "Брест",
    title: "Клуб «Атлант»",
    text: "600 активных клиентов. Абонементы под контролем: система сама помнит про продление.",
    metrics: [
      { label: "Потери на просрочках", before: "~7%", after: "0,4%", delta: "−94%" },
      { label: "Онлайн-запись", before: "0%", after: "67%", delta: "визитов" },
      { label: "Возврат клиентов", before: "база", after: "+18%", delta: "рост" },
    ],
  },
];

/* ================= Отзывы ================= */

export interface Review {
  name: string;
  role: string;
  text: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Андрей Ковалёв",
    role: "владелец «Продукты у дома», Минск",
    text: "Интернет у нас пропадает по два раза в неделю — касса этого просто не замечает. Чеки пробиваются, а при появлении сети всё само синхронизируется. За год — ни одного простоя.",
  },
  {
    name: "Ольга Смирнова",
    role: "управляющая кафе «Тёплый кот», Гомель",
    text: "Раньше официанты носили записки на кухню, и каждый день что-то терялось. С FastPOS заказы уходят сами, а eMenu поднял средний чек на 15% — гости охотнее берут фото-позиции.",
  },
  {
    name: "Дмитрий Романюк",
    role: "директор фитнес-клуба «Атлант», Брест",
    text: "Главная боль — «забытые» абонементы. Система сама шлёт напоминания и показывает должников. За полгода вернули клиентов больше, чем за предыдущие два года руками.",
  },
  {
    name: "Наталья Гринкевич",
    role: "владелица салона «Лилия», Гродно",
    text: "Боялась, что внедрение растянется на месяцы. По факту: в понедельник приехали, в пятницу уже работали по записи. Администратор перестала быть диспетчером телефонных звонков.",
  },
  {
    name: "Сергей Мельников",
    role: "ИП, автозапчасти, Витебск",
    text: "Кросс-номера — это то, ради чего брал. Клиент даёт один номер, система сама находит шесть аналогов по разным брендам. Скорость подбора выросла раза в три, и меньше отказов.",
  },
];

/* ================= FAQ ================= */

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "Действительно ли работает без интернета?",
    a: "Да. Касса пробивает чеки, склад проводит накладные — всё хранится в локальной базе. Когда связь появляется, система автоматически отправляет данные в СКНО и синхронизирует точки между собой. Простоев из-за сети нет.",
  },
  {
    q: "Чем разовая лицензия выгоднее подписки?",
    a: "Вы платите за систему один раз, а не каждый месяц. На горизонте трёх лет типовая подписка (≈120 BYN/мес за точку) обходится в 4 300+ BYN, тогда как локальное решение — в разовую сумму и необязательную поддержку. Данные и лицензии при этом остаются у вас.",
  },
  {
    q: "Совместимо ли с 1С и белорусским учётом?",
    a: "Да. Настроен обмен с 1С:Бухгалтерия и 1С:Управление торговлей, выгружаются накладные ТТН/ТН и ЭСЧФ. Форматы обновляются вместе с законодательством.",
  },
  {
    q: "Соответствует ли требованиям Республики Беларусь?",
    a: "Используемые кассовые аппараты внесены в реестр КСА, обеспечена работа со СКНО и маркировкой товаров. Комплект документов для проверяющих органов готовим вместе с внедрением.",
  },
  {
    q: "Как быстро происходит запуск?",
    a: "Типовой проект — 7 рабочих дней от заявки до первого чека: бриф, аудит, поставка, настройка, обучение и запуск рядом с вами. Сложные сети — по графику, обычно 2–3 недели.",
  },
  {
    q: "Что с поддержкой и обновлениями?",
    a: "Поддержка — по желанию: удалённо и с выездом, Пн–Сб. Обновления под изменения законодательства ставим в рамках обслуживания. Без подписки система продолжает работать — вы ничего не теряете.",
  },
];

/* ================= Прочее ================= */

export const TICKER_ITEMS = [
  "Работает без интернета",
  "Разовая лицензия — без обязательных подписок",
  "КСА из реестра РБ",
  "Обмен с 1С",
  "Запуск за 7 дней",
  "480+ внедрений с 2012 года",
  "Поддержка по всей Беларуси",
];

export const CONTACTS = {
  phone: "+375 (29) 640-05-05",
  phoneHref: "tel:+375296400505",
  email: "info@microinvest.by",
  address: "г. Минск, ул. Сурганова, 57Б, офис 412",
  hours: "Пн–Пт 9:00–18:00 · Сб 10:00–15:00",
  kb: "https://softeam.by/instrukcii/",
  developer: "https://softeam.by",
  viber: "viber://chat?number=%2B375296400505",
  telegram: "https://t.me/microinvest_by",
  whatsapp: "https://wa.me/375296400505",
};
