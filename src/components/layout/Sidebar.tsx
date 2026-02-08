'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { colors } from '@/styles/colors';

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  icon: string;
  label: string;
  href?: string;
  subItems?: SubMenuItem[];
}

const Sidebar = () => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Transferencias', 'Pagos']);

  const menuItems: MenuItem[] = [
    {
      icon: '/icon/sidebar/transferencia.svg',
      label: 'Transferencias',
      subItems: [
        { label: 'Propias', href: '/transferencias/propias' },
        { label: 'A terceros', href: '/transferencias/terceros' },
        { label: 'Programadas', href: '/transferencias/programadas' },
      ],
    },
    {
      icon: '/icon/sidebar/tabler-icon-cash.svg',
      label: 'Pagos',
      subItems: [
        { label: 'Tarjetas', href: '/pagos/tarjetas' },
        { label: 'Préstamos', href: '/pagos/prestamos' },
        { label: 'Servicios', href: '/pagos/servicios' },
        { label: 'Impuestos', href: '/pagos/impuestos' },
        { label: 'Recargas', href: '/pagos/recargas' },
        { label: 'Programados', href: '/pagos/programados' },
      ],
    },
    {
      icon: '/icon/sidebar/tabler-icon-file-time.svg',
      label: 'Movimientos',
      href: '/movimientos',
    },
    {
      icon: '/icon/sidebar/tabler-icon-category-plus.svg',
      label: 'Solicitudes',
      href: '/solicitudes',
    },
    {
      icon: '/icon/sidebar/tabler-icon-phone.svg',
      label: 'Contacto',
      href: '/contacto',
    },
    {
      icon: '/icon/sidebar/tabler-icon-users.svg',
      label: 'Beneficiarios',
      href: '/beneficiarios',
    },
    {
      icon: '/icon/sidebar/tabler-icon-home-bolt.svg',
      label: 'Servicios',
      href: '/servicios',
    },
    {
      icon: '/icon/sidebar/cartera.svg',
      label: 'Configuración',
      href: '/configuracion',
    },
  ];

  const toggleItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside className="w-[280px] h-screen bg-white overflow-y-auto">
      {/* Mis productos section */}
      <div className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 flex items-center justify-center">
            <Image
              src="/icon/sidebar/cartera.svg"
              alt="Mis productos"
              width={24}
              height={24}
              style={{ filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)' }}
            />
          </div>
          <h2
            className="text-[16px] font-semibold"
            style={{ color: colors.primary }}
          >
            Mis productos
          </h2>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="py-2">
        {menuItems.map((item, index) => {
          const itemIsActive = isActive(item.href);
          const hasActiveChild = item.subItems?.some(sub => isActive(sub.href));

          return (
            <div key={index}>
              {/* Main Item */}
              <button
                onClick={() => item.subItems && toggleItem(item.label)}
                className={`w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 ${
                  !item.subItems ? 'cursor-pointer' : ''
                }`}
                style={{
                  backgroundColor: itemIsActive ? colors.grey50 : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!itemIsActive) {
                    e.currentTarget.style.backgroundColor = colors.grey50;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!itemIsActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={24}
                    height={24}
                    style={{
                      filter: itemIsActive || hasActiveChild
                        ? 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)'
                        : 'brightness(0) saturate(0%) brightness(30%)'
                    }}
                  />
                </div>
                <span
                  className="text-[15px] font-semibold flex-1 text-left"
                  style={{
                    color: itemIsActive || hasActiveChild ? colors.textPrimary : colors.grey700,
                  }}
                >
                  {item.label}
                </span>
                {item.subItems && (
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expandedItems.includes(item.label) ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: colors.textSecondary }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>

              {/* Sub Items with Curved Lines */}
              {item.subItems && expandedItems.includes(item.label) && (
                <div className="overflow-hidden transition-all duration-300 animate-slide-down">
                  {item.subItems.map((subItem, subIndex) => {
                    const subIsActive = isActive(subItem.href);
                    const isLast = subIndex === item.subItems!.length - 1;

                    return (
                      <div key={subIndex} className="relative group/item">
                        {/* Curved connecting line */}
                        <div
                          className="absolute left-[38px] w-[2px] transition-colors duration-200"
                          style={{
                            backgroundColor: colors.grey700,
                            top: 0,
                            height: isLast ? '50%' : '100%',
                          }}
                        />

                        {/* Horizontal curved connector */}
                        <div
                          className="absolute transition-colors duration-200"
                          style={{
                            left: '38px',
                            top: '50%',
                            width: '16px',
                            height: '16px',
                            transform: 'translateY(-50%)',
                            borderLeft: `2px solid ${colors.grey700}`,
                            borderBottom: `2px solid ${colors.grey700}`,
                            borderBottomLeftRadius: '8px',
                          }}
                        />

                        <a
                          href={subItem.href}
                          className="flex items-center pl-[68px] pr-6 py-2.5 transition-all duration-150 relative"
                          style={{
                            backgroundColor: subIsActive ? colors.grey50 : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (!subIsActive) {
                              e.currentTarget.style.backgroundColor = colors.grey50;
                            }
                            // Cambiar color de las líneas al hover
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              const verticalLine = parent.querySelector('.absolute.w-\\[2px\\]') as HTMLElement;
                              const curvedLine = parent.querySelectorAll('.absolute')[1] as HTMLElement;
                              if (verticalLine) verticalLine.style.backgroundColor = colors.primary;
                              if (curvedLine) {
                                curvedLine.style.borderLeftColor = colors.primary;
                                curvedLine.style.borderBottomColor = colors.primary;
                              }
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!subIsActive) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                            // Restaurar color de las líneas
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              const verticalLine = parent.querySelector('.absolute.w-\\[2px\\]') as HTMLElement;
                              const curvedLine = parent.querySelectorAll('.absolute')[1] as HTMLElement;
                              if (verticalLine) verticalLine.style.backgroundColor = colors.grey700;
                              if (curvedLine) {
                                curvedLine.style.borderLeftColor = colors.grey700;
                                curvedLine.style.borderBottomColor = colors.grey700;
                              }
                            }
                          }}
                        >
                          <span
                            className="text-[14px] transition-colors"
                            style={{
                              color: subIsActive ? colors.textPrimary : colors.grey700,
                              fontWeight: subIsActive ? 700 : 600,
                            }}
                          >
                            {subItem.label}
                          </span>
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;