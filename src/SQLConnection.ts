import { createConnection, Connection, MysqlError, FieldInfo } from 'mysql';
import { promisify } from 'util'
import ConfModel from './ConfModel'

export default class SQLConnection {
    connection: Connection | undefined

    public initConnection(confModel: ConfModel) {
        this.connection = createConnection({
            host: confModel.db_credentials.host,
            user: confModel.db_credentials.user,
            password: confModel.db_credentials.password,
            database: confModel.db_credentials.database
        });
    }

    public async query(query: string): Promise<any> {
        let queryFunc = await promisify(this.getQuery)
        return queryFunc(this.connection, query)
    }

    public getQuery(conn: Connection | undefined, query: string,
        callback: (err: Error | null, result: any) => void) {
        conn.query(query, function (error, results, fields) {
            callback(error, results)
        });
    }
}
