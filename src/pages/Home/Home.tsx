import Header from "../../components/Header/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/users";
import { useUsersStore } from "../../store/useUsersStore";
import "./home.css";
import UserCard from "../../components/UserCard/UserCard";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 0,
  });

  const { archived, hidden } = useUsersStore();

  if (isLoading) {
    return <Loader />;
  }

  if (error) return <p>Ошибка загрузки данных</p>;
  if (!users) return null;

  const activeUsers = users.slice(0,6).filter(
    (user: any) => !archived.includes(user.id) && !hidden.includes(user.id)
  );

  const archivedUsers = users.filter((user: any) => archived.includes(user.id));

  return (
    <div className="home-page">
      <Header />
      <main className="home__main-block">
        <h2 className="home__active-block-caption">Активные</h2>
        <section className="home__active-block">
          {activeUsers.map((user: any) => (
            <UserCard key={user.id} user={user} />
          ))}
        </section>
        <h2 className="home__archive-block-caption">Архив</h2>
        <section className="home__archive-block">
          {archivedUsers.map((user: any) => (
            <UserCard key={user.id} user={user} />
          ))}
        </section>
      </main>
    </div>
  );
};
export default Home;
