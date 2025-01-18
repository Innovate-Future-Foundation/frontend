import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1>Homepage</h1>
        <Link to="/auth">
          <Button>Go to Authentication Page</Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default HomePage;
