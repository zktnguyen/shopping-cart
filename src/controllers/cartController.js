const cartController = {};

cartController.post = (req, res) => {
  const cart = req.body;
  req.session.cart = cart;
  req.session.save(err => {
    if (err) {
      throw err;
    }
    res.json({
      success: true,
      data: req.session.cart
    });
  });
};

cartController.get = (req, res) => {
  if (typeof req.session.cart !== 'undefined') {
    return res.status(200).json({
      success: true,
      data: req.session.cart
    });
  }
  return res.status(500).json({
    success: false
  });
};

export default cartController;
