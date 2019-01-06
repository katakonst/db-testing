export default class ConfModel {
    db_credentials?: DBCredentials
    db_state?: DBState
}

class DBCredentials {
    host?: string
    user?: string
    password?: string
    database?: string
}

class DBState {
    table_state?: TableState[]
}

class TableState {
    name?: string
    contents?: any[] | []
}
