const Blog = require("../Models/blogSchema");

const PostBlog = async (req, res) => {
    try {
        const { title, content, tags, category } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            });
        }

        const author = req.userInfo.userId; 

        const blog = new Blog({
            title,
            content,
            author,
            tags,
            category
        });

        await blog.save();

        res.status(201).json({
            success: true,
            message: "Blog posted successfully",
            data: {
                title: blog.title,
                content: blog.content,
                author: blog.author,
                tags: blog.tags || null,
                category: blog.category || null
            }
        });

    } catch (error) {
        console.error("Error Occurred:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const CheckBlogs = async (req , res)=>{
    try {
       const {title } = req.body ;
       const author = req.userInfo.userId ;
       if(!title ){
        return res.status(400).json({
            success : false ,
            message : "All fields are required to fill"
        })
       } 
       const blog = await Blog.find({title : title , author :author});
       if(blog.length===0){
        return res.status(404).json({
            success : false ,
            message : "Blog Not Found"
        })
       }
       res.status(200).json({
        success : true ,
        message : "Blog found successfully" ,
        data : blog 
       })
    } catch (error) {
        console.log("Error Occured :" , error.message);
        res.status(500).json({
            success : false ,
            message : "Internal Server Error" ,
            error : error.message 
        })
    }
};

const UpdateBlog = async (req , res)=>{
    try {
        const {id} = req.params ;
        const {title , content , tags , category} = req.body ;

        // if(!title || !content){
        //     return res.status(400).json({
        //         success : false ,
        //         message : "Fields must be filled"
        //     })
        // }
        // const author = req.userInfo.userId ;
        const blog = await Blog.findById(id);
        if(!blog){
            res.status(404).json({
                success : false ,
                message : "Blog Not Found" 
            })
        }
        if(blog.author.toString()!==req.userInfo.userId){
            return res.status(403).json({
                success : false ,
                message : "Access Denied" 
            })
        }

        if(title) blog.title = title ;
        if(content) blog.content = content ;
        if(tags) blog.tags = tags ;
        if(category) blog.category = category ;

        await blog.save();
        res.status(200).json({
            success : true ,
            message : "Blog Updated Successfully" ,
            data : blog 
        });


    } catch (error) {
        console.log("Error Occured : " , error.message);
        res.status(500).json({
            success : false ,
            message : "Internal Server Error" ,
            error : error.message 
        })
        
    }
} 

const DeleteBlog = async (req , res)=>{
    try {
        const {id} = req.params ;

        // if(!id){
        //     return res.status(400).json({
        //         success : false ,
        //         message : "Blog Id Not Found"
        //     })
        // }

        const blog = await Blog.findById(id);

        if(!blog){
            return res.status(404).json({
                success : false ,
                message : "Blog Not found"
            })
        }

        if(blog.author.toString()!==req.userInfo.userId){
            return res.status(403).json({
                success : false ,
                message : "Access Denied"
            })   
        }

        await blog.deleteOne();
        res.status(200).json({
            success : true ,
            message : "Blog Deleted Successfully"
        })
    } catch (error) {
        
        res.status(500).json({
            success : false ,
            message : "Internal Server Error" ,
            error : error.message
        })
    }
    
}
    

module.exports = {
    PostBlog , CheckBlogs , UpdateBlog , DeleteBlog
};
