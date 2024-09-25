import React from 'react';
import Slider from 'react-slick';
import TodoElement from '~/components/TodoElement/TodoElement';
import { sliderContainer } from '~/components/TodoList/TodoList.styles';
import { ITodo } from '~/shared/services/types';

interface TabletTodoListProps {
  todos: ITodo[];
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
}

const TabletTodoList: React.FC<TabletTodoListProps> = ({ todos, total, page, limit, setPage }) => {
  const tabletSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    swipeToSlide: true,
    swipe: true,
    draggable: true,
    accessibility: false,
    afterChange: (currentSlide: number) => {
      if (currentSlide === todos.length - 1 && todos.length < total) {
        setPage(page + 1);
      }
    },
  };

  return (
    <Slider {...tabletSettings} className={sliderContainer}>
      {todos.map((todo) => (
        <TodoElement key={todo.id} todo={todo} />
      ))}
    </Slider>
  );
};

export default TabletTodoList;
