import MainNav from './MainNav';
import Search from './Search';
import TeamSwitcher from './TeamSwitcher';
import UserNav from './UserNav';

const Navbar = () => {
  return (
    <div className='flex-col flex'>
      <div className='border-b'>
        <div className='md:container flex h-16 items-center px-4'>
          <TeamSwitcher />
          <MainNav className='mx-6' />
          <div className='hidden ml-auto md:flex items-center space-x-4'>
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
