import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header({theme}) {
  const [isDark, setIsDark] = theme;
  
  return (
    // <header className={`header-container ${isDark ? "dark" : ""}`}>
    //   <div className="header-content">
    //     <h2 className="title">
    //       <a href="/">Where in the world?</a>
    //     </h2>
    //     <p className="theme-changer" onClick={() => {
    //       setIsDark(!isDark)
    //       localStorage.setItem("isDarkMode", JSON.stringify(!isDark)); //Always store it as a proper JSON boolean
    //     }}>
    //       {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
    //       &nbsp;&nbsp;{isDark ? "Light" : "Dark"} Mode
    //     </p>
    //   </div>
    // </header>

    <header className="w-full bg-gray-800 shadow-lg sticky z-50 top-0 text-white p-4">
      <div className="w-full flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl main-header">
        <h1 className="text-2xl font-bold">Countries Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-gray-300">
                DashBoard
              </Link>
            </li>
            <li>
              <Link to="/continents" className="hover:text-gray-300">
                Continents
              </Link>
            </li>
            <li>
              <Link to="/heatmap" className="hover:text-gray-300">
                HeatMap
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;
  