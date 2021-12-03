const { JournalModel } = require("../models");

class JournalService {
  async createPost(user, journal) {
    try {
      const { title, date, entry } = journal;

      await JournalModel.create({
        title,
        date,
        entry,
        userId: user.id,
      });
      return { statusCode: 201, message: "Successful journal post" };
    } catch (error) {
      return { statusCode: 500, message: error };
    }
  }

  async getAllPosts() {
    try {
      const allPosts = await JournalModel.findAll()
      if (allPosts) {
        return { statusCode: 200, message: "Successful journal retrieval", allPosts };
      } else {
        return {statusCode: 204}
      }
    } catch (error) {
      return { statusCode: 500, message: error };
    }
  }

  async getByTitle(title) {
    try {
      const postsByTitle = await JournalModel.findAll({where: {title: title}});

      if (postsByTitle) {
        return {statusCode: 200, message: 'Posts by title successfully retrieved', postsByTitle};
      } else {
        return {statusCode: 204}
      }
    } catch (error) {
      return { statusCode: 500, message: error };
    }
  }

  async deletePost(user, journalId) {
    try {

      const foundPost = await JournalModel.findOne({
        where: { 
          userId: user.id, 
          id: journalId 
        },
      });
      if(foundPost) {
      await foundPost.destroy();
      return { statusCode: 200, message: "Successful journal delete" };
      } else {
        return {statusCode: 404, message: "Cannot locate journal post"}
      }
    } catch (error) {
      return { statusCode: 500, message: `[Error:] ${error}` };
    }
  }

  async updatePost(user, journal, journalId) {

    try {
      const foundPost = await JournalModel.findOne({
        where: { 
          userId: user.id, 
          id: journalId 
        }
      });
      
      if(foundPost){
        await foundPost.update(journal);
        return { statusCode: 200, message: "Successful journal update" };
      } else {
        return {statusCode: 400, message: "[Error:] Unsuccessful journal update"}
      }

    } catch (error) {
      return { statusCode: 500, message: `[Error:] ${error}` };
    }
  }
}

module.exports = JournalService;
