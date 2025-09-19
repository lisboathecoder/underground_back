import dados from "../modules/dados.js";
const { artistas } = dados;

const getAllArtistas = (req, res) => {
  let result = artistas;
  res.status(200).json({
    success: true,
    total: result.length,
    artistas: result,
  });
};

const getByIdArtistas = (req, res) => {
  const id = parseInt(req.params.id);
  const artistasID = artistas.find((a) => a.id === id);
  if (artistasID) {
    res.status(200).json({
      success: true,
      artista: artistasID,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Artista não encontrado com esse id: ${id}`,
    });
  }
};

const createArtista = (req, res) => {
  const { nome, subgeneros, estado } = req.body;
  if (!nome && !estado) {
    res.status(400).json({
      success: false,
      message: `Nome e Estado são necessários para um artista!`,
    });
  }
  const novoArtista = {
    id: artistas.length + 1,
    nome: nome,
    subgenero: subgeneros || ["Trap"],
    estado: estado,
  };
  artistas.push(novoArtista);
  res.status(201).json({
    success: true,
    message: `Artista novo no bloco!`,
    artista: novoArtista,
  });
};

const deleteArtista = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(404).json({
      success: false,
      message: `Id é necessário para um artista`,
    });
  }
  const apagarArtista = artistas.find((a) => a.id === id);
  if (!apagarArtista) {
    return res.status(400).json({
      success: false,
      message: `Artista não existente com esse id: ${id}`,
    });
  }
  const artistasFiltrados = artistas.filter(
    (artistasID) => artistasID.id !== id
  );
  artistas.splice(0, artistas.length, ...artistasFiltrados);
  res.status(200).json({
    success: true,
    message: `Artista com o id: ${id} foi fumado com sucesso!`,
  });
};

const updateArtista = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, subgeneros, estado } = req.body;
  const idEditar = id;
  if (isNaN(idEditar)) {
    res.status(400).json({
      success: false,
      message: `O id deve ser válido`,
    });
  }
  const artistaExiste = artistas.find((a) => a.id === idEditar);
  if (!artistaExiste) {
    res.status(404).json({
      success: false,
      message: `Esse id não foi encontrado: ${idEditar}`,
    });
  }
  const artistaAtulizados = artistas.map((a) =>
    a.id === idEditar
      ? {
          ...a,
          ...(nome && { nome }),
          ...(subgeneros && { subgeneros }),
          ...(estado && { estado }),
        }
      : a
  );
  artistas.splice(0, artistas.length, ...artistaAtulizados);
  const artistaEditado = artistas.find((a) => a.id === idEditar);
  res.status(200).json({
    success: true,
    message: `Artista editado com sucesso`,
    artista: artistaEditado,
  });
};

export {
  getAllArtistas,
  getByIdArtistas,
  createArtista,
  deleteArtista,
  updateArtista,
};
