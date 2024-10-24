import List from "../models/list.model.js"

export const createListing = async (req, res, next) => {
    try {
        const listing = await List.create(req.body)
        return res.status(200).json({ listing })
    } catch (err) {
        next(err)
    }
}