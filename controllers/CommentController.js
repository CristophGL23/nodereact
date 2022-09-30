import CommentModal from "../models/CommentModel";

export const getComments = async (req, res) => {
    try {
        const comments = CommentModal.findAll();
        res.json(comments);
    } catch (error) {
        res.json(error);
    }
}