import { Link } from "react-router-dom";

function AuthHeader({type}:{ type: "signup" | "signin" }) {
  return (
    <div className="px-10">
    <div className="text-3xl font-extrabold">Create an Account</div>
    <div className="text-slate-400">
      {type === "signin"
        ? "Dont have an account?"
        : "Already have an account?"}

      <Link to={type==="signin"?'/signup':'/signin'} className="pl-2 underline">
      {type==="signin"?'Sign up':'Sign in'}
      </Link>
    </div>
  </div>
  )
}

export default AuthHeader