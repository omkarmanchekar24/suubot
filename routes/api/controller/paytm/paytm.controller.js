var checksum = require("./checksum");
const ip = require("../../../../config/keys").ip;

//Load Model
const Purchase = require("../../../../models/Purchase");

module.exports = {
  getRequest: (req, res) => {
    res.render("paytm/index");
  },
  request: (req, res) => {
    var paramlist = req.body;
    var paramarray = new Array();

    for (name in paramlist) {
      if (name === "PAYTM_MERCHANT_KEY") {
        var PAYTM_MERCHANT_KEY = paramlist[name];
      } else {
        paramarray[name] = paramlist[name];
      }
    }
    paramarray["CALLBACK_URL"] = ip + "/api/customers/paytm/response";
    checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, (err, result) => {
      if (err) throw err;
      res.render("paytm/request", { result });
    });
  },
  response: async (req, res) => {
    console.log(req.body);
    if (req.body.RESPCODE === "01") {
      const updateOrder = await Purchase.findByIdAndUpdate(
        { _id: req.body.ORDERID },
        { status: "success" },
        (err, result) => {
          if (err) {
            //add to queue services
            return;
          }
        }
      );

      res.render("paytm/response", {
        status: true,
        result: req.body,
      });
    } else {
      const update = await Purchase.findByIdAndUpdate(
        { _id: req.body.ORDERID },
        { status: "failed" },
        (err, result) => {
          if (err) {
            //add to queue services
            return;
          }
        }
      );
      res.render("paytm/response", {
        status: false,
        result: req.body,
      });
    }
  },
};
