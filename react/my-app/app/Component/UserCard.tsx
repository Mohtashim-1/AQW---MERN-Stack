// REACT TOPIC: PROPS - Passing data from parent to child component
interface User {
  id: number
  name: string
  email: string
}

interface UserCardProps {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
      <h3 className="font-semibold text-lg">{user.name}</h3>
      <p className="text-gray-600 text-sm">{user.email}</p>
      <p className="text-xs text-gray-400 mt-2">ID: {user.id}</p>
    </div>
  )
}

export default UserCard
