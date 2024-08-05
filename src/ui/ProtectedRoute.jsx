import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //show children only if the user is authenticated

  // 1. check the current user
  // const { isLoading, user, isAuthenticated } = useUser();
  const { isLoading, isAuthenticated } = useUser();

  //2. if not authenticated, redirected to /login
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) navigate("/login");
    },
    [isLoading, isAuthenticated, navigate]
  );
  //3. while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // console.log("user from useUser", user);
  //4.if authenticated, render the app (children)

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
