import React, { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { IBoardData } from '../interfaces';
import Column from './Column';
import style from '../styles/board.module.css';
import * as actions from '../redux/actions';

interface PropTypes {
  workspaceId: string;
}

function Board({ workspaceId }: PropTypes) {
  const boardData = useSelector<IBoardData, IBoardData>((state) => state);
  const dispatch: ThunkDispatch<IBoardData, any, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(actions.initialFetch(workspaceId));
  }, [workspaceId, dispatch]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, type } = result;

    if (type === 'COLUMN') dispatch(actions.moveColumns(result));

    if (type === 'CARD') {
      if (source.droppableId === destination.droppableId) {
        dispatch(actions.moveCardsSameColumn(result));
      } else {
        dispatch(actions.moveCardsBetweenColumns(result));
      }
    }
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
        {(provided) => (
          <div className={style.board} {...provided.droppableProps} ref={provided.innerRef}>
            {boardData.columnsOrder.map((columnId, index) => (
              <Column key={columnId} columnData={boardData.columns[columnId]} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
