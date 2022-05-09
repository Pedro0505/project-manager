import axios from 'axios';
import { ICard } from '../interfaces';
import { getToken } from '../helpers/token';

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/card`;

export const moveCardsBetweenColumn = async (newCardsOrder: ICard[]) => {
  // só vai ser mandado um array de id
  const dataToFetch = newCardsOrder.map(({ id, columnId }) => ({ id, columnId }));
  const result = await axios.patch(ENDPOINT, dataToFetch, {
    headers: { Authorization: getToken() as string },
  });

  console.log('move between column');
  console.log(result.data.data);
};
