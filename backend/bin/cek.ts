#!/usr/bin/env ts-node

const command = process.argv[2]

if (command === "list-routes") {
    console.log("Checking list routes...");
    import('../scripts/list_routes').then(() => {
        process.exit(0)
    })
} else {
    console.log(`Command ${process.argv[2]} unrecognize, try 'list-routes'`);
}