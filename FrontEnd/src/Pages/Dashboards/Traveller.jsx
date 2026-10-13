
import { useState } from 'react';

export default function Traveller({ onExit }) {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-[#f5ede0] p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3d28]">
            Traveler Dashboard
          </h1>
          <p className="mt-1 text-gray-600">
            Welcome to your Wander Bangladesh dashboard.
          </p>
        </div>

        <button
          onClick={onExit}
          className="rounded-lg bg-[#1e3d28] px-4 py-2 text-white"
        >
          Back to Home
        </button>
      </header>

      <nav className="mb-6 flex flex-wrap gap-3">
        {['Overview', 'My Journeys', 'Saved Places', 'Profile'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 ${
              activeTab === tab
                ? 'bg-[#1e3d28] text-white'
                : 'bg-white text-[#1e3d28]'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#1e3d28]">
          {activeTab}
        </h2>
        <p className="mt-3 text-gray-600">
          {activeTab === 'Overview'
            ? 'Your travel activities and plans will appear here.'
            : `${activeTab} content will be available here.`}
        </p>
      </section>
    </div>
  );
}
