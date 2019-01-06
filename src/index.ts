import * as commander from 'commander'
import * as fs from 'fs';
import { promisify } from 'util';
import SQLConnection from './SQLConnection'
import SQLCheck from './SQLCheck'

commander
    .version('1.0.0')
    .description('db-test')

commander
    .command('sql')
    .arguments('[f] [q]')
    .description('Execute SQL Query')
    .action(async (sql, fileArg) => {
        try {
            const readFile = promisify(fs.readFile);
            console.log(sql, fileArg)
            if (!fileArg) {
                fileArg = "./conf.json"
            }
            let file = await readFile(fileArg, 'utf8');
            let sqlCon = new SQLConnection()
            let conf = JSON.parse(file)
            sqlCon.initConnection(conf)
            let result = await sqlCon.query(sql)
            console.log(result)
        } catch (e) {
            console.log(e)
            process.exit(1)
        }
        process.exit(0)
    })

commander
    .command('check')
    .arguments('[f]')
    .description('Check ')
    .action(async (fileArg, cmd) => {
        try {
            const readFile = promisify(fs.readFile);
            if (!fileArg) {
                fileArg = "./conf.json"
            }
            let file = await readFile(fileArg, 'utf8');
            let conf = JSON.parse(file)
            let sqlCon = new SQLCheck(conf)
            let result = await sqlCon.check()
            if (!result) {
                console.log('Check failed')
            } else {
                console.log('Success')
            }
        } catch (e) {
            console.log(e)
            process.exit(1)
        }
        process.exit(0)
    })

if (!process.argv.slice(2).length) {
    commander.outputHelp()
    process.exit(0)
}
commander.parse(process.argv)