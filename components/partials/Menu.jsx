/* eslint-disable react/prop-types */
import { get } from '@/services/api';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";
import _ from 'lodash';

const Menu = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await get('/categories')
            setCategories(_.chunk(data.categories, 8))
        }
        fetchCategories()
        setIsMounted(true);
    }, []);

    const menuItems = [
        {
            title: 'خانه',
            submenu: [{
                subItem: [
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
            }]
        }, {
            title: 'درباره ما',
        },
        {
            title: 'پشتیبانی'
        },
        {
            title: 'دسته بندی',
            submenu: categories.map((chunkedCategory) => ({
                subItem: chunkedCategory.map(category => ({
                    title: category.title,
                    icon: 'vl-layer',
                    href: `category/${category.slug}`
                }))
            }))
        }
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
                                    style={{ objectFit: 'none' }}
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
                                    محصولات
                                </a>
                            </ul>

                            <ul className="vlmenu light-sub-menu  float-right fade-effect">
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
        <li onMouseEnter={() => setIsOpen(!isOpen)}>
            <a href="#" >
                {item.title}
                {item.submenu && (
                    <>
                        <IoIosArrowDown className='align-sub' />
                    </>
                )}
            </a>

            {item.submenu && isOpen && (
                <ul className='container w-100 d-flex align-items-center justify-content-around position-absolute left-0 top-0' style={{ left: 0 }}>
                    {item.submenu.map((subMenuItem, subIndex) => (
                        <div key={subIndex}>
                            {subMenuItem.subItem && subMenuItem.subItem.map(itemchunk => (
                                <li key={subIndex} >
                                    <a href={itemchunk.href} className="d-flex">
                                        <i className={`${itemchunk.icon} font-size-20`} />
                                        <span className="font-weight-700">{itemchunk.title}</span>
                                    </a>
                                </li>
                            ))}
                        </div>
                    ))}
                </ul>
            )
            }
        </li >
    );
};

export default Menu;