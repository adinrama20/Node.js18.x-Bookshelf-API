const { nanoid } = require("nanoid");
const books = require("./books");

const addBook = (req, h) => {
  const { title, author, publicationAt, publisher } = req.payload;

  const id = nanoid(12);
  const addedAt = new Date().toISOString();
  const updatedAt = addedAt;

  const newBook = {
    id,
    title,
    author,
    publicationAt,
    publisher,
    addedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan..",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan..",
    data: {
      bookId: id,
    },
  });
  response.code(500);
  return response;
};

const getAllBooks = () => ({
  status: "success",
  data: {
    books,
  },
});

const getBookById = (req, h) => {
  const { id } = req.params;

  const book = books.filter((book) => book.id === id)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan..",
  });
  response.code(404);
  return response;
};

const editBookById = (req, h) => {
  const { id } = req.params;

  const { title, author, publicationAt, publisher } = req.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      title,
      author,
      publicationAt,
      publisher,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui..",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan..",
  });
  response.code(404);
  return response;
};

const deleteBookById = (req, h) => {
  const { id } = req.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus..",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "success",
    message: "Gagal menghapus buku. Id tidak ditemukan..",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
