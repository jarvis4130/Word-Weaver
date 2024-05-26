import { Appbar } from "../components/Appbar";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div>
      <Appbar />
      <div className="w-full relative" style={{ height: "calc(100vh - 81px)" }}>
        <div className="pl-40 pt-20">
          <div className="pt-15 w-1/2">
            <p className="text-8xl">Human stories & ideas</p>
          </div>
          <div className="pt-10">
            <p className="text-xl text-slate-600">
              A place to read, write, and deepen your understanding
            </p>
          </div>
          <div className="flex flex-row">
            <Link to="/signup" className="bg-black text-white py-4 px-8 rounded-full mr-5 my-4">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
