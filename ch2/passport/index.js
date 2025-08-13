const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  // 사용자 정보 객체를 세션에 아이디만 저장 (로그인 시)
  passport.serializeUser((user, done) => {
    console.log("serialize");
    done(null, user.id);
  });

  // 세션에 저장된 아이디를 통해 사용자 정보 객체를 조회 (로그인 후 요청마다)
  passport.deserializeUser((id, done) => {
    console.log("deserialize");
    // DB에서 사용자 정보 조회 (팔로워, 팔로잉 정보 포함)
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        },
      ],
    })
      .then((user) => {
        console.log("user", user);
        done(null, user);
      })
      .catch((err) => done(err));
  });

  local();
  kakao();
};
