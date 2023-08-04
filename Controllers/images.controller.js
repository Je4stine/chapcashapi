const { Users } =require('../Models/Users')


exports.addImageByUsername = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send("No image provided");
      }
  
      const image = req.file.path;
      const { email } = req.params; // Retrieve the username from the URL params
  
      const user = await Users.findOne({ where: { email: email}});
      // Find the user by username
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      user.image = image;
      user.imageUrl = ""; // Initially empty
      user.originalName = req.file.originalname;
  
      await user.save();
  
      const imageUrl = `https://${req.get("host")}/${image}`; // Construct the image URL
  
      user.imageUrl = imageUrl; // Assign the URL to the imageUrl field
      await user.save(); // Save the updated document
  
      res.status(200).json({ imageUrl }); 
    } catch (error) {
      console.error(error);
      res.status(500).send("Error saving image");
    }
  };

  exports.getUser = async (req, res)=>{
    const { email } = req.body;
    try{
        const data = await Users.findOne({ where: {email: email}})
        res.json(data.imageUrl);
    } 
    catch(error){
        res.status(500).json({message: error.message})
    }
  };

