/* eslint-disable no-console */
import app from './app.js'
import { checkEnv, PORT } from './consts/consts.js'
import { DatabaseError, dbConnection } from './database/config.js'

// Check if all env vars are defined
checkEnv()

// Connect to database
await dbConnection().catch(() => {
	process.exit(1)
})


app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`)
  console.log('Press Ctrl + C to quit.')
})
