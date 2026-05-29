type Props = {
  title: string
  value: string
  color: string
}

export default function StatsCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className={`rounded-2xl p-6 shadow-lg ${color}`}>
      <h2 className="text-4xl font-bold">
        {value}
      </h2>

      <p className="mt-2 text-lg">
        {title}
      </p>
    </div>
  )
}