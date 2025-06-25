const Movie = require("../models/Movie");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  index(req, res, next) {
    Movie.find({})
      .then((movies) => {
        res.json(movies);
      })
      .catch(next);
  }

  async search(req, res, next) {
    try {
      const keyword = req.query.keyword?.trim();
      const limit = parseInt(req.query.limit) || 10;

      if (!keyword) {
        return res.status(400).json({ error: "Missing keyword" });
      }

      const regexStartsWith = new RegExp("^" + keyword, "i");
      const regexContains = new RegExp(keyword, "i");

      // 1. Ưu tiên kết quả bắt đầu bằng keyword
      let results = await Movie.find({
        title: { $regex: regexStartsWith },
      }).limit(limit);

      if (results.length < limit) {
        // 2. Fallback: tìm thêm kết quả chứa keyword (bất kỳ vị trí nào)
        const remaining = limit - results.length;

        const additionalResults = await Movie.find({
          title: { $regex: regexContains },
          _id: { $nin: results.map((m) => m._id) },
        }).limit(remaining);

        results = results.concat(additionalResults);
      }

      res.json(results);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SiteController();
