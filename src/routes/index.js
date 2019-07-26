const express = require('express');

const router = express.Router();

const Leaderboard = require('../Leaderboard');

router.get('/', (req, res) => {
  res.json({ status: 'TUDO OK!' });
});

/**
 * User score
 */
router.get('/user/:user', async (req, res, next) => {
  try {
    const user = await Leaderboard.getUserScore({ user: req.params.user });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/user/:user', async (req, res, next) => {
  try {
    const user = await Leaderboard.setUserScore({ user: req.params.user, score: req.body.score });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

/**
 * User ranking
 */
router.get('/user/:user/ranking', async (req, res, next) => {
  try {
    const user = await Leaderboard.getUserRanking({ user: req.params.user });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

/**
 * Leaderboard ranking
 */
router.get('/leaderboard/ranking', async (req, res, next) => {
  try {
    const user = await Leaderboard.getRanking();

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
