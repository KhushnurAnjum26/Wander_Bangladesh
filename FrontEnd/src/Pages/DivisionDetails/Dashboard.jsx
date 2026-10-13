import { useMemo, useState } from 'react';

const roleContent = {
  user: {
    label: 'Traveler',
    eyebrow: 'Traveler dashboard',
    title: 'Welcome back, Ayesha',
    description: 'Your next Bangladesh story is taking shape.',
    person: 'Ayesha Rahman',
    initials: 'AR',
    nav: [
      { label: 'Overview', icon: 'home' },
      { label: 'My journeys', icon: 'map' },
      { label: 'Saved places', icon: 'heart' },
      { label: 'Payments', icon: 'briefcase' },
      { label: 'Messages', icon: 'message' },
      { label: 'Preferences', icon: 'settings' },
    ],
    metrics: [
      { label: 'Upcoming trips', value: '2', note: 'Next in 12 days', icon: 'calendar' },
      { label: 'Saved places', value: '14', note: 'Across 6 divisions', icon: 'heart' },
      { label: 'Travel credits', value: '৳48K', note: 'Available to spend', icon: 'compass' },
    ],
  },
  agency: {
    label: 'Agency',
    eyebrow: 'Agency workspace',
    title: 'Good morning, Farhan',
    description: 'Your experiences are inspiring more travel this month.',
    person: 'Bengal Trails',
    initials: 'BT',
    nav: [
      { label: 'Overview', icon: 'home' },
      { label: 'Bookings', icon: 'calendar' },
      { label: 'Experiences', icon: 'briefcase' },
      { label: 'Customers', icon: 'users' },
      { label: 'Payments', icon: 'briefcase' },
      { label: 'Messages', icon: 'message' },
      { label: 'Analytics', icon: 'chart' },
    ],
    metrics: [
      { label: 'Monthly revenue', value: '৳8.4M', note: 'vs. ৳6.9M last month', trend: '+21.7%', icon: 'chart' },
      { label: 'Active bookings', value: '38', note: '12 arriving this week', trend: '+8.4%', icon: 'calendar' },
      { label: 'Guest satisfaction', value: '4.9', note: 'From 184 verified reviews', trend: '+0.2', icon: 'heart' },
    ],
  },

};

const activityByRole = {
  user: [
    { title: 'Sundarbans cruise confirmed', meta: 'Sylhet Division · Jun 18', status: 'Confirmed', icon: 'check' },
    { title: 'Bengal Trails sent you a message', meta: 'Kaptai Lake escape · 2h ago', status: 'Reply', icon: 'message' },
    { title: 'Ratargul Boat Trail saved', meta: 'Barishal Division · Yesterday', status: 'Saved', icon: 'heart' },
  ],
  agency: [
    { title: 'New booking from Camille N.', meta: 'Tea & Hills · 4 guests', status: 'New', icon: 'calendar' },
    { title: 'Payment released', meta: 'Booking BD-2048 · ৳640,000', status: 'Paid', icon: 'check' },
    { title: 'New five-star review', meta: 'Sundarbans Wildlife Cruise · 38m ago', status: 'View', icon: 'heart' },
  ],

};

const trips = [
  { name: 'Hills & Coast', date: '18–24 Jun', location: 'Chattogram + Sylhet', progress: 72 },
  { name: 'Old Dhaka Heritage Weekend', date: '12–14 Jul', location: 'Dhaka Division', progress: 38 },
];

function Icon({ name, className = 'w-5 h-5' }) {
  const paths = {
    home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V21h13V9.5M9 21v-7h6v7" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5Z" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M14 3h6v18h-6" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const workspaceRows = {
  'user:My journeys': [
    { primary: 'Hills & Coast', secondary: '18–24 June 2025', detail: 'Chattogram + Sylhet · 2 travelers', status: 'Confirmed' },
    { primary: 'Old Dhaka Heritage Weekend', secondary: '12–14 July 2025', detail: 'Dhaka Division · 2 travelers', status: 'Planning' },
    { primary: 'Sundarbans Safari Escape', secondary: '8–10 March 2025', detail: 'Khulna Division · 4 travelers', status: 'Completed' },
  ],
  'agency:Bookings': [
    { primary: 'BD-2841 · Camille N.', secondary: 'Tea & Hills Signature Tour', detail: '4 guests · 18–24 Jun', status: 'Confirmed' },
    { primary: 'BD-2839 · Liam A.', secondary: 'Sundarbans Wildlife Cruise', detail: '2 guests · 21 Jun', status: 'Pending' },
    { primary: 'BD-2834 · Sofia M.', secondary: 'Ratargul Forest Experience', detail: '3 guests · 26–28 Jun', status: 'Paid' },
    { primary: 'BD-2828 · Noah K.', secondary: 'Old Dhaka Food & Culture', detail: '6 guests · 29 Jun', status: 'Confirmed' },
  ],
  'agency:Customers': [
    { primary: 'Camille Niyonzima', secondary: 'camille@example.com', detail: '3 bookings · ৳1.8M lifetime value', status: 'Returning' },
    { primary: 'Liam Anderson', secondary: 'liam@example.com', detail: '1 booking · United Kingdom', status: 'New' },
    { primary: 'Sofia Martinez', secondary: 'sofia@example.com', detail: '2 bookings · Spain', status: 'Returning' },
  ],



};

const cardContent = {
  'user:Saved places': [
    { title: 'Sundarbans Mangrove Forest', meta: 'Sylhet Division · Wildlife', icon: 'map', badge: 'Top pick' },
    { title: 'Kaptai Lake', meta: 'Chattogram Division · Wellness', icon: 'heart', badge: 'Saved' },
    { title: 'Ratargul Boat Trail', meta: 'Barishal Division · Adventure', icon: 'compass', badge: 'Popular' },
    { title: 'Kimironko Market', meta: 'Dhaka Division · Culture', icon: 'map', badge: 'Saved' },
  ],
  'agency:Experiences': [
    { title: 'Tea & Hills Signature', meta: '7 days · From ৳1.2M', icon: 'map', badge: 'Live' },
    { title: 'Sundarbans Wildlife Cruise', meta: '2 days · From ৳420K', icon: 'compass', badge: 'Live' },
    { title: 'Old Dhaka Food & Culture', meta: '1 day · From ৳85K', icon: 'heart', badge: 'Draft' },
    { title: 'Kaptai Lake Weekend', meta: '3 days · Pricing incomplete', icon: 'plus', badge: 'In progress' },
  ],

};

function StatusPill({ status }) {
  const positive = ['Confirmed', 'Paid', 'Verified', 'Active', 'Live', 'Current', 'Healthy', 'Returning'].includes(status);
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${positive ? 'bg-forest/10 text-forest' : 'bg-earth/10 text-earth-dark'}`}>
      {status}
    </span>
  );
}

function WorkspacePage({ role, page, onOpenDetail }) {
  const [filter, setFilter] = useState('All');
  const [selectedMessage, setSelectedMessage] = useState(0);
  const [notifications, setNotifications] = useState(true);
  const key = `${role}:${page}`;
  const rows = workspaceRows[key] ?? [];
  const cards = cardContent[key] ?? [];

  if (page === 'Payments' || page === 'Payouts') {
    const agency = role === 'agency';
    const admin = role === 'admin';
    return (
      <div className="space-y-6">
        <section className="bg-forest text-cream rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-earth-light text-xs font-semibold uppercase tracking-widest mb-3">
                {admin ? 'Pending partner payouts' : agency ? 'Available balance' : 'Travel wallet'}
              </p>
              <p className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold">
                {admin ? '৳24.8M' : agency ? '৳6.42M' : '৳48,000'}
              </p>
              <p className="text-cream/50 text-sm mt-3">
                {admin ? '32 transfers scheduled this week' : agency ? '৳840,000 pending clearance' : 'Credits never expire and apply automatically'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {agency && <button onClick={() => onOpenDetail('cashout')} className="px-5 py-3 rounded-full bg-earth text-cream text-sm font-semibold">Cash out</button>}
              {admin && <button onClick={() => onOpenDetail('cashout')} className="px-5 py-3 rounded-full bg-earth text-cream text-sm font-semibold">Review payouts</button>}
              {!admin && <button onClick={() => onOpenDetail('payment-methods')} className="px-5 py-3 rounded-full border border-cream/20 text-cream text-sm font-semibold">Payment methods</button>}
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
            {[
              ['Hills & Coast', agency ? '+ ৳1,280,000' : '- ৳640,000', 'Today · Booking BD-2841', 'Completed'],
              [admin ? 'Sundarban Wild Escapes' : 'Sundarbans Safari', agency ? '+ ৳420,000' : '- ৳210,000', 'Yesterday · Booking BD-2839', 'Completed'],
              [agency ? 'Bank cashout' : 'Travel credit', agency ? '- ৳2,000,000' : '+ ৳48,000', '12 Jun · Transfer 8872', agency ? 'Processing' : 'Available'],
            ].map(([name, amount, meta, status]) => (
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
            <button onClick={() => onOpenDetail('payment-methods')} className="text-earth text-sm font-semibold mt-6 flex items-center gap-2">Manage security <Icon name="arrow" className="w-4 h-4" /></button>
          </section>
        </div>
      </div>
    );
  }

  if (page === 'Messages') {
    const messages = role === 'user'
      ? [
          { name: 'Bengal Trails', subject: 'Your trekking permits are confirmed', time: '10:24', unread: true },
          { name: 'Bangladesh Trip Support', subject: 'A few tips before your journey', time: 'Yesterday', unread: false },
          { name: 'Sundarban Wild Escapes', subject: 'Lake transfer options', time: 'Mon', unread: false },
        ]
      : [
          { name: role === 'agency' ? 'Camille N.' : 'Delta Adventures', subject: role === 'agency' ? 'Question about airport pickup' : 'Verification document follow-up', time: '10:24', unread: true },
          { name: role === 'agency' ? 'Liam A.' : 'Tourism Operations', subject: role === 'agency' ? 'Dietary requirements for safari' : 'Eastern advisory approved', time: 'Yesterday', unread: false },
          { name: role === 'agency' ? 'Explore Bangladesh Support' : 'Bengal Trails', subject: 'Monthly partner update', time: 'Mon', unread: false },
        ];
    const selected = messages[selectedMessage];

    return (
      <section className="bg-fog border border-mist/60 rounded-2xl overflow-hidden min-h-screen grid lg:grid-cols-5">
        <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-mist/60">
          <div className="p-5 border-b border-mist/50 flex items-center justify-between">
            <div>
              <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">Inbox</h2>
              <p className="text-xs text-bark/45 mt-1">3 conversations · 1 unread</p>
            </div>
            <button onClick={() => onOpenDetail('compose-message')} className="w-9 h-9 rounded-full bg-earth text-cream flex items-center justify-center" aria-label="New message"><Icon name="plus" className="w-4 h-4" /></button>
          </div>
          <div>
            {messages.map((message, index) => (
              <button key={message.name} onClick={() => setSelectedMessage(index)} className={`w-full text-left p-5 flex gap-3 border-b border-mist/40 transition-colors ${selectedMessage === index ? 'bg-cream-dark/70' : 'hover:bg-cream-dark/40'}`}>
                <span className="w-11 h-11 rounded-full bg-forest text-cream flex items-center justify-center text-xs font-semibold flex-shrink-0">{message.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>
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
        </div>
        <div className="lg:col-span-3 flex flex-col">
          <div className="p-5 border-b border-mist/50 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-forest text-cream flex items-center justify-center text-xs font-semibold">{selected.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>
            <div>
              <p className="font-semibold text-forest">{selected.name}</p>
              <p className="text-xs text-forest-light">Usually replies within an hour</p>
            </div>
          </div>
          <div className="flex-1 p-6 space-y-5 bg-cream/40">
            <div className="max-w-md bg-cream-dark rounded-2xl rounded-tl-sm p-4 text-sm text-bark/70">
              Muraho! {selected.subject}. Everything is on track, and we have attached the latest details for your review.
              <p className="text-xs text-bark/35 mt-2">10:18</p>
            </div>
            <div className="max-w-md ml-auto bg-forest text-cream rounded-2xl rounded-tr-sm p-4 text-sm">
              Thank you for the update. This looks perfect. Please let me know if you need anything else from me.
              <p className="text-xs text-cream/40 mt-2">10:22</p>
            </div>
          </div>
          <div className="p-4 border-t border-mist/50 flex gap-3">
            <div className="flex-1 bg-cream-dark rounded-full px-5 py-3 text-sm text-bark/40">Write a message…</div>
              <button onClick={() => onOpenDetail('success:message')} className="w-11 h-11 rounded-full bg-earth text-cream flex items-center justify-center" aria-label="Send message"><Icon name="arrow" /></button>
          </div>
        </div>
      </section>
    );
  }

  if (page === 'Preferences') {
    return (
      <div className="grid xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-fog border border-mist/60 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-mist/50">
            <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">Travel profile</h2>
            <p className="text-sm text-bark/50 mt-1">Help us tailor recommendations to the way you explore.</p>
          </div>
          <div className="p-6 space-y-7">
            <div>
              <p className="text-xs font-semibold text-bark/50 uppercase tracking-wider mb-3">Travel interests</p>
              <div className="flex flex-wrap gap-2">
                {['Wildlife', 'Culture', 'Hiking', 'Food', 'Wellness', 'Photography'].map((item, index) => (
                  <button key={item} onClick={() => setFilter(item)} className={`px-4 py-2 rounded-full text-sm font-medium border ${index < 3 || filter === item ? 'bg-forest text-cream border-forest' : 'border-mist text-bark/60 hover:border-forest'}`}>{item}</button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[['Travel pace', 'Balanced'], ['Preferred stay', 'Boutique lodges'], ['Group size', 'Couple'], ['Budget', 'Comfort']].map(([label, value]) => (
                <button key={label} onClick={() => setFilter(value)} className="text-left border border-mist/60 rounded-xl p-4 hover:border-forest transition-colors">
                  <span className="block text-xs text-bark/45">{label}</span>
                  <span className="block font-semibold text-forest mt-1">{value}</span>
                </button>
              ))}
            </div>
            <button onClick={() => onOpenDetail('success:preferences')} className="px-5 py-3 bg-earth text-cream rounded-full text-sm font-semibold">Save preferences</button>
          </div>
        </section>
        <section className="bg-forest text-cream rounded-2xl p-6 h-fit">
          <span className="w-11 h-11 rounded-xl bg-cream/10 flex items-center justify-center mb-5"><Icon name="bell" /></span>
          <h2 className="font-[var(--font-display)] text-xl">Travel updates</h2>
          <p className="text-sm text-cream/55 mt-2 mb-6">Receive permit alerts, itinerary reminders, and relevant division updates.</p>
          <button onClick={() => setNotifications(!notifications)} className="w-full flex items-center justify-between py-3 border-t border-cream/10">
            <span className="text-sm font-medium">Notifications</span>
            <span className={`w-11 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-earth' : 'bg-cream/20'}`}><span className={`block w-4 h-4 bg-cream rounded-full transition-transform ${notifications ? 'translate-x-5' : ''}`} /></span>
          </button>
        </section>
      </div>
    );
  }

  if (page === 'Analytics' || page === 'Reports') {
    const admin = role === 'admin';
    return (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {(admin
            ? [['Conversion rate', '6.8%', '+0.9%'], ['Avg. booking', '৳684K', '+12.4%'], ['Cancellation rate', '3.1%', '-0.6%'], ['Partner response', '42 min', '-8 min']]
            : [['Page views', '48.2K', '+18.4%'], ['Conversion', '7.4%', '+1.2%'], ['Avg. booking', '৳721K', '+9.8%'], ['Repeat guests', '32%', '+4.1%']]
          ).map(([label, value, trend]) => (
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
              <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">{admin ? 'Marketplace performance' : 'Revenue & bookings'}</h2>
              <p className="text-xs text-bark/45 mt-1">Monthly performance for the current year</p>
            </div>
            <div className="flex bg-cream-dark rounded-full p-1">
              {['Revenue', 'Bookings'].map((item) => <button key={item} onClick={() => setFilter(item)} className={`px-4 py-2 rounded-full text-xs font-semibold ${filter === item || (filter === 'All' && item === 'Revenue') ? 'bg-forest text-cream' : 'text-bark/50'}`}>{item}</button>)}
            </div>
          </div>
          <div className="h-72 flex items-end gap-3 border-b border-mist/60">
            {[42, 58, 51, 76, 68, 96, 82, 118, 102, 142, 126, 158].map((height, index) => (
              <div key={index} className="flex-1 h-full flex items-end group"><div className="w-full bg-forest/20 group-hover:bg-earth rounded-t-lg transition-colors" style={{ height }} /></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-bark/40 mt-3"><span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span></div>
        </section>
      </div>
    );
  }

  if (cards.length > 0) {
    return (
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-2">
            {['All', 'Active', 'Drafts'].map((item) => <button key={item} onClick={() => setFilter(item)} className={`px-4 py-2 rounded-full text-xs font-semibold ${filter === item ? 'bg-forest text-cream' : 'bg-fog border border-mist/60 text-bark/50'}`}>{item}</button>)}
          </div>
          <button onClick={() => onOpenDetail(role === 'agency' ? 'create-experience' : role === 'admin' ? 'create-content' : 'itinerary-builder')} className="flex items-center gap-2 px-5 py-2.5 bg-earth text-cream rounded-full text-sm font-semibold"><Icon name="plus" className="w-4 h-4" /> Add new</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {cards.map((card, index) => (
            <article key={card.title} className="bg-fog border border-mist/60 rounded-2xl p-6 hover:border-forest/40 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-8">
                <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${index % 2 === 0 ? 'bg-forest text-cream' : 'bg-earth/10 text-earth'}`}><Icon name={card.icon} /></span>
                <StatusPill status={card.badge} />
              </div>
              <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">{card.title}</h2>
              <p className="text-sm text-bark/50 mt-2">{card.meta}</p>
              <button onClick={() => onOpenDetail(`record:${card.title}`)} className="mt-6 text-earth text-sm font-semibold flex items-center gap-2">Open details <Icon name="arrow" className="w-4 h-4" /></button>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-fog border border-mist/60 rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-mist/50 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {['All', 'Active', 'Needs attention'].map((item) => <button key={item} onClick={() => setFilter(item)} className={`px-4 py-2 rounded-full text-xs font-semibold ${filter === item ? 'bg-forest text-cream' : 'bg-cream-dark text-bark/50'}`}>{item}</button>)}
        </div>
        <button onClick={() => onOpenDetail('global-search')} className="flex items-center gap-2 px-4 py-2 rounded-full border border-mist/70 text-sm text-bark/60"><Icon name="search" className="w-4 h-4" /> Search</button>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-3xl">
          {rows.map((row) => (
            <button key={row.primary} onClick={() => onOpenDetail(page === 'Approvals' ? `review:${row.primary}` : `record:${row.primary}`)} className="w-full text-left grid grid-cols-12 gap-4 items-center px-6 py-5 border-b border-mist/40 last:border-0 hover:bg-cream-dark/40 transition-colors">
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

function DetailedPage({ role, detail, onBack, onNavigate }) {
  const [cashoutAmount, setCashoutAmount] = useState('৳2,000,000');
  const [detailFilter, setDetailFilter] = useState('All results');
  const [notificationsRead, setNotificationsRead] = useState(false);
  const isReview = detail.startsWith('review:') || detail === 'review-queue';
  const isRecord = detail.startsWith('record:');
  const recordName = detail.split(':')[1] || (role === 'agency' ? 'Booking BD-2841' : 'Hills & Coast');

  if (detail === 'cashout') {
    return (
      <div className="max-w-4xl">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-bark/50 hover:text-forest mb-6"><Icon name="arrow" className="w-4 h-4 rotate-180" /> Back to payments</button>
        <div className="grid lg:grid-cols-5 gap-6">
          <section className="lg:col-span-3 bg-fog border border-mist/60 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-mist/50">
              <p className="text-earth text-xs font-semibold uppercase tracking-widest mb-2">{role === 'admin' ? 'Partner payout' : 'Cash out funds'}</p>
              <h2 className="font-[var(--font-display)] text-2xl font-semibold text-forest">{role === 'admin' ? 'Approve scheduled transfer' : 'Transfer to your bank'}</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs font-semibold text-bark/50 mb-2">Amount</p>
                <div className="rounded-xl border border-forest bg-cream px-5 py-4 flex items-center justify-between">
                  <button onClick={() => setCashoutAmount(cashoutAmount === '৳2,000,000' ? '৳6,420,000' : '৳2,000,000')} className="font-[var(--font-display)] text-2xl font-semibold text-forest">{cashoutAmount}</button>
                  <span className="text-xs text-bark/40">BDT</span>
                </div>
                <p className="text-xs text-bark/40 mt-2">৳6,420,000 available</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-bark/50 mb-2">Destination account</p>
                <button className="w-full rounded-xl border border-mist/60 p-4 flex items-center gap-4 text-left hover:border-forest">
                  <span className="w-10 h-10 rounded-full bg-forest text-cream flex items-center justify-center"><Icon name="briefcase" className="w-4 h-4" /></span>
                  <span className="flex-1"><span className="block font-semibold text-forest">Bank of Dhaka</span><span className="block text-xs text-bark/45 mt-1">Business account ···· 4821</span></span>
                  <Icon name="check" className="w-4 h-4 text-earth" />
                </button>
              </div>
              <div className="bg-cream-dark rounded-xl p-4 flex justify-between text-sm">
                <span className="text-bark/50">Transfer fee</span><span className="font-semibold text-forest">৳2,500</span>
              </div>
              <button onClick={() => onNavigate('success:cashout')} className="w-full py-3.5 rounded-full bg-earth text-cream font-semibold">{role === 'admin' ? 'Approve transfer' : 'Confirm cashout'}</button>
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

  if (isReview || detail === 'review-queue') {
    const queue = [
      ['Delta Adventures', 'Agency verification', 'Business license, insurance and owner identity', 'High priority'],
      ['Khulna Division advisory', 'Content approval', 'Seasonal road access and visitor guidance', 'Today'],
      ['Kaptai Lake Kayak Weekend', 'Experience approval', 'Safety plan, pricing and itinerary review', 'Today'],
    ];
    return (
      <div>
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-bark/50 hover:text-forest mb-6"><Icon name="arrow" className="w-4 h-4 rotate-180" /> Back to approvals</button>
        <div className="grid xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 bg-fog border border-mist/60 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-mist/50">
              <p className="text-earth text-xs font-semibold uppercase tracking-widest mb-2">Review queue</p>
              <h2 className="font-[var(--font-display)] text-2xl font-semibold text-forest">{detail.startsWith('review:') ? recordName : 'Items awaiting approval'}</h2>
              <p className="text-sm text-bark/50 mt-2">Validate required information before publishing to travelers.</p>
            </div>
            <div className="divide-y divide-mist/40">
              {queue.map(([name, type, description, priority], index) => (
                <div key={name} className={`p-6 ${index === 0 ? 'bg-cream-dark/40' : ''}`}>
                  <div className="flex flex-wrap justify-between gap-3">
                    <div><p className="font-semibold text-forest">{name}</p><p className="text-xs text-earth mt-1">{type}</p></div>
                    <StatusPill status={priority} />
                  </div>
                  <p className="text-sm text-bark/50 mt-4">{description}</p>
                  <div className="flex gap-3 mt-5">
                    <button onClick={() => onNavigate('success:approval')} className="px-4 py-2 rounded-full bg-forest text-cream text-xs font-semibold">Approve</button>
                    <button onClick={() => onNavigate('request-changes')} className="px-4 py-2 rounded-full border border-mist text-bark/60 text-xs font-semibold">Request changes</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <aside className="bg-fog border border-mist/60 rounded-2xl p-6 h-fit">
            <span className="w-11 h-11 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-5"><Icon name="check" /></span>
            <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">Verification checklist</h2>
            <div className="space-y-4 mt-5">
              {['Identity confirmed', 'Business license valid', 'Insurance coverage', 'Safety standards'].map((item, index) => (
                <div key={item} className="flex items-center gap-3 text-sm"><span className={`w-6 h-6 rounded-full flex items-center justify-center ${index < 3 ? 'bg-forest text-cream' : 'border border-mist text-mist'}`}><Icon name="check" className="w-3 h-3" /></span><span className={index < 3 ? 'text-forest' : 'text-bark/45'}>{item}</span></div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  if (detail === 'payment-methods' || detail === 'payment-detail' || detail === 'transaction-history') {
    return (
      <div className="max-w-5xl">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-bark/50 hover:text-forest mb-6"><Icon name="arrow" className="w-4 h-4 rotate-180" /> Back to payments</button>
        <section className="bg-fog border border-mist/60 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-mist/50 flex items-center justify-between gap-4">
            <div>
              <p className="text-earth text-xs font-semibold uppercase tracking-widest mb-2">Payments</p>
              <h2 className="font-[var(--font-display)] text-2xl font-semibold text-forest">{detail === 'payment-methods' ? 'Payment methods' : detail === 'transaction-history' ? 'Transaction history' : 'Transaction details'}</h2>
            </div>
            {detail === 'payment-methods' && <button onClick={() => onNavigate('add-payment-method')} className="px-5 py-2.5 rounded-full bg-earth text-cream text-sm font-semibold">Add method</button>}
          </div>
          <div className="p-6">
            {detail === 'payment-methods' ? (
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
                  ['Amount', role === 'agency' ? '৳1,280,000' : '৳640,000'],
                  ['Payment method', 'Visa ···· 4821'],
                  ['Processed', '18 June 2025 · 10:24 CAT'],
                ].map(([label, value]) => <div key={label} className="flex justify-between gap-6 py-3 border-b border-mist/40 text-sm"><span className="text-bark/45">{label}</span><span className="font-semibold text-forest text-right">{value}</span></div>)}
                <button onClick={() => onNavigate('success:download')} className="mt-4 px-5 py-3 rounded-full border border-mist text-sm font-semibold text-forest">Download receipt</button>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  if (detail === 'global-search') {
    return (
      <div>
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-bark/50 hover:text-forest mb-6"><Icon name="arrow" className="w-4 h-4 rotate-180" /> Back to workspace</button>
        <section className="bg-fog border border-mist/60 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-mist/50">
            <div className="max-w-2xl bg-cream-dark rounded-full px-5 py-3.5 flex items-center gap-3 text-bark/50">
              <Icon name="search" className="w-5 h-5" />
              <span className="text-sm">Search trips, bookings, travelers, agencies…</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {['All results', 'Bookings', 'People', 'Experiences'].map((item) => <button key={item} onClick={() => setDetailFilter(item)} className={`px-4 py-2 rounded-full text-xs font-semibold ${detailFilter === item ? 'bg-forest text-cream' : 'border border-mist/60 text-bark/50'}`}>{item}</button>)}
            </div>
          </div>
          <div className="p-6">
            <p className="text-xs text-bark/40 uppercase tracking-widest font-semibold mb-4">Suggested results</p>
            {[
              ['Hills & Coast', 'Experience · Chattogram + Sylhet Divisions', 'map'],
              ['Booking BD-2841', '4 travelers · 18–24 June', 'calendar'],
              [role === 'admin' ? 'Bengal Trails Bangladesh' : 'Ayesha Rahman', role === 'admin' ? 'Verified agency · Dhaka Division' : 'Traveler profile', 'users'],
            ].map(([name, meta, icon]) => (
              <button key={name} onClick={() => onNavigate(`record:${name}`)} className="w-full p-4 flex items-center gap-4 border-b border-mist/40 last:border-0 hover:bg-cream-dark/40 text-left">
                <span className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center"><Icon name={icon} className="w-4 h-4" /></span>
                <span className="flex-1"><span className="block font-semibold text-forest">{name}</span><span className="block text-xs text-bark/45 mt-1">{meta}</span></span>
                <Icon name="arrow" className="w-4 h-4 text-earth" />
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (detail === 'notifications') {
    return (
      <div className="max-w-4xl">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-bark/50 hover:text-forest mb-6"><Icon name="arrow" className="w-4 h-4 rotate-180" /> Back to workspace</button>
        <section className="bg-fog border border-mist/60 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-mist/50 flex items-center justify-between">
            <div><p className="text-earth text-xs font-semibold uppercase tracking-widest mb-2">Notification center</p><h2 className="font-[var(--font-display)] text-2xl font-semibold text-forest">Updates requiring attention</h2></div>
            <button onClick={() => setNotificationsRead(true)} className="text-earth text-xs font-semibold">{notificationsRead ? 'All caught up' : 'Mark all as read'}</button>
          </div>
          {[
            ['Booking confirmed', 'Hills & Coast is ready for 18 June.', 'calendar', 'Now'],
            [role === 'admin' ? 'Agency awaiting review' : 'New message received', role === 'admin' ? 'Delta Adventures submitted all required documents.' : 'Bengal Trails sent an itinerary update.', role === 'admin' ? 'shield' : 'message', '24m'],
            ['Payment completed', 'Transaction BD-2841 was processed successfully.', 'check', 'Yesterday'],
            ['Travel insight', 'Chattogram Division searches increased this week.', 'chart', 'Mon'],
          ].map(([title, text, icon, time], index) => (
            <button key={title} onClick={() => onNavigate(index === 1 && role === 'admin' ? `review:${title}` : `record:${title}`)} className="w-full p-6 flex gap-4 text-left border-b border-mist/40 last:border-0 hover:bg-cream-dark/40">
              <span className={`w-11 h-11 rounded-full flex items-center justify-center ${index < 2 ? 'bg-earth text-cream' : 'bg-forest/10 text-forest'}`}><Icon name={icon} className="w-4 h-4" /></span>
              <span className="flex-1"><span className="block font-semibold text-forest">{title}</span><span className="block text-sm text-bark/50 mt-1">{text}</span></span>
              <span className="text-xs text-bark/35">{time}</span>
            </button>
          ))}
        </section>
      </div>
    );
  }

  const formPages = {
    'itinerary-builder': {
      eyebrow: 'Journey planner',
      title: 'Create your Bangladesh itinerary',
      description: 'Share your dates and travel style. We will build a route across the divisions.',
      fields: [['Travel dates', '18–24 June 2025'], ['Travelers', '2 adults'], ['Starting point', 'Dhaka Division'], ['Interests', 'Wildlife, culture, hiking']],
      action: 'Build my itinerary',
    },
    'create-experience': {
      eyebrow: 'Agency tools',
      title: 'Create a new experience',
      description: 'Add an itinerary, pricing, availability, and traveler requirements.',
      fields: [['Experience name', 'e.g. Kaptai Lake Wellness Weekend'], ['Division', 'Select a division'], ['Duration', 'Number of days'], ['Base price', 'Price per traveler in BDT']],
      action: 'Continue to itinerary',
    },
    'create-content': {
      eyebrow: 'Content management',
      title: 'Create platform content',
      description: 'Publish a guide, travel advisory, featured story, or facility update.',
      fields: [['Content type', 'Division guide'], ['Title', 'Enter a clear title'], ['Division', 'Select division coverage'], ['Publishing status', 'Save as draft']],
      action: 'Continue to editor',
    },
    'compose-message': {
      eyebrow: 'New conversation',
      title: 'Compose a message',
      description: 'Contact a traveler, agency, or the Explore Bangladesh support team.',
      fields: [['Recipient', 'Search by name or booking'], ['Related booking', 'Optional reference'], ['Subject', 'Enter message subject'], ['Message', 'Write your message']],
      action: 'Send message',
    },
    'add-payment-method': {
      eyebrow: 'Secure payments',
      title: 'Add a payment method',
      description: 'Your payment information is encrypted and securely stored.',
      fields: [['Cardholder name', 'Name shown on card'], ['Card number', '•••• •••• •••• ••••'], ['Expiry date', 'MM / YY'], ['Security code', 'CVC']],
      action: 'Save payment method',
    },
    'request-changes': {
      eyebrow: 'Approval workflow',
      title: 'Request changes',
      description: 'Send clear feedback so the partner can update and resubmit this item.',
      fields: [['Recipient', 'Delta Adventures'], ['Issue category', 'Missing or invalid document'], ['Due date', 'Within 5 business days'], ['Feedback', 'Describe the required changes']],
      action: 'Send change request',
    },
    support: {
      eyebrow: 'Explore Bangladesh support',
      title: 'How can we help?',
      description: 'Send a request to our operations team. Priority issues are handled around the clock.',
      fields: [['Request type', 'Booking assistance'], ['Related reference', 'Optional booking or payment ID'], ['Priority', 'Standard'], ['Description', 'Tell us what happened']],
      action: 'Submit support request',
    },
  };
  const form = formPages[detail];
  if (form) {
    return (
      <div className="max-w-5xl">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-bark/50 hover:text-forest mb-6"><Icon name="arrow" className="w-4 h-4 rotate-180" /> Back to workspace</button>
        <div className="grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-fog border border-mist/60 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-mist/50">
              <p className="text-earth text-xs font-semibold uppercase tracking-widest mb-2">{form.eyebrow}</p>
              <h2 className="font-[var(--font-display)] text-2xl font-semibold text-forest">{form.title}</h2>
              <p className="text-sm text-bark/50 mt-2">{form.description}</p>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-5">
              {form.fields.map(([label, placeholder], index) => (
                <button key={label} className={`text-left ${index === form.fields.length - 1 && (detail === 'compose-message' || detail === 'request-changes' || detail === 'support') ? 'sm:col-span-2' : ''}`}>
                  <span className="block text-xs font-semibold text-bark/50 mb-2">{label}</span>
                  <span className={`block w-full rounded-xl border border-mist/60 bg-cream px-4 text-sm text-bark/40 ${index === form.fields.length - 1 && (detail === 'compose-message' || detail === 'request-changes' || detail === 'support') ? 'py-8' : 'py-3.5'}`}>{placeholder}</span>
                </button>
              ))}
              <button onClick={() => onNavigate(`success:${detail}`)} className="sm:col-span-2 mt-2 py-3.5 rounded-full bg-earth text-cream font-semibold">{form.action}</button>
            </div>
          </section>
          <aside className="bg-forest text-cream rounded-2xl p-6 h-fit">
            <Icon name={detail === 'itinerary-builder' ? 'compass' : detail.includes('payment') ? 'shield' : 'check'} className="w-8 h-8 text-earth-light mb-5" />
            <h2 className="font-[var(--font-display)] text-xl">What happens next</h2>
            <div className="space-y-5 mt-6">
              {['Review your information', 'Confirm details and availability', 'Receive an update in your dashboard'].map((item, index) => (
                <div key={item} className="flex gap-3"><span className="w-6 h-6 rounded-full bg-cream/10 flex items-center justify-center text-xs">{index + 1}</span><span className="text-sm text-cream/65">{item}</span></div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  if (detail.startsWith('success:')) {
    const kind = detail.split(':')[1];
    const messages = {
      cashout: ['Transfer submitted', 'Your cashout is being processed and should arrive within two business days.'],
      approval: ['Item approved', 'The partner has been notified and the approved item is now ready to publish.'],
      message: ['Message sent', 'Your message was delivered successfully.'],
      download: ['Itinerary ready', 'Your itinerary document has been prepared for download.'],
      'itinerary-builder': ['Journey created', 'Your personalized Bangladesh route is now available in My journeys.'],
      'create-experience': ['Experience saved', 'Continue adding itinerary details before submitting it for approval.'],
      'create-content': ['Content draft created', 'Your draft is ready in the content workspace.'],
      'compose-message': ['Message sent', 'The conversation is now available in your inbox.'],
      'add-payment-method': ['Payment method added', 'Your new payment method is verified and ready to use.'],
      'request-changes': ['Feedback sent', 'The partner has been notified and can now resubmit the item.'],
      support: ['Request received', 'Support will respond in your message center shortly.'],
    };
    const [title, copy] = messages[kind] ?? ['Action completed', 'Your changes have been saved successfully.'];
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

  if (isRecord) {
    return (
      <div>
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-bark/50 hover:text-forest mb-6"><Icon name="arrow" className="w-4 h-4 rotate-180" /> Back to list</button>
        <div className="grid xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 bg-fog border border-mist/60 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-mist/50 flex flex-wrap justify-between gap-4">
              <div><p className="text-earth text-xs font-semibold uppercase tracking-widest mb-2">Detail view</p><h2 className="font-[var(--font-display)] text-2xl font-semibold text-forest">{recordName}</h2></div>
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
                ].map(([label, value]) => <div key={label} className="bg-cream-dark/60 rounded-xl p-4"><p className="text-xs text-bark/45">{label}</p><p className="font-semibold text-forest mt-1">{value}</p></div>)}
              </div>
              <div className="mt-6">
                <h3 className="font-[var(--font-display)] text-lg font-semibold text-forest mb-4">Timeline</h3>
                {['Booking created', 'Payment confirmed', 'Partner accepted', 'Travel documents ready'].map((item, index) => (
                  <div key={item} className="flex gap-3 pb-5 last:pb-0"><span className={`w-7 h-7 rounded-full flex items-center justify-center ${index < 3 ? 'bg-forest text-cream' : 'bg-cream-dark text-mist'}`}><Icon name={index < 3 ? 'check' : 'clock'} className="w-3 h-3" /></span><div><p className="text-sm font-semibold text-forest">{item}</p><p className="text-xs text-bark/40 mt-1">{index < 3 ? 'Completed' : 'Expected 16 June'}</p></div></div>
                ))}
              </div>
            </div>
          </section>
          <aside className="space-y-4">
            <div className="bg-forest text-cream rounded-2xl p-6">
              <h2 className="font-[var(--font-display)] text-xl">Quick actions</h2>
              <div className="space-y-2 mt-5">
                {['Send message', 'View payment', 'Download itinerary'].map((item) => <button key={item} onClick={() => onNavigate(item === 'Send message' ? 'compose-message' : item === 'View payment' ? 'payment-detail' : 'success:download')} className="w-full py-3 rounded-xl bg-cream/10 text-sm font-semibold hover:bg-cream/15">{item}</button>)}
              </div>
            </div>
            <div className="bg-fog border border-mist/60 rounded-2xl p-6">
              <p className="text-xs text-bark/45">Need assistance?</p><p className="font-semibold text-forest mt-1">Contact platform support</p>
              <button onClick={() => onNavigate('support')} className="text-earth text-sm font-semibold mt-4">Open support</button>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return null;
}

export default function Dashboard({ onExit, initialRole = 'user' }) {
  const [role, setRole] = useState(initialRole);
  const [activeNav, setActiveNav] = useState('Overview');
  const [detailView, setDetailView] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const content = roleContent[role];
  const activities = activityByRole[role];
  const detailTitles = {
    cashout: 'Cash out',
    'review-queue': 'Review queue',
    'payment-methods': 'Payment methods',
    'payment-detail': 'Payment details',
    'transaction-history': 'Transactions',
    'itinerary-builder': 'Plan a journey',
    'create-experience': 'Create experience',
    'create-content': 'Create content',
    'compose-message': 'New message',
    'add-payment-method': 'Add payment method',
    'request-changes': 'Request changes',
    support: 'Support',
    'global-search': 'Search',
    notifications: 'Notifications',
  };

  const quickAction = useMemo(() => {
    if (role === 'user') return { label: 'Plan a journey', icon: 'compass' };
    if (role === 'agency') return { label: 'Create experience', icon: 'plus' };
    return { label: 'Create experience', icon: 'plus' };
  }, [role]);

  const switchRole = (nextRole) => {
    setRole(nextRole);
    setActiveNav('Overview');
    setDetailView(null);
  };

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

        <div className="p-4">
          <p className="px-3 text-cream/40 text-xs font-semibold uppercase tracking-widest mb-3">Switch workspace</p>
          <div className="grid grid-cols-2 bg-cream/5 rounded-xl p-1">
            {['user', 'agency'].map((item) => (
              <button
                key={item}
                onClick={() => switchRole(item)}
                className={`py-2 rounded-lg text-xs font-semibold transition-colors ${role === item ? 'bg-earth text-cream shadow-sm' : 'text-cream/60 hover:text-cream'}`}
              >
                {roleContent[item].label}
              </button>
            ))}
          </div>
        </div>

        <nav className="flex-1 px-4 py-3 space-y-1">
          {content.nav.map((item) => (
            <button
              key={item.label}
              onClick={() => { setActiveNav(item.label); setDetailView(null); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeNav === item.label ? 'bg-cream text-forest-dark' : 'text-cream/60 hover:bg-cream/5 hover:text-cream'}`}
            >
              <Icon name={item.icon} />
              {item.label}
              {item.label === 'Approvals' && <span className="ml-auto bg-earth text-cream text-xs rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">7</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-cream/10">
          <div className="flex items-center gap-3 p-2">
            <span className="w-10 h-10 rounded-full bg-forest-light flex items-center justify-center text-sm font-semibold">{content.initials}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold truncate">{content.person}</span>
              <span className="block text-xs text-cream/40 capitalize">{role} account</span>
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
            <button onClick={() => setDetailView(role === 'admin' ? 'review-queue' : role === 'agency' ? 'create-experience' : 'itinerary-builder')} className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-earth text-cream text-sm font-semibold hover:bg-earth-light transition-colors">
              <Icon name={quickAction.icon} className="w-4 h-4" />
              {quickAction.label}
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-8 md:py-12">
          <div className="flex items-end justify-between gap-5 mb-8">
            <div>
              <p className="text-earth text-xs font-semibold tracking-widest uppercase mb-2">{content.eyebrow}</p>
              <h1 className="font-[var(--font-display)] text-forest text-3xl md:text-5xl font-light">
                {detailView ? (detailTitles[detailView] ?? (detailView.startsWith('success:') ? 'Complete' : detailView.startsWith('review') ? 'Review details' : 'Open details')) : activeNav === 'Overview' ? content.title : activeNav}
              </h1>
              <p className="text-bark/60 mt-2">{detailView ? 'Review the complete information and take the next action.' : activeNav === 'Overview' ? content.description : `Manage ${activeNav.toLowerCase()} from one focused workspace.`}</p>
            </div>
            <div className="hidden xl:flex items-center gap-2 text-xs text-bark/50 border border-mist/70 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-forest-light" />
              Live data · Updated now
            </div>
          </div>

          {detailView ? (
            <DetailedPage role={role} detail={detailView} onBack={() => setDetailView(null)} onNavigate={setDetailView} />
          ) : activeNav === 'Overview' ? (
          <>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {content.metrics.map((metric) => (
              <article key={metric.label} className="bg-fog border border-mist/60 rounded-2xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <span className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center"><Icon name={metric.icon} /></span>
                  {metric.trend && <span className="text-forest-light text-xs font-semibold bg-forest/10 px-2.5 py-1 rounded-full">{metric.trend}</span>}
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
                  <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">
                    {role === 'user' ? 'Your journeys' : role === 'agency' ? 'Booking performance' : 'Platform activity'}
                  </h2>
                  <p className="text-xs text-bark/45 mt-1">A clear view of what needs your attention</p>
                </div>
                <button onClick={() => setDetailView(role === 'admin' ? 'review-queue' : 'record:Performance summary')} className="text-earth text-xs font-semibold flex items-center gap-1 hover:text-earth-dark">View details <Icon name="arrow" className="w-4 h-4" /></button>
              </div>

              {role === 'user' ? (
                <div className="p-5 space-y-4">
                  {trips.map((trip, index) => (
                    <div key={trip.name} className="rounded-xl border border-mist/60 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${index === 0 ? 'bg-forest text-cream' : 'bg-earth/15 text-earth'}`}><Icon name={index === 0 ? 'map' : 'compass'} /></div>
                      <div className="flex-1">
                        <div className="flex justify-between gap-3">
                          <p className="font-semibold text-forest">{trip.name}</p>
                          <p className="text-xs text-bark/45">{trip.date}</p>
                        </div>
                        <p className="text-xs text-bark/50 mt-1">{trip.location}</p>
                        <div className="h-1.5 bg-cream-dark rounded-full mt-3 overflow-hidden"><div className="h-full bg-earth rounded-full" style={{ width: `${trip.progress}%` }} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6">
                  <div className="h-56 flex items-end gap-3 border-b border-mist/60">
                    {[38, 52, 45, 68, 61, 82, 74, 96, 78, 108, 92, 118].map((height, i) => (
                      <div key={i} className="flex-1 flex items-end h-full group">
                        <div className="w-full bg-forest/15 group-hover:bg-earth rounded-t-md transition-colors" style={{ height }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-bark/40 mt-3"><span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span></div>
                </div>
              )}
            </section>

            <section className="bg-fog border border-mist/60 rounded-2xl overflow-hidden">
              <div className="px-5 py-5 border-b border-mist/50">
                <h2 className="font-[var(--font-display)] text-xl font-semibold text-forest">Recent activity</h2>
                <p className="text-xs text-bark/45 mt-1">Latest updates for your account</p>
              </div>
              <div className="divide-y divide-mist/40">
                {activities.map((activity) => (
                  <button key={activity.title} onClick={() => setDetailView(role === 'admin' ? `review:${activity.title}` : `record:${activity.title}`)} className="w-full text-left p-5 flex gap-3 hover:bg-cream-dark/50 transition-colors">
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
              <p className="text-earth-light text-xs font-semibold uppercase tracking-widest mb-2">
                {role === 'user' ? 'Travel smarter' : role === 'agency' ? 'Growth suggestion' : 'Operational insight'}
              </p>
              <h2 className="font-[var(--font-display)] text-2xl font-light">
                {role === 'user' ? 'Build a personalized Bangladesh itinerary' : role === 'agency' ? 'Chattogram Division demand is rising' : 'Seven agencies are ready for verification'}
              </h2>
              <p className="text-cream/60 text-sm mt-2 max-w-2xl">
                {role === 'user' ? 'Tell us your dates and interests, and we will suggest a route across the divisions.' : role === 'agency' ? 'Add a Kaptai Lake weekend experience to capture a 24% increase in searches.' : 'Review partner credentials to keep the marketplace trusted and up to date.'}
              </p>
            </div>
            <button onClick={() => setDetailView(role === 'admin' ? 'review-queue' : role === 'agency' ? 'record:Chattogram Division opportunity' : 'record:Personalized Bangladesh itinerary')} className="relative z-10 flex-shrink-0 px-5 py-3 rounded-full bg-earth text-cream text-sm font-semibold hover:bg-earth-light transition-colors">
              {role === 'user' ? 'Create itinerary' : role === 'agency' ? 'View opportunity' : 'Open review queue'}
            </button>
            <span className="absolute -right-10 -bottom-20 w-56 h-56 rounded-full border border-cream/10" />
            <span className="absolute right-16 -bottom-24 w-40 h-40 rounded-full border border-cream/10" />
          </section>
          </>
          ) : (
            <WorkspacePage role={role} page={activeNav} onOpenDetail={setDetailView} />
          )}
        </div>
      </main>
    </div>
  );
}