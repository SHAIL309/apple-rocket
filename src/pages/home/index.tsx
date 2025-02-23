import { useAppSelector } from "src/store/hooks";
import { Home } from "../../modules/home";
import { AuthForm } from "src/components/AuthForm";

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
