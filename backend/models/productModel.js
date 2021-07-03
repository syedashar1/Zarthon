import mongoose from 'mongoose'


const productSchema = new mongoose.Schema(
  {
    title: { type: String  },
    seller: { type: mongoose.Schema.Types.ObjectId } , 
    sellerName : { type : String } ,
    image1: { type: String , required : true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    availableSizes : [String] ,
    reviews : [ String ],

  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model('Product', productSchema);
export default Product;
