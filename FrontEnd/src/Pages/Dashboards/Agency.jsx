import { useState } from 'react';

/* ---------------------------------------------------------------------------
   Agency dashboard (agency-only version of Dashboard.jsx)
   Props: onExit – called when the agency leaves the portal
--------------------------------------------------------------------------- */

/* ------------------------------ Static data ------------------------------ */

const PROFILE = {
  eyebrow: 'Agency workspace',
  title: 'Good morning, Farhan',
  description: 'Your experiences are inspiring more travel this month.',
  person: 'Bengal Trails',
  initials: 'BT',
};

const NAV = [
  { label: 'Overview', icon: 'home' },
  { label: 'Bookings', icon: 'calendar' },
  { label: 'Experiences', icon: 'briefcase' },
  { label: 'Customers', icon: 'users' },
  { label: 'Payments', icon: 'briefcase' },
  { label: 'Messages', icon: 'message' },
  { label: 'Analytics', icon: 'chart' },
];

const METRICS = [
  { label: 'Monthly revenue', value: '৳8.4M', note: 'vs. ৳6.9M last month', trend: '+21.7%', icon: 'chart' },
  { label: 'Active bookings', value: '38', note: '12 arriving this week', trend: '+8.4%', icon: 'calendar' },
  { label: 'Guest satisfaction', value: '4.9', note: 'From 184 verified reviews', trend: '+0.2', icon: 'heart' },
];

const ACTIVITIES = [
  { title: 'New booking from Camille N.', meta: 'Tea & Hills · 4 guests', status: 'New', icon: 'calendar' },
  { title: 'Payment released', meta: 'Booking BD-2048 · ৳640,000', status: 'Paid', icon: 'check' },
  { title: 'New five-star review', meta: 'Sundarbans Wildlife Cruise · 38m ago', status: 'View', icon: 'heart' },
];

const BOOKINGS = [
  { primary: 'BD-2841 · Camille N.', secondary: 'Tea & Hills Signature Tour', detail: '4 guests · 18–24 Jun', status: 'Confirmed' },
  { primary: 'BD-2839 · Liam A.', secondary: 'Sundarbans Wildlife Cruise', detail: '2 guests · 21 Jun', status: 'Pending' },
  { primary: 'BD-2834 · Sofia M.', secondary: 'Ratargul Forest Experience', detail: '3 guests · 26–28 Jun', status: 'Paid' },
  { primary: 'BD-2828 · Noah K.', secondary: 'Old Dhaka Food & Culture', detail: '6 guests · 29 Jun', status: 'Confirmed' },
];

const CUSTOMERS = [
  { primary: 'Camille Niyonzima', secondary: 'camille@example.com', detail: '3 bookings · ৳1.8M lifetime value', status: 'Returning' },
  { primary: 'Liam Anderson', secondary: 'liam@example.com', detail: '1 booking · United Kingdom', status: 'New' },
  { primary: 'Sofia Martinez', secondary: 'sofia@example.com', detail: '2 bookings · Spain', status: 'Returning' },
];

const EXPERIENCES = [
  { title: 'Tea & Hills Signature', meta: '7 days · From ৳1.2M', icon: 'map', badge: 'Live' },
  { title: 'Sundarbans Wildlife Cruise', meta: '2 days · From ৳420K', icon: 'compass', badge: 'Live' },
  { title: 'Old Dhaka Food & Culture', meta: '1 day · From ৳85K', icon: 'heart', badge: 'Draft' },
  { title: 'Kaptai Lake Weekend', meta: '3 days · Pricing incomplete', icon: 'plus', badge: 'In progress' },
];

const TRANSACTIONS = [
  ['Hills & Coast', '+ ৳1,280,000', 'Today · Booking BD-2841', 'Completed'],
  ['Sundarbans Safari', '+ ৳420,000', 'Yesterday · Booking BD-2839', 'Completed'],
  ['Bank cashout', '- ৳2,000,000', '12 Jun · Transfer 8872', 'Processing'],
];

const MESSAGES = [
  { name: 'Camille N.', subject: 'Question about airport pickup', time: '10:24', unread: true },
  { name: 'Liam A.', subject: 'Dietary requirements for safari', time: 'Yesterday', unread: false },
  { name: 'Explore Bangladesh Support', subject: 'Monthly partner update', time: 'Mon', unread: false },
];

const ANALYTICS_STATS = [
  ['Page views', '48.2K', '+18.4%'],
  ['Conversion', '7.4%', '+1.2%'],
  ['Avg. booking', '৳721K', '+9.8%'],
  ['Repeat guests', '32%', '+4.1%'],
];

const OVERVIEW_BARS = [38, 52, 45, 68, 61, 82, 74, 96, 78, 108, 92, 118];
const ANALYTICS_BARS = [42, 58, 51, 76, 68, 96, 82, 118, 102, 142, 126, 158];

const POSITIVE_STATUS = ['Confirmed', 'Paid', 'Active', 'Live', 'Returning'];

const FORM_PAGES = {
  'create-experience': {
    eyebrow: 'Agency tools',
    title: 'Create a new experience',
    description: 'Add an itinerary, pricing, availability, and traveler requirements.',
    fields: [['Experience name', 'e.g. Kaptai Lake Wellness Weekend'], ['Division', 'Select a division'], ['Duration', 'Number of days'], ['Base price', 'Price per traveler in BDT']],
    action: 'Continue to itinerary',
    wideLast: false,
  },
  'compose-message': {
    eyebrow: 'New conversation',
    title: 'Compose a message',
    description: 'Contact a traveler or the Explore Bangladesh support team.',
    fields: [['Recipient', 'Search by name or booking'], ['Related booking', 'Optional reference'], ['Subject', 'Enter message subject'], ['Message', 'Write your message']],
    action: 'Send message',
    wideLast: true,
  },
  'add-payment-method': {
    eyebrow: 'Secure payments',
    title: 'Add a payment method',
    description: 'Your payment information is encrypted and securely stored.',
    fields: [['Cardholder name', 'Name shown on card'], ['Card number', '•••• •••• •••• ••••'], ['Expiry date', 'MM / YY'], ['Security code', 'CVC']],
    action: 'Save payment method',
    wideLast: false,
  },
  support: {
    eyebrow: 'Explore Bangladesh support',
    title: 'How can we help?',
    description: 'Send a request to our operations team. Priority issues are handled around the clock.',
    fields: [['Request type', 'Booking assistance'], ['Related reference', 'Optional booking or payment ID'], ['Priority', 'Standard'], ['Description', 'Tell us what happened']],
    action: 'Submit support request',
    wideLast: true,
  },
};

const SUCCESS_MESSAGES = {
  cashout: ['Transfer submitted', 'Your cashout is being processed and should arrive within two business days.'],
  message: ['Message sent', 'Your message was delivered successfully.'],
  download: ['Receipt ready', 'Your document has been prepared for download.'],
  'create-experience': ['Experience saved', 'Continue adding itinerary details before submitting it for approval.'],
  'compose-message': ['Message sent', 'The conversation is now available in your inbox.'],
  'add-payment-method': ['Payment method added', 'Your new payment method is verified and ready to use.'],
  support: ['Request received', 'Support will respond in your message center shortly.'],
};

const DETAIL_TITLES = {
  cashout: 'Cash out',
  'payment-methods': 'Payment methods',
  'payment-detail': 'Payment details',
  'transaction-history': 'Transactions',
  'create-experience': 'Create experience',
  'compose-message': 'New message',
  'add-payment-method': 'Add payment method',
  support: 'Support',
  'global-search': 'Search',
  notifications: 'Notifications',
};

/* ------------------------------ Small helpers ----------------------------- */

const getInitials = (name) => name.split(' ').map((part) => part[0]).slice(0, 2).join('');

const getDetailTitle = (detail) => {
  if (DETAIL_TITLES[detail]) return DETAIL_TITLES[detail];
  return detail.startsWith('success:') ? 'Complete' : 'Open details';
};

const ICON_PATHS = {
  home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V21h13V9.5M9 21v-7h6v7" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5Z" /></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M14 3h6v18h-6" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};

function Icon({ name, className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}

function StatusPill({ status }) {
  const positive = POSITIVE_STATUS.includes(status);
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${positive ? 'bg-forest/10 text-forest' : 'bg-earth/10 text-earth-dark'}`}>
      {status}
    </span>
  );
}

function BackButton({ onClick, label }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 text-sm text-bark/50 hover:text-forest mb-6">
      <Icon name="arrow" className="w-4 h-4 rotate-180" /> {label}
    </button>
  );
}

function BarChart({ bars, heightClass }) {
  return (
    <div className={`${heightClass} flex items-end gap-3 border-b border-mist/60`}>
      {bars.map((height, index) => (
        <div key={index} className="flex-1 h-full flex items-end group">
          <div className="w-full bg-forest/20 group-hover:bg-earth rounded-t-lg transition-colors" style={{ height }} />
        </div>
      ))}
    </div>
  );
}

function FilterTabs({ items, active, onChange, inactiveClass }) {
  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`px-4 py-2 rounded-full text-xs font-semibold ${active === item ? 'bg-forest text-cream' : inactiveClass}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

/* ----------------------------- Workspace pages ---------------------------- */

function PaymentsPage({ onOpenDetail }) {
  return (
    <div className="space-y-6">
      <section className="bg-forest text-cream rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-earth-light text-xs font-semibold uppercase tracking-widest mb-3">Available balance</p>
            <p className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold">৳6.42M</p>
            <p className="text-cream/50 text-sm mt-3">৳840,000 pending clearance</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onOpenDetail('cashout')} className="px-5 py-3 rounded-full bg-earth text-cream text-sm font-semibold">Cash out</button>
            <button onClick={() => onOpenDetail('payment-methods')} className="px-5 py-3 rounded-full border border-cream/20 text-cream text-sm font-semibold">Payment methods</button>
          </div>
        </div>
        <span className="absolute -right-12 -bottom-24 w-64 h-64 rounded-full border border-cream/10" />
      </section>

      <div className="grid xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-fog border border-mist/60 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-mist/50 flex items-center justify-between">
            <div>
              <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">Recent transactions</h2>
              <p className="text-xs text-bark/45 mt-1">Payments, refunds, and transfers</p>
            </div>
            <button onClick={() => onOpenDetail('transaction-history')} className="text-earth text-xs font-semibold">View all</button>
          </div>
          {TRANSACTIONS.map(([name, amount, meta, status]) => (
            <button key={name} onClick={() => onOpenDetail('payment-detail')} className="w-full text-left px-6 py-5 border-b border-mist/40 last:border-0 flex items-center gap-4 hover:bg-cream-dark/40">
              <span className="w-10 h-10 rounded-full bg-forest/10 text-forest flex items-center justify-center"><Icon name="briefcase" className="w-4 h-4" /></span>
              <span className="flex-1 min-w-0">
                <span className="block font-semibold text-forest">{name}</span>
                <span className="block text-xs text-bark/45 mt-1">{meta}</span>
              </span>
              <span className="text-right">
                <span className="block font-semibold text-forest">{amount}</span>
                <span className="block text-xs text-bark/40 mt-1">{status}</span>
              </span>
            </button>
          ))}
        </section>

        <section className="bg-fog border border-mist/60 rounded-2xl p-6 h-fit">
          <span className="w-11 h-11 rounded-xl bg-earth/10 text-earth flex items-center justify-center mb-5"><Icon name="shield" /></span>
          <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">Secure payments</h2>
          <p className="text-sm text-bark/50 mt-2 leading-relaxed">Every transaction is encrypted and protected by Explore Bangladesh partner safeguards.</p>
          <button onClick={() => onOpenDetail('payment-methods')} className="text-earth text-sm font-semibold mt-6 flex items-center gap-2">
            Manage security <Icon name="arrow" className="w-4 h-4" />
          </button>
        </section>
      </div>
    </div>
  );
}

function MessagesPage({ onOpenDetail }) {
  const [selectedMessage, setSelectedMessage] = useState(0);
  const selected = MESSAGES[selectedMessage];

  return (
    <section className="bg-fog border border-mist/60 rounded-2xl overflow-hidden min-h-screen grid lg:grid-cols-5">
      <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-mist/60">
        <div className="p-5 border-b border-mist/50 flex items-center justify-between">
          <div>
            <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">Inbox</h2>
            <p className="text-xs text-bark/45 mt-1">3 conversations · 1 unread</p>
          </div>
          <button onClick={() => onOpenDetail('compose-message')} className="w-9 h-9 rounded-full bg-earth text-cream flex items-center justify-center" aria-label="New message">
            <Icon name="plus" className="w-4 h-4" />
          </button>
        </div>
        {MESSAGES.map((message, index) => (
          <button key={message.name} onClick={() => setSelectedMessage(index)} className={`w-full text-left p-5 flex gap-3 border-b border-mist/40 transition-colors ${selectedMessage === index ? 'bg-cream-dark/70' : 'hover:bg-cream-dark/40'}`}>
            <span className="w-11 h-11 rounded-full bg-forest text-cream flex items-center justify-center text-xs font-semibold flex-shrink-0">{getInitials(message.name)}</span>
            <span className="min-w-0 flex-1">
              <span className="flex justify-between gap-2">
                <span className="font-semibold text-sm text-forest truncate">{message.name}</span>
                <span className="text-xs text-bark/40">{message.time}</span>
              </span>
              <span className="block text-xs text-bark/50 truncate mt-1">{message.subject}</span>
            </span>
            {message.unread && <span className="w-2 h-2 rounded-full bg-earth mt-2" />}
          </button>
        ))}
      </div>

      <div className="lg:col-span-3 flex flex-col">
        <div className="p-5 border-b border-mist/50 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-forest text-cream flex items-center justify-center text-xs font-semibold">{getInitials(selected.name)}</span>
          <div>
            <p className="font-semibold text-forest">{selected.name}</p>
            <p className="text-xs text-forest-light">Usually replies within an hour</p>
          </div>
        </div>
        <div className="flex-1 p-6 space-y-5 bg-cream/40">
          <div className="max-w-md bg-cream-dark rounded-2xl rounded-tl-sm p-4 text-sm text-bark/70">
            Hello! {selected.subject}. Everything is on track, and we have attached the latest details for your review.
            <p className="text-xs text-bark/35 mt-2">10:18</p>
          </div>
          <div className="max-w-md ml-auto bg-forest text-cream rounded-2xl rounded-tr-sm p-4 text-sm">
            Thank you for the update. This looks perfect. Please let me know if you need anything else from me.
            <p className="text-xs text-cream/40 mt-2">10:22</p>
          </div>
        </div>
        <div className="p-4 border-t border-mist/50 flex gap-3">
          <div className="flex-1 bg-cream-dark rounded-full px-5 py-3 text-sm text-bark/40">Write a message…</div>
          <button onClick={() => onOpenDetail('success:message')} className="w-11 h-11 rounded-full bg-earth text-cream flex items-center justify-center" aria-label="Send message">
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}

function AnalyticsPage() {
  const [filter, setFilter] = useState('Revenue');

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {ANALYTICS_STATS.map(([label, value, trend]) => (
          <div key={label} className="bg-fog border border-mist/60 rounded-2xl p-5">
            <p className="text-xs text-bark/45">{label}</p>
            <p className="font-[var(--font-display)] text-2xl font-semibold text-forest mt-2">{value}</p>
            <p className="text-xs text-forest-light font-semibold mt-2">{trend} this month</p>
          </div>
        ))}
      </div>
      <section className="bg-fog border border-mist/60 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">Revenue & bookings</h2>
            <p className="text-xs text-bark/45 mt-1">Monthly performance for the current year</p>
          </div>
          <div className="flex bg-cream-dark rounded-full p-1">
            {['Revenue', 'Bookings'].map((item) => (
              <button key={item} onClick={() => setFilter(item)} className={`px-4 py-2 rounded-full text-xs font-semibold ${filter === item ? 'bg-forest text-cream' : 'text-bark/50'}`}>{item}</button>
            ))}
          </div>
        </div>
        <BarChart bars={ANALYTICS_BARS} heightClass="h-72" />
        <div className="flex justify-between text-xs text-bark/40 mt-3"><span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span></div>
      </section>
    </div>
  );
}

function ExperiencesPage({ onOpenDetail }) {
  const [filter, setFilter] = useState('All');

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <FilterTabs items={['All', 'Active', 'Drafts']} active={filter} onChange={setFilter} inactiveClass="bg-fog border border-mist/60 text-bark/50" />
        <button onClick={() => onOpenDetail('create-experience')} className="flex items-center gap-2 px-5 py-2.5 bg-earth text-cream rounded-full text-sm font-semibold">
          <Icon name="plus" className="w-4 h-4" /> Add new
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {EXPERIENCES.map((card, index) => (
          <article key={card.title} className="bg-fog border border-mist/60 rounded-2xl p-6 hover:border-forest/40 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-8">
              <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${index % 2 === 0 ? 'bg-forest text-cream' : 'bg-earth/10 text-earth'}`}><Icon name={card.icon} /></span>
              <StatusPill status={card.badge} />
            </div>
            <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">{card.title}</h2>
            <p className="text-sm text-bark/50 mt-2">{card.meta}</p>
            <button onClick={() => onOpenDetail(`record:${card.title}`)} className="mt-6 text-earth text-sm font-semibold flex items-center gap-2">
              Open details <Icon name="arrow" className="w-4 h-4" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function ListPage({ rows, onOpenDetail }) {
  const [filter, setFilter] = useState('All');

  return (
    <section className="bg-fog border border-mist/60 rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-mist/50 flex flex-wrap items-center justify-between gap-4">
        <FilterTabs items={['All', 'Active', 'Needs attention']} active={filter} onChange={setFilter} inactiveClass="bg-cream-dark text-bark/50" />
        <button onClick={() => onOpenDetail('global-search')} className="flex items-center gap-2 px-4 py-2 rounded-full border border-mist/70 text-sm text-bark/60">
          <Icon name="search" className="w-4 h-4" /> Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-3xl">
          {rows.map((row) => (
            <button key={row.primary} onClick={() => onOpenDetail(`record:${row.primary}`)} className="w-full text-left grid grid-cols-12 gap-4 items-center px-6 py-5 border-b border-mist/40 last:border-0 hover:bg-cream-dark/40 transition-colors">
              <span className="col-span-5">
                <span className="block font-semibold text-forest">{row.primary}</span>
                <span className="block text-xs text-bark/45 mt-1">{row.secondary}</span>
              </span>
              <span className="col-span-4 text-sm text-bark/55">{row.detail}</span>
              <span className="col-span-2"><StatusPill status={row.status} /></span>
              <span className="col-span-1 text-earth flex justify-end"><Icon name="arrow" className="w-4 h-4" /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkspacePage({ page, onOpenDetail }) {
  switch (page) {
    case 'Payments': return <PaymentsPage onOpenDetail={onOpenDetail} />;
    case 'Messages': return <MessagesPage onOpenDetail={onOpenDetail} />;
    case 'Analytics': return <AnalyticsPage />;
    case 'Experiences': return <ExperiencesPage onOpenDetail={onOpenDetail} />;
    case 'Customers': return <ListPage rows={CUSTOMERS} onOpenDetail={onOpenDetail} />;
    default: return <ListPage rows={BOOKINGS} onOpenDetail={onOpenDetail} />;
  }
}

/* ------------------------------ Detail pages ------------------------------ */

function CashoutDetail({ onBack, onNavigate }) {
  const [amount, setAmount] = useState('৳2,000,000');

  return (
    <div className="max-w-4xl">
      <BackButton onClick={onBack} label="Back to payments" />
      <div className="grid lg:grid-cols-5 gap-6">
        <section className="lg:col-span-3 bg-fog border border-mist/60 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-mist/50">
            <p className="text-earth text-xs font-semibold uppercase tracking-widest mb-2">Cash out funds</p>
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-forest">Transfer to your bank</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <p className="text-xs font-semibold text-bark/50 mb-2">Amount</p>
              <div className="rounded-xl border border-forest bg-cream px-5 py-4 flex items-center justify-between">
                <button onClick={() => setAmount(amount === '৳2,000,000' ? '৳6,420,000' : '৳2,000,000')} className="font-[var(--font-display)] text-2xl font-semibold text-forest">{amount}</button>
                <span className="text-xs text-bark/40">BDT</span>
              </div>
              <p className="text-xs text-bark/40 mt-2">৳6,420,000 available</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-bark/50 mb-2">Destination account</p>
              <button className="w-full rounded-xl border border-mist/60 p-4 flex items-center gap-4 text-left hover:border-forest">
                <span className="w-10 h-10 rounded-full bg-forest text-cream flex items-center justify-center"><Icon name="briefcase" className="w-4 h-4" /></span>
                <span className="flex-1">
                  <span className="block font-semibold text-forest">Bank of Dhaka</span>
                  <span className="block text-xs text-bark/45 mt-1">Business account ···· 4821</span>
                </span>
                <Icon name="check" className="w-4 h-4 text-earth" />
              </button>
            </div>
            <div className="bg-cream-dark rounded-xl p-4 flex justify-between text-sm">
              <span className="text-bark/50">Transfer fee</span><span className="font-semibold text-forest">৳2,500</span>
            </div>
            <button onClick={() => onNavigate('success:cashout')} className="w-full py-3.5 rounded-full bg-earth text-cream font-semibold">Confirm cashout</button>
          </div>
        </section>
        <aside className="lg:col-span-2 bg-forest text-cream rounded-2xl p-6 h-fit">
          <Icon name="shield" className="w-8 h-8 text-earth-light mb-5" />
          <h2 className="font-[var(--font-display)] text-xl">Transfer summary</h2>
          <div className="space-y-4 mt-6 text-sm">
            <div className="flex justify-between border-b border-cream/10 pb-4"><span className="text-cream/50">Arrival</span><span>1–2 business days</span></div>
            <div className="flex justify-between border-b border-cream/10 pb-4"><span className="text-cream/50">Method</span><span>Bank transfer</span></div>
            <div className="flex justify-between"><span className="text-cream/50">Protection</span><span>Verified account</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PaymentDetail({ detail, onBack, onNavigate }) {
  const isMethods = detail === 'payment-methods';

  return (
    <div className="max-w-5xl">
      <BackButton onClick={onBack} label="Back to payments" />
      <section className="bg-fog border border-mist/60 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-mist/50 flex items-center justify-between gap-4">
          <div>
            <p className="text-earth text-xs font-semibold uppercase tracking-widest mb-2">Payments</p>
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-forest">{DETAIL_TITLES[detail]}</h2>
          </div>
          {isMethods && <button onClick={() => onNavigate('add-payment-method')} className="px-5 py-2.5 rounded-full bg-earth text-cream text-sm font-semibold">Add method</button>}
        </div>
        <div className="p-6">
          {isMethods ? (
            <div className="grid md:grid-cols-2 gap-4">
              {['Visa ···· 4821', 'Bank of Dhaka ···· 0914'].map((method, index) => (
                <button key={method} className="p-5 rounded-xl border border-mist/60 text-left hover:border-forest">
                  <span className="w-10 h-10 rounded-lg bg-forest text-cream flex items-center justify-center mb-5"><Icon name="briefcase" className="w-4 h-4" /></span>
                  <span className="block font-semibold text-forest">{method}</span>
                  <span className="block text-xs text-bark/45 mt-1">{index === 0 ? 'Expires 08/28 · Primary' : 'Verified business account'}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="max-w-xl space-y-4">
              {[
                ['Reference', 'BD-2841-2025'],
                ['Status', 'Completed'],
                ['Amount', '৳1,280,000'],
                ['Payment method', 'Visa ···· 4821'],
                ['Processed', '18 June 2025 · 10:24'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-6 py-3 border-b border-mist/40 text-sm">
                  <span className="text-bark/45">{label}</span><span className="font-semibold text-forest text-right">{value}</span>
                </div>
              ))}
              <button onClick={() => onNavigate('success:download')} className="mt-4 px-5 py-3 rounded-full border border-mist text-sm font-semibold text-forest">Download receipt</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SearchDetail({ onBack, onNavigate }) {
  const [filter, setFilter] = useState('All results');
  const results = [
    ['Hills & Coast', 'Experience · Chattogram + Sylhet Divisions', 'map'],
    ['Booking BD-2841', '4 travelers · 18–24 June', 'calendar'],
    ['Camille Niyonzima', 'Returning customer', 'users'],
  ];

  return (
    <div>
      <BackButton onClick={onBack} label="Back to workspace" />
      <section className="bg-fog border border-mist/60 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-mist/50">
          <div className="max-w-2xl bg-cream-dark rounded-full px-5 py-3.5 flex items-center gap-3 text-bark/50">
            <Icon name="search" className="w-5 h-5" />
            <span className="text-sm">Search bookings, customers, experiences…</span>
          </div>
          <div className="mt-4">
            <FilterTabs items={['All results', 'Bookings', 'People', 'Experiences']} active={filter} onChange={setFilter} inactiveClass="border border-mist/60 text-bark/50" />
          </div>
        </div>
        <div className="p-6">
          <p className="text-xs text-bark/40 uppercase tracking-widest font-semibold mb-4">Suggested results</p>
          {results.map(([name, meta, icon]) => (
            <button key={name} onClick={() => onNavigate(`record:${name}`)} className="w-full p-4 flex items-center gap-4 border-b border-mist/40 last:border-0 hover:bg-cream-dark/40 text-left">
              <span className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center"><Icon name={icon} className="w-4 h-4" /></span>
              <span className="flex-1">
                <span className="block font-semibold text-forest">{name}</span>
                <span className="block text-xs text-bark/45 mt-1">{meta}</span>
              </span>
              <Icon name="arrow" className="w-4 h-4 text-earth" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function NotificationsDetail({ onBack, onNavigate }) {
  const [read, setRead] = useState(false);
  const items = [
    ['Booking confirmed', 'Hills & Coast is ready for 18 June.', 'calendar', 'Now'],
    ['New message received', 'Camille N. sent a question about airport pickup.', 'message', '24m'],
    ['Payment completed', 'Transaction BD-2841 was processed successfully.', 'check', 'Yesterday'],
    ['Travel insight', 'Chattogram Division searches increased this week.', 'chart', 'Mon'],
  ];

  return (
    <div className="max-w-4xl">
      <BackButton onClick={onBack} label="Back to workspace" />
      <section className="bg-fog border border-mist/60 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-mist/50 flex items-center justify-between">
          <div>
            <p className="text-earth text-xs font-semibold uppercase tracking-widest mb-2">Notification center</p>
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-forest">Updates requiring attention</h2>
          </div>
          <button onClick={() => setRead(true)} className="text-earth text-xs font-semibold">{read ? 'All caught up' : 'Mark all as read'}</button>
        </div>
        {items.map(([title, text, icon, time], index) => (
          <button key={title} onClick={() => onNavigate(`record:${title}`)} className="w-full p-6 flex gap-4 text-left border-b border-mist/40 last:border-0 hover:bg-cream-dark/40">
            <span className={`w-11 h-11 rounded-full flex items-center justify-center ${index < 2 && !read ? 'bg-earth text-cream' : 'bg-forest/10 text-forest'}`}><Icon name={icon} className="w-4 h-4" /></span>
            <span className="flex-1">
              <span className="block font-semibold text-forest">{title}</span>
              <span className="block text-sm text-bark/50 mt-1">{text}</span>
            </span>
            <span className="text-xs text-bark/35">{time}</span>
          </button>
        ))}
      </section>
    </div>
  );
}

function FormDetail({ detail, form, onBack, onNavigate }) {
  return (
    <div className="max-w-5xl">
      <BackButton onClick={onBack} label="Back to workspace" />
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-fog border border-mist/60 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-mist/50">
            <p className="text-earth text-xs font-semibold uppercase tracking-widest mb-2">{form.eyebrow}</p>
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-forest">{form.title}</h2>
            <p className="text-sm text-bark/50 mt-2">{form.description}</p>
          </div>
          <div className="p-6 grid sm:grid-cols-2 gap-5">
            {form.fields.map(([label, placeholder], index) => {
              const wide = form.wideLast && index === form.fields.length - 1;
              return (
                <button key={label} className={`text-left ${wide ? 'sm:col-span-2' : ''}`}>
                  <span className="block text-xs font-semibold text-bark/50 mb-2">{label}</span>
                  <span className={`block w-full rounded-xl border border-mist/60 bg-cream px-4 text-sm text-bark/40 ${wide ? 'py-8' : 'py-3.5'}`}>{placeholder}</span>
                </button>
              );
            })}
            <button onClick={() => onNavigate(`success:${detail}`)} className="sm:col-span-2 mt-2 py-3.5 rounded-full bg-earth text-cream font-semibold">{form.action}</button>
          </div>
        </section>
        <aside className="bg-forest text-cream rounded-2xl p-6 h-fit">
          <Icon name={detail.includes('payment') ? 'shield' : 'check'} className="w-8 h-8 text-earth-light mb-5" />
          <h2 className="font-[var(--font-display)] text-xl">What happens next</h2>
          <div className="space-y-5 mt-6">
            {['Review your information', 'Confirm details and availability', 'Receive an update in your dashboard'].map((item, index) => (
              <div key={item} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-cream/10 flex items-center justify-center text-xs">{index + 1}</span>
                <span className="text-sm text-cream/65">{item}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function SuccessDetail({ detail, onBack }) {
  const [title, copy] = SUCCESS_MESSAGES[detail.split(':')[1]] ?? ['Action completed', 'Your changes have been saved successfully.'];

  return (
    <section className="max-w-2xl mx-auto bg-fog border border-mist/60 rounded-2xl p-8 md:p-12 text-center">
      <span className="w-16 h-16 rounded-full bg-forest text-cream flex items-center justify-center mx-auto mb-6"><Icon name="check" className="w-7 h-7" /></span>
      <p className="text-earth text-xs font-semibold uppercase tracking-widest mb-3">Complete</p>
      <h2 className="font-[var(--font-display)] text-3xl font-semibold text-forest">{title}</h2>
      <p className="text-bark/50 mt-3 leading-relaxed">{copy}</p>
      <button onClick={onBack} className="mt-8 px-6 py-3 rounded-full bg-earth text-cream text-sm font-semibold">Return to workspace</button>
    </section>
  );
}

function RecordDetail({ detail, onBack, onNavigate }) {
  const recordName = detail.split(':')[1] || 'Booking BD-2841';
  const quickActions = [
    ['Send message', 'compose-message'],
    ['View payment', 'payment-detail'],
    ['Download receipt', 'success:download'],
  ];

  return (
    <div>
      <BackButton onClick={onBack} label="Back to list" />
      <div className="grid xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-fog border border-mist/60 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-mist/50 flex flex-wrap justify-between gap-4">
            <div>
              <p className="text-earth text-xs font-semibold uppercase tracking-widest mb-2">Detail view</p>
              <h2 className="font-[var(--font-display)] text-2xl font-semibold text-forest">{recordName}</h2>
            </div>
            <StatusPill status="Confirmed" />
          </div>
          <div className="p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ['Reference', 'BD-2841'],
                ['Dates', '18–24 June 2025'],
                ['Divisions', 'Chattogram + Sylhet'],
                ['Guests', '4 travelers'],
                ['Total', '৳1,280,000'],
                ['Assigned partner', 'Bengal Trails Bangladesh'],
              ].map(([label, value]) => (
                <div key={label} className="bg-cream-dark/60 rounded-xl p-4">
                  <p className="text-xs text-bark/45">{label}</p>
                  <p className="font-semibold text-forest mt-1">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-forest mb-4">Timeline</h3>
              {['Booking created', 'Payment confirmed', 'Partner accepted', 'Travel documents ready'].map((item, index) => (
                <div key={item} className="flex gap-3 pb-5 last:pb-0">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center ${index < 3 ? 'bg-forest text-cream' : 'bg-cream-dark text-mist'}`}>
                    <Icon name={index < 3 ? 'check' : 'clock'} className="w-3 h-3" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-forest">{item}</p>
                    <p className="text-xs text-bark/40 mt-1">{index < 3 ? 'Completed' : 'Expected 16 June'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <aside className="space-y-4">
          <div className="bg-forest text-cream rounded-2xl p-6">
            <h2 className="font-[var(--font-display)] text-xl">Quick actions</h2>
            <div className="space-y-2 mt-5">
              {quickActions.map(([label, target]) => (
                <button key={label} onClick={() => onNavigate(target)} className="w-full py-3 rounded-xl bg-cream/10 text-sm font-semibold hover:bg-cream/15">{label}</button>
              ))}
            </div>
          </div>
          <div className="bg-fog border border-mist/60 rounded-2xl p-6">
            <p className="text-xs text-bark/45">Need assistance?</p>
            <p className="font-semibold text-forest mt-1">Contact platform support</p>
            <button onClick={() => onNavigate('support')} className="text-earth text-sm font-semibold mt-4">Open support</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function DetailedPage({ detail, onBack, onNavigate }) {
  if (detail === 'cashout') return <CashoutDetail onBack={onBack} onNavigate={onNavigate} />;
  if (['payment-methods', 'payment-detail', 'transaction-history'].includes(detail)) return <PaymentDetail detail={detail} onBack={onBack} onNavigate={onNavigate} />;
  if (detail === 'global-search') return <SearchDetail onBack={onBack} onNavigate={onNavigate} />;
  if (detail === 'notifications') return <NotificationsDetail onBack={onBack} onNavigate={onNavigate} />;
  if (FORM_PAGES[detail]) return <FormDetail detail={detail} form={FORM_PAGES[detail]} onBack={onBack} onNavigate={onNavigate} />;
  if (detail.startsWith('success:')) return <SuccessDetail detail={detail} onBack={onBack} />;
  if (detail.startsWith('record:')) return <RecordDetail detail={detail} onBack={onBack} onNavigate={onNavigate} />;
  return null;
}

/* -------------------------------- Overview -------------------------------- */

function Overview({ onOpenDetail }) {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {METRICS.map((metric) => (
          <article key={metric.label} className="bg-fog border border-mist/60 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <span className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center"><Icon name={metric.icon} /></span>
              <span className="text-forest-light text-xs font-semibold bg-forest/10 px-2.5 py-1 rounded-full">{metric.trend}</span>
            </div>
            <p className="text-bark/50 text-xs font-medium mb-1">{metric.label}</p>
            <p className="font-[var(--font-display)] text-forest text-3xl font-semibold">{metric.value}</p>
            <p className="text-bark/45 text-xs mt-2">{metric.note}</p>
          </article>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-fog border border-mist/60 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 flex items-center justify-between border-b border-mist/50">
            <div>
              <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">Booking performance</h2>
              <p className="text-xs text-bark/45 mt-1">A clear view of what needs your attention</p>
            </div>
            <button onClick={() => onOpenDetail('record:Performance summary')} className="text-earth text-xs font-semibold flex items-center gap-1 hover:text-earth-dark">
              View details <Icon name="arrow" className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6">
            <BarChart bars={OVERVIEW_BARS} heightClass="h-56" />
            <div className="flex justify-between text-xs text-bark/40 mt-3"><span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span></div>
          </div>
        </section>

        <section className="bg-fog border border-mist/60 rounded-2xl overflow-hidden">
          <div className="px-5 py-5 border-b border-mist/50">
            <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">Recent activity</h2>
            <p className="text-xs text-bark/45 mt-1">Latest updates for your account</p>
          </div>
          <div className="divide-y divide-mist/40">
            {ACTIVITIES.map((activity) => (
              <button key={activity.title} onClick={() => onOpenDetail(`record:${activity.title}`)} className="w-full text-left p-5 flex gap-3 hover:bg-cream-dark/50 transition-colors">
                <span className="w-9 h-9 flex-shrink-0 rounded-full bg-earth/10 text-earth flex items-center justify-center"><Icon name={activity.icon} className="w-4 h-4" /></span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-forest leading-snug">{activity.title}</span>
                  <span className="block text-xs text-bark/45 mt-1">{activity.meta}</span>
                  <span className="inline-block text-earth text-xs font-semibold mt-2">{activity.status}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 bg-forest text-cream rounded-2xl px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-5 overflow-hidden relative">
        <div className="relative z-10">
          <p className="text-earth-light text-xs font-semibold uppercase tracking-widest mb-2">Growth suggestion</p>
          <h2 className="font-[var(--font-display)] text-2xl font-light">Chattogram Division demand is rising</h2>
          <p className="text-cream/60 text-sm mt-2 max-w-2xl">Add a Kaptai Lake weekend experience to capture a 24% increase in searches.</p>
        </div>
        <button onClick={() => onOpenDetail('record:Chattogram Division opportunity')} className="relative z-10 flex-shrink-0 px-5 py-3 rounded-full bg-earth text-cream text-sm font-semibold hover:bg-earth-light transition-colors">
          View opportunity
        </button>
        <span className="absolute -right-10 -bottom-20 w-56 h-56 rounded-full border border-cream/10" />
        <span className="absolute right-16 -bottom-24 w-40 h-40 rounded-full border border-cream/10" />
      </section>
    </>
  );
}

/* ---------------------------------- Page ---------------------------------- */

export default function Agency({ onExit }) {
  const [activeNav, setActiveNav] = useState('Overview');
  const [detailView, setDetailView] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const goTo = (label) => {
    setActiveNav(label);
    setDetailView(null);
    setSidebarOpen(false);
  };

  const heading = detailView
    ? getDetailTitle(detailView)
    : activeNav === 'Overview' ? PROFILE.title : activeNav;

  const subheading = detailView
    ? 'Review the complete information and take the next action.'
    : activeNav === 'Overview' ? PROFILE.description : `Manage ${activeNav.toLowerCase()} from one focused workspace.`;

  return (
    <div className="min-h-screen bg-cream text-bark flex">
      {sidebarOpen && (
        <button className="fixed inset-0 z-40 bg-forest/40 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />
      )}

      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-forest-dark text-cream flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-20 px-6 flex items-center border-b border-cream/10">
          <button onClick={onExit} className="flex items-center gap-3 text-left">
            <span className="w-10 h-10 rounded-full bg-earth flex items-center justify-center font-[var(--font-display)] font-semibold">R</span>
            <span>
              <span className="block font-[var(--font-display)] text-lg font-semibold">Explore Bangladesh</span>
              <span className="block text-cream/50 text-xs">Travel platform</span>
            </span>
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => goTo(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeNav === item.label ? 'bg-cream text-forest-dark' : 'text-cream/60 hover:bg-cream/5 hover:text-cream'}`}
            >
              <Icon name={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-cream/10">
          <div className="flex items-center gap-3 p-2">
            <span className="w-10 h-10 rounded-full bg-forest-light flex items-center justify-center text-sm font-semibold">{PROFILE.initials}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold truncate">{PROFILE.person}</span>
              <span className="block text-xs text-cream/40">Agency account</span>
            </span>
            <button onClick={onExit} className="text-cream/40 hover:text-cream" aria-label="Exit portal"><Icon name="logout" /></button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="h-20 px-5 md:px-8 xl:px-12 flex items-center gap-4 bg-cream/95 backdrop-blur-sm border-b border-mist/60 sticky top-0 z-30">
          <button className="lg:hidden p-2 text-forest" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Icon name="menu" /></button>
          <button onClick={() => setDetailView('global-search')} className="hidden sm:flex items-center gap-3 bg-cream-dark/70 rounded-full px-4 py-2.5 w-full max-w-sm text-mist text-left">
            <Icon name="search" className="w-4 h-4" />
            <span className="text-sm">Search trips, guests, or bookings</span>
          </button>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => setDetailView('notifications')} className="relative w-10 h-10 rounded-full border border-mist/70 flex items-center justify-center text-forest hover:bg-cream-dark transition-colors" aria-label="Notifications">
              <Icon name="bell" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-earth border-2 border-cream" />
            </button>
            <button onClick={() => setDetailView('create-experience')} className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-earth text-cream text-sm font-semibold hover:bg-earth-light transition-colors">
              <Icon name="plus" className="w-4 h-4" />
              Create experience
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-8 md:py-12">
          <div className="flex items-end justify-between gap-5 mb-8">
            <div>
              <p className="text-earth text-xs font-semibold tracking-widest uppercase mb-2">{PROFILE.eyebrow}</p>
              <h1 className="font-[var(--font-display)] text-forest text-3xl md:text-5xl font-light">{heading}</h1>
              <p className="text-bark/60 mt-2">{subheading}</p>
            </div>
            <div className="hidden xl:flex items-center gap-2 text-xs text-bark/50 border border-mist/70 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-forest-light" />
              Live data · Updated now
            </div>
          </div>

          {detailView ? (
            <DetailedPage detail={detailView} onBack={() => setDetailView(null)} onNavigate={setDetailView} />
          ) : activeNav === 'Overview' ? (
            <Overview onOpenDetail={setDetailView} />
          ) : (
            <WorkspacePage page={activeNav} onOpenDetail={setDetailView} />
          )}
        </div>
      </main>
    </div>
  );
}
