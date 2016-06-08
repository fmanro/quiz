var path = require('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
//	DATABASE_URL = sqlite:///
//	DATABASE_STORAGE = quiz.sqlite
// Usar BBDD Postgres:
//	DATABASE_URL = postgres://user:passwd@host:port/database

var url, storage;

if(!process.env.DATABASE_URL){
	url = "sqlite:///";
	storage = "quiz.sqlite";
} else {
	url = process.env.DATABASE_URL;
	storage = process.env.DATABASE_STORAGE || "";
}
var sequelize = new Sequelize(url,
			{ storage: storage, omitNull: true });

// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar la definición de la tabla Comment de comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

// Importar la definición de la tabla User de user.js
var User = sequelize.import(path.join(__dirname, 'user'));

// Importar la definición de la tabla Attachments de attachment.js
var Attachment = sequelize.import(path.join(__dirname, 'attachment'));

// Relaciones entre modelos

// Relacion 1 a N entre Quiz y Comment
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Relacion 1 a N entre User y Quiz
User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

// Relacion 1 a N entre User y Comment
User.hasMany(Comment, {foreignKey: 'AuthorId'});
Comment.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

// Relacion 1-a-1 entre Quiz y Attachment
Attachment.belongsTo(Quiz);
Quiz.hasOne(Attachment);

exports.Quiz = Quiz; //exportar definicion de tabla Quiz
exports.Comment = Comment; //exportar definicion de tabla Comment
exports.User = User;  //exportar definición de tabla Users
exports.Attachment = Attachment;
