const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis);

class Leaderboard {
  constructor() {
    this.boardName = 'ranking';
    this.client = redis.createClient(6379, 'redis-master');

    this.client.on('error', (err) => {
      console.error(`Redis error: ${err}`);
    });
  }

  async getUserScore({ user }) {
    try {
      const score = await this.client.zscoreAsync([this.boardName, user]);

      return {
        user,
        score: parseInt(score, 10),
      };
    } catch (err) {
      throw err;
    }
  }

  async getUserRanking({ user }) {
    try {
      const ranking = await this.client.zrevrankAsync([this.boardName, user]);

      return {
        user,
        ranking: ranking !== null ? ranking + 1 : null,
      };
    } catch (err) {
      throw err;
    }
  }

  async getRanking() {
    try {
      const range = await this.client.zrevrangebyscoreAsync([
        this.boardName,
        '+inf',
        '-inf',
        'WITHSCORES',
        'LIMIT',
        0,
        10,
      ]);

      const ranking = new Array(range.length / 2)
        .fill()
        .map((_, i) => range.slice(i * 2, i * 2 + 2))
        .reduce((arr, val, i) => {
          const userRank = {
            ranking: i + 1,
            user: val[0],
            score: parseInt(val[1], 10),
          };

          arr.push(userRank);
          return arr;
        }, []);

      return ranking;
    } catch (err) {
      throw err;
    }
  }

  async setUserScore({ user, score }) {
    try {
      const userScore = await this.client.zincrbyAsync([this.boardName, score, user]);

      return {
        user,
        score: parseInt(userScore, 10),
      };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new Leaderboard();
