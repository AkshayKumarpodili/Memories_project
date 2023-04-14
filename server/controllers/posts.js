import PostMessage from '../Schemas/postMessage.js';
import mongoose from 'mongoose';


export const getPosts = async(req,res) => {

    const {page} = req.query;
    console.log("page = ",page);
   
    try {

        //limiting no. of posts per page to 6
        const LIMIT = 8;
        
        //startIndex of each Page
        const startIndex = (Number(page) - 1) * LIMIT;
        
        //count of total documents
        const total = await  PostMessage.countDocuments({});

        //fetching posts
        //(id:-1) because to keep the latest post first.
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
                
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const getPostsBySearch = async(req,res) => {
    const {searchQuery, tags} = req.query;
    
   
    try {

        //here we convert the searchQuery to RegExp because it is easy to search in mongodb with help of RegExp.
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({data: posts});

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    //checking if user is authenticated or not
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    //comparing the userId with all id's of database
    const index = post.likes.findIndex((id) => id ===String(req.userId));

    
    //if not found, then we add his Id, else remove his id
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}

export const commentPost = async(req, res) => {
    const { id } = req.params;
    const {value} = req.body;


    try {
        
        //fetching the post that we should comment on
        const post = await PostMessage.findById(id);
        
        post.comments.push(value);

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//export default router;