"use strict"

import { config } from "dotenv"
import  {defaultAdmin, defaultCat, initServer } from "./config/server.js"

config()
initServer()
defaultAdmin()
defaultCat()