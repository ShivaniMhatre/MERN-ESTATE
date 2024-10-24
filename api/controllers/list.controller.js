import List from "../models/list.model.js"
import { errorHandler } from "../utils/error.js"

export const createListing = async (req, res, next) => {
    try {
        const listing = await List.create(req.body)
        return res.status(200).json({ listing })
    } catch (err) {
        next(err)
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await List.findById(req.params.id)
    if (!listing) {
        return next(errorHandler(404, "Listing not found"))
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only delete your own listing!! '))
    }
    try {
        await List.findByIdAndDelete(req.params.id)
        res.status(200).json('Listing has been deleted!!!')
    } catch (error) {
        next(error)
    }
}

export const updateListing = async (req, res, next) => {
    const listing = await List.findById(req.params.id)
    if (!listing) {
        return next(errorHandler(404, "Listing not found"))
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only update your own listing!! '))
    }
    try {
        const updatedListing = await List.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json(updatedListing)
    } catch (error) {
        next(error)
    }
}

export const getListing = async (req, res, next) => {
    try {
        const listing = await List.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, "Listing Not Found"))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}