import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Posts from '../../components/posts/Posts';
import './profile.scss';
import { addRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import React, { useContext } from 'react';

const Profile: React.FC = () => {
  const userId = parseInt(useLocation().pathname.slice(9));
  const currentUser = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(['data'], () =>
    addRequest.get(`/users/${userId}`).then((res) => {
      return res.data;
    }),
  );

  const {
    data: getFriendsData,
    isLoading: getFriendsLoading,
    isError: getFriendsError,
  } = useQuery(['friends'], () =>
    addRequest.get('/friends?followedUserId=' + userId).then((res) => {
      return res.data;
    }),
  );

  const mutation = useMutation(
    (friended: boolean) => {
      if (friended) return addRequest.delete('/friends?userId=' + userId);
      return addRequest.post('/friends', { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['friends']);
      },
    },
  );

  const handleAddFriend = () => {
    mutation.mutate(getFriendsData.includes(currentUser.id));
    console.log(getFriendsData.includes(currentUser.id));
  };

  return isError ? (
    <h1>Возникла ошибка</h1>
  ) : isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="profile">
      <div className="images">
        <img src={data?.coverPic} alt="Заставка" className="cover" />
        <img src={data?.profilePic} alt="ава" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <h3>{data?.name}</h3>

          <div className="top">
            <div className="left">
              <div className="item">Date of birthday:</div>
              <div className="item">He(her) Town:</div>
              <div className="item">I prepear this books:</div>
            </div>
            <div className="right">
              <div className="item">12 october 1999</div>
              <div className="item">Vologda</div>
              <div className="item">12 Oushan`s friends</div>
            </div>
          </div>
          {userId !== currentUser.currentUser.id ? (
            getFriendsLoading ? (
              <h3>Loading...</h3>
            ) : getFriendsData ? (
              <div className="buttons">
                <button className="add-button" onClick={handleAddFriend}>
                  {getFriendsData.includes(currentUser.id) ? 'You are friends' : 'Add to friend'}
                </button>
                <button className="delete-button">Don't look</button>
              </div>
            ) : (
              ''
            )
          ) : (
            'it is your account'
          )}
        </div>
      </div>
      <Posts />
    </div>
  );
};

export default Profile;
