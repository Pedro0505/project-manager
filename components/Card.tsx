import axios from 'axios';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { TiInfoOutline } from 'react-icons/ti';
import { getToken } from '../helpers';
import { ICard } from '../interfaces';

interface ICardComponent {
  content: string;
  cardId: number;
  setCardList: React.Dispatch<React.SetStateAction<ICard[]>>
  cardList: ICard[]
}

function Card({ content, cardId, setCardList, cardList }: ICardComponent) {
  const [confirmDelete, setConfirmDelete] = useState(true);

  const deleteCard = async () => {
    if (!confirmDelete) {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/card/${cardId}`;

      await axios.delete(endpoint, { headers: { Authorization: getToken() as string } });

      const filtered = cardList.filter(({ id }) => cardId !== id);

      setCardList(filtered);
    }

    setConfirmDelete(false);
    setTimeout(() => setConfirmDelete(true), 5000);
  };

  return (
    <>
      <div>{content}</div>
      <button
        type="button"
        onClick={ deleteCard }
      >
        { confirmDelete ? <FaTrash /> : <TiInfoOutline title="Ao clicar você estará excluindo permanentemente esse card" /> }
      </button>
    </>
  );
}

export default Card;