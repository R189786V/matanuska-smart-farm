import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Login from './components/Login'
import StatsCard from './components/StatsCard'

export default function App() {

  const [session, setSession] = useState<any>(null)
  const [data, setData] = useState<any[]>([])

  // AUTH SESSION
  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()

  }, [])

  // LOAD SENSOR DATA
  useEffect(() => {

    if (session) {
      fetchData()
    }

  }, [session])

  // FETCH FROM SUPABASE
  const fetchData = async () => {

    const { data, error } = await supabase
      .from('sensor_data')
      .select('*')
      .order('created_at', { ascending: false })

    console.log(data)
    console.log(error)

    setData(data || [])
  }

  // LOGOUT
  const logout = async () => {
    await supabase.auth.signOut()
  }

  // LOGIN SCREEN
  if (!session) {
    return <Login />
  }

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* TOP NAVBAR */}
        <div className="bg-gradient-to-r from-green-700 to-green-500 text-white px-8 py-5 flex justify-between items-center shadow-lg">

          <div>

            <h1 className="text-3xl font-bold">
              Matanuska Smart Farm
            </h1>

            <p className="text-green-100">
              Banana Plantation Monitoring
            </p>

          </div>

          <button
            onClick={logout}
            className="bg-white text-green-700 px-5 py-2 rounded-full font-bold hover:bg-gray-100"
          >
            Logout
          </button>

        </div>

        {/* PAGE CONTENT */}
        <div className="p-8">

          {/* STATS */}
          <div className="grid grid-cols-4 gap-6">

            <StatsCard
              title="ONLINE"
              value="6"
              color="bg-green-100 text-green-800"
            />

            <StatsCard
              title="WARNING"
              value="1"
              color="bg-yellow-100 text-yellow-700"
            />

            <StatsCard
              title="ALERT"
              value="0"
              color="bg-red-100 text-red-700"
            />

            <StatsCard
              title="TOTAL"
              value={String(data.length)}
              color="bg-blue-100 text-blue-700"
            />

          </div>

          {/* SENSOR SECTION */}
          <div className="mt-10">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold text-gray-800">
                Live Sensor Monitoring
              </h2>

              <button
                onClick={fetchData}
                className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
              >
                Refresh
              </button>

            </div>

            {/* SENSOR CARDS */}
            <div className="grid gap-6">

              {data.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-lg p-6 border-l-[10px] border-green-600"
                >

                  {/* HEADER */}
                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-2xl font-bold text-gray-800">
                        Sensor Node #{item.id}
                      </h3>

                      <p className="text-gray-400 mt-1">
                        {new Date(item.created_at).toLocaleString()}
                      </p>

                    </div>

                    <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">
                      ACTIVE
                    </div>

                  </div>

                  {/* SENSOR GRID */}
                  <div className="grid grid-cols-3 gap-6 mt-6">

                    {/* TEMPERATURE */}
                    <div className="bg-red-50 p-5 rounded-2xl">

                      <p className="text-gray-500">
                        Temperature
                      </p>

                      <h2 className="text-4xl font-bold text-red-500 mt-2">
                        {item.temperature1}°C
                      </h2>

                    </div>

                    {/* HUMIDITY */}
                    <div className="bg-blue-50 p-5 rounded-2xl">

                      <p className="text-gray-500">
                        Humidity
                      </p>

                      <h2 className="text-4xl font-bold text-blue-500 mt-2">
                        {item.humidity1}%
                      </h2>

                    </div>

                    {/* SOIL MOISTURE */}
                    <div className="bg-green-50 p-5 rounded-2xl">

                      <p className="text-gray-500">
                        Soil Moisture
                      </p>

                      <h2 className="text-4xl font-bold text-green-600 mt-2">
                        {item.soil_moisture1}%
                      </h2>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}