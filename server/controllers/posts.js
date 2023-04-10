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
    const post = req.query;
    console.log("p = ",post);
   
    try {

        //here we convert the searchQuery to RegExp because it is easy to search in mongodb with help of RegExp.
        const title = new RegExp(post.searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: post.tags.split(',') } } ]});

        res.json({data: posts});

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async(req,res) => {
   const post = req.body;

   const newPost = new PostMessage(post);

   try {
    await newPost.save();
    res.status(201).json(newPost);
   } catch (error) {
    res.status(409).json({message: error.message});
   }
};

export const updatePost = async(req,res) => {
    const {id: _id} = req.params;
    const post = req.body; 

    //checking if id what we extracted is valid mongoose id or not
    if( !mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No Posts with ${_id}`);

    else{
        //new: True because it helps to receive latest version of new post
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
        res.json(updatedPost);
    }    

}

export const deletePost = async(req,res) => {
    const {id: _id} = req.params;
     
    //checking if id what we extracted is valid mongoose id or not
    if( !mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No Posts with ${_id}`);

    else{
        const deletedPost = await PostMessage.findByIdAndRemove(_id);
        res.json(deletedPost);
    }    

}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}


//export default router;