// posts için gerekli routerları buraya yazın
const express = require('express');
const router = express.Router();
const postsModel = require('./posts-model');

router.get('/', async (req, res) => {
  try {
    const posts = await postsModel.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Gönderiler alınamadı' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postsModel.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Belirtilen ID\'li gönderi bulunamadı' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Gönderi bilgisi alınamadı' });
  }
});

router.post('/', async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).json({ message: 'Lütfen gönderi için bir title ve contents sağlayın' });
  }
  try {
    const newPost = await postsModel.createPost({ title, contents });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Veritabanına kaydedilirken bir hata oluştu' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).json({ message: 'Lütfen gönderi için title ve contents sağlayın' });
  }
  try {
    const post = await postsModel.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Belirtilen ID\'li gönderi bulunamadı' });
    }
    const updatedPost = await postsModel.updatePost(id, { title, contents });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Gönderi bilgileri güncellenemedi' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postsModel.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Belirtilen ID\'li gönderi bulunamadı' });
    }
    await postsModel.deletePost(id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Gönderi silinemedi' });
  }
});

router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postsModel.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Girilen ID\'li gönderi bulunamadı' });
    }
    const comments = await postsModel.getCommentsByPostId(id);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Yorumlar alınamadı' });
  }
});

module.exports = router;