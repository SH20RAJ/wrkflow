#!/bin/bash

# Build the project first
echo "Building Next.js app..."
bun run build

echo "Building OpenNext bundle..."
bunx opennextjs-cloudflare build || {
    echo "Build failed, attempting to fix missing dependencies..."
    
    # Check if the build directory exists
    if [ -d ".open-next/server-functions/default/node_modules/@libsql/isomorphic-ws" ]; then
        echo "Copying missing files to build directory..."
        cp node_modules/@libsql/isomorphic-ws/{web.mjs,web.cjs,index.d.ts,README.md} .open-next/server-functions/default/node_modules/@libsql/isomorphic-ws/
        
        echo "Retrying OpenNext build..."
        bunx opennextjs-cloudflare build
    else
        echo "Build directory structure not found"
        exit 1
    fi
}

echo "Build completed successfully!"
