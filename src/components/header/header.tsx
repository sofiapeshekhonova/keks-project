import { Link } from 'react-router-dom';
import HeaderAuth from './header-auth';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { getAuthorizationStatus, getUserInformations } from '../../store/user/selectors';

function Header() {
  const user = useAppSelector(getUserInformations);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return (
    <header className={`${user ? 'header header--authorized' : 'header'}`}>
      <div className="container">
        <div className="header__inner">
          <Link to={AppRoute.Index} className="header__logo" aria-label="Переход на главную">
            <img src="img/svg/logo.svg" width="170" height="69" alt="Кондитерская кекс" />
          </Link>
          {authorizationStatus === AuthorizationStatus.Auth ?
            <HeaderAuth user={user} />
            :
            <div className="header__buttons">
              <div className="header__btn">
                <Link to={AppRoute.SignUp} className="btn btn--third header__link header__link--reg" >Регистрация</Link>
              </div>
              <div className="header__btn">
                <Link to={AppRoute.logIn} className="btn" >Войти</Link>
              </div>
            </div>}
        </div>
      </div>
    </header>
  );
}
export default Header;
