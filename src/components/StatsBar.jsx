import { useLang } from '../context/LanguageContext.jsx'

export default function StatsBar() {
  const { t } = useLang()

  const stats = [
    { value: '100%', label: t.stats.verified },
    { value: '20+', label: t.stats.interests },
    { value: '5', label: t.stats.swipes },
    { value: '24/7', label: t.stats.online },
    { value: '100%', label: t.stats.private },
    { value: '✓', label: t.stats.safe },
  ]

  return (
    <div className="bg-white border-y border-border-rose overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul
          className="flex items-center gap-0 min-w-max sm:min-w-0 list-none m-0 p-0"
          aria-label="Key features"
        >
          {stats.map(({ value, label }, i) => (
            <li
              key={label}
              className={`flex flex-col items-center justify-center px-6 py-5 text-center flex-1 min-w-[120px] ${
                i < stats.length - 1 ? 'border-r border-border-rose' : ''
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
