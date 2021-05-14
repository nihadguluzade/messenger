import React, {useEffect, useState} from "react";
import {setTheme} from '../utils/themes';
import {Switch} from "antd";
import { AlertOutlined, BulbOutlined } from '@ant-design/icons';

function ThemeToggler() {
  const [toggle, setToggle] = useState('light');
  let theme = localStorage.getItem('theme');

  const handleOnClick = () => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
      setToggle('light')
    } else {
      setTheme('theme-dark');
      setToggle('dark')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-light') {
      setToggle('light')
    } else if (localStorage.getItem('theme') === 'theme-dark') {
      setToggle('dark')
    }
  }, [theme])

  return (
    <div className="toggle-container">
      <Switch
        checkedChildren={<BulbOutlined />}
        unCheckedChildren={<AlertOutlined />}
        checked={toggle == "light" ? false : true}
        onClick={handleOnClick}
      />
    </div>
  )
}

export default ThemeToggler;
