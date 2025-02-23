import { useAppSelector } from "src/store/hooks";
import { Home } from "../../modules/home";
import { UserAuthForm } from "src/components/UserAuthForm";

const HomePage = () => {
  const { authAction } = useAppSelector((state) => state.auth);

  return (
    <>
      <Home />
      <>{!!authAction && <UserAuthForm />}</>
    </>
  );
};

export default HomePage;
