const Product = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    // We need to check if the product already Exists
    console.log("req.body ===>", req.body);
    const { userId } = req.body;
    const product = await Product.findOne({ name: req.body.name });

    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }

    await Product.create({ ...req.body, createdBy: userId, updatedBy: userId });

    return res.status(200).json({ message: "Product created successfully" });
  } catch (e) {
    return res.status(500).json({ err });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
      quantity: { $gt: 0 }
    })
      .populate("createdBy", "firstname email")
      .populate("updatedBy", "firstname email");

    if (!products.length) {
      return res.status(400).json({ message: "No Products Found" });
    }

    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.getProductById = async (req, res) => {
  try {
    // We will get the Id from params
    const { id } = req.params;

    // We will find product associated with id
    const product = await Product.findById(id)
      .populate("createdBy", "firstname email")
      .populate("updatedBy", "firstname email");

    if (!product) {
      return res.status(400).json({ message: "No product found" });
    }

    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    // We will get the Id from params
    const { id } = req.params;

    // We will delete product associated with id
    const product = await Product.findByIdAndDelete(id);
    console.log(product);

    if (!product) {
      return res.status(400).json({ message: "No product found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    // We will get the Id from params
    const { id } = req.params;

    // We will delete product associated with id
    const product = await Product.findByIdAndUpdate(id, {
      $set: {
        ...req.body,
        updatedBy: req.body.userId
      }
    });

    if (!product) {
      return res.status(400).json({ message: "No product found" });
    }

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};


exports.deactivateProduct = async (req,res) => {
  try {
    // We will get the Id from params
    const { id } = req.params;

    // Check if the product is already inactive and  if it is inactive return a message 
    // that already deactivated

    // We will deactivate product associated with id
    const product = await Product.findByIdAndUpdate(id, {
      $set: {
        isActive: false,
        updatedBy: req.body.userId
      }
    });

    if (!product) {
      return res.status(400).json({ message: "No product found" });
    }

    return res.status(200).json({ message: "Product deactivated successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
}


exports.updateQuantity = async (req, res) => {
  try {
    // We will get the Id from params
    const { id } = req.params;

    // Check if the product is already inactive and  if it is inactive return a message 
    // that already deactivated

    // We will deactivate product associated with id
    const product = await Product.findByIdAndUpdate(id, {
      $inc : {
        quantity: -req.body.productCount
      },
      $set: {
        updatedBy: req.body.userId
      }
    });

    if (!product) {
      return res.status(400).json({ message: "No product found" });
    }

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
}