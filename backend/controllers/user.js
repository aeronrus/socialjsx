import { db } from '../connect.js';
import moment from 'moment/moment.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('You are not logined to watch a profile page!');

  const userId = req.params.userId;
  const q = 'SELECT * FROM users WHERE id = ? ';
  db.query(q, [userId], (err, data) => {
    const { password, ...info } = data[0];

    return res.status(200).json(info);
  });
};
