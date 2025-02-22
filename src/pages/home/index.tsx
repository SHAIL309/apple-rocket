import { useAppSelector } from "src/store/hooks";
import { Home } from "../../modules/home";
import { AuthForm } from "src/components/authForm";

const HomePage = () => {
  const { authAction } = useAppSelector((state) => state.auth);

  return (
    <>
      <Home />
      <>{!!authAction && <AuthForm />}</>
    </>
  );
};

export default HomePage;
