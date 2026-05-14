import Logo from "./../../components/Logo";
import CircularProgress from "./CircularProgress";
import User from "lucide-react/dist/esm/icons/user";

function Header({ progress }) {
  return (
    <header className="z-10 w-full py-6 md:px-8">
      <div className="flex w-full items-center justify-between px-4">
        <Logo />
        <div className="flex items-center space-x-4">
          <CircularProgress progress={progress} />
          <User />
        </div>
      </div>
    </header>
  );
}

export default Header;
