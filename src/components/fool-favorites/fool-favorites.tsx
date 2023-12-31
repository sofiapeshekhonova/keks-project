import { Link, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, Status } from '../../constants';
import CatalogItem from '../catalog-item/catalog-item';
import { getFavoritesProducts, getFavoritesStatus } from '../../store/products/selectors';
import { deleteFavoriteProductsAction } from '../../store/api-actions';
import './fool-favorites.css';

function FoolFavorites() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favProducts = useAppSelector(getFavoritesProducts);
  const favProductsStatus = useAppSelector(getFavoritesStatus);

  const sum = favProducts.reduce((a, b) => a + b.price, 0);
  const favProductsId = favProducts.map((i) => i.id);

  function handleDeleteAllClick() {
    favProductsId.forEach((element) => {
      const data = { productId: element };
      dispatch(deleteFavoriteProductsAction(data));
    });
  }

  return (
    <main>
      {favProductsStatus === Status.Loading ? <LoadingScreen /> :
        <div className="favorites-page">
          <h1 className="visually-hidden">Избранное</h1>
          <div className="back-link">
            <div className="container">
              <a onClick={() => navigate(-1)} className="back-link__link links">Назад
                <svg className="back-link__icon" width="30" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-left"></use>
                </svg>
              </a>
            </div>
          </div>
          <section className="number-of-favourites favorites-page__qty">
            <div className="container">
              <h2 className="visually-hidden">Количество товаров в избранном.</h2>
              <p className="number-of-favourites__cakes">{favProducts.length} кекса</p>
              <div className="number-of-favourites__wrapper">
                <div className="number-of-favourites__wrap-price">
                  <p className="number-of-favourites__text">Всего</p>
                  <p className="number-of-favourites__price">{sum.toLocaleString('ru')} р</p>
                </div>
              </div>
              <div className="number-of-favourites__button">
                <Link to={AppRoute.Catalog} className="btn">В каталог</Link>
              </div>
            </div>
          </section>
          <section className="favourites">
            <div className="container">
              <h2 className="visually-hidden">Избранные товары</h2>
              <div className="favourites__button">
                <button className="btn btn--second" type="button" onClick={handleDeleteAllClick}>Очистить</button>
              </div>
            </div>
            <section className="catalog">
              <div className="container">
                <h2 className="visually-hidden">Каталог</h2>
                <div className="catalog__wrapper">
                  <ul className="catalog__list">
                    {favProducts.map((product) => (
                      <CatalogItem key={product.id} product={product} />
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </section>
        </div>}
    </main>
  );
}

export default FoolFavorites;
