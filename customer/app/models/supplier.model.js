const sql = require("../config/db.js");

const Supplier = function(supplier) {
    this.id = supplier.id;
    this.name = supplier.name;
    this.contact = supplier.contact;
};

Supplier.getAll = (result) => {
    sql.query("SELECT * FROM suppliers", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Supplier.findById = (id, result) => {
    sql.query("SELECT * FROM suppliers WHERE id = ?", [id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);
    });
};

module.exports = Supplier;
