import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';

const Navbar = () => {

    const router = useRouter();
    const cookies = parseCookies();
    const user = cookies.user ? JSON.parse(cookies.user) : ""
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
          <li className={isActive("/cart")}><Link href="/cart"><a>Cart</a></Link></li>
          {
            user.role === "admin" && 
            <li className={isActive("/create")}><Link href="/create"><a>Create</a></Link></li>
          }
          {
            user ? 
              <>
                <li className={isActive("/account")}><Link href="/account"><a>Account</a></Link></li>
                <li className="btn red" style={{ margin:'13px 0 0 0',padding:'1px 0 0 0' }} onClick={() => {
                  cookie.remove('token');
                  cookie.remove('user')
                  router.push('/login')
                  M.toast({html:"You have to successfuly Logout",classes:'green'})
                }}><a>Logout</a></li>
              </>
            :
              <>
                <li className={isActive("/login")}><Link href="/login"><a>Login</a></Link></li>
                <li className={isActive("/signup")}><Link href="/signup"><a>Signup</a></Link></li>
              </>
          }
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
