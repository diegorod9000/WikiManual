/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Device = require("./models/device");
const Question = require("./models/question");
const Edit = require("./models/edit");
const Answer = require("./models/answer");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const edit = require("./models/edit");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

//GET FULL USER OR DEVICE
router.get("/users", (req, res) => {
  User.findById(req.query.userId).then((user) => res.send(user));
});

router.get("/devices", (req, res) => {
  Device.findById(req.query.deviceId)
    .then((device) => res.send(device))
    .catch((error) => console.log(error));
});
router.post("/devices", (req, res) => {
  const newDevice = new Device({
    name: req.query.device ? req.body.device : "",
  });

  newDevice.save().then((comment) => res.send(comment));
});

//EDITS
router.get("/edits", (req, res) => {
  const getAllEdits = async (ids) => {
    if (ids == "") return [];
    let output = [];
    for (let i = 0; i < ids.length; i++) {
      const res = await Edit.findById(ids[i]);
      output.push(res);
    }
    return output;
  };
  getAllEdits(req.query.ids.split(",")).then((output) => res.send(output));
});
router.post("/edits", (req, res) => {
  const user = User.findById(req.query.userId);
  const device = Device.findById(req.query.deviceId);
  const newEdit = new Edit({
    userId: req.query.userId,
    userName: req.query.userName,
    deviceId: req.query.deviceId,
    content: req.query.content,
  });
  edit.save().then((edit) => {
    const userUpdate = { edits: [edit._id, ...user.edits] };
    const deviceUpdate = { edits: [edit._id, ...device.edits] };
    User.findByIdAndUpdate(req.query.userId, userUpdate);
    Device.findByIdAndUpdate(req.query.deviceId, deviceUpdate);
    res.send(edit);
  });
});
router.delete("/edits", (req, res) => {
  const edit = Edit.findById(req.query.editId);
  const userId = edit.userId;
  const deviceId = edit.deviceId;

  const user = User.findById(userId);
  const device = Device.findById(deviceId);
  const userUpdate = {
    edits: user.questions.filter(function (ele) {
      return ele != req.query.questionId;
    }),
  };
  const deviceUpdate = {
    edits: device.questions.filter(function (ele) {
      return ele != req.query.editId;
    }),
  };
  User.findByIdAndUpdate(userId, userUpdate);
  Device.findByIdAndUpdate(deviceId, deviceUpdate);
  Question.findByIdAndDelete(req.query.editId).then((message) => res.send(message));
});

//QUESTIONS
router.get("/questions", (req, res) => {
  const getAllQuestions = async (ids) => {
    if (ids == "") return [];
    let output = [];
    for (let i = 0; i < ids.length; i++) {
      const res = await Question.findById(ids[i]);
      output.push(res);
    }
    return output;
  };
  getAllQuestions(req.query.ids.split(",")).then((output) => res.send(output));
});

router.post("/questions", (req, res) => {
  const doLiterallyEverything = async () => {
    // console.log(req.body);
    const user = await User.findById(req.body.userId);
    const device = await Device.findById(req.body.deviceId);
    // console.log(user);
    const newQuestion = new Question({
      userId: req.body.userId,
      userName: user.name,
      deviceId: req.body.deviceId,
      content: req.body.content,
    });
    newQuestion.save().then((question) => {
      const userUpdate = { questions: [question._id, ...user.questions] };
      const deviceUpdate = { questions: [question._id, ...device.questions] };
      User.updateOne({ _id: req.body.userId }, userUpdate).then((message) => console.log(message));
      Device.updateOne({ _id: req.body.deviceId }, deviceUpdate).then((message) =>
        console.log(message)
      );
      res.send(question);
    });
  };
  doLiterallyEverything();
});

router.delete("/questions", (req, res) => {
  const question = Question.findById(req.query.questionId);
  const userId = question.userId;
  const deviceId = question.deviceId;

  const user = User.findById(userId);
  const device = Device.findById(deviceId);
  const userUpdate = {
    questions: user.questions.filter(function (ele) {
      return ele != req.query.questionId;
    }),
  };
  const deviceUpdate = {
    questions: device.questions.filter(function (ele) {
      return ele != req.query.questionId;
    }),
  };
  User.findByIdAndUpdate(userId, userUpdate);
  Device.findByIdAndUpdate(deviceId, deviceUpdate);
  Question.findByIdAndDelete(req.query.questionId).then((message) => res.send(message));
});

//ANSWERS
router.get("/answers", (req, res) => {
  const getAllAnswers = async (ids) => {
    if (ids == "") return [];
    let output = [];
    for (let i = 0; i < ids.length; i++) {
      const res = await Answer.findById(ids[i]);
      output.push(res);
    }
    return output;
  };
  getAllAnswers(req.query.ids.split(",")).then((output) => res.send(output));
});

router.post("/answers", (req, res) => {
  const doLiterallyEverything = async () => {
    const user = await User.findById(req.body.userId);
    const question = await Question.findById(req.body.questionId);
    const newAnswer = new Answer({
      userId: req.body.userId,
      userName: user.name,
      questionId: req.body.questionId,
      content: req.body.content,
    });
    newAnswer.save().then((answer) => {
      const userUpdate = { answers: [answer._id, ...user.answers] };
      const questionUpdate = { answers: [answer._id, ...question.answers] };
      User.findByIdAndUpdate(req.body.userId, userUpdate).then(message=> console.log(message));
      Question.findByIdAndUpdate(req.body.questionId, questionUpdate).then(message=> console.log(message));
      res.send(answer);
    });
  };
  doLiterallyEverything();
});
router.delete("/answers", (req, res) => {
  const answer = Answer.findById(req.query.answerId);
  const userId = answer.userId;
  const questionId = answer.answerId;

  const user = User.findById(userId);
  const question = Device.findById(questionId);
  const userUpdate = {
    answers: user.answers.filter(function (ele) {
      return ele != req.query.answerId;
    }),
  };
  const questionUpdate = {
    answers: question.answers.filter(function (ele) {
      return ele != req.query.answerId;
    }),
  };
  User.findByIdAndUpdate(userId, userUpdate);
  Question.findByIdAndUpdate(questionId, questionUpdate);
  Question.findByIdAndDelete(req.query.answerId).then((message) => res.send(message));
});

//LIKES
router.post("/likes", (req, res) => {});
router.delete("/likes", (req, res) => {});

//DISLIKES
router.post("/dislikes", (req, res) => {});
router.delete("/dislikes", (req, res) => {});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
