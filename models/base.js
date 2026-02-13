const connection = require("../utils/db");

class BaseSQLModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async executeQuery(query, params) {
    const conn = await connection();
    try{
      const [results] = await conn.execute(query, params);
      return results;
    } catch (error){
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    const results = await this.executeQuery(query);
    return results;
  }

  // Kasutame ID-d
  async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const results = await this.executeQuery(query, [id]);
    return results[0];
  }

  //Kasutame SLUGi
  async findOne(where, value){
    const query = `SELECT * FROM ${this.tableName} WHERE ${where}= "${value}"`;
    const results = await this.executeQuery(query, [where, value]);
    return results[0];
  }

  async getAuthor(where ,value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${where} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results;
  }

  async create(data) {
    const columns = Object.keys(data).map(key => `\`${key}\` = :${key}`).join(', '); // AI poolt antud lahendus placeholderite veale!
    
    const query = `INSERT INTO ${this.tableName} SET ${columns}`;
    const result = await this.executeQuery(query, data);
    return result.insertId;
  }

  async update(id, data) {
    const columns = Object.keys(data).map(key => `\`${key}\` = ?`).join(', '); // AI poolt antud lahendus placeholderite veale!
    const values = Object.values(data);

    const query = `UPDATE ${this.tableName} SET ${columns} WHERE id = ?`;
    const result = await this.executeQuery(query, [...values, id]);
    return result.affectedRows;
  }

  async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await this.executeQuery(query, [id]);
    return result.affectedRows;
  }

  async registerUser(data) {
    const setUserTable = 'users';
    const columns = Object.keys(data).map(key => `\`${key}\` = :${key}`).join(', ');
    const query = `INSERT INTO ${setUserTable} SET ${columns}`;
    const result = await this.executeQuery(query, data);
    return result.insertId;
  }
}

module.exports = BaseSQLModel;