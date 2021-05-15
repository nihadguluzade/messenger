function setTheme(theme) {
  localStorage.setItem('theme', theme);
  document.documentElement.className = theme;
}

function getTheme() {
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') == 'theme-light') {
      setTheme('theme-light');
    } else if (localStorage.getItem('theme') == 'theme-dark') {
      setTheme('theme-dark');
    }
  } else {
    setTheme('theme-light');
  }
}

module.exports = {
  setTheme,
  getTheme
}
