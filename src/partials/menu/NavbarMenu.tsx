import { KeenIcon } from '@/components';
import {
  Menu,
  TMenuConfig,
  MenuItem,
  MenuLink,
  MenuSub,
  MenuArrow
} from '@/components/menu';
import { useLanguage } from '@/i18n';

const NavbarMenu = ({ items }: { items: TMenuConfig }) => {
  const { isRTL } = useLanguage();

  // Icon mapping for menu items
  const menuIcons: Record<string, string> = {
    home: 'ki-home',
    dashboard: 'ki-chart-bar',
    documents: 'ki-filled ki-files',
    profile: 'ki-user',
    flag: 'ki-filled ki-flag',
    messages: 'ki-message',
    notifications: 'ki-bell',
    help: 'ki-question-circle'
  };

  const buildMenu = (items: TMenuConfig) => {
    return items.map((item, index) => {
      if (item.children) {
        return (
          <MenuItem
            key={index}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: isRTL() ? 'top-end' : 'top-start',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 8] // [skid, distance]
                  }
                }
              ]
            }}
          >
            <MenuLink className="p-3">
              {item.icon && (
                <KeenIcon 
                  icon={`ki-solid ${menuIcons[item.icon] || 'ki-circle'}`} 
                  className="text-xl text-gray-600 dark:text-gray-300"
                />
              )}
              <MenuArrow>
                <KeenIcon
                  icon="ki-solid ki-chevron-down"
                  className="text-xs text-gray-500 dark:text-gray-400"
                />
              </MenuArrow>
            </MenuLink>
            <MenuSub className="menu-default" rootClassName="py-2 min-w-[180px] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              {buildMenuSub(item.children)}
            </MenuSub>
          </MenuItem>
        );
      } else {
        return (
          <MenuItem
            key={index}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <MenuLink path={item.path} className="p-3">
              {item.icon && (
                <KeenIcon 
                  icon={`ki-solid ${menuIcons[item.icon] || 'ki-circle'}`} 
                  className="text-xl text-gray-600 dark:text-gray-300"
                />
              )}
            </MenuLink>
          </MenuItem>
        );
      }
    });
  };

  const buildMenuSub = (items: TMenuConfig) => {
    return items.map((item, index) => {
      if (item.children) {
        return (
          <MenuItem
            key={index}
            toggle="dropdown"
            trigger="hover"
            dropdownProps={{
              placement: isRTL() ? 'left-start' : 'right-start',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: isRTL() ? [8, 0] : [-8, 0] // [skid, distance]
                  }
                }
              ]
            }}
          >
            <MenuLink className="px-4 py-2">
              {item.icon && (
                <KeenIcon 
                  icon={`ki-solid ${menuIcons[item.icon] || 'ki-circle'}`} 
                  className="text-lg text-gray-600 dark:text-gray-300"
                />
              )}
              {buildMenuToggle()}
            </MenuLink>
            <MenuSub className="menu-default" rootClassName="py-2 min-w-[180px] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              {buildMenuSub(item.children)}
            </MenuSub>
          </MenuItem>
        );
      } else {
        return (
          <MenuItem key={index}>
            <MenuLink path={item.path} className="px-4 py-2">
              {item.icon && (
                <KeenIcon 
                  icon={`ki-solid ${menuIcons[item.icon] || 'ki-circle'}`} 
                  className="text-lg text-gray-600 dark:text-gray-300"
                />
              )}
            </MenuLink>
          </MenuItem>
        );
      }
    });
  };

  const buildMenuToggle = () => {
    return (
      <MenuArrow>
        <KeenIcon 
          icon="ki-solid ki-chevron-right" 
          className="text-xs [.menu-dropdown_&]:-rotate-90 text-gray-500 dark:text-gray-400"
        />
      </MenuArrow>
    );
  };

  return (
    <div className="fixed bottom-6 transform -translate-x-1/2 z-50">
      <div className="relative">
        {/* Main floating menu container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Shadow effect similar to SVG */}
          <div className="absolute inset-0 rounded-2xl shadow-lg opacity-10 pointer-events-none"></div>
          
          <Menu 
            highlight={true} 
            className="flex p-1"
          >
            {buildMenu(items)}
          </Menu>
        </div>
      </div>
    </div>
  );
};

export { NavbarMenu };