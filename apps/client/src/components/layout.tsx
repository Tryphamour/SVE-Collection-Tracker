import { Bell, LogOut, Settings, User } from 'lucide-react';
import { ReactNode } from 'react';
import { Box, PersonBadge } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';

const items = [
  {
    title: 'Card list',
    icon: PersonBadge, // TODO: find a better icon
    url: '/cards',
  },
  {
    title: 'My collection',
    icon: Box,
    url: '/collection',
  },
];

function NavProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium space-x-2">
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage src="test.jpg" alt="SVECT" />
          <AvatarFallback className="rounded-full">S</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <div className="truncate">John Doe</div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <Link to="/profile/1">
            <DropdownMenuItem>
              <User className="size-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link to="/settings">
            <DropdownMenuItem>
              <Settings className="size-4" />
              Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link to="/logout">
          <DropdownMenuItem>
            <LogOut className="size-4" />
            Log out
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavNotifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
        <Bell className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Notification 1</DropdownMenuItem>
          <DropdownMenuItem>Notification 2</DropdownMenuItem>
          <DropdownMenuItem>Notification 3</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AppNavbar() {
  return (
    <nav className="bg-gray-800" aria-label="Global">
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0 flex items-center ml-8">
          <img className="block h-8 w-auto" src="SVECT.png" alt="SVECT" />
        </div>
        <div>
          <Input
            className="w-96"
            placeholder="Search for cards"
            type="search"
          />
        </div>
        <div className="relative flex items-center justify-between h-16 mr-8">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex space-x-4">
              {items.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                  {item.title}
                </Link>
              ))}
              <NavNotifications />
              <NavProfile />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  );
}
