const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/chatGroup.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const {
  createChatGroup,
  deleteChatGroup,
  updateChatGroup,listChatGroup
} = require("../../validations/chatGroup.validation");
const router = express.Router();
/** * Load chatGroup when API with chatGroupId route parameter is hit */ router.param(
  "chatGroupId",
  controller.load
);

router
  .route("/")
  // lấy dang nhóm chat
  .get(authorize(LOGGED_USER), validate(listChatGroup), controller.list)
  // tạo nhóm chat
  .post(authorize(LOGGED_USER), validate(createChatGroup), controller.create)
  // xóa nhóm chat
  .delete(authorize(LOGGED_USER), validate(deleteChatGroup), controller.remove)
  // Cập nhật nhóm chat
  .patch(authorize(LOGGED_USER), validate(updateChatGroup), controller.update);

router
  .route("/:chatGroupId")
  // lấy thông tin nhóm chat 
  .get(authorize(LOGGED_USER), controller.get)
 

module.exports = router;
