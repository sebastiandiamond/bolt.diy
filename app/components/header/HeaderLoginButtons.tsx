import { Link } from '@remix-run/react';
import { Fragment } from 'react';

function HeaderLoginButtons() {
  const userId = localStorage.getItem('userId');

  if (!userId) {
    return (
      <Fragment>
        <div className="flex gap-2">
          <Link
            to="/auth/sign-in"
            className="text-bolt-elements-textPrimary px-[16px] py-[6px] rounded-md text-xs bg-[#3B3B3B]"
          >
            Sign In
          </Link>
          <Link
            to="/auth/sign-up"
            className="text-bolt-elements-textPrimary px-[16px] py-[6px] rounded-md text-xs bg-[#9E0DE1]"
          >
            Get Started
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default HeaderLoginButtons;
