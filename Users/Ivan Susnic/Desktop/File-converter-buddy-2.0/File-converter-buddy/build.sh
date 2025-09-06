#!/bin/bash
set -e

echo "Starting custom build process..."
echo "Installing dependencies..."
npm ci

echo "Building project with npm run build..."
npm run build

echo "Build completed successfully!"
