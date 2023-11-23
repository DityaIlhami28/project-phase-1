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
    static async addToCart(req, res){
        try {
            const {productId} = req.params
            const {user} = req.session

            const profile = await Profile.findOne({
                where : {UserId : user.id}
            })
            const product = await Product.findByPk(productId)
            await profile.addProduct(product)
            res.redirect("/transaction")
        } catch (error) {
          res.send(error)
        }
      }
    static async displayCart(req,res){
        try {
            const {user} = req.session
            const profile = await Profile.findOne({
                where : {UserId : user.id},
                include : {
                    model : Product,
                    through : Transaction
                }
            })
            res.render("cart", {profile})
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = CustomerController