import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../schemas/userSchema";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/Header/Header";
import type { UserFormData } from "../../schemas/userSchema";
import Popup from "../../components/Popup/Popup";
import "./edit-user.css";

const fetchUserById = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error("Ошибка загрузки пользователя");
  return res.json();
};

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id!),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });


  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        phone: user.phone.replace(/\D/g, ""),
        company: user.company.name,
      });
    }
  }, [user, reset]);

  const onSubmit = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки</p>;

  return (
    <div className="edit-page">
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>Изменения сохранены!</Popup>
      )}
      <Header />

      <main className="edit-page__main-block">
        <button className="edit-page__back-btn" onClick={() => navigate(-1)}>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="arrow-line"
              d="M13.125 10.5H0.875"
              stroke="#595959"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 16.625L0.875 10.5L7 4.375"
              stroke="#595959"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
          Назад
        </button>

        <div className="edit-page__profile-data-block-wrapper">
          <div className="edit-page__profile-data-block">
            <img
              src="https://i.pravatar.cc/500"
              className="edit-page__profile-data-img"
            />
            <div className="edit-page__profile-data-category-block">
              <p className="edit-page__profile-data-category active">
                Данные профиля
              </p>
              <p className="edit-page__profile-data-category">
                Рабочее пространство
              </p>
              <p className="edit-page__profile-data-category">Приватность</p>
              <p className="edit-page__profile-data-category">Безопасность</p>
            </div>
          </div>
          <div className="edit-page__edit-form-block">
            <h2 className="edit-form__caption">Данные профиля</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="edit-page__edit-form"
            >
              <label className="edit-form__label">
                Имя
                <div className="edit-form__input-wrapper">
                  <input className="edit-form__input" {...register("name")} />
                  {watch("name") && (
                    <button
                      type="button"
                      className="edit-form__clear-btn"
                      onClick={() => setValue("name", "")}
                    >
                      <img
                        className="popup-block__close-button-icon"
                        src="../close-icon.svg"
                      />
                    </button>
                  )}
                </div>
                {errors.name && <span>{errors.name.message}</span>}
              </label>
           
              <label className="edit-form__label">
                Никнейм
                <div className="edit-form__input-wrapper">
                  <input
                    className="edit-form__input"
                    {...register("username")}
                  />
                  {watch("username") && (
                    <button
                      type="button"
                      className="edit-form__clear-btn"
                      onClick={() => setValue("username", "")}
                    >
                      <img
                        className="popup-block__close-button-icon"
                        src="../close-icon.svg"
                      />
                    </button>
                  )}
                </div>
                {errors.username && <span>{errors.username.message}</span>}
              </label>

              <label className="edit-form__label">
                Почта
                <div className="edit-form__input-wrapper">
                  <input className="edit-form__input" {...register("email")} />
                  {watch("email") && (
                    <button
                      type="button"
                      className="edit-form__clear-btn"
                      onClick={() => setValue("email", "")}
                    >
                      <img
                        className="popup-block__close-button-icon"
                        src="../close-icon.svg"
                      />
                    </button>
                  )}
                </div>
                {errors.email && <span>{errors.email.message}</span>}
              </label>
              <label className="edit-form__label">
                Город
                <div className="edit-form__input-wrapper">
                  <input className="edit-form__input" {...register("city")} />
                  {watch("city") && (
                    <button
                      type="button"
                      className="edit-form__clear-btn"
                      onClick={() => setValue("city", "")}
                    >
                      <img
                        className="popup-block__close-button-icon"
                        src="../close-icon.svg"
                      />
                    </button>
                  )}
                </div>
                {errors.city && <span>{errors.city.message}</span>}
              </label>

          

              <label className="edit-form__label">
                Телефон
                <div className="edit-form__input-wrapper">
                  <input className="edit-form__input" {...register("phone")} />
                  {watch("phone") && (
                    <button
                      type="button"
                      className="edit-form__clear-btn"
                      onClick={() => setValue("phone", "")}
                    >
                      <img
                        className="popup-block__close-button-icon"
                        src="../close-icon.svg"
                      />
                    </button>
                  )}
                </div>
                {errors.phone && <span>{errors.phone.message}</span>}
              </label>
            

              <label className="edit-form__label">
                Компания
                <div className="edit-form__input-wrapper">
                  <input
                    className="edit-form__input"
                    {...register("company")}
                  />
                  {watch("company") && (
                    <button
                      type="button"
                      className="edit-form__clear-btn"
                      onClick={() => setValue("company", "")}
                    >
                      <img
                        className="popup-block__close-button-icon"
                        src="../close-icon.svg"
                      />
                    </button>
                  )}
                </div>
                {errors.company && <span>{errors.company.message}</span>}
              </label>

            

              <button className="edit-form__submit-button" type="submit">
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditUser;
