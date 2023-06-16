import AddPost from '../../components/addPost/Addpost';
import Posts from '../../components/posts/Posts';
import './home.scss';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home">
      <AddPost />
      <Posts />
    </div>
  );
};

export default Home;
