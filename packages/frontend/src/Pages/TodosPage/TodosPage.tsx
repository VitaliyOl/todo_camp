import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import TodoContainer from '~/components/TodoContainer/TodoContainer';
import Button from '~shared/components/Button/Button';
import http from '~/shared/services/http';
import { todosPageStyles, buttonContainerStyles } from './TodosPage.styles';

const TodosPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await http.logout();      
      navigate(ROUTER_KEYS.LOGIN);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  }, [navigate]);

  const goToChangeEditProfile = useCallback(() => {
    navigate(ROUTER_KEYS.EDIT_PROFILE);
  }, [navigate]);

  return (
    <div className={todosPageStyles}>
      <h1>Dashboard</h1>
      <div className={buttonContainerStyles}>
        <Button onClick={handleLogout} variant="primary">
          Logout
        </Button>
        <Button onClick={goToChangeEditProfile} variant="primary">
          Edit Profile
        </Button>
      </div>
      <TodoContainer />
    </div>
  );
};

export default TodosPage;