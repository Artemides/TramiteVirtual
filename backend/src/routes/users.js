const {Router}=require("express");
const router=Router();
const {getUsers,getUser,createUser,deleteUser,updateUser}=require("../controllers/users.controller");
router.route('/')
    .get(getUsers)
    .post(createUser)
router.route("/:id")
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser)
module.exports=router;       