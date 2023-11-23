const {Product, Category} = require("../models")
const {User, Profile} = require("../models")
class CustomerController {
    static async getProduct(req, res){
        try {
            const category = req.query.sortCategory;
            const { nameProduct } = req.query;
            if (category) {
              const product = await Product.findAll({
                include: {
                  model: Category,
                  where: { name: category },
                },
                order: [["id", "ASC"]],
              });
      
              res.render("product-list", { product, nameProduct });
            } else {
              const product = await Product.findAll({
                include: Category,
                order: [["id", "ASC"]],
              });
      
              res.render("product-list", { product, nameProduct });
            }
          } catch (error) {
            console.log(error);
            res.send(error);
          }
    }
    static async findUser(req, res){
        try {
        //   console.log(req.session.user)
          const user = await User.findOne({
            where : {
              id : req.session.user.id
            },
            include : Profile
          })
          console.log(user)
          res.render("user", {user})
        } catch (error) {
          res.send(error)
        }
      }
}
module.exports = CustomerController