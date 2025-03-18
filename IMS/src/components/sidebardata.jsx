import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import * as tb from "react-icons/tb";

export const SidebarData=[
    {
        title:'Home',path:'/',icon:<AiIcons.AiFillHome/>,cname:'nav-text'
    },{
        title:'Products',path:'/products',icon:<FaIcons.FaProductHunt/>,cname:'nav-text'
    },
    {
        title:'AddStock',path:'/addstock',icon:<IoIcons.IoAddSharp/>,cname:'nav-text'
    },
    {
        title:'AddSale',path:'/addsale',icon:<IoIcons.IoAddSharp/>,cname:'nav-text'
    },
    {
        title:'Reports',path:'/reports',icon:<tb.TbReportSearch />,cname:'nav-text'
    }
];