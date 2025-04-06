/* eslint-disable react/prop-types */
import React,{ useState, useEffect } from 'react';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";
// Lazy load components that might cause hydration issues
// const HamburgerMenu = dynamic(
//     () => import('./HamburgerMenu'),
//     { ssr: false }
// );

const Menu = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const menuItems = [
        {
            title: 'خانه',
            submenu: [
                {
                    title: 'صفحات فرود',
                    icon: 'vl-pop-corn',
                    href: 'page-landing.html'
                },
                {
                    title: 'صفحات داخلی',
                    icon: 'vl-layer',
                    href: 'page-landing.html'
                },
                {
                    title: 'صفحات خارجی',
                    icon: 'vl-gear',
                    href: 'page-landing.html'
                },
            ]
        },
    ];

    if (!isMounted) {
        // Return minimal server render
        return (
            <header className="app-header">
                <div className="container">
                    <div className="navbar-brand">
                        <a href="/">
                            <Image
                                src="/assets/img/logo-dark.png"
                                alt="CLab"
                                width={120}
                                height={40}
                                priority
                            />
                        </a>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="app-header">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="navbar-brand float-left">
                            <a href="index-2.html">
                                <Image
                                    src="/assets/img/logo-dark.png"
                                    alt="CLab"
                                    style={{objectFit: 'none'}}
                                    width={120}
                                    height={40}
                                    priority
                                />
                            </a>
                        </div>

                        <nav id="vl-menu">
                            <ul className="float-right nav-extra-link">
                                <a
                                    href="https://www.rtl-theme.com/user-profile/tn_plugin/"
                                    className="btn btn-sm btn-pill btn-theme mt-3"
                                >
                                    همین حالا بخرید
                                </a>
                            </ul>

                            <ul className="vlmenu light-sub-menu slide-effect float-right fade-effect">
                                {menuItems.map((item, index) => (
                                    <MenuItem key={index} item={item} />
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Separate component for menu items
const MenuItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li>
            <a href="#" onClick={() => setIsOpen(!isOpen)}>
                {item.title}
                {item.submenu && (
                    <>
                        <IoIosArrowDown />
                    </>
                )}
            </a>

            {item.submenu && isOpen && (
                <ul>
                    {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                            <a href={subItem.href} className="d-flex">
                                <i className={`${subItem.icon} font-size-20`} />
                                <span className="font-weight-700">{subItem.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Menu;