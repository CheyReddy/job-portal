import { Link, useNavigate } from "react-router-dom"
import { getRole, clearAuth } from "../utils/auth"
import { MENU_BY_ROLE } from "../config/menuConfig"

type ItemValues = {
  label: string,
  path: string
}


function NavBar() {
  const navigate = useNavigate();
  const role = getRole();
  const menu = MENU_BY_ROLE[role] || [];

  const logout = () => {
    clearAuth();
    navigate("/");
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="text-lg font-semibold text-blue-600">
          Job Portal
        </div>

        <div className="flex items-center gap-6">
          {menu.map((item: ItemValues) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm text-gray-700 hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:underline"
          >Logout</button>
        </div>

      </div>
    </nav>
  )
}

export default NavBar

