const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  address: {
    street: {
      type: String,
    },
    town: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  geoLocation: {
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
  },
  seller: [
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      username: {
        type: String,
      },
      mobile: {
        type: String,
      },
      categories: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: "productcategories",
          },
          category: {
            type: String,
          },
        },
        { _id: false },
      ],
      gst: {
        type: Number,
      },
      pan: {
        type: String,
      },
      paytm: {
        type: String,
      },
      phonepay: {
        type: String,
      },
      aboutUs: {
        type: String,
      },
      areaOfDelivery: {
        type: String,
      },
      minOrderValue: {
        type: Number,
      },
      address: {
        street: {
          type: String,
        },
        town: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        pincode: {
          type: String,
        },
        country: {
          type: String,
        },
      },
      geoLocation: {
        latitude: {
          type: String,
        },
        longitude: {
          type: String,
        },
      },
    },
  ],
  professional: [
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      username: {
        type: String,
      },
      mobile: {
        type: String,
      },
      gst: {
        type: Number,
      },
      pan: {
        type: String,
      },
      paytm: {
        type: String,
      },
      phonepay: {
        type: String,
      },
      aboutUs: {
        type: String,
      },
      address: {
        street: {
          type: String,
        },
        town: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        pincode: {
          type: String,
        },
        country: {
          type: String,
        },
      },
      geoLocation: {
        latitude: {
          type: String,
        },
        longitude: {
          type: String,
        },
      },
    },
  ],
  admin: {
    type: Schema.Types.ObjectId,
    ref: "roles",
  },
  roles: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "roles",
      },
      name: {
        type: String,
      },
    },
    { _id: false },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model("users", UserSchema);
