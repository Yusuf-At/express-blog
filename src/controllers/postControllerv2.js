const getAdmin = async (req, res) => {
    try {
      res.status(200).json({message: 'Admin'});
    } catch (error) {
      res.status(500).send(error.message);
    }
};

const getHOme = async (req, res) => {
    try {
      res.status(200).json({message: 'Home'});
    } catch (error) {
      res.status(500).send(error.message);
    }
};

const getPostById = async (req, res) => {
    try {
      const { id } = req.params;
      const doc = await db.collection('posts').doc(id).get();
      if (!doc.exists) {
        return res.status(404).send('Post not found');
      }
      res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


module.exports = {
    getAdmin,
    getHOme,
    getPostById
}
  