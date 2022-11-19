import TourModal from "../models/tour.js";
import mongoose from "mongoose";

export const createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new TourModal({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTours = async (req, res) => {
  const { page } = req.query;
  try {
    const tours = await TourModal.find();
    res.status(200).json(tours);

    // const limit = 6;
    // const startIndex = (Number(page) - 1) * limit;
    // const total = await TourModal.countDocuments({});
    // const tours = await TourModal.find().limit(limit).skip(startIndex);
    // res.json({
    //   data: tours,
    //   currentPage: Number(page),
    //   totalTours: total,
    //   numberOfPages: Math.ceil(total / limit),
    // });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};