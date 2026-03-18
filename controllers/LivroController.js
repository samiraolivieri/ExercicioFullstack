const express = require('express');
const router = express.Router();
const Livro = require('../model/Livro');


router.get('/', async(req, res) => {
  try{
      const livros = await Livro.findAll();
      res.json(livros);
  }catch(err){
      res.status(500).json({ error: 'Erro ao buscar livros'});
  }
});
// GET - Listar todos os livros
router.get('/:id', async(req, res) => {
  try{
      const livro = await Livro.findByPk(req.params.id);
      if(livro){
          res.json(livro);
      }else{
          res.status(404).json({ error: 'livro não encontrado'});
      }
  }catch(err){
      res.status(500).json({ error: 'Erro ao buscar livro.'});
  }

});

// POST - Adicionar novo livro
router.post('/', async (req, res) => {
  try {
    const { nome, imagem, descricao, preco } = req.body;
    const novoLivro = await Livro.create({ nome, imagem, descricao, preco });
    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar livro' });
  }
});

// DELETE - Remover livro por ID
router.delete('/:id', async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (livro) {
      await livro.destroy();
      res.json({ message: 'Livro deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Livro não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar livro' });
  }
});

module.exports = router;