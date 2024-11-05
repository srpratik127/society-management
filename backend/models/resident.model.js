const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["owner", "tenant"],
      require: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    wing: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKc08Wq1A-TIERnJUrHsmF9Asnmz5f_EnD5Mr8kQsJNZCdHjg_medKyoo&s",
    },
    aadharCardFront: {
      type: String,
      required: true,
    },
    aadharCardBack: {
      type: String,
      required: true,
    },
    addressProof: {
      type: String,
      required: true,
    },
    rentAgreement: {
      type: String,
      required: true,
    },
    residenceStatus: {
      type: String,
      enum: ["Occupied", "Vacate"],
      required: true,
    },
    members: [
      {
        fullName: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        age: {
          type: Number,
          required: true,
        },
        gender: {
          type: String,
          required: true,
        },
        relation: {
          type: String,
          required: true,
        },
      },
    ],

    vehicles: [
      {
        vehicleType: {
          type: String,
          enum: ["Two Wheeler", "Four Wheeler"],
          required: true,
        },
        vehicleName: {
          type: String,
          required: true,
        },
        vehicleNumber: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Resident = mongoose.model("Resident", residentSchema);
module.exports = Resident;
