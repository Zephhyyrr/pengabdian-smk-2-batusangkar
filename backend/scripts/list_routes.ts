#!/usr/bin/bin/env ts-node

import listEndpoints from "express-list-endpoints"
import app from "../src/app"

const routes = listEndpoints(app)

console.log("List of all routes:");
routes.forEach(route => {
    route.methods.forEach(method => {
        console.log(`${method.padEnd(10)} ${route.path}`);
    })
})