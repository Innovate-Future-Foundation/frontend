import { Link, Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </nav>
      </header>
      <main>
        {/* Renders the component matching the current route */}
        <Outlet />
      </main>
    </div>
  );
};

export default App;
