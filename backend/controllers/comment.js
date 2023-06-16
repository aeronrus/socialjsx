import jwt from 'jsonwebtoken';
import { db } from '../connect.js';

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
  WHERE c.postId = ? ORDER BY c.createdAt DESC`;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token)
    return res
      .status(401)
      .json('Комментарии могут оставлять только зарегистрированные пользователи');

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    const q = 'INSERT INTO comments(`desc`, `createdAt`, `userId`, `postId`) VALUES (?)';
    const values = [
      req.body.desc,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      userInfo.id,
      req.body.postId,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Ваш комментарий успешно создан');
    });
  });
};

export const deleteToken = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json('You are not logined for delete this comment');
  }
  jwt.verify(token, 'secretkey', (err, data) => {});
};
