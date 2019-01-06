import SQLConnection from './SQLConnection'
import ConfModel from './ConfModel'

export default class SQLCheck {
    confModel: ConfModel

    constructor(confModel: ConfModel) {
        this.confModel = confModel;
    }

    async check(): Promise<boolean> {
        let sqlConn = new SQLConnection()
        sqlConn.initConnection(this.confModel)
        let dbExpectedState = this.confModel.db_state.table_state
        for (let table of dbExpectedState) {
            let query = "Select * from " + table.name
            let result = await sqlConn.query(query)
            for (let i = 0; i < table.contents.length; i++) {
                for (let col of Object.keys(table.contents[i])) {
                    if ((result[i][col] + '').match('/' + table.contents[i][col] + '/')) {
                        console.log(JSON.stringify(result) + " don't match table row: " + JSON.stringify(table.contents[i]))
                        return false
                    }
                }
            }
            return true
        }
    }
}