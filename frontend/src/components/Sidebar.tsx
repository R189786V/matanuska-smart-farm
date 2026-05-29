export default function Sidebar() {
  return (
    <div className="w-72 bg-green-800 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        🌱 Matanuska
      </h1>

      <div className="space-y-4">

        <div className="bg-green-700 p-4 rounded-2xl">
          Dashboard
        </div>

        <div className="hover:bg-green-700 p-4 rounded-2xl cursor-pointer">
          Sensor Nodes
        </div>

        <div className="hover:bg-green-700 p-4 rounded-2xl cursor-pointer">
          Fields
        </div>

        <div className="hover:bg-green-700 p-4 rounded-2xl cursor-pointer">
          Analytics
        </div>

        <div className="hover:bg-green-700 p-4 rounded-2xl cursor-pointer">
          Settings
        </div>

      </div>

    </div>
  )
}