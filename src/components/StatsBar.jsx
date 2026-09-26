const STATS = [
  { value: '100%', label: 'Verified Profiles' },
  { value: '20+', label: 'Lifestyle Interests' },
  { value: '5', label: 'Swipes Per Day' },
  { value: 'Online', label: 'Status' },
  { value: 'Private', label: 'Delivery' },
  { value: 'Safe &', label: 'Secure' },
]

export default function StatsBar() {
  return (
    <div className="bg-white border-y border-border-rose overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul
          className="flex items-center gap-0 min-w-max sm:min-w-0 list-none m-0 p-0"
          aria-label="Key features"
        >
          {STATS.map(({ value, label }, i) => (
            <li
              key={label}
              className={`flex flex-col items-center justify-center px-6 py-5 text-center flex-1 min-w-[120px] ${
                i < STATS.length - 1 ? 'border-r border-border-rose' : ''
              }`}
            >
              <span className="font-display italic text-rose font-bold text-lg leading-none mb-0.5">
                {value}
              </span>
              <span className="text-text-muted text-[11px] font-medium tracking-wide">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
