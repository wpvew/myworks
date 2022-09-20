import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ApiServer } from '../../../../../../API/ApiServer';
import { TRootState } from '../../../../../../store/storeRedux';
import { KarmaCounter } from '../KarmaCounter/KarmaCounter';

export interface IKarmaCounterContainerProps {
  id: string;
  like: boolean | null;
  rating: number;
  isUserRating?: boolean;
  classesAddition?: string;
}

export function KarmaCounterContainer({ id, rating, isUserRating, like, classesAddition }: IKarmaCounterContainerProps) {
  const token = useSelector<TRootState, string>((state) => state.token);
  const [vote, setVote] = useState(like);
  const [rate, setRate] = useState(rating);

  const voting = (voter: string) => {
    ApiServer.voting(isUserRating ? `t1_${id}` : `t3_${id}`, voter, token);
    setVote(voter === '+1' ? true : voter === '-1' ? false : null);
  };

  const handleClickUp = () => {
    // !vote ? voting('+1') : voting('0');
    if (!vote) {
      voting('+1');
      setRate(rating + 1);
    } else {
      voting('0');
      setRate(rating);
    }
  };
  const handleClickDown = () => {
    if (vote === false) {
      voting('0');
      setRate(rating);
    } else {
      voting('-1');
      setRate(rating - 1);
    }
  };

  return <KarmaCounter rating={rate} like={vote} clickUp={handleClickUp} clickDown={handleClickDown} classesAddition={classesAddition} />;
}
