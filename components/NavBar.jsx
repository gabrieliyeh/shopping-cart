import Link from "next/link";
import { useSignOut, useUser } from "../hooks/user";

const NavBar = () => {
  const user = useUser();
  const signOut= useSignOut()

  return (
    <nav className="py-2 text-sm mb-4">
      <ul className="flex gap-2 justify-between">
        <li className="text-lg font-extrabold">
          <Link href="/">
            <a>Next Shop</a>
          </Link>
        </li>
        <div className="flex gap-2">
          {user ? (
            <>
             <li>
              <Link href="/cart">
                <a>Cart</a>
              </Link>
            </li>
              <li>{user.name}</li>
              <li>
                <button onClick={signOut}> Sign Out</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/sign-in">
                <a>Sign in</a>
              </Link>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
