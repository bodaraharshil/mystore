import { route } from 'next/dist/next-server/server/router';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {

    const router = useRouter();
    function isActive(route)
    {
        if(route ===  router.pathname)
        {
            return "active"
        }
        else
        {
            ""
        }
    }

  return (
    <div>
      <nav>
        <div className="nav-wrapper #1565c0 blue darken-3">
          <a className="brand-logo left py-8">
            <Link href="/">
            Mystore
            </Link>
          </a>
          <ul id="nav-mobile" className="right">
            <li className={isActive("/login")}>
              <Link href="/login"><a>Login</a></Link>
            </li>
            <li className={isActive("/signup")}>
                <Link href="/signup"><a>Signup</a></Link>
            </li>
            <li className={isActive("/create")}>
                <Link href="/create"><a>Create</a></Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
