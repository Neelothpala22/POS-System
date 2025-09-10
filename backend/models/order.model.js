// OrderModel.js (CommonJS)
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const OrderStatus = require('../constants/orderStatus');
const FoodModel = require('./food.model');

const LatLngSchema = new Schema(
    {
        lat: { type: String, required: true },
        lng: { type: String, required: true },
    },
    {
        _id: false,
    }
);

const OrderItemSchema = new Schema(
    {
        food: { type: FoodModel.schema, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    },
    {
        _id: false,
    }
);

OrderItemSchema.pre('validate', function (next) {
    this.price = this.food.price * this.quantity;
    next();
});

const orderSchema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        addressLatLng: { type: LatLngSchema, required: true },
        paymentId: { type: String },
        totalPrice: { type: Number, required: true },
        items: { type: [OrderItemSchema], required: true },
        status: { type: String, default: OrderStatus.NEW },
        user: { type: Schema.Types.ObjectId, required: true },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

const OrderModel = model('order', orderSchema);

module.exports = OrderModel;