'use strict'

import mongoose from "mongoose";

export
const dbConnection = () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB │ connected to MongoDB');
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB │ try connection');
        });
        mongoose.connection.on('connected', () => {
            console.log('MongoDB │ try connection');
        });
        mongoose.connection.on('open', () => {
            console.log('MongoDB │ connected to database');
        });
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB │ reconnected to MongoDB');
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB │ disconnected');
        });
        mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        });
    } catch (error) {
        console.log('Database connection failed', error)
    }
}