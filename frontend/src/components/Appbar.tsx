import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  const user = localStorage.getItem("userData");
  const res = user ? JSON.parse(user) : null;

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer text-2xl font-semibold"
      >
        <div className="flex flex-row gap-4 justify-center items-center">
          <img src="image.png" alt="" className="w-12" />
          Word Weaver
        </div>
      </Link>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New
          </button>
        </Link>

        <Avatar name={res?.name.toUpperCase() || "Anyonmous"} size="big" />
      </div>
    </div>
  );
};
