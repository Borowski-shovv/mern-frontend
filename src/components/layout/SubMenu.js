import React, {useState} from 'react'
import { Link } from 'react-router-dom';

function SubMenu({ item }) {
const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            <Link className="sidebarLink" to={item.path} onClick={item.subNav && showSubnav}>
                <div>
                    {item.icon}
                    <span className="sidebarLabel">{item.title}</span>
                </div>
                <div>
                    {item.subNav && subnav ? item.iconOpened : item.subNav
                        ? item.iconClosed
                        : null}
                </div>
            </Link>
            {subnav && item.subNav.map((item, index) => {
          return (
            <Link className="dropdownLink" to={item.path} key={index}>
              {item.icon}
              <span className="sidebarLabel">{item.title}</span>
            </Link>
          );
            })}
        </>
    )
}

export default SubMenu