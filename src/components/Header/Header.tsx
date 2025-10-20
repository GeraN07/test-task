import "./header.css";

const Header = () => {
  return (
    <header className="page-header">
      <div className="page-header__block">
        <div className="page-header__logo-block">
          <a className="page-header__logo" href="/">
            <img src="../atwork-logo.svg" />
          </a>
        </div>
        <div className="page-header__user-block">
          <a className="favorites" href="">
            <img className="favorites-icon" src="../favorites.svg" />
          </a>

          <a className="notification" href="">
            <img className="notification-icon" src="../notification.svg" />
          </a>
          <span className="user-data">
            <img className="user-icon" src="https://i.pravatar.cc/20" />
          </span>
          <span className="user-name">Ivan1234</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
