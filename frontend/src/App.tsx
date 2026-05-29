import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export default function App() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await supabase
      .from('sensor_data')
      .select('*')
      .order('created_at', { ascending: false })

    setData(data || [])
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP NAVBAR */}
      <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700">
          Matanuska Smart Farm
        </h1>

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
          ● LIVE
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="p-8">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-5xl font-bold text-gray-800">
            Smart Agriculture Monitoring
          </h2>

          <p className="mt-4 text-gray-500 text-lg">
            Real-time banana plantation monitoring system
            for Matanuska Distribution Zimbabwe.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-6 mt-10">

            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-green-700">
                {data.length}
              </h3>
              <p className="text-gray-500 mt-2">Sensor Readings</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-blue-700">
                24/7
              </h3>
              <p className="text-gray-500 mt-2">Monitoring</p>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-yellow-600">
                LIVE
              </h3>
              <p className="text-gray-500 mt-2">System Status</p>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-red-600">
                IoT
              </h3>
              <p className="text-gray-500 mt-2">Smart Sensors</p>
            </div>

          </div>

        </div>

        {/* SENSOR DATA */}
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Live Sensor Data
          </h2>

          <div className="grid gap-6">

            {data.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-green-600"
              >

                <div className="flex justify-between items-center">

                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Sensor Reading #{item.id}
                    </h3>

                    <p className="mt-2 text-lg">
                      🌡️ Temperature:
                      <span className="font-bold text-red-500 ml-2">
                        {item.temperature1} °C
                      </span>
                    </p>

                    <p className="mt-2 text-lg">
                      💧 Humidity:
                      <span className="font-bold text-blue-500 ml-2">
                        {item.humidity1} %
                      </span>
                    </p>

                    <p className="mt-2 text-lg">
                      🌱 Soil Moisture:
                      <span className="font-bold text-green-600 ml-2">
                        {item.soil_moisture1} %
                      </span>
                    </p>

                    <p className="mt-4 text-sm text-gray-400">
                      {new Date(item.created_at).toLocaleString()}
                    </p>

                  </div>

                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                    LIVE
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  )
}