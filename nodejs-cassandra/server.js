const cassandra = require('cassandra-driver')

const conn = new cassandra.Client({
	
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'banco'

})


const credito = (agencia, conta, valor) => {
	
	let sql = "insert into movimento(agencia, conta, valor,tipo) values (?,?,?,'C')"
	conn.execute(sql, [agencia, conta, valor], { prepare: true }).then((resultado) => {
		console.log(resultado)
	})
}

const debito = (agencia, conta, valor) => {
	
	let sql = "insert into movimento(agencia, conta, valor,tipo) values (?,?,?,'D')"
	conn.execute(sql, [agencia, conta, valor], { prepare: true }).then((resultado) => {
		console.log(resultado)
	})
}

const consulta = (agencia, conta) => {

	conn.eachRow('select * from movimento where agencia=? and conta=?', [agencia,conta], {prepare: true}, (n, row) => {
	                console.log(row);
	        }, err => {
				if (err) {
			
	                console.log(err);
				}
	        });

}

//credito(100,200,270)
//debito(100,200,100)
consulta(100,200)