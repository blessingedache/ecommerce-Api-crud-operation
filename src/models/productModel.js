import express from "express";

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true},
);
export default mongoose.model("product", productSchema);
