import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Speak Up India
          </Link>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="text-white bg-dark border-white hover:bg-white/10"
              asChild
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              variant="outline"
              className="text-white bg-dark border-white hover:bg-white/10"
              asChild
            >
              <Link to="/about">About</Link>
            </Button>
            <Button
              variant="outline"
              className="text-white bg-dark border-white hover:bg-white/10"
              asChild
            >
              <Link to="/complaints">View Complaints</Link>
            </Button>
            <Button
              variant="outline"
              className="text-white bg-dark border-white hover:bg-white/10"
              asChild
            >
              <Link to="/feed">Community Feed</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
